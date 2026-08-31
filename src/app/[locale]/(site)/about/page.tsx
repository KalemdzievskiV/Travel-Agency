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
import { pageBackdrop } from "@/content/media";

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
  const [t, tc] = await Promise.all([
    getTranslations("about"),
    getTranslations("common"),
  ]);
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
        band={aboutPage.hero.band}
        image={aboutPage.hero.image}
      />

      {/* What we're about / our story — editorial alternating rows */}
      <section style={{ ...pageBackdrop(0), padding: "clamp(36px, 5.5vw, 64px) 0 clamp(40px, 6vw, 72px)" }}>
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

      {/* Values — pinned teal band; cards appear side by side as you scroll */}
      <ValuesScroller
        title={t("valuesTitle")}
        intro={t("valuesIntro")}
        values={aboutPage.values}
      />

      {/* Why the name? */}
      <section style={{ ...pageBackdrop(1), padding: "clamp(64px, 9vw, 112px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <StoryRow {...aboutPage.name} />
        </div>
      </section>

      {/* Your world, your journey — closing feeling band. The scrim was 0.68,
          tuned for the pale world map the client replaced in revision 3.1;
          their photograph is dark to begin with, so it is dialled back to let
          the picture read — white copy still clears 5.67:1 over its brightest
          part. */}
      <FeatureBand
        eyebrow={aboutPage.world.eyebrow}
        title={aboutPage.world.title}
        body={aboutPage.world.body}
        grad={aboutPage.world.grad}
        image={aboutPage.world.image}
        scrim={0.55}
      />

      {/* Primary CTA */}
      <section style={{ ...pageBackdrop(2), padding: "clamp(64px, 9vw, 104px) 0" }}>
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
              {tc("planMyTrip")}
            </Button>
          </div>
        </div>
      </section>

    </>
  );
}
