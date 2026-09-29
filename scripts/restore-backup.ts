/**
 * Restores a backup made with the Studio's "Download backup" button into the
 * database in DATABASE_URL (MIGRATE_DATABASE_URL wins when set, like migrate.ts).
 *
 *   npm run db:restore -- ./bookit-backup-2026-10-01-1200.zip [options]
 *
 * Options:
 *   --images=auto   (default) Blob when BLOB_READ_WRITE_TOKEN is set, else local.
 *   --images=blob   Upload the images to the Vercel Blob store in BLOB_READ_WRITE_TOKEN.
 *   --images=local  Write them to public/uploads (a VPS / any host with a disk).
 *   --images=keep   Leave the image URLs pointing where they did (same Blob store).
 *   --wipe          Empty the target tables first. Without it, the restore
 *                   refuses to write into a database that already has content.
 *
 * Steps: migrate the schema, move the images and rewrite their URLs in the
 * data, then insert every table in foreign-key order inside one transaction
 * (so a failure leaves the database as it was) and move each id sequence past
 * the restored rows.
 */
import { config } from "dotenv";
config({ path: ".env.local" }); // harmless if absent (the host injects env vars)

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { unzipSync, strFromU8 } from "fflate";
import {
  BACKUP_FORMAT,
  BACKUP_VERSION,
  type BackupData,
} from "../src/lib/backup-format.ts";

type ImageMode = "blob" | "local" | "keep";

const CONTENT_TYPES: Record<string, string> = {
  avif: "image/avif",
  webp: "image/webp",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  svg: "image/svg+xml",
};

function parseArgs() {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith("--"));
  const imagesArg = args.find((a) => a.startsWith("--images="))?.split("=")[1] ?? "auto";
  if (!file) {
    throw new Error("Usage: npm run db:restore -- <backup.zip> [--images=auto|blob|local|keep] [--wipe]");
  }
  if (!["auto", "blob", "local", "keep"].includes(imagesArg)) {
    throw new Error(`Unknown --images=${imagesArg}. Use auto, blob, local or keep.`);
  }
  const images: ImageMode =
    imagesArg === "auto"
      ? process.env.BLOB_READ_WRITE_TOKEN ? "blob" : "local"
      : (imagesArg as ImageMode);
  if (images === "blob" && !process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("--images=blob needs BLOB_READ_WRITE_TOKEN for the new Blob store.");
  }
  return { file, images, wipe: args.includes("--wipe") };
}

async function readBackup(file: string) {
  const entries = unzipSync(new Uint8Array(await readFile(file)));
  if (!entries["data.json"]) throw new Error(`${file} has no data.json — is it a bookit backup?`);
  const data = JSON.parse(strFromU8(entries["data.json"])) as BackupData;
  if (data.format !== BACKUP_FORMAT) throw new Error(`${file} is not a bookit backup.`);
  if (data.version !== BACKUP_VERSION) {
    throw new Error(`Backup format v${data.version}; this code reads v${BACKUP_VERSION}.`);
  }
  return { data, entries };
}

/** The backup must not come from a schema newer than the code doing the restore. */
async function checkSchema(data: BackupData) {
  const journal = JSON.parse(await readFile("drizzle/meta/_journal.json", "utf8")) as {
    entries: { when: number; tag: string }[];
  };
  const latest = Math.max(...journal.entries.map((e) => e.when));
  const taken = data.migrations.lastCreatedAt;
  if (taken !== null && taken > latest) {
    throw new Error(
      "This backup was taken on a newer database schema than this code has. " +
        "Pull the latest code (with its drizzle/ migrations) and run the restore again.",
    );
  }
  if (taken !== null && taken < latest) {
    console.log("[restore] backup predates the newest migration; new columns get their defaults.");
  }
}

/** Moves the images and returns old URL → new URL. */
async function moveImages(
  data: BackupData,
  entries: Record<string, Uint8Array>,
  mode: ImageMode,
) {
  const moved = new Map<string, string>();
  if (mode === "keep") return moved;

  const { put } = mode === "blob" ? await import("@vercel/blob") : { put: null };
  const list = Object.entries(data.images);
  let i = 0;
  for (const [oldUrl, zipPath] of list) {
    const bytes = entries[zipPath];
    if (!bytes) {
      console.warn(`[restore] ${zipPath} is missing from the zip; keeping ${oldUrl}`);
      continue;
    }
    // images/uploads/123-abc.avif → uploads/123-abc.avif
    const pathname = zipPath.replace(/^images\//, "");
    const ext = pathname.split(".").pop()?.toLowerCase() ?? "";
    if (put) {
      const blob = await put(pathname, Buffer.from(bytes), {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: CONTENT_TYPES[ext],
      });
      moved.set(oldUrl, blob.url);
    } else {
      const target = path.join(process.cwd(), "public", pathname);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, bytes);
      moved.set(oldUrl, `/${pathname}`);
    }
    i++;
    if (process.stdout.isTTY) process.stdout.write(`\r[restore] images ${i}/${list.length}`);
  }
  if (process.stdout.isTTY && list.length) process.stdout.write("\n");
  console.log(`[restore] images: ${moved.size} moved (${mode}).`);
  return moved;
}

function rewriteUrls(tables: BackupData["tables"], moved: Map<string, string>) {
  if (!moved.size) return tables;
  let json = JSON.stringify(tables);
  // Longest first, so a URL that is a prefix of another can't clobber it.
  for (const [from, to] of [...moved].sort((a, b) => b[0].length - a[0].length)) {
    // URLs sit inside JSON strings, where "/" may or may not be escaped.
    json = json.split(JSON.stringify(from).slice(1, -1)).join(JSON.stringify(to).slice(1, -1));
  }
  return JSON.parse(json) as BackupData["tables"];
}

async function main() {
  const { file, images, wipe } = parseArgs();
  const url = process.env.MIGRATE_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) throw new Error("Set DATABASE_URL (or MIGRATE_DATABASE_URL) to the new database.");

  const { data, entries } = await readBackup(file);
  await checkSchema(data);
  console.log(`[restore] backup from ${data.createdAt} → ${new URL(url).host}`);

  const postgres = (await import("postgres")).default;
  const { drizzle } = await import("drizzle-orm/postgres-js");
  const { migrate } = await import("drizzle-orm/postgres-js/migrator");
  const sql = postgres(url, { max: 1, onnotice: () => {} });

  try {
    await migrate(drizzle(sql), { migrationsFolder: "drizzle" });
    console.log("[restore] schema migrated.");

    const current = await sql<{ table_name: string; column_name: string }[]>`
      select table_name, column_name from information_schema.columns
      where table_schema = 'public'
    `;
    const columns = new Map<string, Set<string>>();
    for (const c of current) {
      if (!columns.has(c.table_name)) columns.set(c.table_name, new Set());
      columns.get(c.table_name)!.add(c.column_name);
    }

    // Refuse to merge into a live database unless asked to replace it.
    if (!wipe) {
      for (const t of columns.keys()) {
        const [{ n }] = await sql<{ n: number }[]>`select count(*)::int as n from ${sql(t)}`;
        if (n > 0) {
          throw new Error(
            `The target database already has data (${t}: ${n} rows). ` +
              "Point DATABASE_URL at an empty database, or pass --wipe to replace its contents.",
          );
        }
      }
    }

    const moved = await moveImages(data, entries, images);
    const tables = rewriteUrls(data.tables, moved);

    // Parents before children, so foreign keys hold as each table goes in.
    const fks = await sql<{ child: string; parent: string }[]>`
      select conrelid::regclass::text as child, confrelid::regclass::text as parent
      from pg_constraint where contype = 'f' and connamespace = 'public'::regnamespace
    `;
    const order: string[] = [];
    const visit = (t: string, seen: Set<string>) => {
      if (order.includes(t) || seen.has(t)) return;
      seen.add(t);
      for (const fk of fks) if (fk.child === t && fk.parent !== t) visit(fk.parent, seen);
      order.push(t);
    };
    for (const t of [...columns.keys()].sort()) visit(t, new Set());

    for (const t of Object.keys(tables)) {
      if (!columns.has(t)) console.warn(`[restore] skipping ${t}: no such table in this schema.`);
    }

    await sql.begin(async (tx) => {
      if (wipe) {
        await tx.unsafe(
          `truncate ${order.map((t) => `"${t}"`).join(", ")} restart identity cascade`,
        );
      }
      for (const t of order) {
        const rows = tables[t] ?? [];
        if (!rows.length) continue;
        // Only columns both sides know: a dropped column is ignored, a new one
        // takes its default.
        const cols = [...new Set(rows.flatMap((r) => Object.keys(r)))].filter((c) =>
          columns.get(t)!.has(c),
        );
        const list = cols.map((c) => `"${c}"`).join(", ");
        for (let i = 0; i < rows.length; i += 500) {
          await tx.unsafe(
            `insert into "${t}" (${list}) select ${list} from json_populate_recordset(null::"${t}", $1::json)`,
            [JSON.stringify(rows.slice(i, i + 500))],
          );
        }
        console.log(`[restore] ${t}: ${rows.length} rows`);
      }

      // Rows went in with their original ids; move each serial past them.
      for (const t of order) {
        for (const c of columns.get(t)!) {
          const [{ seq }] = await tx<{ seq: string | null }[]>`
            select pg_get_serial_sequence(${`"${t}"`}, ${c}) as seq
          `;
          if (!seq) continue;
          await tx.unsafe(
            `select setval('${seq}', coalesce((select max("${c}") from "${t}"), 0) + 1, false)`,
          );
        }
      }
    });

    if (data.missingImages.length) {
      console.warn(
        `[restore] ${data.missingImages.length} image(s) were unreachable when the backup was taken; ` +
          "their URLs were left as they were.",
      );
    }
    console.log("[restore] done.");
  } finally {
    await sql.end();
  }
}

main().catch((e) => {
  console.error("[restore] failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});
