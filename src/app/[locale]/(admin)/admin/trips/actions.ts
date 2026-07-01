"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { trips, tripDestinations } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { slugify, linesToArray } from "@/lib/slug";
import { uploadImage } from "@/lib/uploads";


function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
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

  const durationDays = Number(formData.get("durationDays"));
  const values = {
    slug,
    title,
    summary: str(formData, "summary"),
    description: str(formData, "description"),
    durationDays: Number.isFinite(durationDays) && durationDays > 0 ? durationDays : null,
    priceFrom: str(formData, "priceFrom"),
    grad: str(formData, "grad") || null,
    feelings: linesToArray(formData.get("feelings")),
    itinerary: linesToArray(formData.get("itinerary")),
    departures: linesToArray(formData.get("departures")),
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

  revalidateTrips(slug);
  redirect("/admin/trips");
}

export async function deleteTrip(formData: FormData) {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await db.delete(trips).where(eq(trips.id, id)); // cascades to links
  revalidateTrips();
}
