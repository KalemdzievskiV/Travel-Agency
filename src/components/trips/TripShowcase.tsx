import { SectionHead } from "@/components/sections/SectionHead";
import { TripSideBySide } from "./TripSideBySide";
import type { TripShowcaseProps } from "./showcase-shared";

/**
 * The trip itinerary layout: an opening text line, then the itinerary as a sticky panel
 * beside the days, with two buttons swapping that panel between the route map
 * and the photo carousel.
 *
 * Unlike a tabbed layout, the day list is not one of the tabs: it stays on the
 * right through the switch, so you never lose your place in the programme.
 */
export function TripShowcase({ images, title, grad, staticImg, stops, days, labels, introText }: TripShowcaseProps) {
  if (images.length === 0 && days.length === 0) return null;

  return (
    <>
      <section style={{ background: "var(--wf-cream)", padding: "clamp(28px, 4vw, 48px) 0 clamp(20px, 3vw, 28px)" }}>
        <div className="wf-wrap" style={{ maxWidth: 760, marginInline: "auto", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(16px, 1.9vw, 18px)", lineHeight: 1.75, color: "var(--wf-ink-700)", margin: 0 }}>
            {introText}
          </p>
        </div>
      </section>

      <section style={{ background: "var(--wf-cream)", padding: "clamp(20px, 3vw, 36px) 0 clamp(56px, 8vw, 88px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <SectionHead eyebrow={labels.eyebrow} title={labels.itinerary} />
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
        </div>
      </section>
    </>
  );
}
