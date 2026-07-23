"use client";

import React from "react";
import { TripRouteMap } from "./TripRouteMap";
import type { MapStop, MapDay } from "@/components/sections/TripItineraryMap";

/**
 * TripItineraryColumn — the route map above a day-by-day list, wired together:
 * the map sticks to the top of the column and flies to whichever day you have
 * scrolled to, and that day is marked in the list.
 *
 * This is the column-shaped counterpart to TripItineraryMap. That component
 * pins the whole viewport and drives the sequence from page scroll, which only
 * works full width; here the map stays inside its column and the active day is
 * read from an IntersectionObserver instead.
 */
export function TripItineraryColumn({
  stops,
  days,
  dayWord,
  title,
  staticImg,
  grad,
}: {
  stops: MapStop[];
  days: MapDay[];
  dayWord: string;
  title: string;
  staticImg?: string;
  grad?: string;
}) {
  const [active, setActive] = React.useState(0);
  const itemRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  React.useEffect(() => {
    const els = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (els.length === 0) return;

    // The band across the upper-middle of the viewport decides which day is
    // "current" — a plain intersection would flip between two days at once.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.dayIndex);
        if (Number.isFinite(idx)) setActive(idx);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [days.length]);

  const activeStop = days[active]?.stopIndex ?? 0;

  return (
    <div>
      <div className="wf-trip-split__mapwrap">
        {stops.length > 0 ? (
          <TripRouteMap stops={stops} className="wf-trip-split__map" activeIndex={activeStop} />
        ) : (staticImg || grad) ? (
          <div className="wf-trip-split__map" style={{ background: staticImg ? undefined : grad || "var(--wf-ink-800)" }}>
            {staticImg && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={staticImg} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            )}
          </div>
        ) : null}
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
  );
}
