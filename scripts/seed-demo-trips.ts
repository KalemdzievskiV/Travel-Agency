import { config } from "dotenv";
config({ path: ".env.local" });

import { and, eq, inArray } from "drizzle-orm";
import { db } from "../src/db";
import { trips, destinations, tripDestinations, filterGroups, filterOptions, tripFilterOptions } from "../src/db/schema";

/**
 * Seed a handful of demo trips with structured (geocoded) itineraries, galleries
 * and linked destinations so the trip pages and finder look full. Idempotent —
 * upserts by slug. Run: `npm run db:seed-demo-trips`.
 */
const img = (s: string) => `https://picsum.photos/seed/${s}/1600/1100`;
const DEP = ["12 Apr 2026", "10 May 2026", "13 Sep 2026", "11 Oct 2026"];

// Generic "important notes" for the demo trips.
const INCLUDED = [
  "All accommodation and daily breakfast",
  "Private transfers and internal flights",
  "Expert local guides and entrance fees",
  "24/7 on-the-ground support",
];
const NOT_INCLUDED = [
  "International flights to and from your gateway",
  "Travel insurance",
  "Lunches, dinners and drinks unless noted",
  "Personal expenses, tips and gratuities",
];
const VISA = "A valid passport with at least six months' validity is required. Visa requirements depend on your nationality — we'll confirm the details and any entry conditions for your specific itinerary.";

type DemoTrip = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  durationDays: number;
  priceFrom: string;
  feelings: string[];
  gallery: string[];
  itinerary: string[];
  dests: string[];
  who?: string[];
};

const TRIPS: DemoTrip[] = [
  {
    slug: "greece-athens-cyclades",
    title: "Greece: Athens & the Cyclades",
    summary: "Ancient Athens, then a slow island-hop through the whitewashed Cyclades by fast ferry and private boat.",
    description: "The Acropolis at dawn, then the sea. We string together three contrasting islands — dramatic Santorini, easygoing Naxos and volcanic Milos — with the ferries, transfers and tables handled.",
    durationDays: 10,
    priceFrom: "€5,400 per person",
    feelings: ["Wonder", "Freedom"],
    gallery: ["greece-athens", "greece-santorini", "greece-naxos", "greece-milos"],
    itinerary: [
      "Days 1–2 Athens, Greece | 37.9838 | 23.7275 | The Acropolis before the crowds, a Plaka dinner",
      "Days 3–5 Santorini, Greece | 36.3932 | 25.4615 | Caldera views, a private sunset sail",
      "Days 6–7 Naxos, Greece | 37.1036 | 25.3766 | Mountain villages, long beach lunches",
      "Days 8–9 Milos, Greece | 36.7460 | 24.4269 | Sarakiniko's moonscape by boat",
    ],
    dests: ["greece"],
    who: ["couples"],
  },
  {
    slug: "japan-tokyo-to-kyoto",
    title: "Japan: Tokyo to Kyoto",
    summary: "Neon Tokyo, the hot-spring hills of Hakone, and the temples and tea houses of Kyoto by bullet train.",
    description: "A first taste of Japan, done properly — the energy of Tokyo, a ryokan in Hakone with Fuji views, and Kyoto's quiet gardens, joined by the shinkansen.",
    durationDays: 12,
    priceFrom: "€8,200 per person",
    feelings: ["Wonder", "Contentment"],
    gallery: ["japan-tokyo", "japan-hakone", "japan-kyoto", "japan-osaka"],
    itinerary: [
      "Days 1–3 Tokyo, Japan | 35.6762 | 139.6503 | Tsukiji breakfast, back-street izakayas, a private guide",
      "Days 4–5 Hakone, Japan | 35.2324 | 139.1069 | A ryokan, onsen and Fuji on a clear morning",
      "Days 6–9 Kyoto, Japan | 35.0116 | 135.7681 | Temples at dawn, a tea ceremony, Arashiyama",
      "Days 10–11 Osaka, Japan | 34.6937 | 135.5023 | Street food and a farewell night out",
    ],
    dests: ["japan"],
  },
  {
    slug: "thailand-north-and-islands",
    title: "Thailand: Bangkok, Chiang Mai & the Islands",
    summary: "Temples and markets in Bangkok, elephants and hill country in the north, then barefoot island days.",
    description: "Thailand's full range in one trip — the buzz of Bangkok, Chiang Mai's temples and ethical elephant sanctuary, and a soft landing on the Andaman coast.",
    durationDays: 13,
    priceFrom: "€4,600 per person",
    feelings: ["Freedom", "Revitalised"],
    gallery: ["thailand-bangkok", "thailand-chiangmai", "thailand-krabi", "thailand-samui"],
    itinerary: [
      "Days 1–2 Bangkok, Thailand | 13.7563 | 100.5018 | Grand Palace, a long-tail canal tour, rooftop dinner",
      "Days 3–5 Chiang Mai, Thailand | 18.7883 | 98.9853 | Temples, an ethical elephant sanctuary, night markets",
      "Days 6–9 Krabi, Thailand | 8.0863 | 98.9063 | Limestone cliffs, sea kayaking, island-hopping",
      "Days 10–12 Koh Samui, Thailand | 9.5120 | 100.0136 | Nothing but the beach",
    ],
    dests: ["thailand"],
    who: ["families"],
  },
  {
    slug: "iceland-ring-road",
    title: "Iceland: The Ring Road",
    summary: "A self-driven loop of the whole island — waterfalls, glaciers, black beaches and the far north.",
    description: "The complete circle of Iceland at your own pace, with the route, remarkable stays and every stop planned — from the south coast's waterfalls to the fjords of the north.",
    durationDays: 9,
    priceFrom: "€5,900 per person",
    feelings: ["Wonder", "Challenged"],
    gallery: ["iceland-reykjavik", "iceland-vik", "iceland-hofn", "iceland-akureyri"],
    itinerary: [
      "Days 1–2 Reykjavik, Iceland | 64.1466 | -21.9426 | Settle in; the Golden Circle",
      "Days 3–4 Vík, Iceland | 63.4194 | -19.0060 | Black-sand beaches and south-coast falls",
      "Days 5–6 Höfn, Iceland | 64.2539 | -15.2082 | Glacier lagoon and a boat among the icebergs",
      "Days 7–8 Akureyri, Iceland | 65.6835 | -18.0878 | Whales, geothermal baths, the quiet north",
    ],
    dests: ["iceland"],
  },
  {
    slug: "egypt-nile-and-pyramids",
    title: "Egypt: The Nile & the Pyramids",
    summary: "Cairo's pyramids, a private Nile cruise between Luxor and Aswan, and the temples of Abu Simbel.",
    description: "Ancient Egypt without the crowds — the Giza plateau at first light, a slow sail down the Nile, and a dawn flight to the great temples of Abu Simbel.",
    durationDays: 9,
    priceFrom: "€4,300 per person",
    feelings: ["Wonder", "Contentment"],
    gallery: ["egypt-cairo", "egypt-luxor", "egypt-aswan", "egypt-abusimbel"],
    itinerary: [
      "Days 1–2 Cairo, Egypt | 30.0444 | 31.2357 | The Pyramids and the new Grand Egyptian Museum",
      "Days 3–5 Luxor, Egypt | 25.6872 | 32.6396 | Karnak, the Valley of the Kings, a balloon at dawn",
      "Days 6–7 Aswan, Egypt | 24.0889 | 32.8998 | A felucca on the Nile, Philae temple",
      "Day 8 Abu Simbel, Egypt | 22.3372 | 31.6258 | The great temples of Ramesses II",
    ],
    dests: ["egypt"],
  },
  {
    slug: "egypt-desert-sinai-red-sea",
    title: "Egypt: Desert, Sinai & the Red Sea",
    summary: "The Pyramids, a night under the stars in the White Desert, a dawn climb up Mount Sinai and Red Sea reefs.",
    description: "A wilder side of Egypt — Cairo's icons, the surreal chalk formations of the White Desert, the monastery and summit of Mount Sinai, and finishing on the coral reefs of the Red Sea.",
    durationDays: 10,
    priceFrom: "€4,800 per person",
    feelings: ["Challenged", "Freedom"],
    gallery: ["egypt-cairo2", "egypt-whitedesert", "egypt-sinai", "egypt-redsea"],
    itinerary: [
      "Days 1–2 Cairo, Egypt | 30.0444 | 31.2357 | The Pyramids and the Grand Egyptian Museum",
      "Days 3–4 Bahariya Oasis, Egypt | 28.3480 | 28.8590 | Camp in the White Desert amid its chalk formations",
      "Days 5–6 Mount Sinai, Egypt | 28.5560 | 33.9750 | A pre-dawn summit and Saint Catherine's Monastery",
      "Days 7–9 Sharm El Sheikh, Egypt | 27.9158 | 34.3300 | Red Sea diving, snorkelling and beach days",
    ],
    dests: ["egypt"],
    who: ["couples"],
  },
  {
    slug: "vietnam-north-to-south",
    title: "Vietnam: North to South",
    summary: "Hanoi's old quarter, an overnight on Halong Bay, lantern-lit Hoi An and buzzing Ho Chi Minh City.",
    description: "The length of Vietnam, thoughtfully paced — the north's culture and karst scenery, Hoi An's tailor shops and beaches, and the energy of the south.",
    durationDays: 12,
    priceFrom: "€4,100 per person",
    feelings: ["Freedom", "Wonder"],
    gallery: ["vietnam-hanoi", "vietnam-halong", "vietnam-hoian", "vietnam-hcmc"],
    itinerary: [
      "Days 1–2 Hanoi, Vietnam | 21.0278 | 105.8342 | Old-quarter street food and a water-puppet show",
      "Days 3–4 Halong Bay, Vietnam | 20.9101 | 107.1839 | An overnight cruise among the limestone islands",
      "Days 5–7 Hoi An, Vietnam | 15.8801 | 108.3380 | Lantern-lit lanes, a cooking class, the beach",
      "Days 8–10 Ho Chi Minh City, Vietnam | 10.8231 | 106.6297 | Markets, museums and the Mekong",
    ],
    dests: ["vietnam"],
    who: ["couples"],
  },
];

async function main() {
  // Resolve destination slugs -> ids.
  const allDests = await db.select({ id: destinations.id, slug: destinations.slug }).from(destinations);
  const destId = new Map(allDests.map((d) => [d.slug, d.id]));

  // Resolve "who" option ids (group key "who").
  const whoGroup = (await db.select().from(filterGroups).where(eq(filterGroups.key, "who")))[0];
  const whoOptId = new Map<string, number>();
  if (whoGroup) {
    const opts = await db.select().from(filterOptions).where(eq(filterOptions.groupId, whoGroup.id));
    for (const o of opts) whoOptId.set(o.key, o.id);
  }

  let order = 100;
  for (const t of TRIPS) {
    const values = {
      slug: t.slug,
      title: t.title,
      summary: t.summary,
      description: t.description,
      durationDays: t.durationDays,
      priceFrom: t.priceFrom,
      image: img(t.gallery[0]),
      images: t.gallery.map(img),
      feelings: t.feelings,
      itinerary: t.itinerary,
      departures: DEP,
      included: INCLUDED,
      notIncluded: NOT_INCLUDED,
      visaNotes: VISA,
      published: true,
      sortOrder: order++,
      updatedAt: new Date(),
    };

    const existing = (await db.select({ id: trips.id }).from(trips).where(eq(trips.slug, t.slug)))[0];
    let tripId: number;
    if (existing) {
      await db.update(trips).set(values).where(eq(trips.id, existing.id));
      tripId = existing.id;
    } else {
      tripId = (await db.insert(trips).values(values).returning({ id: trips.id }))[0].id;
    }

    // Linked destinations, in order.
    await db.delete(tripDestinations).where(eq(tripDestinations.tripId, tripId));
    const links = t.dests.map((slug, i) => ({ tripId, destinationId: destId.get(slug), position: i })).filter((l) => l.destinationId != null) as { tripId: number; destinationId: number; position: number }[];
    if (links.length) await db.insert(tripDestinations).values(links);

    // "Who" tags.
    if (t.who?.length && whoGroup) {
      const optIds = t.who.map((k) => whoOptId.get(k)).filter((n): n is number => n != null);
      if (optIds.length) {
        await db.delete(tripFilterOptions).where(and(eq(tripFilterOptions.tripId, tripId), inArray(tripFilterOptions.optionId, optIds)));
        await db.insert(tripFilterOptions).values(optIds.map((optionId) => ({ tripId, optionId })));
      }
    }

    console.log(`  ✓ ${t.slug} (${t.dests.join(", ") || "no dest"})`);
  }
  console.log(`Seeded ${TRIPS.length} demo trips.`);
  process.exit(0);
}

main();
