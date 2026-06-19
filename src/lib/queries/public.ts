import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  destinations as destinationsTable,
  experiences as experiencesTable,
  testimonials as testimonialsTable,
} from "@/db/schema";
import type {
  Destination,
  Experience,
  Testimonial,
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
    priceFrom: r.priceFrom,
    rating: r.rating,
    badge: r.badge,
    duration: r.duration,
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
