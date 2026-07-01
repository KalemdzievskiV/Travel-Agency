import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui";
import { AboutHero, MediaPlaceholder, Reveal } from "@/components/about";
import { getAbout } from "@/content/about";

export const metadata: Metadata = {
  title: "Regenerative travel",
  description:
    "How bookit is building journeys that give more than they take — for the communities and landscapes that make them possible.",
};

export default async function RegenerativeTravelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const { regenerative } = getAbout(locale);

  return (
    <>
      <AboutHero
        eyebrow={regenerative.eyebrow}
        title={regenerative.title}
        intro={regenerative.intro}
        grad={regenerative.grad}
      />

      <section style={{ background: "var(--wf-cream)", padding: "clamp(64px, 9vw, 112px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <Reveal className="wf-about-row">
            <div className="wf-about-row__media">
              <MediaPlaceholder grad="linear-gradient(135deg,#4f6f57,#1d2c20)" />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--wf-font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(24px, 3.4vw, 34px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "var(--wf-ink-900)",
                  margin: 0,
                }}
              >
                {t("regenP1")}
              </p>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: "var(--wf-ink-700)",
                  margin: "16px 0 0",
                  maxWidth: 520,
                }}
              >
                {t("regenP2")}
              </p>
              <div style={{ marginTop: 24 }}>
                <Button variant="outline" size="md" as="a" href="/trip-finder">
                  {t("regenCta")}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
