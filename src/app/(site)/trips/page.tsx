import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";
import { TripGrid } from "@/components/sections/TripGrid";
import { getTrips } from "@/lib/queries/public";

export const metadata: Metadata = {
  title: "Trips",
  description:
    "Multi-day tailor-made itineraries across North Macedonia, the Balkans and the Mediterranean — each one shaped around how you want to feel.",
};

export default async function TripsPage() {
  const trips = await getTrips();

  return (
    <>
      <section
        style={{
          background: "var(--wf-ink-900)",
          color: "#fff",
          padding: "calc(var(--wf-header-h) + 56px) 0 56px",
        }}
      >
        <div className="wf-wrap wf-wrap--wide">
          <Eyebrow tone="light">Trips</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(36px, 7vw, 56px)",
              letterSpacing: "-0.02em",
              margin: "16px 0 0",
            }}
          >
            Journeys, start to finish
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(244,239,231,0.75)",
              maxWidth: 540,
              margin: "16px 0 0",
              lineHeight: 1.6,
            }}
          >
            Complete itineraries we design and run end to end — every transfer,
            guide and long lunch arranged around you.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--wf-cream)", padding: "56px 0 96px" }}>
        <div className="wf-wrap wf-wrap--wide">
          {trips.length > 0 ? (
            <TripGrid items={trips} />
          ) : (
            <p style={{ color: "var(--wf-ink-500)" }}>
              New itineraries are on the way. Tell us how you want to feel and
              we&apos;ll craft one.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
