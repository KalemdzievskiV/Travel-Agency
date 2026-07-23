import { SectionHead } from "@/components/sections/SectionHead";
import { TripSideBySide } from "./TripSideBySide";
import type { TripShowcaseProps } from "./showcase-shared";

/**
 * The trip itinerary layout: an opening text line and the "Програма" heading,
 * then a pinned map/gallery panel that stays in view while the days advance on
 * scroll. Two buttons swap the panel between the route map and the photo
 * carousel; the day column is shared, so switching keeps your place.
 *
 * TripSideBySide is a tall, self-pinning section — it sits as a direct sibling
 * (not inside a padded wf-wrap) so nothing clips its sticky context.
 */
export function TripShowcase({ images, title, grad, staticImg, stops, days, labels, introText }: TripShowcaseProps) {
  if (images.length === 0 && days.length === 0) return null;

  return (
    <>
      <section style={{ background: "var(--wf-cream)", padding: "clamp(28px, 4vw, 48px) 0 clamp(16px, 2.5vw, 24px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div style={{ maxWidth: 760, marginInline: "auto", textAlign: "center", marginBottom: "clamp(20px, 3vw, 32px)" }}>
            <p style={{ fontSize: "clamp(16px, 1.9vw, 18px)", lineHeight: 1.75, color: "var(--wf-ink-700)", margin: 0 }}>
              {introText}
            </p>
          </div>
          <SectionHead eyebrow={labels.eyebrow} title={labels.itinerary} />
        </div>
      </section>

      <TripSideBySide
        stops={stops}
        days={days}
        images={images}
        title={title}
        dayWord={labels.day}
        staticImg={staticImg}
        grad={grad}
        labels={{ map: labels.map, gallery: labels.gallery }}
      />
    </>
  );
}
