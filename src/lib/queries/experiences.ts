import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { getLocale } from "next-intl/server";
import { db } from "@/db";
import {
  experienceCategories as categoriesTable,
  remarkableExperiences as remarkableTable,
  trips as tripsTable,
  tripFilterOptions,
  filterOptions,
  filterGroups,
} from "@/db/schema";
import { toTrip, getDestinationsByIds } from "./public";
import type {
  ExperienceCategory,
  ExperienceCategoryDetail,
  ExperienceKind,
  Faq,
  RemarkableExperience,
} from "@/content/types";

type CategoryRow = typeof categoriesTable.$inferSelect;

async function localeIsMk(): Promise<boolean> {
  try {
    return (await getLocale()) === "mk";
  } catch {
    return false;
  }
}

function parseFaqs(lines: string[]): Faq[] {
  return lines
    .map((l) => {
      const i = l.indexOf("|");
      return i >= 0 ? { q: l.slice(0, i).trim(), a: l.slice(i + 1).trim() } : { q: l.trim(), a: "" };
    })
    .filter((f) => f.q);
}

function toCategory(r: CategoryRow, mk: boolean): ExperienceCategory {
  const pick = (en: string, mkVal: string | null | undefined) => (mk && mkVal ? mkVal : en);
  return {
    slug: r.slug,
    kind: r.kind === "remarkable" ? "remarkable" : "who",
    title: pick(r.title, r.titleMk),
    subtitle: pick(r.subtitle, r.subtitleMk),
    heroText: pick(r.heroText, r.heroTextMk),
    grad: r.grad ?? "",
    image: r.image ?? undefined,
  };
}

/** Published categories, in order — for the hub grid and the nav. Pass a `kind`
 * to get just one mega-menu group. Degrades to an empty list if the table isn't
 * present yet: the header mega-menu renders on every page, so a missing table
 * must not take the whole site down. */
export async function getExperienceCategories(
  kind?: ExperienceKind,
): Promise<ExperienceCategory[]> {
  try {
    const mk = await localeIsMk();
    const rows = await db
      .select()
      .from(categoriesTable)
      .where(
        kind
          ? and(eq(categoriesTable.published, true), eq(categoriesTable.kind, kind))
          : eq(categoriesTable.published, true),
      )
      .orderBy(asc(categoriesTable.sortOrder), asc(categoriesTable.id));
    return rows.map((r) => toCategory(r, mk));
  } catch {
    return [];
  }
}

// Trips tagged with a given "who" filter option; falls back to recent trips.
async function tripsForWho(whoOptionKey: string) {
  if (whoOptionKey) {
    try {
      const rows = await db
        .select({ trip: tripsTable })
        .from(tripFilterOptions)
        .innerJoin(filterOptions, eq(tripFilterOptions.optionId, filterOptions.id))
        .innerJoin(filterGroups, eq(filterOptions.groupId, filterGroups.id))
        .innerJoin(tripsTable, eq(tripFilterOptions.tripId, tripsTable.id))
        .where(and(eq(filterGroups.key, "who"), eq(filterOptions.key, whoOptionKey), eq(tripsTable.published, true)))
        .orderBy(asc(tripsTable.sortOrder), asc(tripsTable.id));
      if (rows.length) return rows.map((r) => toTrip(r.trip));
    } catch {
      // taxonomy tables may not exist yet — fall through to defaults
    }
  }
  const fb = await db
    .select()
    .from(tripsTable)
    .where(eq(tripsTable.published, true))
    .orderBy(asc(tripsTable.sortOrder), asc(tripsTable.id))
    .limit(6);
  return fb.map((r) => toTrip(r));
}

export async function getExperienceCategoryBySlug(
  slug: string,
): Promise<ExperienceCategoryDetail | undefined> {
  const [row] = await db
    .select()
    .from(categoriesTable)
    .where(and(eq(categoriesTable.slug, slug), eq(categoriesTable.published, true)))
    .limit(1);
  if (!row) return undefined;

  const mk = await localeIsMk();
  const pick = (en: string, mkVal: string | null | undefined) => (mk && mkVal ? mkVal : en);
  const faqSource = mk && row.faqsMk && row.faqsMk.length ? row.faqsMk : row.faqs;
  const [trips, destinations] = await Promise.all([
    tripsForWho(row.whoOptionKey || row.slug),
    getDestinationsByIds(row.destinationIds),
  ]);

  return {
    ...toCategory(row, mk),
    concept: pick(row.concept, row.conceptMk),
    recommendations: pick(row.recommendations, row.recommendationsMk),
    faqs: parseFaqs(faqSource),
    trips,
    destinationsHeading: pick(row.destinationsHeading, row.destinationsHeadingMk),
    destinationsIntro: pick(row.destinationsIntro, row.destinationsIntroMk),
    destinations,
  };
}

/** Published remarkable experiences, in order — for the hub's НЕОБИЧНИ ИСКУСТВА grid. */
export async function getRemarkableExperiences(): Promise<RemarkableExperience[]> {
  try {
    const mk = await localeIsMk();
    const rows = await db
      .select({
        exp: remarkableTable,
        tripSlug: tripsTable.slug,
      })
      .from(remarkableTable)
      .leftJoin(tripsTable, eq(remarkableTable.tripId, tripsTable.id))
      .where(eq(remarkableTable.published, true))
      .orderBy(asc(remarkableTable.sortOrder), asc(remarkableTable.id));

    const pick = (en: string, mkVal: string | null | undefined) => (mk && mkVal ? mkVal : en);
    return rows.map(({ exp: r, tripSlug }) => ({
      slug: r.slug,
      title: pick(r.title, r.titleMk),
      teaser: pick(r.teaser, r.teaserMk),
      description: pick(r.description, r.descriptionMk),
      grad: r.grad ?? "",
      image: r.image ?? undefined,
      tripSlug: tripSlug ?? undefined,
    }));
  } catch {
    return [];
  }
}
