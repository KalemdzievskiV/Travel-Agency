import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { getLocale } from "next-intl/server";
import { db } from "@/db";
import {
  destinations as destinationsTable,
  experiences as experiencesTable,
  testimonials as testimonialsTable,
  trips as tripsTable,
  tripDestinations as tripDestinationsTable,
  tripFilterOptions,
  filterOptions,
  filterGroups,
  regions as regionsTable,
} from "@/db/schema";
import type {
  Destination,
  Experience,
  Testimonial,
  Trip,
} from "@/content/types";
import { deriveTripFacets } from "./filters";

/** A trip plus the facet keys ("group:option") it matches, for filtering. */
export type TripWithFacets = Trip & { facets: string[] };

// Map DB rows to the existing content-facing shapes so components are unchanged.
type DestinationRow = typeof destinationsTable.$inferSelect;
type ExperienceRow = typeof experiencesTable.$inferSelect;
type TestimonialRow = typeof testimonialsTable.$inferSelect;

type RegionInfo = { label: string; labelMk: string | null; slug: string };

async function localeIsMk(): Promise<boolean> {
  try {
    return (await getLocale()) === "mk";
  } catch {
    return false;
  }
}

async function getRegionMap(): Promise<Map<number, RegionInfo>> {
  try {
    const rows = await db
      .select({
        id: regionsTable.id,
        label: regionsTable.label,
        labelMk: regionsTable.labelMk,
        slug: regionsTable.slug,
      })
      .from(regionsTable);
    return new Map(rows.map((r) => [r.id, { label: r.label, labelMk: r.labelMk, slug: r.slug }]));
  } catch {
    return new Map();
  }
}

function toDestination(r: DestinationRow, mk: boolean, regionMap: Map<number, RegionInfo>): Destination {
  const pick = (en: string, mkVal: string | null | undefined) => (mk && mkVal ? mkVal : en);
  const region = r.regionId != null ? regionMap.get(r.regionId) : undefined;
  return {
    slug: r.slug,
    region: region ? pick(region.label, region.labelMk) : r.region,
    regionSlug: region?.slug,
    title: pick(r.title, r.titleMk),
    teaser: pick(r.teaser, r.teaserMk),
    grad: r.grad ?? "",
    image: r.image ?? undefined,
    lat: r.lat ?? undefined,
    lng: r.lng ?? undefined,
    badge: pick(r.badge, r.badgeMk),
    whenToGo: pick(r.whenToGo, r.whenToGoMk),
    bestMonths: r.bestMonths,
    feelings: r.feelings,
    intro: pick(r.intro, r.introMk),
    highlights: mk && r.highlightsMk && r.highlightsMk.length ? r.highlightsMk : r.highlights,
  };
}

function toExperience(r: ExperienceRow): Experience {
  return {
    slug: r.slug,
    eyebrow: r.eyebrow,
    title: r.title,
    body: r.body,
    grad: r.grad ?? "",
    image: r.image ?? undefined,
  };
}

function toTestimonial(r: TestimonialRow): Testimonial {
  return { quote: r.quote, who: r.who, where: r.where };
}

type TripRow = typeof tripsTable.$inferSelect;

function toTrip(r: TripRow): Trip {
  return {
    slug: r.slug,
    title: r.title,
    summary: r.summary,
    description: r.description,
    durationDays: r.durationDays,
    priceFrom: r.priceFrom,
    grad: r.grad ?? "",
    image: r.image ?? undefined,
    images: r.images,
    feelings: r.feelings,
    itinerary: r.itinerary,
    departures: r.departures,
  };
}

export async function getDestinations(): Promise<Destination[]> {
  const [rows, mk, regionMap] = await Promise.all([
    db
      .select()
      .from(destinationsTable)
      .where(eq(destinationsTable.published, true))
      .orderBy(asc(destinationsTable.sortOrder), asc(destinationsTable.id)),
    localeIsMk(),
    getRegionMap(),
  ]);
  return rows.map((r) => toDestination(r, mk, regionMap));
}

export async function getDestinationBySlug(
  slug: string,
): Promise<Destination | undefined> {
  const [row] = await db
    .select()
    .from(destinationsTable)
    .where(
      and(
        eq(destinationsTable.slug, slug),
        eq(destinationsTable.published, true),
      ),
    )
    .limit(1);
  if (!row) return undefined;
  const [mk, regionMap] = await Promise.all([localeIsMk(), getRegionMap()]);
  return toDestination(row, mk, regionMap);
}

export async function getExperiences(): Promise<Experience[]> {
  const rows = await db
    .select()
    .from(experiencesTable)
    .where(eq(experiencesTable.published, true))
    .orderBy(asc(experiencesTable.sortOrder), asc(experiencesTable.id));
  return rows.map(toExperience);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await db
    .select()
    .from(testimonialsTable)
    .where(eq(testimonialsTable.published, true))
    .orderBy(asc(testimonialsTable.sortOrder), asc(testimonialsTable.id));
  return rows.map(toTestimonial);
}

export async function getTrips(): Promise<Trip[]> {
  const rows = await db
    .select()
    .from(tripsTable)
    .where(eq(tripsTable.published, true))
    .orderBy(asc(tripsTable.sortOrder), asc(tripsTable.id));
  return rows.map(toTrip);
}

// Trips with their facet keys attached (taxonomy tags + derived duration/price),
// for the filterable /trips listing.
export async function getTripsWithFacets(): Promise<TripWithFacets[]> {
  const rows = await db
    .select()
    .from(tripsTable)
    .where(eq(tripsTable.published, true))
    .orderBy(asc(tripsTable.sortOrder), asc(tripsTable.id));

  // Degrade to derived-only facets if the taxonomy tables aren't present yet.
  let tags: { tripId: number; groupKey: string; optionKey: string }[] = [];
  try {
    tags = await db
      .select({
        tripId: tripFilterOptions.tripId,
        groupKey: filterGroups.key,
        optionKey: filterOptions.key,
      })
      .from(tripFilterOptions)
      .innerJoin(filterOptions, eq(tripFilterOptions.optionId, filterOptions.id))
      .innerJoin(filterGroups, eq(filterOptions.groupId, filterGroups.id));
  } catch {
    tags = [];
  }

  const byTrip = new Map<number, string[]>();
  for (const r of tags) {
    const arr = byTrip.get(r.tripId) ?? [];
    arr.push(`${r.groupKey}:${r.optionKey}`);
    byTrip.set(r.tripId, arr);
  }

  return rows.map((r) => ({
    ...toTrip(r),
    facets: [
      ...(byTrip.get(r.id) ?? []),
      ...deriveTripFacets(r.durationDays, r.priceFrom, r.feelings, r.departures),
    ],
  }));
}

export async function getTripWithDestinations(
  slug: string,
): Promise<{ trip: Trip; destinations: Destination[] } | undefined> {
  const [row] = await db
    .select()
    .from(tripsTable)
    .where(and(eq(tripsTable.slug, slug), eq(tripsTable.published, true)))
    .limit(1);
  if (!row) return undefined;

  const linked = await db
    .select({ destination: destinationsTable })
    .from(tripDestinationsTable)
    .innerJoin(
      destinationsTable,
      eq(tripDestinationsTable.destinationId, destinationsTable.id),
    )
    .where(eq(tripDestinationsTable.tripId, row.id))
    .orderBy(asc(tripDestinationsTable.position));

  const [mk, regionMap] = await Promise.all([localeIsMk(), getRegionMap()]);
  return {
    trip: toTrip(row),
    destinations: linked
      .map((l) => l.destination)
      .filter((d) => d.published)
      .map((d) => toDestination(d, mk, regionMap)),
  };
}

// Trips (products) that visit a given destination — bridges guide → product.
export async function getTripsForDestination(slug: string): Promise<Trip[]> {
  const rows = await db
    .select({ trip: tripsTable })
    .from(tripDestinationsTable)
    .innerJoin(tripsTable, eq(tripDestinationsTable.tripId, tripsTable.id))
    .innerJoin(
      destinationsTable,
      eq(tripDestinationsTable.destinationId, destinationsTable.id),
    )
    .where(and(eq(destinationsTable.slug, slug), eq(tripsTable.published, true)))
    .orderBy(asc(tripsTable.sortOrder), asc(tripsTable.id));
  return rows.map((r) => toTrip(r.trip));
}
