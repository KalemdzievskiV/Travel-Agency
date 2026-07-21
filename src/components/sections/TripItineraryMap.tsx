"use client";

import React from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";

export type MapStop = { name: string; slug: string; lat: number; lng: number };
export type MapDay = { n: number; text: string; stopIndex: number; label?: string | null };

// Scroll distance (in viewport heights) the page travels to advance one day.
const STEP_VH = 55;

/**
 * TripItineraryMap — a pinned "scrollytelling" route. The map + itinerary are
 * pinned to the viewport; scrolling advances the itinerary day by day (the map
 * flies to each day's stop) and only releases the page once the last day is
 * reached — so the whole map stays in view however many days there are.
 *
 * Leaflet is loaded on the client only (it touches `window`).
 */
export function TripItineraryMap({
  stops,
  days,
  dayWord,
}: {
  stops: MapStop[];
  days: MapDay[];
  dayWord: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapElRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<LeafletMap | null>(null);
  const markersRef = React.useRef<Marker[]>([]);
  const idleIconRef = React.useRef<unknown>(null);
  const activeIconRef = React.useRef<unknown>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const dayRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = React.useState(0);
  const [translateY, setTranslateY] = React.useState(0);

  // Build the map once, after mount.
  React.useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | null = null;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapElRef.current || mapRef.current) return;

      map = L.map(mapElRef.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      mapRef.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);

      const idle = L.divIcon({ className: "", html: '<span class="wf-mappin"></span>', iconSize: [16, 16], iconAnchor: [8, 8] });
      const activeIcon = L.divIcon({ className: "", html: '<span class="wf-mappin wf-mappin--active"></span>', iconSize: [24, 24], iconAnchor: [12, 12] });
      idleIconRef.current = idle;
      activeIconRef.current = activeIcon;

      const latlngs = stops.map((s) => [s.lat, s.lng] as [number, number]);
      if (latlngs.length > 1) {
        L.polyline(latlngs, { className: "wf-route-line", weight: 2, opacity: 0.8, dashArray: "2 6" }).addTo(map);
      }
      markersRef.current = stops.map((s, idx) =>
        L.marker([s.lat, s.lng], { icon: idx === 0 ? activeIcon : idle }).addTo(map!).bindTooltip(s.name, { direction: "top", offset: [0, -8] }),
      );

      if (latlngs.length > 1) map.fitBounds(latlngs, { padding: [48, 48] });
      else if (latlngs.length === 1) map.setView(latlngs[0], 5);

      // The container is sized by CSS after mount — make sure Leaflet knows.
      requestAnimationFrame(() => map?.invalidateSize());
    })();

    const onResize = () => mapRef.current?.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      map?.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, [stops]);

  // Fly to the active day's stop and restyle the pins.
  React.useEffect(() => {
    const map = mapRef.current;
    const si = days[active]?.stopIndex ?? 0;
    const stop = stops[si];
    if (!map || !stop) return;
    map.flyTo([stop.lat, stop.lng], Math.max(map.getZoom(), 4.5), { duration: 1.1 });
    markersRef.current.forEach((m, idx) => {
      const icon = idx === si ? activeIconRef.current : idleIconRef.current;
      if (icon) m.setIcon(icon as Parameters<Marker["setIcon"]>[0]);
    });
  }, [active, stops, days]);

  // Map page-scroll through the pinned section to the active day.
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
      setActive(idx);
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
      const panel = panelRef.current;
      if (el && panel) setTranslateY(panel.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [active, days.length]);

  return (
    <div
      className="wf-trip-scrolly"
      ref={containerRef}
      style={{ height: `calc((100svh - var(--wf-header-h)) + ${Math.max(0, days.length - 1) * STEP_VH}vh)` }}
    >
      <div className="wf-trip-scrolly__pin">
        <div className="wf-wrap wf-wrap--wide wf-trip-scrolly__grid">
          <div className="wf-trip-scrolly__map">
            <div ref={mapElRef} className="wf-trip-map__canvas" role="img" aria-label="Trip route map" />
          </div>

          <div className="wf-trip-scrolly__days" ref={panelRef}>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, transform: `translateY(${translateY}px)`, transition: "transform 0.5s var(--wf-ease-out)" }}>
              {days.map((d, idx) => {
                const isActive = idx === active;
                return (
                  <li
                    key={idx}
                    ref={(el) => { dayRefs.current[idx] = el; }}
                    className="wf-trip-scrolly__day"
                    style={{ opacity: isActive ? 1 : 0.32, transition: "opacity 0.35s var(--wf-ease-out)" }}
                  >
                    <span style={{ display: "block", fontFamily: "var(--wf-font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: isActive ? "var(--wf-coral-600)" : "var(--wf-ink-500)" }}>
                      {d.label || `${dayWord} ${d.n}`}
                    </span>
                    {stops[d.stopIndex]?.name && (
                      <span
                        style={{
                          display: "block",
                          margin: "8px 0 0",
                          fontFamily: "var(--wf-font-display)",
                          fontWeight: 500,
                          fontSize: "clamp(22px, 2.6vw, 30px)",
                          letterSpacing: "-0.01em",
                          color: "var(--wf-ink-900)",
                        }}
                      >
                        {stops[d.stopIndex].name}
                      </span>
                    )}
                    <p style={{ margin: "12px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "var(--wf-ink-700)" }}>{d.text}</p>
                  </li>
                );
              })}
            </ol>
            <div className="wf-trip-scrolly__progress">
              {active + 1} / {days.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
