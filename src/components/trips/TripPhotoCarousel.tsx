"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TripPhotoCarousel — one photo at a time with arrows and dots, sized to its
 * container rather than the viewport.
 *
 * The existing TripGallery is deliberately full-bleed with neighbouring slides
 * peeking in, which falls apart in a half-width column; this is the column-safe
 * version used by the trip layout variants.
 */
export function TripPhotoCarousel({
  images,
  title,
  ratio = "4 / 5",
  height,
}: {
  images: string[];
  title: string;
  /** CSS aspect-ratio for the frame. Ignored when `height` is given. */
  ratio?: string;
  /** Fixed frame height — for slotting into a panel that must not resize
   *  when the content switches. */
  height?: string;
}) {
  const [i, setI] = React.useState(0);
  const total = images.length;
  const go = React.useCallback(
    (dir: 1 | -1) => setI((v) => (v + dir + total) % total),
    [total],
  );

  if (total === 0) return null;

  return (
    <div className="wf-tripcar" style={height ? { height: "100%" } : undefined}>
      <div className="wf-tripcar__frame" style={height ? { height } : { aspectRatio: ratio }}>
        {images.map((src, idx) => (
          <div
            key={src + idx}
            className={`wf-tripcar__slide${idx === i ? " wf-tripcar__slide--on" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
            role="img"
            aria-label={`${title} — ${idx + 1}/${total}`}
            aria-hidden={idx !== i}
          />
        ))}

        {total > 1 && (
          <>
            <button
              type="button"
              className="wf-carousel-arrow wf-carousel-arrow--prev wf-tripcar__arrow"
              aria-label="Previous photo"
              onClick={() => go(-1)}
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              className="wf-carousel-arrow wf-carousel-arrow--next wf-tripcar__arrow"
              aria-label="Next photo"
              onClick={() => go(1)}
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="wf-tripcar__dots">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Photo ${idx + 1}`}
              aria-current={idx === i}
              className={`wf-tripcar__dot${idx === i ? " wf-tripcar__dot--on" : ""}`}
              onClick={() => setI(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
