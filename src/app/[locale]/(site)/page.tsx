import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/home/HomeHero";
import { StartYourJourney } from "@/components/home/StartYourJourney";
import { ExploreTrips } from "@/components/home/ExploreTrips";
import { WhyBookit } from "@/components/home/WhyBookit";
import { EnquireButton } from "@/components/site/EnquireButton";
import { getDestinations, getTrips } from "@/lib/queries/public";
import { getExperienceCategories } from "@/lib/queries/experiences";
import { journeyTabs } from "@/content/site";
import { pageBackdrop } from "@/content/media";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [trips, whoCategories, destinations, t] = await Promise.all([
    getTrips(),
    getExperienceCategories("who"),
    getDestinations(),
    getTranslations(),
  ]);

  // "Most popular" — real destinations rather than the Macedonian places the
  // design shipped with, none of which exist in the catalogue. One per region
  // so the row spans continents instead of showing five neighbours, then top up
  // if fewer than five regions have anything to show. Most destinations still
  // carry placeholder imagery; these cards will improve on their own as real
  // photography is uploaded in the admin, with no change needed here.
  const popular: typeof destinations = [];
  const seenRegions = new Set<string>();
  for (const d of destinations) {
    const region = d.regionSlug ?? d.region;
    if (!d.image || seenRegions.has(region)) continue;
    seenRegions.add(region);
    popular.push(d);
    if (popular.length === 5) break;
  }
  for (const d of destinations) {
    if (popular.length === 5) break;
    if (!popular.includes(d)) popular.push(d);
  }

  // Both data-driven tabs come from the one DB source, so labels and imagery
  // can't drift apart. The "by month" tab stays static — its artwork is fixed.
  const tabs = journeyTabs.map((tab) => {
    if (tab.key === "traveller" && whoCategories.length) {
      return {
        ...tab,
        cards: whoCategories.map((c) => ({
          label: c.title,
          image: c.image ?? "",
          href: `/experiences/${c.slug}`,
        })),
      };
    }
    if (tab.key === "popular" && popular.length) {
      return {
        ...tab,
        cards: popular.map((d) => ({
          label: d.title,
          image: d.image ?? "",
          href: `/destinations/${d.slug}`,
        })),
      };
    }
    return tab;
  });

  return (
    <>
      <HomeHero />

      {/* Feeling intro */}
      <section
        id="about"
        style={{
          ...pageBackdrop(0),
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
            <EnquireButton size="lg" className="wf-cta-mono">
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
