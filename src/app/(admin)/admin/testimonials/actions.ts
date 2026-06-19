"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { requireUser } from "@/lib/session";


function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function revalidateTestimonials() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function saveTestimonial(formData: FormData) {
  await requireUser();

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const quote = str(formData, "quote");
  if (!quote) throw new Error("Quote is required");

  const values = {
    quote,
    who: str(formData, "who"),
    where: str(formData, "where"),
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(testimonials).set(values).where(eq(testimonials.id, id));
  } else {
    await db.insert(testimonials).values(values);
  }

  revalidateTestimonials();
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireUser();
  const id = Number(formData.get("id"));
  if (id) await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidateTestimonials();
}
