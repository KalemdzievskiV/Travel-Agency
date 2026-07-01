"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import {
  destinations,
  destinationFilterOptions,
  filterOptions,
  filterGroups,
  regions,
} from "@/db/schema";
import { requireUser } from "@/lib/session";
import { slugify, linesToArray } from "@/lib/slug";
import { uploadImage } from "@/lib/uploads";


function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
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

  const optionIds = formData
    .getAll("optionIds")
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n) && n > 0);

  // Keep the legacy feelings[] column in sync with the Feeling taxonomy group.
  const feelingLabels = optionIds.length
    ? (
        await db
          .select({ label: filterOptions.label })
          .from(filterOptions)
          .innerJoin(filterGroups, eq(filterOptions.groupId, filterGroups.id))
          .where(and(inArray(filterOptions.id, optionIds), eq(filterGroups.key, "feeling")))
      ).map((r) => r.label)
    : [];

  const values = {
    slug,
    region: regionLabel,
    regionId,
    title,
    teaser: str(formData, "teaser"),
    intro: str(formData, "intro"),
    badge: str(formData, "badge"),
    whenToGo: str(formData, "whenToGo"),
    grad: str(formData, "grad") || null,
    highlights: linesToArray(formData.get("highlights")),
    bestMonths: linesToArray(formData.get("bestMonths")),
    feelings: feelingLabels,
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    updatedAt: new Date(),
  };

  let destinationId: number;
  if (id) {
    await db
      .update(destinations)
      .set(uploaded ? { ...values, image: uploaded } : values)
      .where(eq(destinations.id, id));
    destinationId = id;
  } else {
    const [row] = await db
      .insert(destinations)
      .values({ ...values, image: uploaded })
      .returning({ id: destinations.id });
    destinationId = row.id;
  }

  // Replace filter tags.
  await db.delete(destinationFilterOptions).where(eq(destinationFilterOptions.destinationId, destinationId));
  if (optionIds.length) {
    await db
      .insert(destinationFilterOptions)
      .values(optionIds.map((optionId) => ({ destinationId, optionId })))
      .onConflictDoNothing();
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
