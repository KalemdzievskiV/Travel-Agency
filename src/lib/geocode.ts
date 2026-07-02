import "server-only";
import { stripDayPrefix } from "./itinerary";

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
 * Enrich itinerary lines with coordinates. Each line is "Place | Notes"; on save
 * we geocode the place and rewrite it to "Place | lat | lng | Notes" so the trip
 * page can plot it. Lines that already carry coordinates are left untouched (so
 * re-saving doesn't re-geocode), and lines we can't geocode are left as typed.
 * Requests are spaced out to respect the Nominatim usage policy.
 */
export async function enrichItineraryLines(lines: string[]): Promise<string[]> {
  const out: string[] = [];
  let didNetwork = false;
  for (const line of lines) {
    const parts = line.split("|").map((s) => s.trim());
    const lat = Number(parts[1]);
    const lng = Number(parts[2]);
    const hasCoords =
      parts.length >= 3 && parts[1] !== "" && parts[2] !== "" && Number.isFinite(lat) && Number.isFinite(lng);
    if (hasCoords) {
      out.push(line);
      continue;
    }
    // Keep the original first token (which may carry a "Days 1–5" label) intact,
    // but geocode only the place part so the lookup isn't confused by the label.
    const original = (parts[0] ?? "").trim();
    const place = stripDayPrefix(original);
    const notes = parts.length > 1 ? parts.slice(1).join(" | ") : "";
    if (!place) {
      out.push(line);
      continue;
    }
    const wasCached = cache.has(place.trim().toLowerCase());
    if (didNetwork && !wasCached) await sleep(1100); // be polite between live lookups
    const geo = await geocodePlace(place);
    if (!wasCached) didNetwork = true;
    if (geo) {
      const rebuilt = [original, geo.lat.toFixed(5), geo.lng.toFixed(5)];
      out.push(notes ? `${rebuilt.join(" | ")} | ${notes}` : rebuilt.join(" | "));
    } else {
      out.push(line);
    }
  }
  return out;
}
