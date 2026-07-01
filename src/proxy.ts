import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16 "proxy" (formerly middleware). next-intl resolves the locale and
// rewrites /mk/* while leaving default-locale (English) URLs untouched.
export default createMiddleware(routing);

export const config = {
  // Run on everything except API routes, Next internals and files with an
  // extension (so /admin, /login and the marketing site are all handled).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
