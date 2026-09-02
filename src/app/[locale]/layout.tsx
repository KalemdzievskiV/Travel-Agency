import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Oswald, Manrope } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

// Display headline font — Oswald (Google Fonts), a condensed grotesque. Drives
// every headline via --wf-font-display.
//
// 400 and 500 only, per the type brief: "да не се користи Oswald 600/700 освен
// ако има многу конкретна дизајнерска причина". 400 is the default for hero and
// section headings, 500 for card and category titles. Weight on a headline is
// meant to come from its size and Oswald's condensed shapes, not from thicker
// strokes — so the heavier cuts are not shipped at all rather than left
// available to drift back in.
const display = Oswald({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

// Body / UI sans — Manrope (Google), the face the type brief names for
// everything that is not a headline: navigation, body copy, buttons, labels,
// prices, filters, forms, footer.
//
// It replaces Nunito Sans, which was here for an earlier spec written around
// that face's own axes (wdth 75 / YTLC 540). Manrope is variable on `wght`
// alone — 200–800, so the 400/500/600/700 the brief asks for all come from one
// file — and it carries Cyrillic, which is non-negotiable for a Macedonian
// site. The axis token those Nunito settings needed is gone with it; see
// globals.css.
const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

// Canonical site URL for metadata (OG/canonical). Set NEXT_PUBLIC_SITE_URL in
// production; on Vercel it falls back to the deployment URL, then localhost.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  title: {
    default: "bookit — Tailor-made journeys from North Macedonia",
    template: "%s · bookit",
  },
  description:
    "bookit is a tailor-made travel studio in North Macedonia. Personalised journeys designed around how you want to feel — not where the crowds go.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "bookit — Tailor-made journeys",
    description:
      "Personalised journeys designed around how you want to feel. No templates, no planning fees.",
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-cream text-ink">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
