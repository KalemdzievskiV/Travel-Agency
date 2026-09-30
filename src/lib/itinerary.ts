/**
 * Itinerary lines, as the client types them in Admin → Trips — in Macedonian
 * or English, one stop per line:
 *
 *   Ден 1 - 3 Скопје - Краток опис за местото
 *   Ден 4 Охрид | Краток опис
 *   Days 5–6 Bitola - A short description
 *   Охрид - no day label; numbered on from the line before
 *
 * The day range comes first (so its own dash isn't read as the separator),
 * then the place, then the description after the first spaced dash or "|".
 * On save the place is geocoded and the line stored in the canonical form
 * "Ден 1 - 3 Скопје | 41.99622 | 21.43189 | Краток опис"; both forms parse.
 */

// "Ден 1", "Ден 1 - 3", "Денови 1–3", "Day 4", "Days 1-5", then any separator
// before the place (· : . , ) - – —).
const DAY_PREFIX = /^\s*(?:days?|ден(?:ови)?)\.?\s*(\d+)(?:\s*[–—-]\s*(\d+))?\s*[·:.,)\-–—]*\s*/iu;
// The place / description separator when there's no "|": a dash with spaces
// around it, so hyphenated names ("Saint-Tropez") stay whole.
const SPACED_DASH = /\s[-–—]\s/;

export type ItineraryLine = {
  /** First and last day of the stop, when the line gives them. */
  from: number | null;
  to: number | null;
  place: string;
  lat: number | null;
  lng: number | null;
  body: string;
  /** The day prefix exactly as typed ("Ден 1 - 3 "), kept when the line is rewritten. */
  dayRaw: string;
};

const num = (s: string | undefined) => (s != null && s.trim() !== "" && Number.isFinite(Number(s)) ? Number(s) : null);

export function parseItineraryLine(line: string): ItineraryLine {
  const parts = line.split("|").map((s) => s.trim());
  let head = parts[0] ?? "";
  let lat: number | null = null;
  let lng: number | null = null;
  let rest = parts.slice(1);
  const la = num(parts[1]);
  const ln = num(parts[2]);
  if (parts.length >= 3 && la != null && ln != null) {
    lat = la;
    lng = ln;
    rest = parts.slice(3);
  }

  let from: number | null = null;
  let to: number | null = null;
  let dayRaw = "";
  const m = head.match(DAY_PREFIX);
  if (m) {
    from = Number(m[1]);
    to = m[2] ? Number(m[2]) : null;
    if (to != null && to <= from) to = null;
    dayRaw = m[0];
    head = head.slice(m[0].length);
  }

  let place = head.trim();
  let body = rest.join(" | ");
  if (parts.length === 1) {
    const k = place.search(SPACED_DASH);
    if (k >= 0) {
      body = place.slice(k + 3).trim();
      place = place.slice(0, k).trim();
    }
  }
  return { from, to, place, lat, lng, body, dayRaw };
}

/** The canonical stored form, with coordinates. */
export function formatItineraryLine(l: ItineraryLine, lat: number, lng: number): string {
  const head = `${l.dayRaw.trim() ? `${l.dayRaw.trim().replace(/[·:.,)\-–—\s]+$/u, "")} ` : ""}${l.place}`;
  const base = `${head} | ${lat.toFixed(5)} | ${lng.toFixed(5)}`;
  return l.body ? `${base} | ${l.body}` : base;
}

/**
 * The day label in the reader's language, from the numbers alone — so a line
 * typed as "Ден 1 - 3" reads "Days 1–3" on the English site and vice versa.
 */
export function dayLabel(from: number, to: number | null, words: { day: string; days: string }): string {
  return to != null ? `${words.days} ${from}–${to}` : `${words.day} ${from}`;
}

/**
 * Parse a whole itinerary and give every line its day number: the first day of
 * its range when typed, else the day after the previous line ends ("Ден 1 - 3",
 * then an unlabelled line is day 4).
 */
export function parseItinerary(lines: string[]): (ItineraryLine & { n: number })[] {
  const out: (ItineraryLine & { n: number })[] = [];
  let last = 0;
  for (const line of lines) {
    const p = parseItineraryLine(line);
    const n = p.from ?? last + 1;
    last = p.to ?? n;
    out.push({ ...p, n });
  }
  return out;
}
