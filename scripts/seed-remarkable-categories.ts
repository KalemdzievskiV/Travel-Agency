// Env comes from `--env-file=.env.local` in the npm script: a dotenv call here
// would be hoisted below the `../src/db` import and land too late.
import { and, eq, inArray } from "drizzle-orm";
import { db } from "../src/db";
import { destinations, experienceCategories, filterGroups, filterOptions } from "../src/db/schema";

/**
 * Seed the НЕОБИЧНИ ИСКУСТВА categories (safari, cruises, unusual, adventure,
 * themed) and their matching "who" filter options, so trips tagged with one
 * surface in that category's carousel without a code change.
 *
 * These share the experience_categories table with the КОЈ ПАТУВА set and are
 * told apart by `kind`. Safari carries the client's full copy; the other four
 * get titles and a short hero only — the client fills the rest in from admin,
 * and the empty fields collapse their sections until they do.
 *
 * Idempotent — upserts by slug. Run: `npm run db:seed-remarkable-categories`.
 */
const img = (s: string) => `https://picsum.photos/seed/${s}/1600/1100`;

async function ensureGroup(key: string, label: string, sortOrder: number) {
  const [g] = await db.select().from(filterGroups).where(eq(filterGroups.key, key));
  if (g) return g;
  const [n] = await db.insert(filterGroups).values({ key, label, sortOrder, published: true }).returning();
  return n;
}

async function ensureOption(groupId: number, key: string, label: string, sortOrder: number) {
  const [o] = await db
    .select()
    .from(filterOptions)
    .where(and(eq(filterOptions.groupId, groupId), eq(filterOptions.key, key)));
  if (o) return o;
  const [n] = await db.insert(filterOptions).values({ groupId, key, label, sortOrder }).returning();
  return n;
}

type SeedCategory = {
  slug: string;
  title: string;
  titleMk: string;
  subtitle: string;
  subtitleMk: string;
  heroText: string;
  heroTextMk: string;
  destinationsHeading?: string;
  destinationsHeadingMk?: string;
  destinationsIntro?: string;
  destinationsIntroMk?: string;
  /** Destination slugs for the tiles; resolved to ids at seed time. */
  destinationSlugs?: string[];
};

const cats: SeedCategory[] = [
  {
    slug: "safari-trips",
    title: "Safari trips",
    titleMk: "Сафари патувања",
    subtitle: "Personalised safari tours in the land where it all began",
    subtitleMk: "Персонализирани сафари патувања таму каде што сè започна",
    heroText: "Tailor-made safaris, built around the wilderness you want to see.",
    heroTextMk: "Сафари патувања по мерка, создадени околу дивината што сакате да ја видите.",
    destinationsHeading: "Our favourite safari destinations",
    destinationsHeadingMk: "Нашите омилени сафари дестинации",
    destinationsIntro:
      "Across all our journeys we carefully choose safari destinations in Africa with limited visitor numbers and controlled access. That is what secures genuine privacy and an authentic safari experience, where you'll feel like the only guests in the wilderness.",
    destinationsIntroMk:
      "Во сите наши патувања внимателно избираме сафари дестинации во Африка со ограничен број посетители и контролиран пристап. Така се обезбедува врвна приватност и автентично сафари искуство, каде ќе се чувствувате како да сте единствените гости во дивината.",
    // Six, per the brief — the client swaps these from admin.
    destinationSlugs: ["kenya", "tanzania-zanzibar", "south-africa", "ethiopia", "morocco", "egypt"],
  },
  {
    slug: "cruises",
    title: "Cruises",
    titleMk: "Крстарења",
    subtitle: "The world, seen from the water",
    subtitleMk: "Светот, гледан од водата",
    heroText: "",
    heroTextMk: "",
  },
  {
    slug: "unusual-trips",
    title: "Unusual trips",
    titleMk: "Невообичаени патувања",
    subtitle: "For those who want something entirely their own",
    subtitleMk: "За оние што сакаат нешто сосема свое",
    heroText: "",
    heroTextMk: "",
  },
  {
    slug: "adventure-trips",
    title: "Adventure trips",
    titleMk: "Авантуристички патувања",
    subtitle: "Further out, and a little braver",
    subtitleMk: "Подалеку, и малку похрабро",
    heroText: "",
    heroTextMk: "",
  },
  {
    slug: "themed-trips",
    title: "Themed trips",
    titleMk: "Тематски патувања",
    subtitle: "Journeys built around one great passion",
    subtitleMk: "Патувања создадени околу една голема страст",
    heroText: "",
    heroTextMk: "",
  },
];

async function main() {
  const who = await ensureGroup("who", "Who", 1);

  for (let i = 0; i < cats.length; i++) {
    const c = cats[i];
    // Existing "who" options start at 0; offset so the two sets don't collide.
    await ensureOption(who.id, c.slug, c.title, 100 + i);

    // Resolve tile slugs to ids, keeping the listed order. Slugs that aren't
    // seeded yet are simply skipped.
    let destinationIds: number[] = [];
    if (c.destinationSlugs?.length) {
      const rows = await db
        .select({ id: destinations.id, slug: destinations.slug })
        .from(destinations)
        .where(inArray(destinations.slug, c.destinationSlugs));
      const bySlug = new Map(rows.map((r) => [r.slug, r.id]));
      destinationIds = c.destinationSlugs
        .map((s) => bySlug.get(s))
        .filter((id): id is number => id != null);
    }

    const values = {
      slug: c.slug,
      kind: "remarkable",
      title: c.title,
      titleMk: c.titleMk,
      subtitle: c.subtitle,
      subtitleMk: c.subtitleMk,
      heroText: c.heroText,
      heroTextMk: c.heroTextMk || null,
      image: img(`exp-${c.slug}`),
      grad: null as string | null,
      destinationsHeading: c.destinationsHeading ?? "",
      destinationsHeadingMk: c.destinationsHeadingMk ?? null,
      destinationsIntro: c.destinationsIntro ?? "",
      destinationsIntroMk: c.destinationsIntroMk ?? null,
      whoOptionKey: c.slug,
      published: true,
      sortOrder: 100 + i,
      updatedAt: new Date(),
    };

    const [existing] = await db
      .select({ id: experienceCategories.id })
      .from(experienceCategories)
      .where(eq(experienceCategories.slug, c.slug));

    if (existing) {
      // `values` deliberately omits destinationIds, so re-running this seed
      // never clobbers tile picks the client has since made in admin.
      await db.update(experienceCategories).set(values).where(eq(experienceCategories.id, existing.id));
    } else {
      await db.insert(experienceCategories).values({ ...values, destinationIds });
    }
  }

  console.log(`Seeded ${cats.length} remarkable categories + matching "who" options.`);
  process.exit(0);
}

main();
