import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui";
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
  const t = await getTranslations("about");
  const { whyNotDiy } = getAbout(locale);

  return (
    <>
      <WhySplit
        eyebrow={whyNotDiy.hero.eyebrow}
        title={whyNotDiy.hero.title}
        intro={whyNotDiy.hero.intro}
        topics={whyNotDiy.topics}
      />

      <section style={{ background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)", padding: "clamp(64px, 9vw, 96px) 0" }}>
        <div className="wf-wrap wf-wrap--default" style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(24px, 3.6vw, 36px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            {whyNotDiy.closing}
          </p>
          <div style={{ marginTop: 28 }}>
            <Button variant="primary" size="lg" as="a" href="/trip-finder">
              {t("whyNotCta")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
