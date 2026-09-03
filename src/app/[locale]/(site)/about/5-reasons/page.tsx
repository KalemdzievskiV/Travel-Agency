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
          <h2 className="wf-h2" style={{ margin: 0 }}>{t("ctaFiveLater")}</h2>
          <p
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 400,
              fontSize: "clamp(18px, 2.1vw, 26px)",
              lineHeight: 1.15,
              letterSpacing: "0",
              textTransform: "uppercase",
              margin: "12px 0 0",
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
