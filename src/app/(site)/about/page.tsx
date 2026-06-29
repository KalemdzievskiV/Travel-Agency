import type { Metadata } from "next";
import { Button } from "@/components/ui";
import {
  AboutMasthead,
  StoryRow,
  FeatureBand,
  PurposeScroller,
  ValuesScroller,
  TrustBadges,
} from "@/components/about";
import { aboutPage } from "@/content/about";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "bookit is a tailor-made travel studio in North Macedonia. We design journeys around how you want to feel — curious, thoughtful and quietly precise.",
};

export default function AboutPage() {
  return (
    <>
      {/* Masthead — big word + lead, hero image overlapping the seam */}
      <AboutMasthead
        word="About us"
        eyebrow={aboutPage.hero.eyebrow}
        title={aboutPage.hero.title}
        intro={aboutPage.hero.intro}
        grad={aboutPage.hero.grad}
        image={aboutPage.hero.image}
      />

      {/* What we're about / our story — editorial alternating rows */}
      <section style={{ background: "var(--wf-cream)", padding: "clamp(48px, 8vw, 96px) 0 clamp(64px, 9vw, 112px)" }}>
        <div
          className="wf-wrap wf-wrap--wide"
          style={{ display: "grid", gap: "clamp(56px, 9vw, 104px)" }}
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
        eyebrow="What we stand for"
        title="Three things we never travel without"
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
            Ready to feel something new?
          </h2>
          <div style={{ marginTop: 28 }}>
            <Button variant="primary" size="lg" as="a" href="/trip-finder">
              Start your journey
            </Button>
          </div>
        </div>
      </section>

      {/* Accreditation bar */}
      <section style={{ background: "var(--wf-sand)", padding: "clamp(48px, 7vw, 72px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <TrustBadges />
        </div>
      </section>
    </>
  );
}
