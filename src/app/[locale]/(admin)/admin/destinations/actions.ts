"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { destinations, regions } from "@/db/schema";
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

function revalidateDestinations(slug?: string) {
  revalidatePath("/admin/destinations");
  revalidatePath("/");
  revalidatePath("/destinations");
  revalidatePath("/trip-finder");
  if (slug) revalidatePath(`/destinations/${slug}`);
}

export async function saveDestination(formData: FormData) {
  await requireUser();

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const title = str(formData, "title");
  if (!title) throw new Error("Title is required");
  const slug = str(formData, "slug") || slugify(title);

  const uploaded = await uploadImage(formData.get("image"));

  // Region — store the FK and keep the legacy region text in sync from its label.
  const regionId = Number(formData.get("regionId")) || null;
  const regionLabel = regionId
    ? (await db.select({ label: regions.label }).from(regions).where(eq(regions.id, regionId)).limit(1))[0]?.label ?? ""
    : "";

  const values = {
    slug,
    region: regionLabel,
    regionId,
    title,
    teaser: str(formData, "teaser"),
    intro: str(formData, "intro"),
    badge: str(formData, "badge"),
    priceFrom: str(formData, "priceFrom"),
    onSale: formData.get("onSale") === "on",
    salePriceFrom: str(formData, "salePriceFrom"),
    grad: str(formData, "grad") || null,
    lat: numOrNull(formData, "lat"),
    lng: numOrNull(formData, "lng"),
    bestMonths: linesToArray(formData.get("bestMonths")),
    generalNotes: linesToArray(formData.get("generalNotes")),
    generalNotesMk: linesToArray(formData.get("generalNotesMk")),
    titleMk: str(formData, "titleMk") || null,
    teaserMk: str(formData, "teaserMk") || null,
    introMk: str(formData, "introMk") || null,
    badgeMk: str(formData, "badgeMk") || null,
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    updatedAt: new Date(),
  };

  if (id) {
    await db
      .update(destinations)
      .set(uploaded ? { ...values, image: uploaded } : values)
      .where(eq(destinations.id, id));
  } else {
    await db.insert(destinations).values({ ...values, image: uploaded });
  }

  revalidateDestinations(slug);
  redirect("/admin/destinations");
}

export async function deleteDestination(formData: FormData) {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await db.delete(destinations).where(eq(destinations.id, id));
  revalidateDestinations();
}
