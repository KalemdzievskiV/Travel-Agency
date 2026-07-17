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

  // ── Egypt ────────────────────────────────────────────────────
  {
    slug: "old-cataract-aswan", name: "Sofitel Legend Old Cataract", teaser: "A rose-red palace above the First Cataract.",
    description: "Agatha Christie's Nile hideaway, looking across the water to Elephantine Island and the desert beyond. Terrace tea as the feluccas drift past.",
    dest: "egypt", lat: 24.0836, lng: 32.8890, priceFrom: "€420 / night", stars: 5, style: ["Historic", "Riverside"],
    gallery: ["hotel-cataract-1", "hotel-cataract-2", "hotel-cataract-3"],
  },
  {
    slug: "al-moudira-luxor", name: "Al Moudira", teaser: "A domed retreat on Luxor's quiet west bank.",
    description: "Hand-painted rooms around a walled garden, minutes from the Valley of the Kings but a world away from the crowds.",
    dest: "egypt", lat: 25.7188, lng: 32.6100, priceFrom: "€260 / night", stars: 4, style: ["Boutique", "Garden"],
    gallery: ["hotel-moudira-1", "hotel-moudira-2"],
  },

  // ── Ethiopia ─────────────────────────────────────────────────
  {
    slug: "limalimo-lodge", name: "Limalimo Lodge", teaser: "A cliff-edge perch over the Simien Mountains.",
    description: "Built into the escarpment with the highlands falling away below — gelada troops at dawn and some of the finest walking in Africa.",
    dest: "ethiopia", lat: 13.2500, lng: 38.0000, priceFrom: "€240 / night", stars: 4, style: ["Mountain", "Lodge"],
    gallery: ["hotel-limalimo-1", "hotel-limalimo-2", "hotel-limalimo-3"],
  },
  {
    slug: "gheralta-lodge", name: "Gheralta Lodge", teaser: "Stone cottages beneath Tigray's rock churches.",
    description: "A low, quiet lodge facing the Gheralta massif, where centuries-old churches are still cut into the cliffs above.",
    dest: "ethiopia", lat: 13.9167, lng: 39.0500, priceFrom: "€180 / night", stars: 4, style: ["Lodge", "Historic"],
    gallery: ["hotel-gheralta-1", "hotel-gheralta-2"],
  },
  {
    slug: "kuriftu-bishoftu", name: "Kuriftu Resort & Spa", teaser: "Crater-lake calm an hour from Addis.",
    description: "Terraced gardens dropping to Lake Bishoftu, with a spa built for slow mornings before or after the highlands.",
    dest: "ethiopia", lat: 8.7500, lng: 38.9800, priceFrom: "€160 / night", stars: 4, style: ["Spa", "Lakeside"],
    gallery: ["hotel-kuriftu-1", "hotel-kuriftu-2"],
  },

  // ── Kenya ────────────────────────────────────────────────────
  {
    slug: "angama-mara", name: "Angama Mara", teaser: "Suspended above the Mara Triangle.",
    description: "Glass-fronted tents hung on the edge of the Great Rift escarpment, with the migration crossing the plains a thousand feet below.",
    dest: "kenya", lat: -1.2833, lng: 35.0333, priceFrom: "€1,250 / night", stars: 5, style: ["Safari", "Sweeping views"],
    gallery: ["hotel-angama-1", "hotel-angama-2", "hotel-angama-3"],
  },
  {
    slug: "giraffe-manor", name: "Giraffe Manor", teaser: "Breakfast with the Rothschild's giraffe.",
    description: "A 1930s ivy-clad manor on the edge of Nairobi, where the resident herd puts its head through the window at breakfast.",
    dest: "kenya", lat: -1.3752, lng: 36.7447, priceFrom: "€900 / night", stars: 5, style: ["Historic", "Wildlife"],
    gallery: ["hotel-giraffe-1", "hotel-giraffe-2"],
  },
  {
    slug: "segera-retreat", name: "Segera Retreat", teaser: "Art and wilderness on the Laikipia plateau.",
    description: "Timber villas set in botanical gardens across a 50,000-acre conservancy, with Mount Kenya on the horizon.",
    dest: "kenya", lat: 0.2333, lng: 36.8500, priceFrom: "€1,100 / night", stars: 5, style: ["Safari", "Conservation"],
    gallery: ["hotel-segera-1", "hotel-segera-2"],
  },

  // ── Mauritius ────────────────────────────────────────────────
  {
    slug: "one-only-le-saint-geran", name: "One&Only Le Saint Géran", teaser: "A private peninsula on the east coast.",
    description: "Palms, a mile of white sand and water on three sides — the island's grande dame, quietly reinvented.",
    dest: "mauritius", lat: -20.1000, lng: 57.7833, priceFrom: "€780 / night", stars: 5, style: ["Beachfront", "Family"],
    gallery: ["hotel-saintgeran-1", "hotel-saintgeran-2", "hotel-saintgeran-3"],
  },
  {
    slug: "constance-prince-maurice", name: "Constance Prince Maurice", teaser: "Villas floating over a still lagoon.",
    description: "Stilted suites above the water on a sheltered north-east bay, with a fishing village and mangroves for neighbours.",
    dest: "mauritius", lat: -20.0833, lng: 57.7500, priceFrom: "€620 / night", stars: 5, style: ["Overwater", "Adults-only"],
    gallery: ["hotel-princemaurice-1", "hotel-princemaurice-2"],
  },
  {
    slug: "lux-le-morne", name: "LUX* Le Morne", teaser: "Under the shadow of Le Morne Brabant.",
    description: "A long west-facing beach beneath the UNESCO-listed basalt monolith — kite-surfing water and the island's best sunsets.",
    dest: "mauritius", lat: -20.4500, lng: 57.3167, priceFrom: "€430 / night", stars: 5, style: ["Beachfront", "Watersports"],
    gallery: ["hotel-lemorne-1", "hotel-lemorne-2"],
  },

  // ── Morocco ──────────────────────────────────────────────────
  {
    slug: "la-mamounia", name: "La Mamounia", teaser: "Marrakech's legend, behind twelve-foot walls.",
    description: "Two hundred years of gardens inside the ramparts — olive groves, orange trees and a hush you can hear the moment the door closes.",
    dest: "morocco", lat: 31.6225, lng: -7.9989, priceFrom: "€700 / night", stars: 5, style: ["Historic", "Garden"],
    gallery: ["hotel-mamounia-1", "hotel-mamounia-2", "hotel-mamounia-3"],
  },
  {
    slug: "royal-mansour-marrakech", name: "Royal Mansour", teaser: "Your own riad, reached by hidden corridors.",
    description: "Fifty-three private riads with rooftop plunge pools, served through a tunnel network so staff are never seen arriving.",
    dest: "morocco", lat: 31.6250, lng: -8.0000, priceFrom: "€1,600 / night", stars: 5, style: ["Riad", "Private"],
    gallery: ["hotel-mansour-1", "hotel-mansour-2"],
  },
  {
    slug: "kasbah-tamadot", name: "Kasbah Tamadot", teaser: "A Berber kasbah high in the Atlas.",
    description: "Richard Branson's mountain retreat above the Asni valley — tented suites, a heated pool and the High Atlas at the end of the terrace.",
    dest: "morocco", lat: 31.2000, lng: -7.8500, priceFrom: "€560 / night", stars: 5, style: ["Mountain", "Boutique"],
    gallery: ["hotel-tamadot-1", "hotel-tamadot-2"],
  },
];

async function main() {
  const allDests = await db.select({ id: destinations.id, slug: destinations.slug }).from(destinations);
  const destId = new Map(allDests.map((d) => [d.slug, d.id]));

  // A typo'd destination slug would otherwise insert a hotel with a null
  // destination — it'd vanish from every page rather than fail. Catch it here.
  const missing = [...new Set(HOTELS.map((h) => h.dest))].filter((d) => !destId.has(d));
  if (missing.length > 0) {
    console.error(`Unknown destination slug(s): ${missing.join(", ")} — aborting.`);
    process.exit(1);
  }

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
