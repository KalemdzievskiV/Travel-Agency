import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

// Display serif — substitute for Saol Display (swap licensed face later).
const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body grotesk — substitute for Founders Grotesk.
const sans = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-cream text-ink">{children}</body>
    </html>
  );
}
