import { config } from "dotenv";
config({ path: ".env.local" });

import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { hotels, destinations } from "../src/db/schema";

/**
 * Seed a few curated hotels tied to destinations so the "Where to stay" section
 * has content. Idempotent — upserts by slug. Run: `npm run db:seed-hotels`.
 */
const img = (s: string) => `https://picsum.photos/seed/${s}/1600/1100`;

type DemoHotel = {
  slug: string;
  name: string;
  teaser: string;
  description: string;
  dest: string;
  lat: number;
  lng: number;
  priceFrom: string;
  stars: number;
  style: string[];
  gallery: string[];
};

const HOTELS: DemoHotel[] = [
  {
    slug: "amanzoe-greece", name: "Amanzoe", teaser: "A hilltop sanctuary above the Peloponnese coast.",
    description: "Columns, pools and long views to the Aegean — a serene, temple-like retreat a short drive from the sea.",
    dest: "greece", lat: 37.3115, lng: 23.1560, priceFrom: "€1,400 / night", stars: 5, style: ["Boutique", "Sea views"],
    gallery: ["hotel-amanzoe-1", "hotel-amanzoe-2", "hotel-amanzoe-3"],
  },
  {
    slug: "grace-santorini", name: "Grace Santorini", teaser: "Caldera views and a cliff-edge infinity pool.",
    description: "Whitewashed suites tumbling down the caldera at Imerovigli, with some of the best sunsets on the island.",
    dest: "greece", lat: 36.4319, lng: 25.4270, priceFrom: "€900 / night", stars: 5, style: ["Adults-only", "Sea views"],
    gallery: ["hotel-grace-1", "hotel-grace-2"],
  },
  {
    slug: "aman-tokyo", name: "Aman Tokyo", teaser: "A calm eyrie above the city, in Otemachi.",
    description: "A soaring stone-and-washi lobby on the 33rd floor, with an onsen-style spa and skyline baths.",
    dest: "japan", lat: 35.6870, lng: 139.7660, priceFrom: "¥180,000 / night", stars: 5, style: ["City", "Spa"],
    gallery: ["hotel-amantokyo-1", "hotel-amantokyo-2", "hotel-amantokyo-3"],
  },
  {
    slug: "hoshinoya-kyoto", name: "Hoshinoya Kyoto", teaser: "A riverside ryokan reached only by boat.",
    description: "A hidden retreat along the Ōi River in Arashiyama — tatami rooms, kaiseki dinners and maple-lined walks.",
    dest: "japan", lat: 35.0130, lng: 135.6720, priceFrom: "¥90,000 / night", stars: 5, style: ["Ryokan", "Riverside"],
    gallery: ["hotel-hoshinoya-1", "hotel-hoshinoya-2"],
  },
  {
    slug: "the-retreat-blue-lagoon", name: "The Retreat at Blue Lagoon", teaser: "Suites carved into an 800-year-old lava field.",
    description: "A subterranean spa and private lagoon beside Iceland's famous geothermal waters, minutes from Keflavík.",
    dest: "iceland", lat: 63.8804, lng: -22.4495, priceFrom: "€1,100 / night", stars: 5, style: ["Spa", "Geothermal"],
    gallery: ["hotel-retreat-1", "hotel-retreat-2"],
  },
  {
    slug: "four-seasons-nile-cairo", name: "Four Seasons Cairo at Nile Plaza", teaser: "Nile-side calm in the heart of Cairo.",
    description: "Gardens, pools and river views a short drive from the Pyramids and the Grand Egyptian Museum.",
    dest: "egypt", lat: 30.0360, lng: 31.2290, priceFrom: "€350 / night", stars: 5, style: ["City", "Riverside"],
    gallery: ["hotel-fscairo-1", "hotel-fscairo-2"],
  },
];

async function main() {
  const allDests = await db.select({ id: destinations.id, slug: destinations.slug }).from(destinations);
  const destId = new Map(allDests.map((d) => [d.slug, d.id]));

  let order = 0;
  for (const h of HOTELS) {
    const values = {
      slug: h.slug, name: h.name, teaser: h.teaser, description: h.description,
      destinationId: destId.get(h.dest) ?? null,
      lat: h.lat, lng: h.lng, image: img(h.gallery[0]), images: h.gallery.map(img),
      priceFrom: h.priceFrom, stars: h.stars, style: h.style,
      published: true, sortOrder: order++, updatedAt: new Date(),
    };
    const existing = (await db.select({ id: hotels.id }).from(hotels).where(eq(hotels.slug, h.slug)))[0];
    if (existing) await db.update(hotels).set(values).where(eq(hotels.id, existing.id));
    else await db.insert(hotels).values(values);
    console.log(`  ✓ ${h.slug} (${h.dest})`);
  }
  console.log(`Seeded ${HOTELS.length} hotels.`);
  process.exit(0);
}

main();
