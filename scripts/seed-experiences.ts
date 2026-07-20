import { config } from "dotenv";
config({ path: ".env.local" });

import { and, asc, eq } from "drizzle-orm";
import { db } from "../src/db";
import { experienceCategories, filterGroups, filterOptions, tripFilterOptions, trips } from "../src/db/schema";

/**
 * Seed the "WHO" experience categories (Families, Couples, Groups, Honeymoon,
 * Solo) and the matching "who" filter options, then tag a few trips to families
 * so its carousel shows real filtering. Idempotent — upserts by slug, so it's
 * safe to re-run. Run: `npm run db:seed-experiences`.
 */
const img = (s: string) => `https://picsum.photos/seed/${s}/1600/1100`;

async function ensureGroup(key: string, label: string, sortOrder: number) {
  const [g] = await db.select().from(filterGroups).where(eq(filterGroups.key, key));
  if (g) return g;
  const [n] = await db.insert(filterGroups).values({ key, label, sortOrder, published: true }).returning();
  return n;
}
async function ensureOption(groupId: number, key: string, label: string, sortOrder: number) {
  const [o] = await db.select().from(filterOptions).where(and(eq(filterOptions.groupId, groupId), eq(filterOptions.key, key)));
  if (o) return o;
  const [n] = await db.insert(filterOptions).values({ groupId, key, label, sortOrder }).returning();
  return n;
}

const cats = [
  {
    slug: "families", title: "Families", subtitle: "Luxury family travel, designed around you",
    titleMk: "Семејства", subtitleMk: "Луксузни семејни патувања, создадени околу вас",
    heroText: "We can't wait to help you make more family memories.",
    concept: "The best family holidays don't feel organised — they feel effortless. We take care of every flight, transfer, guide and long lunch so you're free to be together. Whether that's a first safari through wide-eyes, a city discovered as a treasure hunt, or a beach where the days blur pleasantly into one, every itinerary is shaped around your family's pace, ages and appetites.",
    recommendations: "For younger children we lean towards shorter flights, private guides and flexible mornings. For teenagers we build in a little adventure and independence. And for multi-generational trips, we design in the moments everyone shares — and the ones each generation gets to themselves.",
    faqs: [
      "How much do your luxury family holidays cost? | There's no fixed price — every trip is tailor-made. Most family journeys start from around €4,000 per person, and we'll shape the itinerary to your budget.",
      "Are your holidays suitable for young children? | Yes. We regularly design trips for families with toddlers through to teenagers, choosing pacing, accommodation and activities to match.",
      "Can you arrange connecting rooms and childcare? | We can — from interconnecting suites to trusted local nannies and private guides who are wonderful with children.",
      "How far in advance should we book? | For peak school-holiday dates we'd suggest six months where possible, though we can often work to much shorter timelines.",
    ],
  },
  {
    slug: "couples", title: "Couples", subtitle: "Time together, exactly as you like it",
    titleMk: "Парови", subtitleMk: "Време заедно, токму како што сакате",
    heroText: "Slow mornings, remarkable dinners and just the two of you.",
    concept: "Whether it's a milestone or simply a chance to reconnect, a trip for two should feel personal from the first idea. We design around how you want to feel — adventurous, indulgent, quiet — and remove every friction so the time is entirely yours.",
    recommendations: "Think private dining in unlikely places, a guide who knows the back streets, and the freedom to change your mind. We'll weave in the surprises and leave room for nothing at all.",
    faqs: [
      "Can you help plan a special occasion? | Absolutely — anniversaries, proposals and birthdays are some of our favourite trips to design.",
      "Do you arrange private experiences? | Yes, from after-hours access to private boats and chefs.",
    ],
  },
  {
    slug: "groups", title: "Groups", subtitle: "Travel well, together",
    titleMk: "Групи", subtitleMk: "Патувајте добро, заедно",
    heroText: "The logistics handled, so the group can simply enjoy it.",
    concept: "Group travel lives and dies on the details. We coordinate flights, rooms, transfers and a rhythm that keeps everyone happy — with private guides and spaces that make a larger party feel effortless rather than herded.",
    recommendations: "We're happy to build in optional tracks — the energetic and the easy-going — so nobody feels rushed or held back.",
    faqs: [
      "How large a group can you arrange? | From small friend groups to large celebrations — we'll advise on what works for each destination.",
      "Can different people pay separately? | Yes, we can handle billing to suit the group.",
    ],
  },
  {
    slug: "honeymoon", title: "Honeymoon", subtitle: "A beginning worth remembering",
    titleMk: "Меден месец", subtitleMk: "Почеток вреден за паметење",
    heroText: "The trip you'll talk about for the rest of your lives.",
    concept: "A honeymoon should feel like nothing else. We design journeys that balance indulgence and discovery — barefoot luxury, a little adventure, and the quiet moments that make it yours.",
    recommendations: "Combine two contrasting stays — a safari then an island, a city then a coast — for a honeymoon with light and shade.",
    faqs: [
      "Can you arrange honeymoon touches? | Of course — from private candlelit dinners to upgrades and small surprises along the way.",
      "When should we start planning? | The earlier the better for peak-season stays, but we can work quickly when we need to.",
    ],
  },
  {
    slug: "solo", title: "Solo", subtitle: "The world, on your own terms",
    titleMk: "Соло патувања", subtitleMk: "Светот, под ваши услови",
    heroText: "Freedom, safety and remarkable company when you want it.",
    concept: "Travelling solo should feel liberating, not lonely. We design trips with the right balance of independence and connection — trusted guides, considered logistics and the confidence to explore.",
    recommendations: "We're glad to build in group moments — a cooking class, a guided walk — alongside long stretches of time that are entirely your own.",
    faqs: [
      "Is solo travel safe with you? | Safety underpins everything we plan — vetted guides, sensible logistics and 24-hour support throughout.",
      "Will I be on my own the whole time? | Only as much as you want to be. We can weave in shared experiences whenever you like.",
    ],
  },
];

async function main() {
  const who = await ensureGroup("who", "Who", 1);
  const order = ["families", "couples", "groups", "honeymoon", "solo"];
  for (let i = 0; i < order.length; i++) {
    const c = cats.find((x) => x.slug === order[i])!;
    await ensureOption(who.id, c.slug, c.title, i);
    const values = {
      slug: c.slug, title: c.title, subtitle: c.subtitle, heroText: c.heroText,
      titleMk: c.titleMk, subtitleMk: c.subtitleMk,
      image: img(`exp-${c.slug}`), grad: null as string | null,
      concept: c.concept, recommendations: c.recommendations, faqs: c.faqs,
      whoOptionKey: c.slug, published: true, sortOrder: i, updatedAt: new Date(),
    };
    const [existing] = await db.select({ id: experienceCategories.id }).from(experienceCategories).where(eq(experienceCategories.slug, c.slug));
    if (existing) await db.update(experienceCategories).set(values).where(eq(experienceCategories.id, existing.id));
    else await db.insert(experienceCategories).values(values);
  }

  // Tag a few trips as "families" so the carousel demonstrates real filtering.
  const familiesOpt = (await db.select().from(filterOptions).where(and(eq(filterOptions.groupId, who.id), eq(filterOptions.key, "families"))))[0];
  if (familiesOpt) {
    const someTrips = await db.select({ id: trips.id }).from(trips).where(eq(trips.published, true)).orderBy(asc(trips.sortOrder)).limit(4);
    for (const tr of someTrips) {
      const already = await db.select().from(tripFilterOptions).where(and(eq(tripFilterOptions.tripId, tr.id), eq(tripFilterOptions.optionId, familiesOpt.id)));
      if (!already.length) await db.insert(tripFilterOptions).values({ tripId: tr.id, optionId: familiesOpt.id });
    }
  }

  console.log("Seeded 5 experience categories + who options; tagged sample trips to families.");
  process.exit(0);
}

main();
