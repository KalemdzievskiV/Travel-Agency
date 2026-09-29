import { sql } from "drizzle-orm";
import { db } from "@/db";
import { getSessionUser } from "@/lib/session";
import {
  BACKUP_FORMAT,
  BACKUP_VERSION,
  type BackupData,
} from "@/lib/backup-format";

/**
 * GET /api/admin/backup — every table in the public schema as JSON, for the
 * dashboard's "Download backup" button (which then adds the images and zips it).
 *
 * Admins only: the dump includes the users table (emails + password hashes).
 * Tables are discovered at runtime rather than listed from schema.ts, so a new
 * table is backed up without touching this file.
 */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  if (user.role !== "admin") return new Response("Forbidden", { status: 403 });

  const tableRows = await db.execute<{ table_name: string }>(sql`
    select table_name from information_schema.tables
    where table_schema = 'public' and table_type = 'BASE TABLE'
    order by table_name
  `);

  const tables: BackupData["tables"] = {};
  for (const { table_name } of tableRows) {
    // json_agg lets Postgres serialise its own types (arrays, timestamps,
    // numerics), and the restore reads them back with json_populate_recordset.
    const [row] = await db.execute<{ rows: Record<string, unknown>[] }>(sql`
      select coalesce(json_agg(t), '[]'::json) as rows from ${sql.identifier(table_name)} t
    `);
    tables[table_name] = row.rows;
  }

  const [migrations] = await db.execute<{ count: number; last: string | null }>(sql`
    select count(*)::int as count, max(created_at)::text as last
    from drizzle.__drizzle_migrations
  `);

  const data: BackupData = {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    createdAt: new Date().toISOString(),
    migrations: {
      count: migrations.count,
      lastCreatedAt: migrations.last === null ? null : Number(migrations.last),
    },
    tables,
    images: {},
    missingImages: [],
  };

  return Response.json(data, { headers: { "Cache-Control": "no-store" } });
}
