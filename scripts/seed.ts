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

  // Clear (respect FKs: join table first).
  await db.delete(s.tripDestinations);
  await db.delete(s.trips);
  await db.delete(s.destinations);
  await db.delete(s.experiences);
  await db.delete(s.testimonials);

  // Destinations
  const insertedDestinations = await db
    .insert(s.destinations)
    .values(
      destinations.map((d, i) => ({
        slug: d.slug,
        region: d.region,
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

  // A couple of sample trips that link destinations, to exercise the relation.
  const bySlug = Object.fromEntries(insertedDestinations.map((d) => [d.slug, d.id]));
  const [macedoniaTrip, mediterraneanTrip] = await db
    .insert(s.trips)
    .values([
      {
        slug: "macedonia-in-depth",
        title: "Macedonia in Depth",
        summary: "Lakes, highlands and a hidden river canyon over one unhurried week.",
        description:
          "A week-long journey through the soul of North Macedonia — from the clear waters of Ohrid to the silent peaks of Mavrovo and a kayak through Matka Canyon.",
        durationDays: 7,
        priceFrom: "€2,400 per person",
        grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)",
        image: "/images/ohrid.jpg",
        feelings: ["Wonder", "Contentment", "Freedom"],
        itinerary: [
          "Days 1–2 · Lake Ohrid — settle in, a dawn boat to Kaneo, lazy lakeside lunches",
          "Days 3–4 · Mavrovo highlands — ridge walks and a long table by the fire",
          "Days 5–6 · Skopje & Matka — the Old Bazaar, then kayaking the canyon",
          "Day 7 · Departure from Skopje",
        ],
        departures: ["12 May 2026", "9 Jun 2026", "8 Sep 2026"],
        sortOrder: 0,
      },
      {
        slug: "adriatic-escape",
        title: "Adriatic & Aegean Escape",
        summary: "Coastlines and islands, from the Amalfi Coast to the Cyclades.",
        description:
          "A slow, sun-warmed loop across the Mediterranean's most romantic shores, designed entirely around the feeling of the sea.",
        durationDays: 9,
        priceFrom: "€4,100 per person",
        grad: "linear-gradient(135deg,#5f8a8f,#2f5559)",
        image: "/images/amalfi-coast.jpg",
        feelings: ["Contentment", "Revitalised"],
        itinerary: [
          "Days 1–4 · Amalfi Coast — boat days, lemon-grove lunches, quiet Ravello",
          "Days 5–9 · Santorini & the Cyclades — caldera sunsets and a quieter island",
        ],
        departures: ["19 May 2026", "16 Jun 2026", "22 Sep 2026"],
        sortOrder: 1,
      },
    ])
    .returning({ id: s.trips.id });

  const link = (
    tripId: number,
    slugs: string[],
  ): { tripId: number; destinationId: number; position: number }[] =>
    slugs
      .filter((slug) => bySlug[slug])
      .map((slug, position) => ({ tripId, destinationId: bySlug[slug], position }));

  await db.insert(s.tripDestinations).values([
    ...link(macedoniaTrip.id, ["ohrid", "mavrovo", "skopje-matka"]),
    ...link(mediterraneanTrip.id, ["amalfi-coast", "santorini"]),
  ]);
  console.log("  trips: 2 (+ destination links)");

  console.log("Seed complete.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
