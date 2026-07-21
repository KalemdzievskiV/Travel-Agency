import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Oswald, Nunito_Sans } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

// Display headline font — Oswald (Google Fonts), a condensed grotesque. Drives
// every headline via --wf-font-display; body/UI stays Brandon Grotesque.
const display = Oswald({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body / UI sans — Nunito Sans (Google), loaded as a variable font so the client's
// type spec can be dialled in on its axes rather than picking a static cut:
//   wdth 75–125 (75 = condensed, what the spec asks for)
//   wght 200–1000 (817 for the bolder label style, 400 for everything else)
//   YTLC 440–540 — lowercase height, the axis the spec calls "lowercase height"
// wght ships by default; the other two must be requested explicitly. Crucially
// this carries Cyrillic, which the previous body face did not — Macedonian text
// was silently falling through to a system font.
const sans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  axes: ["YTLC", "opsz", "wdth"],
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
