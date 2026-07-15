import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui";

const SLUGS = ["terms", "cookies", "privacy"] as const;
type Slug = (typeof SLUGS)[number];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) return { title: "Not found" };
  const t = await getTranslations("footer");
  return { title: t(`legal.${slug}`) };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!SLUGS.includes(slug as Slug)) notFound();

  const [tf, tl] = await Promise.all([getTranslations("footer"), getTranslations("legalPage")]);

  return (
    <section style={{ background: "var(--wf-cream)", padding: "calc(var(--wf-header-h) + clamp(40px, 6vw, 72px)) 0 clamp(64px, 9vw, 104px)" }}>
      <div className="wf-wrap" style={{ maxWidth: 760, marginInline: "auto" }}>
        <Eyebrow>{tl("eyebrow")}</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 500,
            fontSize: "clamp(32px, 5.5vw, 52px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.06,
            margin: "14px 0 clamp(24px, 4vw, 36px)",
            color: "var(--wf-ink-900)",
          }}
        >
          {tf(`legal.${slug}`)}
        </h1>
        <p style={{ fontSize: 16.5, lineHeight: 1.75, color: "var(--wf-ink-700)", margin: 0 }}>
          {tl("comingSoon")}
        </p>
      </div>
    </section>
  );
}
