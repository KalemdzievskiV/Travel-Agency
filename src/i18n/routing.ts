import { defineRouting } from "next-intl/routing";

/**
 * i18n routing — Macedonian (default, unprefixed) + English (/en/…).
 * `as-needed` keeps Macedonian URLs unprefixed while English gets the /en
 * prefix. Locale detection is off so we never auto-redirect; the language
 * switcher is explicit and the site always opens in Macedonian.
 */
export const routing = defineRouting({
  locales: ["mk", "en"],
  defaultLocale: "mk",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
