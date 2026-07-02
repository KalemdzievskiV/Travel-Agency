import { config } from "dotenv";
config({ path: ".env.local" });

import { eq, and, isNull } from "drizzle-orm";
import { db } from "../src/db";
import { destinations } from "../src/db/schema";

/**
 * One-off backfill: give each country destination a representative coordinate
 * (a well-known city) so trip route maps have pins to plot. Safe to re-run —
 * by default it only fills rows that don't already have a latitude, so any
 * coordinates edited in the admin are preserved. Run: `npm run db:backfill-coords`.
 */
const COORDS: Record<string, [number, number]> = {
  egypt: [30.04, 31.24],
  ethiopia: [9.03, 38.74],
  kenya: [-1.29, 36.82],
  mauritius: [-20.16, 57.5],
  morocco: [31.63, -7.99],
  tunisia: [36.81, 10.18],
  seychelles: [-4.62, 55.45],
  "south-africa": [-33.92, 18.42],
  "tanzania-zanzibar": [-6.16, 39.2],
  bali: [-8.65, 115.22],
  philippines: [14.6, 120.98],
  china: [39.9, 116.4],
  india: [28.61, 77.21],
  indonesia: [-6.21, 106.85],
  japan: [35.68, 139.69],
  "south-korea": [37.57, 126.98],
  malaysia: [3.14, 101.69],
  maldives: [4.17, 73.51],
  "sri-lanka": [6.93, 79.86],
  thailand: [13.76, 100.5],
  vietnam: [21.03, 105.85],
  cambodia: [13.36, 103.86], // Siem Reap (Angkor)
  nepal: [27.72, 85.32],
  argentina: [-34.6, -58.38],
  brazil: [-22.91, -43.17], // Rio de Janeiro
  colombia: [4.71, -74.07],
  peru: [-13.16, -72.55], // Machu Picchu / Cusco
  chile: [-33.45, -70.67],
  bolivia: [-16.5, -68.15],
  cuba: [23.11, -82.37],
  mexico: [19.43, -99.13],
  "dominican-republic": [18.49, -69.93],
  panama: [8.98, -79.52],
  "costa-rica": [9.93, -84.08],
  israel: [31.77, 35.21],
  jordan: [30.33, 35.44], // Petra
  oman: [23.59, 58.41],
  qatar: [25.29, 51.53],
  "united-arab-emirates": [25.2, 55.27],
  canada: [51.18, -115.57], // Banff
  "united-states": [40.71, -74.01],
  italy: [41.9, 12.5],
  spain: [40.42, -3.7],
  france: [48.85, 2.35],
  turkey: [41.01, 28.98],
  greece: [37.98, 23.73],
  netherlands: [52.37, 4.9],
  iceland: [64.15, -21.94],
  germany: [52.52, 13.4],
  portugal: [38.72, -9.14],
  russia: [55.76, 37.62],
  cyprus: [35.19, 33.38],
  malta: [35.9, 14.51],
};

async function main() {
  const force = process.argv.includes("--force");
  const rows = await db
    .select({ id: destinations.id, slug: destinations.slug, lat: destinations.lat })
    .from(destinations);

  let updated = 0;
  const missing: string[] = [];
  for (const r of rows) {
    const coord = COORDS[r.slug];
    if (!coord) {
      missing.push(r.slug);
      continue;
    }
    if (r.lat != null && !force) continue;
    await db
      .update(destinations)
      .set({ lat: coord[0], lng: coord[1] })
      .where(force ? eq(destinations.id, r.id) : and(eq(destinations.id, r.id), isNull(destinations.lat)));
    updated++;
  }

  console.log(`[backfill-coords] updated ${updated} destination(s).`);
  if (missing.length) console.log(`[backfill-coords] no coords for: ${missing.join(", ")}`);
  process.exit(0);
}

main();
