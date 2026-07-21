import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/home/HomeHero";
import { StartYourJourney } from "@/components/home/StartYourJourney";
import { ExploreTrips } from "@/components/home/ExploreTrips";
import { WhyBookit } from "@/components/home/WhyBookit";
import { EnquireButton } from "@/components/site/EnquireButton";
import { getTrips } from "@/lib/queries/public";
import { journeyTabs, site } from "@/content/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [trips, t] = await Promise.all([getTrips(), getTranslations()]);

  return (
    <>
      <HomeHero />

      {/* Feeling intro */}
      <section
        id="about"
        style={{
          background: "var(--wf-cream)",
          padding: "clamp(64px, 9vw, 104px) 0",
          scrollMarginTop: "var(--wf-header-h)",
        }}
      >
        <div className="wf-wrap" style={{ maxWidth: 1040, textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--wf-font-sans)",
              fontWeight: 600,
              fontSize: "clamp(15px, 2vw, 20px)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--wf-ink-900)",
              margin: 0,
            }}
          >
            {t("intro.heading")}
          </h2>
          <div
            style={{
              display: "grid",
              gap: "clamp(18px, 3vw, 26px)",
              margin: "clamp(28px, 4vw, 40px) 0 0",
              fontSize: "clamp(16px, 1.7vw, 18px)",
              lineHeight: 1.7,
              color: "var(--wf-ink-700)",
            }}
          >
            <p style={{ margin: 0 }}>
              {t.rich("intro.p1", { i: (chunks) => <em>{chunks}</em> })}
            </p>
            <p style={{ margin: 0 }}>{t("intro.p2")}</p>
            <p style={{ margin: 0 }}>
              {t("intro.p3", { year: site.established.replace("Est. ", "") })}
            </p>
            <p style={{ margin: 0 }}>{t("intro.p4")}</p>
          </div>
          <div style={{ marginTop: "clamp(28px, 4vw, 40px)", display: "flex", justifyContent: "center" }}>
            <EnquireButton variant="dark" size="lg">
              {t("common.getInTouch")}
            </EnquireButton>
          </div>
        </div>
      </section>

      {/* Start your journey — tabbed card row */}
      <StartYourJourney tabs={journeyTabs} />

      {/* Explore our trips — left title + horizontal trip cards */}
      <ExploreTrips trips={trips} />

      {/* Why bookit? — icon points, rating, CTA band */}
      <WhyBookit />
    </>
  );
}
