import { SectionHead } from "@/components/sections/SectionHead";
import { TripPhotoCarousel } from "./TripPhotoCarousel";
import { TripItineraryColumn } from "./TripItineraryColumn";
import type { TripShowcaseProps } from "./showcase-shared";

/**
 * Variant 2 — the client's sketch (КОРЕКЦИИ 2.2, img 16–18): the space the
 * gallery used to occupy carries a short block of text, and below it the
 * gallery becomes a carousel on the left with the itinerary on the right.
 *
 * The right column carries the live route map above the day list, wired
 * together by TripItineraryColumn: the map sticks and flies to whichever day
 * you have scrolled to. TripItineraryMap is not reusable here — it pins the
 * whole viewport and only works full width.
 *
 * `introText` is placeholder copy — the client has not supplied the real text.
 */
export function TripShowcaseV2({ images, title, grad, staticImg, stops, days, labels, introText }: TripShowcaseProps) {
  return (
    <>
      <section style={{ background: "var(--wf-cream)", padding: "clamp(28px, 4vw, 48px) 0 clamp(8px, 2vw, 20px)" }}>
        <div className="wf-wrap" style={{ maxWidth: 760, marginInline: "auto", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(16px, 1.9vw, 18px)", lineHeight: 1.75, color: "var(--wf-ink-700)", margin: 0 }}>
            {introText}
          </p>
        </div>
      </section>

      <section style={{ background: "var(--wf-cream)", padding: "clamp(28px, 4vw, 48px) 0 clamp(56px, 8vw, 88px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <SectionHead eyebrow={labels.eyebrow} title={labels.itinerary} />
          <div className="wf-trip-split" style={{ marginTop: "clamp(24px, 4vw, 40px)" }}>
            <div className="wf-trip-split__media">
              <TripPhotoCarousel images={images} title={title} />
            </div>
            <TripItineraryColumn
              stops={stops}
              days={days}
              dayWord={labels.day}
              title={title}
              staticImg={staticImg}
              grad={grad}
            />
          </div>
        </div>
      </section>
    </>
  );
}
