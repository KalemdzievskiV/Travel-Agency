"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { remarkableExperiences } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { slugify } from "@/lib/slug";
import { uploadImage } from "@/lib/uploads";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function saveRemarkable(formData: FormData) {
  await requireUser();

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const title = str(formData, "title");
  if (!title) throw new Error("Title is required");
  const slug = str(formData, "slug") || slugify(title);
  const uploaded = await uploadImage(formData.get("image"));

  const values = {
    slug,
    title,
    teaser: str(formData, "teaser"),
    description: str(formData, "description"),
    tripId: Number(formData.get("tripId")) || null,
    grad: str(formData, "grad") || null,
    titleMk: str(formData, "titleMk") || null,
    teaserMk: str(formData, "teaserMk") || null,
    descriptionMk: str(formData, "descriptionMk") || null,
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    updatedAt: new Date(),
  };

  if (id) {
    await db
      .update(remarkableExperiences)
      .set(uploaded ? { ...values, image: uploaded } : values)
      .where(eq(remarkableExperiences.id, id));
  } else {
    await db.insert(remarkableExperiences).values({ ...values, image: uploaded });
  }

  revalidatePath("/admin/remarkable");
  revalidatePath("/experiences");
  redirect("/admin/remarkable");
}

export async function deleteRemarkable(formData: FormData) {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await db.delete(remarkableExperiences).where(eq(remarkableExperiences.id, id));
  revalidatePath("/admin/remarkable");
  revalidatePath("/experiences");
}
