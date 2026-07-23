import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/home/HomeHero";
import { StartYourJourney } from "@/components/home/StartYourJourney";
import { ExploreTrips } from "@/components/home/ExploreTrips";
import { WhyBookit } from "@/components/home/WhyBookit";
import { EnquireButton } from "@/components/site/EnquireButton";
import { getTrips } from "@/lib/queries/public";
import { getExperienceCategories } from "@/lib/queries/experiences";
import { journeyTabs } from "@/content/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [trips, whoCategories, t] = await Promise.all([
    getTrips(),
    getExperienceCategories("who"),
    getTranslations(),
  ]);

  // The "who's travelling" tab is the same set of experience categories the
  // Experiences hub and the mega-menu show — driven from the one DB source so
  // labels and imagery can't drift apart. The rest of the tabs stay static.
  const tabs = whoCategories.length
    ? [
        {
          ...journeyTabs[0],
          cards: whoCategories.map((c) => ({
            label: c.title,
            image: c.image ?? "",
            href: `/experiences/${c.slug}`,
          })),
        },
        ...journeyTabs.slice(1),
      ]
    : journeyTabs;

  return (
    <>
      <HomeHero />

      {/* Feeling intro */}
      <section
        id="about"
        style={{
          // Longhands only: the white base stays underneath the line-art
          // backdrop, which is itself an opaque white artboard.
          backgroundColor: "var(--wf-cream)",
          backgroundImage: "url(/images/bg-lines-1.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "clamp(64px, 9vw, 104px) 0",
          scrollMarginTop: "var(--wf-header-h)",
        }}
      >
        <div className="wf-wrap" style={{ maxWidth: 1040, textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--wf-font-sans)",
              fontWeight: 700,
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
          </div>
          <div style={{ marginTop: "clamp(28px, 4vw, 40px)", display: "flex", justifyContent: "center" }}>
            <EnquireButton variant="dark" size="lg">
              {t("common.getInTouch")}
            </EnquireButton>
          </div>
        </div>
      </section>

      {/* Start your journey — tabbed card row */}
      <StartYourJourney tabs={tabs} />

      {/* Explore our trips — left title + horizontal trip cards */}
      <ExploreTrips trips={trips} />

      {/* Why bookit? — icon points, rating, CTA band */}
      <WhyBookit />
    </>
  );
}
