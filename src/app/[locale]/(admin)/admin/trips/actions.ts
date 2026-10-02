"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { trips, tripDestinations, tripFilterOptions, type TripExcursion } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { slugify, linesToArray } from "@/lib/slug";
import { uploadImage } from "@/lib/uploads";
import { enrichItineraryLines } from "@/lib/geocode";


function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

/**
 * The excursions editor posts its rows as one JSON field; photos were already
 * uploaded when picked, so each row carries its image URLs. Rows with neither a
 * picture nor a title are dropped as blanks.
 */
async function readExcursions(formData: FormData): Promise<TripExcursion[]> {
  let raw: unknown;
  try {
    raw = JSON.parse(str(formData, "excursions") || "[]");
  } catch {
    return [];
  }
  if (!Array.isArray(raw)) return [];
  const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const out: TripExcursion[] = [];
  for (const item of raw) {
    const r = (item ?? {}) as Record<string, unknown>;
    const images = Array.isArray(r.images) ? r.images.map(text).filter(Boolean) : [];
    if (!images.length && text(r.image)) images.push(text(r.image));
    const x: TripExcursion = {
      image: images[0] ?? "",
      images,
      label: text(r.label),
      labelMk: text(r.labelMk),
      eyebrow: text(r.eyebrow),
      eyebrowMk: text(r.eyebrowMk),
      title: text(r.title),
      titleMk: text(r.titleMk),
      price: text(r.price),
      body: text(r.body),
      bodyMk: text(r.bodyMk),
    };
    if (x.image || x.title || x.titleMk) out.push(x);
  }
  return out;
}

function revalidateTrips(slug?: string) {
  revalidatePath("/admin/trips");
  revalidatePath("/");
  revalidatePath("/trips");
  if (slug) revalidatePath(`/trips/${slug}`);
}

export async function saveTrip(formData: FormData) {
  await requireUser();

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const title = str(formData, "title");
  if (!title) throw new Error("Title is required");
  const slug = str(formData, "slug") || slugify(title);
  const uploaded = await uploadImage(formData.get("image"));

  const optionIds = formData
    .getAll("optionIds")
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n) && n > 0);

  // Geocode itinerary places typed as "City | notes" into "City | lat | lng | notes".
  const itinerary = await enrichItineraryLines(linesToArray(formData.get("itinerary")));
  const itineraryMk = await enrichItineraryLines(linesToArray(formData.get("itineraryMk")));

  const durationDays = Number(formData.get("durationDays"));
  const values = {
    slug,
    title,
    summary: str(formData, "summary"),
    titleMk: str(formData, "titleMk") || null,
    summaryMk: str(formData, "summaryMk") || null,
    description: str(formData, "description"),
    descriptionMk: str(formData, "descriptionMk") || null,
    durationDays: Number.isFinite(durationDays) && durationDays > 0 ? durationDays : null,
    priceFrom: str(formData, "priceFrom"),
    onSale: formData.get("onSale") === "on",
    salePriceFrom: str(formData, "salePriceFrom"),
    grad: str(formData, "grad") || null,
    images: linesToArray(formData.get("images")),
    itinerary,
    itineraryMk,
    departures: linesToArray(formData.get("departures")),
    included: linesToArray(formData.get("included")),
    notIncluded: linesToArray(formData.get("notIncluded")),
    visaNotes: str(formData, "visaNotes"),
    includedMk: linesToArray(formData.get("includedMk")),
    notIncludedMk: linesToArray(formData.get("notIncludedMk")),
    visaNotesMk: str(formData, "visaNotesMk") || null,
    excursions: await readExcursions(formData),
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    updatedAt: new Date(),
  };

  let tripId: number;
  if (id) {
    await db
      .update(trips)
      .set(uploaded ? { ...values, image: uploaded } : values)
      .where(eq(trips.id, id));
    tripId = id;
  } else {
    const [row] = await db
      .insert(trips)
      .values({ ...values, image: uploaded })
      .returning({ id: trips.id });
    tripId = row.id;
  }

  // Replace destination links.
  const destinationIds = formData
    .getAll("destinationIds")
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n) && n > 0);

  await db.delete(tripDestinations).where(eq(tripDestinations.tripId, tripId));
  if (destinationIds.length) {
    await db.insert(tripDestinations).values(
      destinationIds.map((destinationId, position) => ({
        tripId,
        destinationId,
        position,
      })),
    );
  }

  // Replace filter tags.
  await db.delete(tripFilterOptions).where(eq(tripFilterOptions.tripId, tripId));
  if (optionIds.length) {
    await db
      .insert(tripFilterOptions)
      .values(optionIds.map((optionId) => ({ tripId, optionId })))
      .onConflictDoNothing();
  }

  revalidateTrips(slug);
  redirect("/admin/trips");
}

export async function deleteTrip(formData: FormData) {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await db.delete(trips).where(eq(trips.id, id)); // cascades to links
  revalidateTrips();
}
