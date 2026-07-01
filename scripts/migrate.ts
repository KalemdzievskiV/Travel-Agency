/**
 * Applies pending Drizzle migrations, then exits. Runs as part of the build
 * (see the "build" script) so every Vercel deploy migrates the database before
 * Next.js prerenders. Idempotent — already-applied migrations are skipped.
 *
 * Uses MIGRATE_DATABASE_URL when set (a direct, non-pooled connection — Neon's
 * pooler can reject the DDL/locks a migration needs), else DATABASE_URL. Skips
 * gracefully if neither is set (e.g. a build without a database).
 */
import { config } from "dotenv";
config({ path: ".env.local" }); // harmless if absent (Vercel injects env vars)

async function main() {
  const url = process.env.MIGRATE_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) {
    console.log("[migrate] no MIGRATE_DATABASE_URL / DATABASE_URL — skipping migrations.");
    return;
  }

  const postgres = (await import("postgres")).default;
  const { drizzle } = await import("drizzle-orm/postgres-js");
  const { migrate } = await import("drizzle-orm/postgres-js/migrator");

  const sql = postgres(url, { max: 1 });
  try {
    await migrate(drizzle(sql), { migrationsFolder: "drizzle" });
    console.log("[migrate] migrations applied.");
  } finally {
    await sql.end();
  }
}

main().catch((e) => {
  console.error("[migrate] failed:", e);
  process.exit(1);
});
