import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHero, Reveal } from "@/components/about";
import { press } from "@/content/site";

export const metadata: Metadata = {
  title: "In the press",
  description: "Where bookit and the journeys we design have been featured.",
};

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  return (
    <>
      <AboutHero
        eyebrow={t("whoWeAre")}
        title={t("pressTitle")}
        intro={t("pressIntro")}
        grad="linear-gradient(135deg,#6a4f6a,#16130f)"
      />

      <section style={{ background: "var(--wf-cream)", padding: "clamp(64px, 9vw, 112px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div className="wf-grid wf-grid-3">
            {press.map((name, i) => (
              <Reveal key={name} delay={i * 0.05}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 120,
                    border: "1px solid var(--wf-border)",
                    borderRadius: "var(--wf-radius-md)",
                    background: "var(--wf-cream-2)",
                    padding: "24px",
                    fontFamily: "var(--wf-font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(18px, 2.4vw, 24px)",
                    letterSpacing: "0.04em",
                    color: "var(--wf-ink-700)",
                    textAlign: "center",
                  }}
                >
                  {name}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
