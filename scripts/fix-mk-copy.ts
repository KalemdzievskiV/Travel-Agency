/**
 * Revision 3.0 copy corrections over the database content.
 *
 * The same two fixes were applied to the in-repo content and message files, but
 * most page copy is served from Postgres, so a repo-only edit never reaches the
 * live site. Idempotent: re-running it is a no-op once the strings are clean.
 *
 *   детаљ → детал  (stem replace, so it carries every suffixed form)
 *   Маврициус → Маурициус
 *
 * Run with:  npx tsx --env-file=.env.local scripts/fix-mk-copy.ts [--apply]
 * Without --apply it reports what it would change and touches nothing.
 */
import postgres from "postgres";

const APPLY = process.argv.includes("--apply");
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set.");
const sql = postgres(url, { prepare: false });

const REPLACEMENTS: [from: string, to: string][] = [
  ["детаљ", "детал"],
  ["Маврициус", "Маурициус"],
];

async function main() {
  // Every text/text[] column in the public schema — the Macedonian copy is
  // spread across *_mk columns, array columns like highlights_mk, and plain
  // text ones, so enumerate rather than hand-listing and miss some.
  const cols = await sql<{ table_name: string; column_name: string; data_type: string }[]>`
    SELECT table_name, column_name, data_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND (data_type IN ('text', 'character varying') OR udt_name IN ('_text', '_varchar'))
    ORDER BY table_name, column_name
  `;

  let total = 0;
  for (const [from, to] of REPLACEMENTS) {
    for (const c of cols) {
      const isArray = c.data_type === "ARRAY";
      const t = sql(c.table_name);
      const col = sql(c.column_name);

      const [{ n }] = isArray
        ? await sql<{ n: number }[]>`
            SELECT count(*)::int AS n FROM ${t}
            WHERE EXISTS (SELECT 1 FROM unnest(${col}) v WHERE v LIKE ${"%" + from + "%"})`
        : await sql<{ n: number }[]>`
            SELECT count(*)::int AS n FROM ${t} WHERE ${col} LIKE ${"%" + from + "%"}`;

      if (!n) continue;
      total += n;
      console.log(`${APPLY ? "fixing" : "would fix"}  ${c.table_name}.${c.column_name}  ${n} row(s)  [${from} → ${to}]`);

      if (APPLY) {
        if (isArray) {
          await sql`
            UPDATE ${t}
            SET ${col} = ARRAY(SELECT replace(v, ${from}, ${to}) FROM unnest(${col}) v)
            WHERE EXISTS (SELECT 1 FROM unnest(${col}) v WHERE v LIKE ${"%" + from + "%"})`;
        } else {
          await sql`
            UPDATE ${t} SET ${col} = replace(${col}, ${from}, ${to})
            WHERE ${col} LIKE ${"%" + from + "%"}`;
        }
      }
    }
  }

  console.log(total === 0 ? "\nNothing to change — database copy is already clean." : `\n${total} row(s) ${APPLY ? "updated" : "pending"}.`);
  if (!APPLY && total) console.log("Re-run with --apply to write the changes.");
  await sql.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
