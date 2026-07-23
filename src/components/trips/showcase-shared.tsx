import type { MapStop, MapDay } from "@/components/sections/TripItineraryMap";

/**
 * Shared contract for the trip-page layout variants (see TripShowcaseV1/2/3).
 *
 * The three variants are prototypes for the client to choose between; once one
 * is picked the other two files and the switcher can be deleted outright, and
 * the winner inlined back into the trip page.
 */
export type TripShowcaseProps = {
  images: string[];
  title: string;
  grad: string;
  staticImg?: string;
  stops: MapStop[];
  days: MapDay[];
  /** Whether there is enough geodata to draw the route map. */
  showMap: boolean;
  labels: {
    eyebrow: string;
    itinerary: string;
    gallery: string;
    map: string;
    day: string;
  };
  /** Placeholder body copy for variant 2 — awaiting real text from the client. */
  introText: string;
};

/** Day-by-day list, shared by the variants that show one. */
export function TripDayList({
  days,
  stops,
  dayWord,
}: {
  days: MapDay[];
  stops: MapStop[];
  dayWord: string;
}) {
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {days.map((d, idx) => (
        <li key={idx} style={{ padding: "18px 0", borderTop: idx === 0 ? "none" : "1px solid var(--wf-divider)" }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--wf-font-sans)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--wf-coral-600)",
            }}
          >
            {d.label || `${dayWord} ${d.n}`}
          </span>
          {stops[d.stopIndex]?.name && (
            <span
              style={{
                display: "block",
                margin: "8px 0 0",
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                fontSize: "clamp(20px, 2.4vw, 26px)",
                letterSpacing: "-0.01em",
                color: "var(--wf-ink-900)",
              }}
            >
              {stops[d.stopIndex].name}
            </span>
          )}
          <p style={{ margin: "10px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "var(--wf-ink-700)" }}>{d.text}</p>
        </li>
      ))}
    </ol>
  );
}
