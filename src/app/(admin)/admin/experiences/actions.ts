"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { experiences } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { slugify } from "@/lib/slug";
import { uploadImage } from "@/lib/uploads";


function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function revalidateExperiences() {
  revalidatePath("/admin/experiences");
  revalidatePath("/");
}

export async function saveExperience(formData: FormData) {
  await requireUser();

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const title = str(formData, "title");
  if (!title) throw new Error("Title is required");
  const slug = str(formData, "slug") || slugify(title);
  const uploaded = await uploadImage(formData.get("image"));

  const values = {
    slug,
    eyebrow: str(formData, "eyebrow"),
    title,
    body: str(formData, "body"),
    grad: str(formData, "grad") || null,
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    updatedAt: new Date(),
  };

  if (id) {
    await db
      .update(experiences)
      .set(uploaded ? { ...values, image: uploaded } : values)
      .where(eq(experiences.id, id));
  } else {
    await db.insert(experiences).values({ ...values, image: uploaded });
  }

  revalidateExperiences();
  redirect("/admin/experiences");
}

export async function deleteExperience(formData: FormData) {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await db.delete(experiences).where(eq(experiences.id, id));
  revalidateExperiences();
}
