import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button, Eyebrow, Prose } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { ExperienceTabs } from "@/components/sections/ExperienceTabs";
import { ExperienceCarousel } from "@/components/sections/ExperienceCarousel";
import { getExperienceCategories } from "@/lib/queries/experiences";
import { experiencesHeroImage } from "@/content/site";
import { backdrop, pageBackdrop, pageBoard } from "@/content/media";

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
  const [categories, remarkable, t, tMenu, tc] = await Promise.all([
    getExperienceCategories("who"),
    getExperienceCategories("remarkable"),
    getTranslations("experiencesPage"),
    getTranslations("experiencesMenu"),
    getTranslations("common"),
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
          {/* TODO(3.1): "да биде во зелено" for this label is not achievable
              here. Over the bright half of the masthead photograph the light
              accent sits at 1.76:1 and only reaches 3.96:1 with the scrim at
              0.78, which would flatten the picture — an 11px label needs 4.5:1.
              It stays white; the accent eyebrow the brief also asks for ("сивото
              кое што треба да е зелено") is the band below, on white, where it
              reads. Worth putting back to the client. */}
          <Eyebrow tone="light">{t("eyebrow")}</Eyebrow>
          {/* `.wf-h1` rather than an inline clamp, so this hero moves with the
              display scale 3.1 brought down instead of staying at 68px. */}
          <h1 className="wf-h1" style={{ letterSpacing: "-0.01em", margin: "14px 0 0" }}>
            {t("heroTitle")}
          </h1>
          {/* The line that sat here is gone: "Делот под хедингот текстот тргни го." */}
          <div style={{ marginTop: "clamp(24px, 3.2vw, 36px)", display: "flex", justifyContent: "center" }}>
            <Link href="/make-an-enquiry" style={{ textDecoration: "none" }}>
              <Button as="span" variant="primary" size="lg" className="wf-cta-mono">
                {tc("planMyTrip")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Same entries as the header mega-menu */}
      <ExperienceTabs
        tabs={[
          { label: tMenu("who"), section: "who" },
          { label: tMenu("remarkable"), section: "how" },
          { label: tMenu("finder"), href: "/trip-finder" },
          { label: tMenu("onSale"), href: "/on-sale" },
        ]}
      />

      {/* What we do — "во доживувања генерално кај текстот оди позадина Д3". */}
      <section
        style={{
          ...pageBackdrop("d3"),
          // Pulled up: the client's arrow marked the gap under the tab rail.
          padding: "clamp(22px, 3.2vw, 40px) 0 clamp(16px, 3vw, 32px)",
        }}
      >
        <div className="wf-wrap wf-wrap--wide">
          {/* 980, the destination pages' reading column: the client asked for
              this block to stop running the full width of the page. */}
          <div style={{ maxWidth: 980, marginInline: "auto", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--wf-font-sans)",
                fontWeight: 500,
                // A step down, per the client — it was competing with the hero
                // title a screen above it.
                fontSize: "clamp(17px, 1.9vw, 22px)",
                lineHeight: 1.25,
                letterSpacing: "-0.005em",
                textTransform: "uppercase",
                color: "var(--wf-ink-900)",
                margin: 0,
              }}
            >
              {t("introLead")}
            </p>
            {/* 3.1 rewrote this to a single short paragraph and asked for the
                read-more to go with it ("Тука нема потреба од прочитај повеќе").
                Its closing sentence is bolded, so it renders through Prose. */}
            <div style={{ marginTop: 16 }}>
              <Prose text={t("introBody")} style={{ ...bodyStyle, margin: 0 }} />
            </div>
          </div>
        </div>
      </section>

      <ExperienceCarousel
        id="who"
        tone="dark"
        backgroundImage={backdrop.dark}
        eyebrow={t("whoEyebrow")}
        title={t("whoQuestion")}
        items={categories}
      />

      <ExperienceCarousel
        id="how"
        tone="light"
        backgroundImage={pageBoard("d4").src}
        backgroundPosition={pageBoard("d4").position}
        eyebrow={t("howEyebrow")}
        title={t("howQuestion")}
        items={remarkable}
      />
    </>
  );
}
