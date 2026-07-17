import { config } from "dotenv";
config({ path: ".env.local" });

import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { remarkableExperiences, trips } from "../src/db/schema";

/**
 * Seed a few "remarkable experiences" (НЕОБИЧНИ ИСКУСТВА) for the Experiences
 * hub. Each may link to a trip by slug. Idempotent — upserts by slug.
 * Run: `npm run db:seed-remarkable`.
 */
const img = (s: string) => `https://picsum.photos/seed/${s}/1600/1100`;

type DemoRemarkable = {
  slug: string;
  title: string;
  teaser: string;
  description: string;
  tripSlug?: string;
  image: string;
};

const ITEMS: DemoRemarkable[] = [
  {
    slug: "dine-under-the-northern-lights",
    title: "Dine under the northern lights",
    teaser: "A private table on the ice, the sky doing the rest.",
    description: "A guide, a chef and a snowmobile take you deep into the Icelandic dark for a candlelit dinner beneath the aurora.",
    image: "remarkable-aurora",
  },
  {
    slug: "tea-with-a-kyoto-geisha",
    title: "Tea with a Kyoto geisha",
    teaser: "An hour inside a world few travellers ever see.",
    description: "A private, respectful audience in a Gion teahouse — conversation, ceremony and a rare glimpse of a closed tradition.",
    image: "remarkable-geisha",
  },
  {
    slug: "sunrise-over-the-cyclades",
    title: "Sunrise over the Cyclades by caïque",
    teaser: "Slip out before dawn; have the sea to yourself.",
    description: "A traditional wooden boat, a skipper who knows every cove, and breakfast at anchor as the islands wake.",
    image: "remarkable-caique",
  },
];

async function main() {
  const allTrips = await db.select({ id: trips.id, slug: trips.slug }).from(trips);
  const tripId = new Map(allTrips.map((t) => [t.slug, t.id]));

  let order = 0;
  for (const it of ITEMS) {
    const values = {
      slug: it.slug,
      title: it.title,
      teaser: it.teaser,
      description: it.description,
      tripId: it.tripSlug ? tripId.get(it.tripSlug) ?? null : null,
      image: img(it.image),
      published: true,
      sortOrder: order++,
      updatedAt: new Date(),
    };
    const existing = (
      await db.select({ id: remarkableExperiences.id }).from(remarkableExperiences).where(eq(remarkableExperiences.slug, it.slug))
    )[0];
    if (existing) await db.update(remarkableExperiences).set(values).where(eq(remarkableExperiences.id, existing.id));
    else await db.insert(remarkableExperiences).values(values);
    console.log(`  ✓ ${it.slug}`);
  }
  console.log(`Seeded ${ITEMS.length} remarkable experiences.`);
  process.exit(0);
}

main();
