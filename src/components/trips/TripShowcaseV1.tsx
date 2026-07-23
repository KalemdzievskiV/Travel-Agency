import { SectionHead } from "@/components/sections/SectionHead";
import { TripGallery } from "@/components/sections/TripGallery";
import { TripItineraryMap } from "@/components/sections/TripItineraryMap";
import { TripDayList, type TripShowcaseProps } from "./showcase-shared";

/**
 * Variant 1 — the layout the site ships today, unchanged: a full-bleed gallery
 * carousel, then the itinerary (pinned route map, or a static image and the
 * day-by-day list where a trip has no coordinates).
 *
 * Kept as its own file purely so the three variants can be compared like for
 * like; if the client picks this one, delete V2/V3 and the switcher.
 */
export function TripShowcaseV1({ images, title, grad, staticImg, stops, days, showMap, labels }: TripShowcaseProps) {
  return (
    <>
      <TripGallery images={images} title={title} />

      {showMap ? (
        <section style={{ background: "var(--wf-cream)", paddingTop: "clamp(40px, 6vw, 72px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <SectionHead eyebrow={labels.eyebrow} title={labels.itinerary} />
          </div>
          <TripItineraryMap stops={stops} days={days} dayWord={labels.day} />
        </section>
      ) : days.length > 0 ? (
        <section style={{ background: "var(--wf-cream)", padding: "clamp(40px, 6vw, 72px) 0 clamp(64px, 9vw, 96px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <SectionHead eyebrow={labels.eyebrow} title={labels.itinerary} />
            <div className="wf-trip-static" style={{ marginTop: "clamp(24px, 4vw, 40px)" }}>
              <div className="wf-trip-static__media" style={{ background: staticImg ? undefined : grad || "var(--wf-ink-800)" }}>
                {staticImg && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={staticImg} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                )}
              </div>
              <TripDayList days={days} stops={stops} dayWord={labels.day} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
