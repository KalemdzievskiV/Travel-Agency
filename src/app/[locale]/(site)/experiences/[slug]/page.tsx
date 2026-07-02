import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { TripsCarousel } from "@/components/sections/TripsCarousel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getExperienceCategoryBySlug } from "@/lib/queries/experiences";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = await getExperienceCategoryBySlug(slug);
  if (!c) return { title: "Experience not found" };
  return { title: c.title, description: c.subtitle || c.heroText };
}

export default async function ExperienceCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getExperienceCategoryBySlug(slug);
  if (!c) notFound();
  const t = await getTranslations("experiencesPage");

  const subLink: React.CSSProperties = {
    textDecoration: "none",
    fontFamily: "var(--wf-font-sans)",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--wf-ink-700)",
  };
  const crumb: React.CSSProperties = { color: "var(--wf-ink-500)", textDecoration: "underline", textUnderlineOffset: "2px" };
  const anchorPad = { scrollMarginTop: "calc(var(--wf-header-h) + 66px)" } as React.CSSProperties;

  const bodyStyle: React.CSSProperties = {
    fontSize: "clamp(16px, 1.9vw, 18px)",
    lineHeight: 1.75,
    color: "var(--wf-ink-700)",
    whiteSpace: "pre-line",
    margin: 0,
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "clamp(360px, 56vh, 560px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginTop: "calc(-1 * var(--wf-header-h))",
          textAlign: "center",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: c.grad || "var(--wf-ink-800)",
            backgroundImage: c.image ? `url(${c.image})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(14,42,51,0.5)" }} />
        <div className="wf-wrap wf-wrap--default" style={{ position: "relative", color: "#fff" }}>
          <Eyebrow tone="light">{t("eyebrow")}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(38px, 7vw, 68px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              margin: "14px 0 0",
            }}
          >
            {c.title}
          </h1>
          {c.subtitle && (
            <p style={{ fontSize: "clamp(16px, 2.2vw, 19px)", color: "rgba(255,255,255,0.86)", maxWidth: 620, margin: "16px auto 0", lineHeight: 1.6 }}>
              {c.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Sticky tab nav */}
      <div style={{ position: "sticky", top: "var(--wf-header-h)", zIndex: 40, background: "var(--wf-cream)", borderBottom: "1px solid var(--wf-border)" }}>
        <nav className="wf-wrap wf-wrap--wide" style={{ display: "flex", justifyContent: "center", gap: "clamp(20px, 4vw, 44px)", flexWrap: "wrap", paddingBlock: 18 }}>
          <a href="#concept" style={{ ...subLink, color: "var(--wf-coral-500)", borderBottom: "2px solid var(--wf-coral-500)", paddingBottom: 4 }}>{t("concept")}</a>
          <a href="#recommendations" style={subLink}>{t("recommendations")}</a>
          {c.faqs.length > 0 && <a href="#faqs" style={subLink}>{t("faqs")}</a>}
        </nav>
      </div>

      {/* Breadcrumb */}
      <div className="wf-wrap wf-wrap--wide" style={{ paddingTop: 16, fontSize: 12.5, color: "var(--wf-ink-500)" }}>
        <Link href="/" style={crumb}>{t("home")}</Link>
        {" / "}
        <Link href="/experiences" style={crumb}>{t("eyebrow")}</Link>
        {" / "}
        <span style={{ color: "var(--wf-ink-700)" }}>{c.title}</span>
      </div>

      {/* Concept */}
      <section id="concept" style={{ background: "var(--wf-cream)", padding: "clamp(48px, 7vw, 80px) 0 clamp(40px, 6vw, 56px)", ...anchorPad }}>
        <div className="wf-wrap" style={{ maxWidth: 760, marginInline: "auto", textAlign: "center" }}>
          <Eyebrow>{t("concept")}</Eyebrow>
          {c.heroText && (
            <p style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.01em", color: "var(--wf-ink-900)", margin: "16px 0 0", fontSize: "clamp(22px, 3.4vw, 30px)" }}>
              {c.heroText}
            </p>
          )}
          {c.concept && <p style={{ ...bodyStyle, textAlign: "left", margin: "clamp(24px, 3vw, 32px) 0 0" }}>{c.concept}</p>}
        </div>
      </section>

      {/* Our recommendations */}
      <section id="recommendations" style={{ background: "var(--wf-cream)", padding: "0 0 clamp(8px, 2vw, 16px)", ...anchorPad }}>
        <div className="wf-wrap" style={{ maxWidth: 760, marginInline: "auto", textAlign: "center" }}>
          <Eyebrow>{t("recommendations")}</Eyebrow>
          {c.recommendations && <p style={{ ...bodyStyle, textAlign: "left", margin: "16px 0 0" }}>{c.recommendations}</p>}
        </div>
      </section>
      {c.trips.length > 0 && (
        <TripsCarousel trips={c.trips} eyebrow={t("recommendations")} title={t("tripsHeading")} description={t("tripsIntro")} />
      )}

      {/* FAQs */}
      {c.faqs.length > 0 && (
        <section id="faqs" style={{ background: "var(--wf-cream)", padding: "clamp(56px, 8vw, 88px) 0 clamp(64px, 9vw, 104px)", ...anchorPad }}>
          <div className="wf-wrap" style={{ maxWidth: 820, marginInline: "auto" }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(24px, 4vw, 36px)" }}>
              <Eyebrow>{t("faqs")}</Eyebrow>
            </div>
            <FaqAccordion items={c.faqs} />
          </div>
        </section>
      )}
    </>
  );
}
