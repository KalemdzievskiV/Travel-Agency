import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button, Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "@/components/sections/SectionHead";
import { getExperienceCategories } from "@/lib/queries/experiences";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Tailor-made journeys shaped around who's travelling — families, couples, groups, honeymoons and solo adventures.",
};

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [categories, remarkable, t] = await Promise.all([
    getExperienceCategories("who"),
    getExperienceCategories("remarkable"),
    getTranslations("experiencesPage"),
  ]);

  return (
    <section style={{ background: "var(--wf-cream)", padding: "calc(var(--wf-header-h) + clamp(40px, 6vw, 72px)) 0 clamp(64px, 9vw, 104px)" }}>
      <div className="wf-wrap wf-wrap--wide">
        {/* Intro */}
        <div style={{ maxWidth: 720 }}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(34px, 6vw, 60px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.04,
              margin: "14px 0 0",
              color: "var(--wf-ink-900)",
            }}
          >
            {t("title")}
          </h1>
          <p style={{ fontSize: "clamp(16px, 1.9vw, 19px)", lineHeight: 1.7, color: "var(--wf-ink-700)", margin: "18px 0 0" }}>
            {t("intro")}
          </p>
        </div>

        {/* КОЈ ПАТУВА — who's travelling */}
        {categories.length > 0 ? (
          <div className="wf-grid wf-grid-3" style={{ marginTop: "clamp(32px, 5vw, 56px)" }}>
            {categories.map((c) => (
              <Link key={c.slug} href={`/experiences/${c.slug}`} className="wf-exp-tile">
                <div className="wf-exp-tile__img" style={{ backgroundImage: c.image ? `url(${c.image})` : undefined, background: c.image ? undefined : c.grad || "var(--wf-ink-800)" }} aria-hidden />
                <div className="wf-exp-tile__scrim" aria-hidden />
                <div className="wf-exp-tile__body">
                  <h2 className="wf-exp-tile__title">{c.title}</h2>
                  {c.subtitle && <p className="wf-exp-tile__sub">{c.subtitle}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--wf-ink-500)", marginTop: 40 }}>{t("empty")}</p>
        )}

        {/* Trip finder — the feelings engine, moved here */}
        <div
          style={{
            marginTop: "clamp(56px, 8vw, 96px)",
            background: "var(--wf-ink-900)",
            color: "var(--wf-text-on-dark)",
            borderRadius: "var(--wf-radius-md)",
            padding: "clamp(32px, 5vw, 56px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(20px, 4vw, 40px)",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <Eyebrow tone="light">{t("finderEyebrow")}</Eyebrow>
            <h2 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: "clamp(24px, 3.4vw, 36px)", letterSpacing: "-0.02em", lineHeight: 1.12, margin: "12px 0 0" }}>
              {t("finderHeading")}
            </h2>
            <p style={{ fontSize: "clamp(15px, 1.7vw, 17px)", lineHeight: 1.65, opacity: 0.8, margin: "14px 0 0" }}>
              {t("finderBody")}
            </p>
          </div>
          <Button as="a" href="/trip-finder" variant="primary" size="lg">
            {t("finderCta")}
          </Button>
        </div>

        {/* НЕОБИЧНИ ИСКУСТВА — remarkable experiences */}
        {remarkable.length > 0 && (
          <div style={{ marginTop: "clamp(56px, 8vw, 96px)" }}>
            <SectionHead eyebrow={t("remarkableEyebrow")} title={t("remarkableHeading")} intro={t("remarkableIntro")} />
            <div className="wf-grid wf-grid-3" style={{ marginTop: "clamp(28px, 4vw, 44px)" }}>
              {remarkable.map((e) => (
                <Link key={e.slug} href={`/experiences/${e.slug}`} className="wf-exp-tile">
                  <div className="wf-exp-tile__img" style={{ backgroundImage: e.image ? `url(${e.image})` : undefined, background: e.image ? undefined : e.grad || "var(--wf-ink-800)" }} aria-hidden />
                  <div className="wf-exp-tile__scrim" aria-hidden />
                  <div className="wf-exp-tile__body">
                    <h3 className="wf-exp-tile__title">{e.title}</h3>
                    {e.subtitle && <p className="wf-exp-tile__sub">{e.subtitle}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
