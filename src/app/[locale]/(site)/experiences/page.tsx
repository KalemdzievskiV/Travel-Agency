import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";
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
  const [categories, t] = await Promise.all([
    getExperienceCategories(),
    getTranslations("experiencesPage"),
  ]);

  return (
    <section style={{ background: "var(--wf-cream)", padding: "calc(var(--wf-header-h) + clamp(40px, 6vw, 72px)) 0 clamp(64px, 9vw, 104px)" }}>
      <div className="wf-wrap wf-wrap--wide">
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
      </div>
    </section>
  );
}
