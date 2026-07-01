import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui";
import { ProcessSteps } from "@/components/about";
import { getAbout } from "@/content/about";

export const metadata: Metadata = {
  title: "How it all works",
  description:
    "From the first conversation to the moment you're home — how planning a tailor-made journey with bookit works, step by step.",
};

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const { howItWorks } = getAbout(locale);

  return (
    <>
      <ProcessSteps steps={howItWorks} title={t("howTitle")} />

      <section style={{ background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)", padding: "clamp(64px, 9vw, 96px) 0" }}>
        <div className="wf-wrap wf-wrap--default" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(28px, 4.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {t("howCta")}
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
