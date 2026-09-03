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
  const [t, tc] = await Promise.all([
    getTranslations("about"),
    getTranslations("common"),
  ]);
  const { howItWorks } = getAbout(locale);

  return (
    <>
      <ProcessSteps steps={howItWorks} title={t("howTitle")} />

      {/* TODO(3.1): "Stavi pozadina od novite krem nekoja" — the cream boards
          have not arrived, so this keeps the ink ground. */}
      <section style={{ background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)", padding: "clamp(52px, 7vw, 80px) 0" }}>
        <div className="wf-wrap wf-wrap--default" style={{ textAlign: "center" }}>
          <h2 className="wf-h2" style={{ margin: 0 }}>
            {t("howCta")}
          </h2>
          <div style={{ marginTop: 28 }}>
            <Button variant="primary" size="lg" as="a" href="/trip-finder" className="wf-cta-mono--light">
              {tc("planMyTrip")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
