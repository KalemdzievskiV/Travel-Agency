import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui";
import { ReasonsScroller } from "@/components/about";
import { getAbout } from "@/content/about";
import { royalBluePanel } from "@/content/media";

export const metadata: Metadata = {
  title: "5 reasons to book with us",
  description:
    "Why travellers plan with bookit: remarkable people, journeys you can't buy off a shelf, brilliant partners on the ground, and care from first idea to home.",
};

export default async function FiveReasonsPage({
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
  const { reasons, reasonsIntro } = getAbout(locale);

  return (
    <>
      <ReasonsScroller reasons={reasons} intro={reasonsIntro} />

      {/* Same blue wall as the sequence above, so the route closes on one
          surface rather than dropping to a flat, differently-toned dark. */}
      <section style={{ background: royalBluePanel, color: "var(--wf-text-on-dark)", padding: "clamp(64px, 9vw, 96px) 0" }}>
        <div className="wf-wrap wf-wrap--default" style={{ textAlign: "center" }}>
          {/* Two headings since 3.1: "ПЕТ ПРИЧИНИ ПОДОЦНА… (ХЕДИНГ 1)" over
              "Сега ни треба една од тебе. Каде сакаш да одиме? (хединг 2)". */}
          <h2 className="wf-h2 wf-h2--center" style={{ margin: "0 auto" }}>{t("ctaFiveLater")}</h2>
          <p
            style={{
              fontFamily: "var(--wf-font-sans)",
              fontWeight: 500,
              fontSize: "var(--wf-subtitle-size)",
              lineHeight: "var(--wf-subtitle-leading)",
              letterSpacing: "0",
              margin: "12px auto 0",
              maxWidth: "var(--wf-subtitle-measure)",
              opacity: 0.92,
            }}
          >
            {t("ctaReadyWhen")}
          </p>
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
