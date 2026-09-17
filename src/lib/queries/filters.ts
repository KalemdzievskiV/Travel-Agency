import "server-only";
import { asc, eq } from "drizzle-orm";
import { getLocale, getTranslations } from "next-intl/server";
import { db } from "@/db";
import {
  filterGroups as groupsTable,
  filterOptions as optionsTable,
  tripFilterOptions,
} from "@/db/schema";
import { feelings, months } from "@/content/site";

export type FilterOptionLite = {
  id: number;
  key: string;
  label: string;
  labelMk?: string | null;
  sortOrder?: number;
};
export type FilterGroupWithOptions = {
  id: number;
  key: string;
  label: string;
  published: boolean;
  sortOrder: number;
  options: FilterOptionLite[];
};

// Derived facets — computed from a trip's own duration/price, never tagged.
// Exported so the filter UI and the filtering logic share one source of truth.
export const derivedGroups: { key: string; label: string; options: FilterOptionLite[] }[] = [
  {
    key: "duration",
    label: "Duration",
    options: [
      { id: -1, key: "1-3", label: "1–3 nights" },
      { id: -2, key: "4-7", label: "4–7 nights" },
      { id: -3, key: "8-plus", label: "8+ nights" },
    ],
  },
  {
    key: "price",
    label: "Price per person",
    options: [
      { id: -4, key: "under-2000", label: "Under €2,000" },
      { id: -5, key: "2000-5000", label: "€2,000–5,000" },
      { id: -6, key: "5000-10000", label: "€5,000–10,000" },
      { id: -7, key: "10000-plus", label: "€10,000+" },
    ],
  },
];

/** Which derived facet keys a trip matches, given its own fields. Covers
 * duration/price bands plus the months its departures fall in, so the finder's
 * ?when= param filters here. Feelings are not derived: they're tags like any
 * other taxonomy group, so ?feeling= matches on the option key. */
export function deriveTripFacets(
  durationDays: number | null,
  priceFrom: string,
  departures: string[] = [],
): string[] {
  const out: string[] = [];
  if (durationDays != null) {
    if (durationDays <= 3) out.push("duration:1-3");
    else if (durationDays <= 7) out.push("duration:4-7");
    else out.push("duration:8-plus");
  }
  const n = Number((priceFrom || "").replace(/[^0-9]/g, "")) || 0;
  if (n > 0) {
    if (n < 2000) out.push("price:under-2000");
    else if (n < 5000) out.push("price:2000-5000");
    else if (n < 10000) out.push("price:5000-10000");
    else out.push("price:10000-plus");
  }
  // Derive the months a trip runs from its free-text departure dates.
  const monthsHit = new Set<string>();
  for (const dep of departures) {
    for (const m of months) {
      if (new RegExp(`\\b${m}`, "i").test(dep)) monthsHit.add(m);
    }
  }
  for (const m of monthsHit) out.push(`when:${m}`);
  return out;
}

function mapGroup(g: {
  id: number;
  key: string;
  label: string;
  published: boolean;
  sortOrder: number;
  options: { id: number; key: string; label: string; labelMk: string | null; sortOrder: number }[];
}): FilterGroupWithOptions {
  return {
    id: g.id,
    key: g.key,
    label: g.label,
    published: g.published,
    sortOrder: g.sortOrder,
    options: g.options.map((o) => ({ id: o.id, key: o.key, label: o.label, labelMk: o.labelMk, sortOrder: o.sortOrder })),
  };
}

/** Published taxonomy groups (with options), for the public filter UI.
 * Degrades to an empty list if the taxonomy tables aren't present yet
 * (e.g. before the migration has run on a fresh environment). */
export async function getFilterGroups(): Promise<FilterGroupWithOptions[]> {
  try {
    const rows = await db.query.filterGroups.findMany({
      where: eq(groupsTable.published, true),
      orderBy: [asc(groupsTable.sortOrder), asc(groupsTable.id)],
      with: { options: { orderBy: [asc(optionsTable.sortOrder), asc(optionsTable.id)] } },
    });
    return rows.map(mapGroup);
  } catch {
    return [];
  }
}

/** All taxonomy groups (incl. unpublished), for the admin. */
export async function getAllFilterGroups(): Promise<FilterGroupWithOptions[]> {
  const rows = await db.query.filterGroups.findMany({
    orderBy: [asc(groupsTable.sortOrder), asc(groupsTable.id)],
    with: { options: { orderBy: [asc(optionsTable.sortOrder), asc(optionsTable.id)] } },
  });
  return rows.map(mapGroup);
}

export async function getTripOptionIds(tripId: number): Promise<number[]> {
  const rows = await db
    .select({ optionId: tripFilterOptions.optionId })
    .from(tripFilterOptions)
    .where(eq(tripFilterOptions.tripId, tripId));
  return rows.map((r) => r.optionId);
}

/** An option's label in the visitor's language: the Macedonian label when
 * there is one, else the (English) label. */
export function localisedLabel(o: { label: string; labelMk?: string | null }, mk: boolean): string {
  return mk && o.labelMk ? o.labelMk : o.label;
}

export type FeelingOption = { key: string; label: string };

/** The trip finder's "how do you want to feel?" choices, in the visitor's
 * language: the options of the admin's Feeling filter group, in its order, so
 * renaming or reordering them there changes the dropdown. Falls back to the
 * built-in list if the group is missing or the database can't be reached, so
 * the finder never renders empty. */
export async function getFeelingOptions(): Promise<FeelingOption[]> {
  const mk = (await getLocale()) === "mk";
  try {
    const group = await db.query.filterGroups.findFirst({
      where: eq(groupsTable.key, "feeling"),
      with: { options: { orderBy: [asc(optionsTable.sortOrder), asc(optionsTable.id)] } },
    });
    if (group && group.options.length > 0) {
      return group.options.map((o) => ({ key: o.key, label: localisedLabel(o, mk) }));
    }
  } catch {
    // fall through to the built-in list
  }
  const t = await getTranslations("feelings");
  return feelings.map((f) => ({ key: f.toLowerCase(), label: t.has(f) ? t(f) : f }));
}
