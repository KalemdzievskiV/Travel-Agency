import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation helpers. Use these `Link`/`useRouter`/`usePathname`
 * in place of the next/navigation ones for anything inside the localized site,
 * so links keep the active locale prefix automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
