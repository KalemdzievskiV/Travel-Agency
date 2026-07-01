"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { filterGroups, filterOptions } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { slugify } from "@/lib/slug";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}
function num(formData: FormData, key: string): number {
  const n = Number(formData.get(key));
  return Number.isFinite(n) ? n : 0;
}
function revalidate() {
  revalidatePath("/admin/filters");
  revalidatePath("/trips");
  revalidatePath("/destinations");
}

export async function createGroup(formData: FormData) {
  await requireUser();
  const label = str(formData, "label");
  if (!label) throw new Error("Label is required");
  const key = slugify(str(formData, "key") || label);
  await db
    .insert(filterGroups)
    .values({ key, label, sortOrder: num(formData, "sortOrder") })
    .onConflictDoNothing();
  revalidate();
}

export async function updateGroup(formData: FormData) {
  await requireUser();
  const id = num(formData, "id");
  const label = str(formData, "label");
  if (!label) throw new Error("Label is required");
  await db
    .update(filterGroups)
    .set({
      label,
      sortOrder: num(formData, "sortOrder"),
      published: formData.get("published") === "on",
      updatedAt: new Date(),
    })
    .where(eq(filterGroups.id, id));
  revalidate();
}

export async function deleteGroup(formData: FormData) {
  await requireUser();
  await db.delete(filterGroups).where(eq(filterGroups.id, num(formData, "id")));
  revalidate();
}

export async function createOption(formData: FormData) {
  await requireUser();
  const groupId = num(formData, "groupId");
  const label = str(formData, "label");
  if (!label) throw new Error("Label is required");
  const key = slugify(str(formData, "key") || label);
  await db
    .insert(filterOptions)
    .values({ groupId, key, label, sortOrder: num(formData, "sortOrder") })
    .onConflictDoNothing();
  revalidate();
}

export async function deleteOption(formData: FormData) {
  await requireUser();
  await db.delete(filterOptions).where(eq(filterOptions.id, num(formData, "id")));
  revalidate();
}
