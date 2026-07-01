import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  filterGroups as groupsTable,
  filterOptions as optionsTable,
  tripFilterOptions,
  destinationFilterOptions,
} from "@/db/schema";

export type FilterOptionLite = { id: number; key: string; label: string };
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

/** Which derived facet keys a trip matches, given its duration/price. */
export function deriveTripFacets(durationDays: number | null, priceFrom: string): string[] {
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
  return out;
}

function mapGroup(g: {
  id: number;
  key: string;
  label: string;
  published: boolean;
  sortOrder: number;
  options: { id: number; key: string; label: string }[];
}): FilterGroupWithOptions {
  return {
    id: g.id,
    key: g.key,
    label: g.label,
    published: g.published,
    sortOrder: g.sortOrder,
    options: g.options.map((o) => ({ id: o.id, key: o.key, label: o.label })),
  };
}

/** Published taxonomy groups (with options), for the public filter UI. */
export async function getFilterGroups(): Promise<FilterGroupWithOptions[]> {
  const rows = await db.query.filterGroups.findMany({
    where: eq(groupsTable.published, true),
    orderBy: [asc(groupsTable.sortOrder), asc(groupsTable.id)],
    with: { options: { orderBy: [asc(optionsTable.sortOrder), asc(optionsTable.id)] } },
  });
  return rows.map(mapGroup);
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

export async function getDestinationOptionIds(destinationId: number): Promise<number[]> {
  const rows = await db
    .select({ optionId: destinationFilterOptions.optionId })
    .from(destinationFilterOptions)
    .where(eq(destinationFilterOptions.destinationId, destinationId));
  return rows.map((r) => r.optionId);
}
