"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TripGallery — full-width image carousel for a trip (modelled on Black Tomato).
 * One image at a time with prev/next arrows and an "n / total" counter. Falls
 * back to the trip's hero image when no gallery has been added.
 */
export function TripGallery({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = React.useState(0);
  const total = images.length;
  if (total === 0) return null;

  const go = (dir: 1 | -1) => setI((v) => (v + dir + total) % total);

  return (
    <section style={{ background: "var(--wf-paper)" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 8", maxHeight: "78vh", overflow: "hidden", background: "var(--wf-ink-900)" }}>
        {images.map((src, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={idx}
            src={src}
            alt={`${title} — ${idx + 1} of ${total}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: idx === i ? 1 : 0,
              transition: "opacity 0.5s var(--wf-ease-out)",
            }}
          />
        ))}

        {total > 1 && (
          <>
            <button type="button" aria-label="Previous image" className="wf-carousel-arrow wf-carousel-arrow--prev" style={{ left: "clamp(12px, 3vw, 28px)" }} onClick={() => go(-1)}>
              <ChevronLeft size={22} aria-hidden />
            </button>
            <button type="button" aria-label="Next image" className="wf-carousel-arrow" style={{ right: "clamp(12px, 3vw, 28px)" }} onClick={() => go(1)}>
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
          <span style={{ fontFamily: "var(--wf-font-sans)", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em" }}>
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
