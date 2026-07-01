/**
 * Seeds the filter taxonomy from the existing `feelings` arrays:
 *  - ensures a "Feeling" group (+ starter "Who" / "Experience" groups),
 *  - creates one option per distinct feeling,
 *  - populates trip/destination → option join tables.
 * Idempotent. Run with: npx tsx scripts/migrate-filters.ts
 */
import { config } from "dotenv";
config({ path: ".env.local" });

function slugify(x: string): string {
  return x
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const { db } = await import("../src/db/index.ts");
  const s = await import("../src/db/schema.ts");
  const { and, eq } = await import("drizzle-orm");

  async function ensureGroup(key: string, label: string, sortOrder: number) {
    const existing = await db.select().from(s.filterGroups).where(eq(s.filterGroups.key, key));
    if (existing[0]) return existing[0];
    const [g] = await db
      .insert(s.filterGroups)
      .values({ key, label, sortOrder, published: true })
      .returning();
    return g;
  }

  const feelingGroup = await ensureGroup("feeling", "Feeling", 0);
  await ensureGroup("who", "Who", 1);
  await ensureGroup("experience", "Experience", 2);

  const trips = await db.select({ id: s.trips.id, feelings: s.trips.feelings }).from(s.trips);
  const dests = await db
    .select({ id: s.destinations.id, feelings: s.destinations.feelings })
    .from(s.destinations);

  const distinct = new Set<string>();
  trips.forEach((t) => t.feelings.forEach((f) => distinct.add(f)));
  dests.forEach((d) => d.feelings.forEach((f) => distinct.add(f)));

  const optByLabel = new Map<string, number>();
  let i = 0;
  for (const label of [...distinct].sort()) {
    const key = slugify(label);
    const existing = await db
      .select()
      .from(s.filterOptions)
      .where(and(eq(s.filterOptions.groupId, feelingGroup.id), eq(s.filterOptions.key, key)));
    let opt = existing[0];
    if (!opt) {
      [opt] = await db
        .insert(s.filterOptions)
        .values({ groupId: feelingGroup.id, key, label, sortOrder: i })
        .returning();
    }
    optByLabel.set(label, opt.id);
    i++;
  }

  // Repopulate join tables from the feelings arrays.
  await db.delete(s.tripFilterOptions);
  await db.delete(s.destinationFilterOptions);

  for (const t of trips) {
    const rows = t.feelings
      .map((f) => ({ tripId: t.id, optionId: optByLabel.get(f)! }))
      .filter((r) => r.optionId);
    if (rows.length) await db.insert(s.tripFilterOptions).values(rows).onConflictDoNothing();
  }
  for (const d of dests) {
    const rows = d.feelings
      .map((f) => ({ destinationId: d.id, optionId: optByLabel.get(f)! }))
      .filter((r) => r.optionId);
    if (rows.length) await db.insert(s.destinationFilterOptions).values(rows).onConflictDoNothing();
  }

  console.log(
    `Filter taxonomy seeded: ${optByLabel.size} feeling options, ` +
      `${trips.length} trips + ${dests.length} destinations tagged.`,
  );
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
