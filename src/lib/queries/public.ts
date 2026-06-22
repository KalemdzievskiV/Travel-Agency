import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  destinations as destinationsTable,
  experiences as experiencesTable,
  testimonials as testimonialsTable,
  trips as tripsTable,
  tripDestinations as tripDestinationsTable,
} from "@/db/schema";
import type {
  Destination,
  Experience,
  Testimonial,
  Trip,
} from "@/content/types";

// Map DB rows to the existing content-facing shapes so components are unchanged.
type DestinationRow = typeof destinationsTable.$inferSelect;
type ExperienceRow = typeof experiencesTable.$inferSelect;
type TestimonialRow = typeof testimonialsTable.$inferSelect;

function toDestination(r: DestinationRow): Destination {
  return {
    slug: r.slug,
    region: r.region,
    title: r.title,
    teaser: r.teaser,
    grad: r.grad ?? "",
    image: r.image ?? undefined,
    badge: r.badge,
    whenToGo: r.whenToGo,
    bestMonths: r.bestMonths,
    feelings: r.feelings,
    intro: r.intro,
    highlights: r.highlights,
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
    feelings: r.feelings,
    itinerary: r.itinerary,
    departures: r.departures,
  };
}

export async function getDestinations(): Promise<Destination[]> {
  const rows = await db
    .select()
    .from(destinationsTable)
    .where(eq(destinationsTable.published, true))
    .orderBy(asc(destinationsTable.sortOrder), asc(destinationsTable.id));
  return rows.map(toDestination);
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
  return row ? toDestination(row) : undefined;
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

  return {
    trip: toTrip(row),
    destinations: linked
      .map((l) => l.destination)
      .filter((d) => d.published)
      .map(toDestination),
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
