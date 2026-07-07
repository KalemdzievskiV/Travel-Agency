"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { hotels, destinations } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { slugify, linesToArray } from "@/lib/slug";
import { uploadImage } from "@/lib/uploads";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function numOrNull(formData: FormData, key: string): number | null {
  const v = str(formData, key);
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

async function revalidateHotels(destinationId: number | null) {
  revalidatePath("/admin/hotels");
  if (destinationId) {
    const [d] = await db.select({ slug: destinations.slug }).from(destinations).where(eq(destinations.id, destinationId)).limit(1);
    if (d) revalidatePath(`/destinations/${d.slug}`);
  }
}

export async function saveHotel(formData: FormData) {
  await requireUser();

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const name = str(formData, "name");
  if (!name) throw new Error("Name is required");
  const slug = str(formData, "slug") || slugify(name);
  const uploaded = await uploadImage(formData.get("image"));

  const values = {
    slug,
    name,
    teaser: str(formData, "teaser"),
    description: str(formData, "description"),
    destinationId: Number(formData.get("destinationId")) || null,
    lat: numOrNull(formData, "lat"),
    lng: numOrNull(formData, "lng"),
    images: linesToArray(formData.get("images")),
    priceFrom: str(formData, "priceFrom"),
    stars: numOrNull(formData, "stars"),
    style: linesToArray(formData.get("style")),
    grad: str(formData, "grad") || null,
    nameMk: str(formData, "nameMk") || null,
    teaserMk: str(formData, "teaserMk") || null,
    descriptionMk: str(formData, "descriptionMk") || null,
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(hotels).set(uploaded ? { ...values, image: uploaded } : values).where(eq(hotels.id, id));
  } else {
    await db.insert(hotels).values({ ...values, image: uploaded });
  }

  await revalidateHotels(values.destinationId);
  redirect("/admin/hotels");
}

export async function deleteHotel(formData: FormData) {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await db.delete(hotels).where(eq(hotels.id, id));
  revalidatePath("/admin/hotels");
}
