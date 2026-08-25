/**
 * Strips the "per person" tail from trip prices.
 *
 * Cards render the price as `<label> <amount>` where the label is supplied by
 * the card ("сега од" / "now from"), so the stored value holds the amount only.
 * The seeded trip prices carried an English "per person" suffix, which read
 * wrong beside a Macedonian label — "сега од €3,200 per person".
 *
 * Hotels are left alone on purpose: their "/ night" suffix says something the
 * amount alone doesn't, and it is not what the client asked to remove.
 *
 * Run with:  npx tsx --env-file=.env.local scripts/fix-price-text.ts [--apply]
 * Without --apply it reports what it would change and touches nothing.
 */
import postgres from "postgres";

const APPLY = process.argv.includes("--apply");
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set.");
const sql = postgres(url, { prepare: false });

// Trailing " per person" / " per adult", any spacing, case-insensitive.
const PATTERN = "[[:space:]]+per[[:space:]]+(person|adult)[[:space:]]*$";

async function main() {
  let total = 0;
  for (const column of ["price_from", "sale_price_from"] as const) {
    const col = sql(column);
    const rows = await sql<{ slug: string; v: string }[]>`
      SELECT slug, ${col} AS v FROM trips WHERE ${col} ~* ${PATTERN} ORDER BY slug`;
    if (!rows.length) continue;
    total += rows.length;
    for (const r of rows) {
      const after = r.v.replace(/\s+per\s+(person|adult)\s*$/i, "");
      console.log(`${APPLY ? "fixing" : "would fix"}  trips.${column}  ${r.slug}: ${JSON.stringify(r.v)} → ${JSON.stringify(after)}`);
    }
    if (APPLY) {
      await sql`UPDATE trips SET ${col} = regexp_replace(${col}, ${PATTERN}, '', 'i') WHERE ${col} ~* ${PATTERN}`;
    }
  }
  console.log(total === 0 ? "\nNothing to change — prices are already clean." : `\n${total} value(s) ${APPLY ? "updated" : "pending"}.`);
  if (!APPLY && total) console.log("Re-run with --apply to write the changes.");
  await sql.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
