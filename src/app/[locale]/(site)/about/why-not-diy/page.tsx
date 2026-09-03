import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button, emphasise } from "@/components/ui";
import { WhySplit } from "@/components/about";
import { getAbout } from "@/content/about";

export const metadata: Metadata = {
  title: "Why not just do it yourself?",
  description:
    "You could plan it alone — but here is what changes when you don't have to. Time, ideas, value, peace of mind and a watertight plan from bookit.",
};

export default async function WhyNotDiyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tc = await getTranslations("common");
  const { whyNotDiy } = getAbout(locale);

  return (
    <>
      <WhySplit
        eyebrow={whyNotDiy.hero.eyebrow}
        title={whyNotDiy.hero.title}
        intro={whyNotDiy.hero.intro}
        topics={whyNotDiy.topics}
      />

      {/* TODO(3.1): the client asked for one of the new cream boards here
          ("Овде стави од кремастите позадини некоја"). Those files have not
          arrived — D1–D4 are white, not cream — so the band keeps the ink
          ground until they do. Swapping it means a light background and dark
          type, not just a `backgroundImage`. */}
      <section style={{ background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)", padding: "clamp(52px, 7vw, 80px) 0" }}>
        <div className="wf-wrap wf-wrap--default" style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--wf-font-sans)",
              fontWeight: 500,
              fontSize: "var(--wf-subtitle-size)",
              lineHeight: "var(--wf-subtitle-leading)",
              letterSpacing: "-0.005em",
              maxWidth: "var(--wf-subtitle-measure)",
              margin: "0 auto",
            }}
          >
            {whyNotDiy.closing}
          </p>
          <p
            style={{
              fontSize: "var(--wf-body-size)",
              lineHeight: "var(--wf-body-leading)",
              color: "rgba(233, 245, 246, 0.78)",
              maxWidth: "var(--wf-body-measure-wide)",
              margin: "16px auto 0",
            }}
          >
            {emphasise(whyNotDiy.closingBody)}
          </p>
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
