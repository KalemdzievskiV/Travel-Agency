import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui";
import {
  AboutMasthead,
  StoryRow,
  PurposeScroller,
  ValuesScroller,
} from "@/components/about";
import { getAbout } from "@/content/about";
import { aboutPurposePanel, pageBackdrop, plainBand } from "@/content/media";

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

      {/* How it began. The one board on this page: 3.2 left "кои сме ние" to us
          and asked only that it not be too much, so the About cluster carries a
          single D3 on each page's body text and plain white everywhere else. */}
      <section style={{ ...pageBackdrop("d3"), padding: "clamp(36px, 5.5vw, 64px) 0 clamp(28px, 4vw, 48px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <StoryRow {...aboutPage.story[0]} />
        </div>
      </section>

      {/* Why the name? Moved up out of the tail of the page: "Тука следно треба
          да биде идеата зад името... па под ИДЕАТА ЗА ИМЕТО да дојде овој дел
          што е моментално на скринов" — it now sits between how it began and
          how we think, which is what follows it. */}
      <section style={{ ...plainBand, padding: "clamp(28px, 4vw, 48px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <StoryRow {...aboutPage.name} />
        </div>
      </section>

      {/* How we think, then what we do. */}
      <section style={{ ...plainBand, padding: "clamp(28px, 4vw, 48px) 0 clamp(40px, 6vw, 72px)" }}>
        <div
          className="wf-wrap wf-wrap--wide"
          style={{ display: "grid", gap: "clamp(36px, 5.5vw, 64px)" }}
        >
          {aboutPage.story.slice(1).map((row) => (
            <StoryRow key={row.title} {...row} />
          ))}
        </div>
      </section>

      {/* Purpose — full-screen pinned, facets change on scroll. On the closing
          band's photograph since 3.1, rather than a green field directly above
          the green values band. */}
      <PurposeScroller
        eyebrow={aboutPage.purpose.eyebrow}
        statement={aboutPage.purpose.statement}
        facets={aboutPage.purpose.facets}
        grad={aboutPurposePanel}
      />

      {/* Values — pinned teal band; cards appear side by side as you scroll */}
      <ValuesScroller
        title={t("valuesTitle")}
        intro={t("valuesIntro")}
        values={aboutPage.values}
      />

      {/* The closing "Твојот свет" band stood here. 3.1: "Оваа секција тргни
          ја скроз." Its photograph is not lost — it is the purpose band's
          ground now. The copy stays in `about.ts` under `world`, unrendered,
          in case they want it back. */}

      {/* Primary CTA.
          TODO(3.1): "И стави позадина од новите кремасти што ти ги пратив" —
          the cream boards have not arrived, so this keeps plain white. */}
      <section style={{ ...plainBand, padding: "clamp(52px, 7vw, 88px) 0" }}>
        <div className="wf-wrap wf-wrap--default" style={{ textAlign: "center" }}>
          <h2 className="wf-h2" style={{ margin: 0, color: "var(--wf-ink-900)" }}>
            {t("ctaReadyNew")}
          </h2>
          <div style={{ marginTop: 28 }}>
            <Button variant="primary" size="lg" as="a" href="/trip-finder" className="wf-cta-mono">
              {tc("planMyTrip")}
            </Button>
          </div>
        </div>
      </section>

    </>
  );
}
