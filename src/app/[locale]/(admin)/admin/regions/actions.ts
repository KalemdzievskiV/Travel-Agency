"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { regions } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { slugify } from "@/lib/slug";
import { uploadImage } from "@/lib/uploads";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function revalidateRegions() {
  revalidatePath("/admin/regions");
  revalidatePath("/destinations");
  revalidatePath("/");
}

export async function saveRegion(formData: FormData) {
  await requireUser();

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const label = str(formData, "label");
  if (!label) throw new Error("Label is required");
  const slug = str(formData, "slug") || slugify(label);
  const uploaded = await uploadImage(formData.get("image"));

  const values = {
    slug,
    label,
    labelMk: str(formData, "labelMk") || null,
    grad: str(formData, "grad") || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    published: formData.get("published") === "on",
    updatedAt: new Date(),
  };

  if (id) {
    await db
      .update(regions)
      .set(uploaded ? { ...values, image: uploaded } : values)
      .where(eq(regions.id, id));
  } else {
    await db.insert(regions).values({ ...values, image: uploaded });
  }

  revalidateRegions();
  redirect("/admin/regions");
}

export async function deleteRegion(formData: FormData) {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await db.delete(regions).where(eq(regions.id, id));
  revalidateRegions();
}
