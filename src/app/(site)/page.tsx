import { HomeHero } from "@/components/home/HomeHero";
import { StartYourJourney } from "@/components/home/StartYourJourney";
import { ExploreTrips } from "@/components/home/ExploreTrips";
import { WhyBookit } from "@/components/home/WhyBookit";
import { EnquireButton } from "@/components/site/EnquireButton";
import { getTrips } from "@/lib/queries/public";
import { journeyTabs, site } from "@/content/site";

export default async function HomePage() {
  const trips = await getTrips();

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
        <div className="wf-wrap" style={{ maxWidth: 820, textAlign: "center" }}>
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
            Every journey starts with a feeling
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
              The world is vast, full of wonder. But information engulfs us — see
              this, do that, don&rsquo;t miss this. It seems the more choice there
              is, the more overwhelmed we feel. And you&rsquo;re never once asked
              the only question that matters: <em>how do you want to feel?</em>
            </p>
            <p style={{ margin: 0 }}>
              That&rsquo;s where we come in. bookit is a tailor-made travel studio
              in North Macedonia that designs fully personalised itineraries — not
              templates, not off-the-shelf tours. Whether you&rsquo;re a couple
              seeking adventure, a family exploring together, or a solo traveller
              chasing something extraordinary, we craft every detail around you.
            </p>
            <p style={{ margin: 0 }}>
              Since {site.established.replace("Est. ", "")} we&rsquo;ve planned
              journeys across the Balkans, the Mediterranean and beyond — trusted
              to get the details right, from the first idea to the moment
              you&rsquo;re home. No planning fees, no crowds, no compromises.
            </p>
            <p style={{ margin: 0 }}>So let&rsquo;s begin. Let&rsquo;s do something remarkable.</p>
          </div>
          <div style={{ marginTop: "clamp(28px, 4vw, 40px)", display: "flex", justifyContent: "center" }}>
            <EnquireButton variant="dark" size="lg">
              Get in touch
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
