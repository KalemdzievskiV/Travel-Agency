import "server-only";
import { parseItineraryLine, formatItineraryLine } from "./itinerary";

export type LatLng = { lat: number; lng: number };

// Process-lifetime cache so the same place name isn't looked up twice.
const cache = new Map<string, LatLng | null>();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Look up coordinates for a place name using OpenStreetMap's Nominatim geocoder
 * (free, no API key). Returns null if nothing is found or the request fails —
 * callers should degrade gracefully. Results are cached for the process.
 */
export async function geocodePlace(name: string): Promise<LatLng | null> {
  const key = name.trim().toLowerCase();
  if (!key) return null;
  if (cache.has(key)) return cache.get(key) ?? null;
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(name)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "bookit-travel/1.0 (admin itinerary geocoding)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      cache.set(key, null);
      return null;
    }
    const data = (await res.json()) as Array<{ lat: string; lon: string }>;
    const first = Array.isArray(data) ? data[0] : undefined;
    const out = first ? { lat: Number(first.lat), lng: Number(first.lon) } : null;
    const ok = out && Number.isFinite(out.lat) && Number.isFinite(out.lng) ? out : null;
    cache.set(key, ok);
    return ok;
  } catch {
    cache.set(key, null);
    return null;
  }
}

/**
 * Enrich itinerary lines with coordinates. Lines are parsed as described in
 * lib/itinerary.ts (MK or EN, "|" or a spaced dash before the description); on
 * save we geocode the place and store the line as "Day-label Place | lat | lng
 * | Notes" so the trip page can plot it. Lines that already carry coordinates
 * are left untouched (so re-saving doesn't re-geocode), and lines we can't
 * geocode are left as typed. Requests are spaced out to respect the Nominatim
 * usage policy.
 */
export async function enrichItineraryLines(lines: string[]): Promise<string[]> {
  const out: string[] = [];
  let didNetwork = false;
  for (const line of lines) {
    const parsed = parseItineraryLine(line);
    if ((parsed.lat != null && parsed.lng != null) || !parsed.place) {
      out.push(line);
      continue;
    }
    const wasCached = cache.has(parsed.place.trim().toLowerCase());
    if (didNetwork && !wasCached) await sleep(1100); // be polite between live lookups
    const geo = await geocodePlace(parsed.place);
    if (!wasCached) didNetwork = true;
    out.push(geo ? formatItineraryLine(parsed, geo.lat, geo.lng) : line);
  }
  return out;
}
