import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  destinations,
  experiences,
  experienceCategories,
  testimonials,
  trips,
  tripDestinations,
} from "@/db/schema";

// Admin reads — include unpublished, ordered for management.

export function listDestinations() {
  return db
    .select()
    .from(destinations)
    .orderBy(asc(destinations.sortOrder), asc(destinations.id));
}

export async function getDestination(id: number) {
  const [row] = await db
    .select()
    .from(destinations)
    .where(eq(destinations.id, id))
    .limit(1);
  return row;
}

export function listExperiences() {
  return db
    .select()
    .from(experiences)
    .orderBy(asc(experiences.sortOrder), asc(experiences.id));
}

export async function getExperience(id: number) {
  const [row] = await db
    .select()
    .from(experiences)
    .where(eq(experiences.id, id))
    .limit(1);
  return row;
}

export function listExperienceCategories() {
  return db
    .select()
    .from(experienceCategories)
    .orderBy(asc(experienceCategories.sortOrder), asc(experienceCategories.id));
}

export async function getExperienceCategory(id: number) {
  const [row] = await db
    .select()
    .from(experienceCategories)
    .where(eq(experienceCategories.id, id))
    .limit(1);
  return row;
}

export function listTestimonials() {
  return db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.sortOrder), asc(testimonials.id));
}

export async function getTestimonial(id: number) {
  const [row] = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, id))
    .limit(1);
  return row;
}

export function listTrips() {
  return db
    .select()
    .from(trips)
    .orderBy(asc(trips.sortOrder), asc(trips.id));
}

export async function getTrip(id: number) {
  const [row] = await db.select().from(trips).where(eq(trips.id, id)).limit(1);
  return row;
}

export async function getTripDestinationIds(tripId: number): Promise<number[]> {
  const rows = await db
    .select({ destinationId: tripDestinations.destinationId })
    .from(tripDestinations)
    .where(eq(tripDestinations.tripId, tripId))
    .orderBy(asc(tripDestinations.position));
  return rows.map((r) => r.destinationId);
}
