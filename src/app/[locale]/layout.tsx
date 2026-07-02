import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

// Display serif — Fraunces, the closest free (OFL) stand-in for Black Tomato's
// Saol Display. Swap for the licensed face later by dropping files into
// next/font/local and repointing --wf-font-display.
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body / UI sans — Brandon Grotesque (HVD Fonts), Black Tomato's brand sans.
// Licensed woff2 files live outside /public so they aren't publicly
// downloadable; next/font/local bundles them hashed. Brandon has no 600
// weight, so 600 requests resolve to Bold (700) — the classic Brandon caps look.
const sans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../../fonts/brandon-grotesque/Brandon-Grotesque-Light.woff2", weight: "300", style: "normal" },
    { path: "../../fonts/brandon-grotesque/Brandon-Grotesque-Light-Italic.woff2", weight: "300", style: "italic" },
    { path: "../../fonts/brandon-grotesque/Brandon-Grotesque-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/brandon-grotesque/Brandon-Grotesque-Regular-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../fonts/brandon-grotesque/Brandon-Grotesque-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/brandon-grotesque/Brandon-Grotesque-Medium-Italic.woff2", weight: "500", style: "italic" },
    { path: "../../fonts/brandon-grotesque/Brandon-Grotesque-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../fonts/brandon-grotesque/Brandon-Grotesque-Bold-Italic.woff2", weight: "700", style: "italic" },
  ],
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
