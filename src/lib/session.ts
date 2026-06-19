import "server-only";
import { cookies, headers } from "next/headers";
import { decode } from "@auth/core/jwt";

/**
 * Reads the current user from the Auth.js session cookie WITHOUT rewriting it.
 *
 * In Auth.js v5, calling `auth()` inside a Server Action can rotate/clear the
 * session cookie (logging the user out mid-mutation). Server Actions should use
 * this read-only check instead; `auth()` is still fine in layouts/pages (RSC).
 */
export type SessionUser = {
  id: string;
  role: "admin" | "editor";
  email: string;
  name: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const h = await headers();
  const secure = h.get("x-forwarded-proto") === "https";
  const cookieName = secure
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const store = await cookies();
  const raw = store.get(cookieName)?.value;
  if (!raw) return null;

  try {
    const payload = await decode({
      token: raw,
      secret: process.env.AUTH_SECRET!,
      salt: cookieName,
    });
    if (!payload) return null;
    return {
      id: (payload.uid as string) ?? payload.sub ?? "",
      role: (payload.role as "admin" | "editor") ?? "editor",
      email: (payload.email as string) ?? "",
      name: (payload.name as string) ?? "",
    };
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
