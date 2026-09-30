"use server";

import { signOut } from "@/lib/auth";
import { requireUser } from "@/lib/session";
import { uploadImage } from "@/lib/uploads";

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}

/**
 * Uploads one admin image on its own and returns its URL. Gallery fields call
 * this per file as soon as it's picked, so each request carries a single photo
 * and a batch never runs into the Server Action body cap on save.
 */
export async function uploadAdminImage(formData: FormData): Promise<string> {
  await requireUser();
  const url = await uploadImage(formData.get("file"));
  if (!url) throw new Error("No image received");
  return url;
}
