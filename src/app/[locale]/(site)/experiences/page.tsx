import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button, Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { ExperienceTabs } from "@/components/sections/ExperienceTabs";
import { ExperienceCarousel } from "@/components/sections/ExperienceCarousel";
import { getExperienceCategories } from "@/lib/queries/experiences";
import { experiencesHeroImage } from "@/content/site";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Tell us about your perfect journey and we'll shape the rest — tailor-made trips built around who's travelling and how you want to travel.",
};

/**
 * The Experiences hub — one shared page for both mega-menu groups. Opens with
 * the invitation and a route into the enquiry form, then a sticky rail matching
 * the mega-menu, then the two card bands it anchors to: who's travelling, and
 * the remarkable experiences.
 */
export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [categories, remarkable, t, tMenu] = await Promise.all([
    getExperienceCategories("who"),
    getExperienceCategories("remarkable"),
    getTranslations("experiencesPage"),
    getTranslations("experiencesMenu"),
  ]);

  const bodyStyle: React.CSSProperties = {
    fontSize: "clamp(15px, 1.7vw, 17px)",
    lineHeight: 1.75,
    color: "var(--wf-ink-700)",
    margin: "16px 0 0",
  };

  return (
    <>
      {/* Invitation — centred over a full-bleed masthead photo. The header
          floats transparent over it (see `overHero` in SiteHeader). */}
      <section
        style={{
          position: "relative",
          minHeight: "clamp(420px, 62vh, 620px)",
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
            backgroundColor: "var(--wf-ink-800)",
            backgroundImage: `url(${experiencesHeroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(14,42,51,0.52)" }} />
        <div
          className="wf-wrap wf-wrap--default"
          style={{ position: "relative", color: "#fff", paddingTop: "var(--wf-header-h)" }}
        >
          <Eyebrow tone="light">{t("eyebrow")}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(34px, 5.6vw, 68px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.04,
              textTransform: "uppercase",
              margin: "14px 0 0",
            }}
          >
            {t("heroTitle")}
          </h1>
          <p
            style={{
              fontSize: "clamp(17px, 2vw, 21px)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.88)",
              margin: "18px auto 0",
              maxWidth: 620,
            }}
          >
            {t("heroSub")}
          </p>
          <div style={{ marginTop: "clamp(24px, 3.2vw, 36px)", display: "flex", justifyContent: "center" }}>
            <Link href="/make-an-enquiry" style={{ textDecoration: "none" }}>
              <Button as="span" variant="primary" size="lg">
                {t("heroCta")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Same three entries as the header mega-menu */}
      <ExperienceTabs
        tabs={[
          { label: tMenu("who"), section: "who" },
          { label: tMenu("remarkable"), section: "how" },
          { label: tMenu("finder"), href: "/trip-finder" },
        ]}
      />

      {/* What we do */}
      <section
        style={{
          background: "var(--wf-cream)",
          padding: "clamp(40px, 6vw, 72px) 0 clamp(16px, 3vw, 32px)",
        }}
      >
        <div className="wf-wrap wf-wrap--wide">
          <div style={{ maxWidth: 720, marginInline: "auto", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                fontSize: "clamp(22px, 2.8vw, 32px)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "var(--wf-ink-900)",
                margin: 0,
              }}
            >
              {t("introLead")}
            </p>
            <p style={bodyStyle}>{t("introBody")}</p>
            <p style={bodyStyle}>{t("introClose")}</p>
          </div>
        </div>
      </section>

      <ExperienceCarousel
        id="who"
        tone="dark"
        eyebrow={tMenu("who")}
        title={t("whoQuestion")}
        items={categories}
      />

      <ExperienceCarousel
        id="how"
        tone="light"
        eyebrow={tMenu("remarkable")}
        title={t("howQuestion")}
        items={remarkable}
      />
    </>
  );
}
