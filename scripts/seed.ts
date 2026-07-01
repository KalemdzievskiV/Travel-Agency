/**
 * Seeds the database from the in-repo content files so the live site looks
 * identical after the DB switch. Idempotent: clears the content tables first.
 * Run with: npm run db:seed
 */
import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { db } = await import("../src/db/index.ts");
  const s = await import("../src/db/schema.ts");
  const { destinations } = await import("../src/content/destinations.ts");
  const { experiences } = await import("../src/content/experiences.ts");
  const { testimonials } = await import("../src/content/testimonials.ts");
  const { slugify } = await import("../src/lib/slug.ts");

  // Clear (respect FKs: join table first).
  await db.delete(s.tripDestinations);
  await db.delete(s.trips);
  await db.delete(s.destinations);
  await db.delete(s.experiences);
  await db.delete(s.testimonials);
  await db.delete(s.regions);

  // Regions (grouping for the mega-menu / listing), in content order.
  const regionGrads = [
    "linear-gradient(135deg,#4f6f57,#1d2c20)",
    "linear-gradient(135deg,#3f6f7a,#1d3c45)",
    "linear-gradient(135deg,#7a6a52,#2c2418)",
    "linear-gradient(135deg,#0c747e,#0e2a33)",
    "linear-gradient(135deg,#6a4f6a,#241a24)",
    "linear-gradient(135deg,#5a6b86,#2a3550)",
    "linear-gradient(135deg,#15709b,#0e2a33)",
  ];
  const regionLabels = [...new Set(destinations.map((d) => d.region))];
  const insertedRegions = await db
    .insert(s.regions)
    .values(
      regionLabels.map((label, i) => ({
        slug: slugify(label),
        label,
        sortOrder: i,
        image: `https://picsum.photos/seed/bookit-region-${slugify(label)}/1200/1400`,
        grad: regionGrads[i % regionGrads.length],
      })),
    )
    .returning({ id: s.regions.id, label: s.regions.label });
  const regionIdByLabel = Object.fromEntries(insertedRegions.map((r) => [r.label, r.id]));
  console.log(`  regions: ${insertedRegions.length}`);

  // Destinations
  const insertedDestinations = await db
    .insert(s.destinations)
    .values(
      destinations.map((d, i) => ({
        slug: d.slug,
        region: d.region,
        regionId: regionIdByLabel[d.region] ?? null,
        title: d.title,
        teaser: d.teaser,
        intro: d.intro,
        badge: d.badge,
        whenToGo: d.whenToGo,
        image: d.image ?? null,
        grad: d.grad ?? null,
        highlights: d.highlights,
        bestMonths: d.bestMonths,
        feelings: d.feelings,
        sortOrder: i,
      })),
    )
    .returning({ id: s.destinations.id, slug: s.destinations.slug });
  console.log(`  destinations: ${insertedDestinations.length}`);

  // Experiences
  await db.insert(s.experiences).values(
    experiences.map((e, i) => ({
      slug: e.slug,
      eyebrow: e.eyebrow,
      title: e.title,
      body: e.body,
      image: e.image ?? null,
      grad: e.grad ?? null,
      sortOrder: i,
    })),
  );
  console.log(`  experiences: ${experiences.length}`);

  // Testimonials
  await db.insert(s.testimonials).values(
    testimonials.map((t, i) => ({
      quote: t.quote,
      who: t.who,
      where: t.where,
      sortOrder: i,
    })),
  );
  console.log(`  testimonials: ${testimonials.length}`);

  // One or two sellable trips per continent, linked to the new destinations.
  const bySlug = Object.fromEntries(insertedDestinations.map((d) => [d.slug, d.id]));
  const tripGrads = [
    "linear-gradient(135deg,#3f6f7a,#1d3c45)",
    "linear-gradient(135deg,#7a6a52,#2c2418)",
    "linear-gradient(135deg,#5a6b86,#2a3550)",
    "linear-gradient(135deg,#4f6f57,#1d2c20)",
    "linear-gradient(135deg,#6a4f6a,#241a24)",
    "linear-gradient(135deg,#0c747e,#0e2a33)",
  ];
  const dep = ["12 May 2026", "9 Jun 2026", "14 Sep 2026"];

  const tripSeeds: {
    slug: string;
    title: string;
    summary: string;
    description: string;
    durationDays: number;
    priceFrom: string;
    feelings: string[];
    itinerary: string[];
    dests: string[];
  }[] = [
    // Africa
    {
      slug: "kenya-zanzibar-safari",
      title: "Safari & Spice: Kenya & Zanzibar",
      summary: "The great migration, then the warm shallows of the Indian Ocean.",
      description:
        "Big-cat country on the Masai Mara, then an unwinding on the spice-island shores of Zanzibar — the classic safari-and-sea pairing, planned around you.",
      durationDays: 10,
      priceFrom: "€6,800 per person",
      feelings: ["Wonder", "Freedom"],
      itinerary: [
        "Days 1–5 · Kenya — game drives on the Mara, dawn balloon, private guides",
        "Days 6–10 · Zanzibar — Stone Town, spice farms and barefoot beach days",
      ],
      dests: ["kenya", "tanzania-zanzibar"],
    },
    {
      slug: "morocco-souks-to-sahara",
      title: "Morocco: Souks to Sahara",
      summary: "Marrakech medinas, the Atlas mountains and a night in the dunes.",
      description:
        "From the colour and clamour of Marrakech over the High Atlas to a camp beneath the stars on the edge of the Sahara.",
      durationDays: 8,
      priceFrom: "€3,200 per person",
      feelings: ["Wonder", "Freedom"],
      itinerary: [
        "Days 1–3 · Marrakech — the souks, gardens and rooftop dinners",
        "Days 4–5 · High Atlas — Berber villages and mountain walks",
        "Days 6–8 · Sahara — a luxury desert camp and sunrise over the dunes",
      ],
      dests: ["morocco"],
    },
    // Asia
    {
      slug: "japan-in-depth",
      title: "Japan in Depth",
      summary: "Neon Tokyo, old Kyoto and a mountain onsen, at your own pace.",
      description:
        "A first, full immersion in Japan — the energy of Tokyo, the temples and gardens of Kyoto, and a quiet ryokan retreat in the mountains.",
      durationDays: 12,
      priceFrom: "€7,400 per person",
      feelings: ["Wonder", "Contentment"],
      itinerary: [
        "Days 1–4 · Tokyo — markets, back-street dinners and design",
        "Days 5–8 · Kyoto — temples at dawn, tea houses and craft studios",
        "Days 9–12 · Hakone & beyond — onsen, Mount Fuji views and the shinkansen home",
      ],
      dests: ["japan"],
    },
    {
      slug: "islands-and-temples",
      title: "Islands & Temples: Thailand & Bali",
      summary: "Temple towns and turquoise bays across two island worlds.",
      description:
        "The best of Thailand and Bali in one unhurried loop — culture and cuisine, then rice terraces and the sea.",
      durationDays: 12,
      priceFrom: "€5,600 per person",
      feelings: ["Contentment", "Freedom"],
      itinerary: [
        "Days 1–6 · Thailand — Bangkok, the north and a quiet southern bay",
        "Days 7–12 · Bali — Ubud's rice terraces, temples and coast",
      ],
      dests: ["thailand", "bali"],
    },
    // South America
    {
      slug: "peru-andes-to-amazon",
      title: "Peru: Andes to Amazon",
      summary: "Machu Picchu, the Sacred Valley and the edge of the rainforest.",
      description:
        "The great Andean journey — Cusco and the Sacred Valley, sunrise at Machu Picchu, then down into the Amazon.",
      durationDays: 11,
      priceFrom: "€5,900 per person",
      feelings: ["Challenged", "Wonder"],
      itinerary: [
        "Days 1–3 · Cusco & the Sacred Valley — markets, ruins and acclimatising",
        "Days 4–6 · Machu Picchu — the train up and a sunrise on the citadel",
        "Days 7–11 · Amazon — a jungle lodge, river trips and wildlife",
      ],
      dests: ["peru", "bolivia"],
    },
    {
      slug: "patagonia-explorer",
      title: "Patagonia Explorer",
      summary: "Granite towers, glaciers and the wide end of the world.",
      description:
        "Across the Argentine and Chilean ends of Patagonia — Torres del Paine, the great glaciers and endless sky.",
      durationDays: 12,
      priceFrom: "€8,200 per person",
      feelings: ["Freedom", "Challenged"],
      itinerary: [
        "Days 1–5 · Argentine Patagonia — El Calafate and the Perito Moreno glacier",
        "Days 6–12 · Chilean Patagonia — Torres del Paine walks and estancia nights",
      ],
      dests: ["argentina", "chile"],
    },
    // Caribbean & Central America
    {
      slug: "mexico-yucatan-and-beyond",
      title: "Mexico: Yucatán & Beyond",
      summary: "Maya ruins, cenotes and a slow Caribbean coast.",
      description:
        "The Yucatán at its best — ancient cities, swimming in cenotes and a stretch of quiet coastline to finish.",
      durationDays: 9,
      priceFrom: "€3,900 per person",
      feelings: ["Wonder", "Freedom"],
      itinerary: [
        "Days 1–3 · Mexico City — museums, markets and great food",
        "Days 4–9 · Yucatán — Chichén Itzá, cenotes and the coast",
      ],
      dests: ["mexico"],
    },
    {
      slug: "costa-rica-coast-to-cloud",
      title: "Costa Rica: Coast to Cloud Forest",
      summary: "Volcanoes, cloud forest and pura vida on two coasts.",
      description:
        "A nature-first journey through Costa Rica — volcanoes and hanging bridges, cloud forest wildlife and a Pacific finish.",
      durationDays: 10,
      priceFrom: "€4,600 per person",
      feelings: ["Revitalised", "Freedom"],
      itinerary: [
        "Days 1–4 · Arenal — volcano, hot springs and hanging bridges",
        "Days 5–7 · Monteverde — cloud-forest walks and wildlife",
        "Days 8–10 · Pacific coast — beaches and a slow goodbye",
      ],
      dests: ["costa-rica", "panama"],
    },
    // Middle East
    {
      slug: "jordan-petra-and-wadi-rum",
      title: "Jordan: Petra & Wadi Rum",
      summary: "The rose-red city and a night under the desert stars.",
      description:
        "Jordan's greatest hits, unhurried — Petra by day and candlelight, the red sands of Wadi Rum and a float in the Dead Sea.",
      durationDays: 7,
      priceFrom: "€3,100 per person",
      feelings: ["Wonder", "Challenged"],
      itinerary: [
        "Days 1–2 · Amman & Jerash — Roman ruins and city life",
        "Days 3–4 · Petra — the Siq, the Treasury and Petra by night",
        "Days 5–7 · Wadi Rum & the Dead Sea — a desert camp, then a restful finish",
      ],
      dests: ["jordan"],
    },
    {
      slug: "emirates-and-oman",
      title: "Emirates & Oman",
      summary: "Skyline glamour, then a gentler, older Arabia.",
      description:
        "Dubai and Abu Dhabi's modern dazzle paired with Oman's wadis, forts and dunes — two very different sides of the Gulf.",
      durationDays: 9,
      priceFrom: "€4,800 per person",
      feelings: ["Contentment", "Freedom"],
      itinerary: [
        "Days 1–4 · UAE — Dubai, Abu Dhabi and a desert night",
        "Days 5–9 · Oman — Muscat, the wadis and the Wahiba Sands",
      ],
      dests: ["united-arab-emirates", "oman"],
    },
    // North America
    {
      slug: "canadian-rockies",
      title: "The Canadian Rockies",
      summary: "Turquoise lakes, big peaks and the Icefields Parkway.",
      description:
        "Banff and Jasper at their most spectacular — Lake Louise, glacier walks and the drive of a lifetime between them.",
      durationDays: 9,
      priceFrom: "€5,200 per person",
      feelings: ["Freedom", "Revitalised"],
      itinerary: [
        "Days 1–4 · Banff — Lake Louise, Moraine and mountain trails",
        "Days 5–9 · Jasper — the Icefields Parkway, glaciers and wildlife",
      ],
      dests: ["canada"],
    },
    {
      slug: "the-american-west",
      title: "The American West",
      summary: "Red-rock canyons, desert light and the open road.",
      description:
        "A classic road trip through the great national parks of the American Southwest — the Grand Canyon, Zion and beyond.",
      durationDays: 12,
      priceFrom: "€6,400 per person",
      feelings: ["Freedom", "Wonder"],
      itinerary: [
        "Days 1–3 · Las Vegas & Zion — canyons and first trails",
        "Days 4–8 · Bryce, Monument Valley & the Grand Canyon",
        "Days 9–12 · The long road back, at your own pace",
      ],
      dests: ["united-states"],
    },
    // Europe
    {
      slug: "italy-classics",
      title: "Italy: Rome, Florence & the Coast",
      summary: "Great art cities and a golden stretch of coast to finish.",
      description:
        "The essential Italy — Rome and Florence's art and food, then time to slow down on the Amalfi Coast.",
      durationDays: 10,
      priceFrom: "€4,900 per person",
      feelings: ["Contentment", "Wonder"],
      itinerary: [
        "Days 1–3 · Rome — the icons, plus the back-street city",
        "Days 4–6 · Florence & Tuscany — art, hill towns and wine",
        "Days 7–10 · Amalfi Coast — boat days and lemon-grove lunches",
      ],
      dests: ["italy"],
    },
    {
      slug: "iceland-fire-and-ice",
      title: "Iceland: Fire & Ice",
      summary: "Waterfalls, volcanoes and glacier lagoons on the ring road.",
      description:
        "Iceland's elemental best — waterfalls and black beaches, geothermal spas and a glacier lagoon of drifting ice.",
      durationDays: 8,
      priceFrom: "€4,300 per person",
      feelings: ["Wonder", "Freedom"],
      itinerary: [
        "Days 1–3 · Reykjavík & the Golden Circle — geysers and waterfalls",
        "Days 4–8 · The south coast — black beaches, glaciers and the lagoon",
      ],
      dests: ["iceland"],
    },
  ];

  const insertedTrips = await db
    .insert(s.trips)
    .values(
      tripSeeds.map((t, i) => ({
        slug: t.slug,
        title: t.title,
        summary: t.summary,
        description: t.description,
        durationDays: t.durationDays,
        priceFrom: t.priceFrom,
        grad: tripGrads[i % tripGrads.length],
        image: `https://picsum.photos/seed/bookit-trip-${t.slug}/1400/1000`,
        feelings: t.feelings,
        itinerary: t.itinerary,
        departures: dep,
        sortOrder: i,
      })),
    )
    .returning({ id: s.trips.id, slug: s.trips.slug });

  const tripIdBySlug = Object.fromEntries(insertedTrips.map((t) => [t.slug, t.id]));
  const links = tripSeeds.flatMap((t) =>
    t.dests
      .filter((ds) => bySlug[ds])
      .map((ds, position) => ({ tripId: tripIdBySlug[t.slug], destinationId: bySlug[ds], position })),
  );
  if (links.length) await db.insert(s.tripDestinations).values(links);
  console.log(`  trips: ${tripSeeds.length} (+ destination links)`);

  console.log("Seed complete.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
