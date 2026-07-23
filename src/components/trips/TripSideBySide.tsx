"use client";

import React from "react";
import { TripRouteMap } from "./TripRouteMap";
import { TripPhotoCarousel } from "./TripPhotoCarousel";
import type { MapStop, MapDay } from "@/components/sections/TripItineraryMap";

/**
 * TripSideBySide — the itinerary with a sticky panel on the left and the days
 * on the right, where two buttons swap the left panel between the route map
 * and the photo carousel. The day list is shared: it stays put through the
 * switch rather than being a tab of its own.
 *
 * The active day is read from an IntersectionObserver over the list, and drives
 * the map the same way the pinned TripItineraryMap does — flying to the stop
 * and highlighting its marker.
 */
export function TripSideBySide({
  stops,
  days,
  images,
  title,
  dayWord,
  staticImg,
  grad,
  labels,
}: {
  stops: MapStop[];
  days: MapDay[];
  images: string[];
  title: string;
  dayWord: string;
  staticImg?: string;
  grad?: string;
  labels: { map: string; gallery: string };
}) {
  const hasMap = stops.length > 0 || Boolean(staticImg || grad);
  const hasGallery = images.length > 0;
  const [mode, setMode] = React.useState<"map" | "gallery">(hasMap ? "map" : "gallery");
  const [active, setActive] = React.useState(0);
  const itemRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  React.useEffect(() => {
    const els = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.dayIndex);
        if (Number.isFinite(idx)) setActive(idx);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [days.length]);

  const panels: { key: "map" | "gallery"; label: string }[] = [
    ...(hasMap ? [{ key: "map" as const, label: labels.map }] : []),
    ...(hasGallery ? [{ key: "gallery" as const, label: labels.gallery }] : []),
  ];

  return (
    <div>
      {panels.length > 1 && (
        <div className="wf-triptabs" style={{ marginTop: "clamp(16px, 2.5vw, 24px)" }}>
          <div className="wf-triptabs__row" role="tablist">
            {panels.map((p) => (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={mode === p.key}
                className={`wf-triptabs__tab${mode === p.key ? " wf-triptabs__tab--on" : ""}`}
                onClick={() => setMode(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="wf-trip-side" style={{ marginTop: "clamp(20px, 3vw, 32px)" }}>
        <div className="wf-trip-side__panel">
          {mode === "map" ? (
            stops.length > 0 ? (
              <TripRouteMap stops={stops} className="wf-trip-side__fill" activeIndex={active < days.length ? days[active].stopIndex : 0} />
            ) : (
              <div className="wf-trip-side__fill" style={{ background: staticImg ? undefined : grad || "var(--wf-ink-800)" }}>
                {staticImg && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={staticImg} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                )}
              </div>
            )
          ) : (
            <TripPhotoCarousel images={images} title={title} height="100%" />
          )}
        </div>

        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {days.map((d, idx) => (
            <li
              key={idx}
              ref={(el) => { itemRefs.current[idx] = el; }}
              data-day-index={idx}
              aria-current={idx === active}
              className={`wf-trip-day${idx === active ? " wf-trip-day--on" : ""}`}
              style={{ borderTop: idx === 0 ? "none" : "1px solid var(--wf-divider)" }}
            >
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
      </div>
    </div>
  );
}
