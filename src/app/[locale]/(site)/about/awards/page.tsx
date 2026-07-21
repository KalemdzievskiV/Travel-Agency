import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHero, Reveal } from "@/components/about";

export const metadata: Metadata = {
  title: "Our awards",
  description:
    "Recognition for the journeys we design. Final awards and accreditations to be confirmed with the client.",
};

export default async function AwardsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  // Placeholder accolades — replace with real awards/years.
  const awards = [0, 1, 2, 3];
  return (
    <>
      <AboutHero
        eyebrow={t("whoWeAre")}
        title={t("awardsTitle")}
        intro={t("awardsIntro")}
        grad="linear-gradient(135deg,#7a6a52,#16130f)"
      />

      <section style={{ background: "var(--wf-cream)", padding: "clamp(64px, 9vw, 112px) 0" }}>
        <div className="wf-wrap wf-wrap--default">
          {awards.map((i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div
                style={{
                  display: "flex",
                  gap: "clamp(20px, 5vw, 48px)",
                  alignItems: "baseline",
                  padding: "clamp(20px, 3vw, 28px) 0",
                  borderBottom: "1px solid var(--wf-border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--wf-font-sans)",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "var(--wf-coral-500)",
                    minWidth: 96,
                  }}
                >
                  {t("awardLabel")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--wf-font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(20px, 3vw, 28px)",
                    letterSpacing: "-0.01em",
                    color: "var(--wf-ink-900)",
                  }}
                >
                  {t("awardPlaceholder")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
