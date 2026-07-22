import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui";
import {
  AboutMasthead,
  StoryRow,
  FeatureBand,
  PurposeScroller,
  ValuesScroller,
} from "@/components/about";
import { getAbout } from "@/content/about";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "bookit is a tailor-made travel studio in North Macedonia. We design journeys around how you want to feel — curious, thoughtful and quietly precise.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const { aboutPage } = getAbout(locale);

  return (
    <>
      {/* Masthead — big word + lead, hero image overlapping the seam */}
      <AboutMasthead
        word={t("word")}
        eyebrow={aboutPage.hero.eyebrow}
        title={aboutPage.hero.title}
        intro={aboutPage.hero.intro}
        grad={aboutPage.hero.grad}
        image={aboutPage.hero.image}
      />

      {/* What we're about / our story — editorial alternating rows */}
      <section style={{ background: "var(--wf-cream)", padding: "clamp(36px, 5.5vw, 64px) 0 clamp(40px, 6vw, 72px)" }}>
        <div
          className="wf-wrap wf-wrap--wide"
          style={{ display: "grid", gap: "clamp(36px, 5.5vw, 64px)" }}
        >
          {aboutPage.story.map((row) => (
            <StoryRow key={row.title} {...row} />
          ))}
        </div>
      </section>

      {/* Purpose — full-screen pinned, facets change on scroll */}
      <PurposeScroller
        eyebrow={aboutPage.purpose.eyebrow}
        statement={aboutPage.purpose.statement}
        facets={aboutPage.purpose.facets}
        grad={aboutPage.purpose.grad}
      />

      {/* Values — pinned; columns appear side by side as you scroll */}
      <ValuesScroller
        eyebrow={t("valuesEyebrow")}
        title={t("valuesTitle")}
        values={aboutPage.values}
      />

      {/* Why the name? */}
      <section style={{ background: "var(--wf-cream)", padding: "clamp(64px, 9vw, 112px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <StoryRow {...aboutPage.name} />
        </div>
      </section>

      {/* Your world, your journey — closing feeling band */}
      <FeatureBand
        eyebrow={aboutPage.world.eyebrow}
        title={aboutPage.world.title}
        body={aboutPage.world.body}
        grad={aboutPage.world.grad}
        image={aboutPage.world.image}
      />

      {/* Primary CTA */}
      <section style={{ background: "var(--wf-cream)", padding: "clamp(64px, 9vw, 104px) 0" }}>
        <div className="wf-wrap wf-wrap--default" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(28px, 4.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
              color: "var(--wf-ink-900)",
            }}
          >
            {t("ctaReadyNew")}
          </h2>
          <div style={{ marginTop: 28 }}>
            <Button variant="primary" size="lg" as="a" href="/trip-finder">
              {t("startJourney")}
            </Button>
          </div>
        </div>
      </section>

    </>
  );
}
