"use client";

import React from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapStop } from "@/components/sections/TripItineraryMap";

/**
 * TripRouteMap — the route on a column-sized map: markers, a dashed line
 * between them, fitted to the bounds.
 *
 * Pass `activeIndex` to have it follow an itinerary: the map flies to that
 * stop and its marker takes the active style, the same feedback the pinned
 * TripItineraryMap gives, without pinning the whole viewport.
 *
 * TripItineraryMap is a scroll-pinned, full-viewport component with its own
 * internal map|days grid, so it cannot go in a column. Rather than refactor
 * a component two other layouts depend on, this repeats its (short) Leaflet
 * setup. If a variant wins and the other is deleted, the two are worth folding
 * back together.
 */
export function TripRouteMap({
  stops,
  className,
  activeIndex,
}: {
  stops: MapStop[];
  className?: string;
  /** Index into `stops` to centre and highlight. Omit for a static route. */
  activeIndex?: number;
}) {
  const elRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<LeafletMap | null>(null);
  const markersRef = React.useRef<Marker[]>([]);
  const iconsRef = React.useRef<{ idle: unknown; active: unknown } | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | null = null;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !elRef.current || mapRef.current) return;

      map = L.map(elRef.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      mapRef.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);

      const idle = L.divIcon({ className: "", html: '<span class="wf-mappin"></span>', iconSize: [16, 16], iconAnchor: [8, 8] });
      const activeIcon = L.divIcon({ className: "", html: '<span class="wf-mappin wf-mappin--active"></span>', iconSize: [24, 24], iconAnchor: [12, 12] });
      iconsRef.current = { idle, active: activeIcon };

      const latlngs = stops.map((s) => [s.lat, s.lng] as [number, number]);
      if (latlngs.length > 1) {
        L.polyline(latlngs, { className: "wf-route-line", weight: 2, opacity: 0.8, dashArray: "2 6" }).addTo(map);
      }
      markersRef.current = stops.map((s, idx) =>
        L.marker([s.lat, s.lng], { icon: idx === (activeIndex ?? 0) ? activeIcon : idle })
          .addTo(map!)
          .bindTooltip(s.name, { direction: "top", offset: [0, -8] }),
      );

      if (latlngs.length > 1) map.fitBounds(latlngs, { padding: [36, 36] });
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
    // activeIndex is applied by the effect below, not on rebuild — rebuilding
    // the map on every day change would tear down and re-tile it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops]);

  // Follow the active stop: highlight its marker and ease the map across.
  React.useEffect(() => {
    const map = mapRef.current;
    const icons = iconsRef.current;
    if (map == null || icons == null || activeIndex == null) return;
    const stop = stops[activeIndex];
    if (!stop) return;

    markersRef.current.forEach((m, idx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      m.setIcon((idx === activeIndex ? icons.active : icons.idle) as any);
    });
    map.flyTo([stop.lat, stop.lng], Math.max(map.getZoom(), 6), { duration: 0.8 });
  }, [activeIndex, stops]);

  if (stops.length === 0) return null;
  return <div ref={elRef} className={className} role="img" aria-label="Trip route map" />;
}
