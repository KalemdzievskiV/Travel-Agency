"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { experienceCategories } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { slugify, linesToArray } from "@/lib/slug";
import { uploadImage } from "@/lib/uploads";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function revalidateCategories(slug?: string) {
  revalidatePath("/admin/experience-categories");
  revalidatePath("/experiences");
  if (slug) revalidatePath(`/experiences/${slug}`);
}

export async function saveExperienceCategory(formData: FormData) {
  await requireUser();

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const title = str(formData, "title");
  if (!title) throw new Error("Title is required");
  const slug = str(formData, "slug") || slugify(title);
  const uploaded = await uploadImage(formData.get("image"));

  // Checkbox group — the browser posts one entry per ticked box.
  const destinationIds = formData
    .getAll("destinationIds")
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n) && n > 0);

  const values = {
    slug,
    kind: str(formData, "kind") === "remarkable" ? "remarkable" : "who",
    title,
    subtitle: str(formData, "subtitle"),
    destinationIds,
    destinationsHeading: str(formData, "destinationsHeading"),
    destinationsIntro: str(formData, "destinationsIntro"),
    destinationsHeadingMk: str(formData, "destinationsHeadingMk") || null,
    destinationsIntroMk: str(formData, "destinationsIntroMk") || null,
    heroText: str(formData, "heroText"),
    concept: str(formData, "concept"),
    recommendations: str(formData, "recommendations"),
    faqs: linesToArray(formData.get("faqs")),
    whoOptionKey: str(formData, "whoOptionKey"),
    grad: str(formData, "grad") || null,
    titleMk: str(formData, "titleMk") || null,
    subtitleMk: str(formData, "subtitleMk") || null,
    heroTextMk: str(formData, "heroTextMk") || null,
    conceptMk: str(formData, "conceptMk") || null,
    recommendationsMk: str(formData, "recommendationsMk") || null,
    faqsMk: linesToArray(formData.get("faqsMk")),
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    updatedAt: new Date(),
  };

  if (id) {
    await db
      .update(experienceCategories)
      .set(uploaded ? { ...values, image: uploaded } : values)
      .where(eq(experienceCategories.id, id));
  } else {
    await db.insert(experienceCategories).values({ ...values, image: uploaded });
  }

  revalidateCategories(slug);
  redirect("/admin/experience-categories");
}

export async function deleteExperienceCategory(formData: FormData) {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await db.delete(experienceCategories).where(eq(experienceCategories.id, id));
  revalidateCategories();
}
