"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TripGallery — image carousel for a trip or hotel (modelled on Black Tomato).
 * The current image is centred with the previous and next ones peeking in at
 * the edges, faded back; prev/next arrows and an "n / total" counter drive it.
 * Falls back to the hero image when no gallery has been added.
 *
 * Layout lives in .wf-gallery in responsive.css — this only tracks the index.
 */
export function TripGallery({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = React.useState(0);
  const total = images.length;
  if (total === 0) return null;

  const go = (dir: 1 | -1) => setI((v) => (v + dir + total) % total);

  // Bookend the track with a copy of the last and first images, so the first
  // and last slides still have something to peek at instead of white space.
  // That shifts every real image one place right: image n lives at n + 1.
  const looped = total > 1;
  const slides = looped ? [images[total - 1], ...images, images[0]] : images;
  const activePos = looped ? i + 1 : 0;

  return (
    <section style={{ background: "var(--wf-paper)" }}>
      <div className="wf-gallery">
        <div
          className="wf-gallery__track"
          style={{ "--wf-gal-i": activePos } as React.CSSProperties}
        >
          {slides.map((src, pos) => {
            const isActive = pos === activePos;
            // Map a track position back to the image it shows, for the alt text.
            const idx = looped ? (pos - 1 + total) % total : pos;
            return (
              <div key={pos} className={`wf-gallery__slide${isActive ? " is-active" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${title} — ${idx + 1} of ${total}`}
                  // Only the centred slide is announced; the peeking neighbours
                  // (and the duplicated bookends) are decorative.
                  aria-hidden={!isActive}
                />
              </div>
            );
          })}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              className="wf-carousel-arrow wf-gallery__arrow--prev"
              onClick={() => go(-1)}
            >
              <ChevronLeft size={22} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next image"
              className="wf-carousel-arrow wf-gallery__arrow--next"
              onClick={() => go(1)}
            >
              <ChevronRight size={22} aria-hidden />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, padding: "16px 0 4px", color: "var(--wf-ink-500)" }}>
          <button type="button" aria-label="Previous image" onClick={() => go(-1)} style={arrowBtn}>
            <ChevronLeft size={16} aria-hidden />
          </button>
          <span style={{ fontFamily: "var(--wf-font-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
            {i + 1} / {total}
          </span>
          <button type="button" aria-label="Next image" onClick={() => go(1)} style={arrowBtn}>
            <ChevronRight size={16} aria-hidden />
          </button>
        </div>
      )}
    </section>
  );
}

const arrowBtn: React.CSSProperties = {
  display: "grid",
  placeItems: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "var(--wf-ink-500)",
  padding: 4,
};
