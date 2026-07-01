import { defineRouting } from "next-intl/routing";

/**
 * i18n routing — English (default, unprefixed) + Macedonian (/mk/…).
 * `as-needed` keeps every English URL exactly where it was — including /admin,
 * /login and the auth flow — while Macedonian gets the /mk prefix. Locale
 * detection is off so we never auto-redirect; the language switcher is explicit.
 */
export const routing = defineRouting({
  locales: ["en", "mk"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
