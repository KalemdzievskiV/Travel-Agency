"use client";

import React from "react";
import { TripRouteMap } from "./TripRouteMap";
import { TripPhotoCarousel } from "./TripPhotoCarousel";
import type { MapStop, MapDay } from "./showcase-shared";

// Scroll distance (viewport heights) that advances the itinerary one day.
const STEP_VH = 55;

/**
 * TripSideBySide — the itinerary as a pinned "scrollytelling" section, like the
 * earlier V1 map: a tall, narrow panel on the left stays fixed in the viewport
 * while you scroll, and the day advances (both directions) with the map flying
 * to each stop. Because the panel is pinned it never scrolls out, however many
 * days a trip has.
 *
 * Two buttons swap the pinned panel between the route map and the photo
 * carousel; the day column is shared, so switching keeps your place.
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
  const [translateY, setTranslateY] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const daysPanelRef = React.useRef<HTMLDivElement>(null);
  const dayRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  // Map page-scroll through the tall pinned section to the active day.
  React.useEffect(() => {
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--wf-header-h")) || 64;
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const pinH = window.innerHeight - headerH;
      const total = el.offsetHeight - pinH;
      const scrolled = Math.min(Math.max(headerH - el.getBoundingClientRect().top, 0), Math.max(total, 0));
      const progress = total > 0 ? scrolled / total : 0;
      const idx = Math.min(days.length - 1, Math.max(0, Math.round(progress * (days.length - 1))));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [days.length]);

  // Slide the day list so the active day sits centred in the panel.
  React.useEffect(() => {
    const apply = () => {
      const el = dayRefs.current[active];
      const panel = daysPanelRef.current;
      if (el && panel) setTranslateY(panel.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [active, days.length]);

  const activeStop = active < days.length ? days[active].stopIndex : 0;

  const panels: { key: "map" | "gallery"; label: string }[] = [
    ...(hasMap ? [{ key: "map" as const, label: labels.map }] : []),
    ...(hasGallery ? [{ key: "gallery" as const, label: labels.gallery }] : []),
  ];

  return (
    <div
      className="wf-trip-pinwrap"
      ref={containerRef}
      style={{ height: `calc((100svh - var(--wf-header-h)) + ${Math.max(0, days.length - 1) * STEP_VH}vh)` }}
    >
      <div className="wf-trip-pin">
        <div className="wf-wrap wf-wrap--wide wf-trip-pin__inner">
          {panels.length > 1 && (
            <div className="wf-triptabs wf-trip-pin__tabs">
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

          <div className="wf-trip-pin__grid">
            {/* Left — the pinned map or gallery panel (tall, narrow) */}
            <div className="wf-trip-pin__panel">
              {mode === "map" ? (
                stops.length > 0 ? (
                  <TripRouteMap stops={stops} className="wf-trip-pin__fill" activeIndex={activeStop} />
                ) : (
                  <div className="wf-trip-pin__fill" style={{ background: staticImg ? undefined : grad || "var(--wf-ink-800)" }}>
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

            {/* Right — the day list, centred on the active day */}
            <div className="wf-trip-pin__days" ref={daysPanelRef}>
              <ol
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  transform: `translateY(${translateY}px)`,
                  transition: "transform 0.5s var(--wf-ease-out)",
                }}
              >
                {days.map((d, idx) => {
                  const on = idx === active;
                  return (
                    <li
                      key={idx}
                      ref={(el) => { dayRefs.current[idx] = el; }}
                      className="wf-trip-pin__day"
                      style={{ opacity: on ? 1 : 0.32, transition: "opacity 0.35s var(--wf-ease-out)" }}
                    >
                      <span style={{ display: "block", fontFamily: "var(--wf-font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: on ? "var(--wf-coral-600)" : "var(--wf-ink-500)" }}>
                        {d.label || `${dayWord} ${d.n}`}
                      </span>
                      {stops[d.stopIndex]?.name && (
                        <span style={{ display: "block", margin: "8px 0 0", fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.01em", color: "var(--wf-ink-900)" }}>
                          {stops[d.stopIndex].name}
                        </span>
                      )}
                      <p style={{ margin: "12px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "var(--wf-ink-700)" }}>{d.text}</p>
                    </li>
                  );
                })}
              </ol>
              {days.length > 1 && (
                <div className="wf-trip-pin__progress">{active + 1} / {days.length}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
