// Matches a leading day label like "Day 1", "Day 1-5", "Days 1–5", optionally
// followed by a separator (· : - —). Group 1 = the label, group 2 = the rest.
const DAY_PREFIX = /^\s*(days?\s*\d+(?:\s*[–—-]\s*\d+)?)\s*[·:.)\-–—]*\s*(.*)$/i;

/**
 * Split an itinerary place into its optional day label and the place itself, so
 * admins can write "Days 1–5 Lima, Peru" — we geocode/display "Lima, Peru" and
 * keep "Days 1–5" as the label shown on the trip page. When there's no label,
 * `label` is null and the page auto-numbers the day.
 */
export function splitDayPrefix(s: string): { label: string | null; place: string } {
  const m = s.match(DAY_PREFIX);
  if (m) {
    return { label: m[1].replace(/\s+/g, " ").trim(), place: (m[2] ?? "").trim() };
  }
  return { label: null, place: s.trim() };
}

/** Just the place, with any leading day label removed (used for geocoding). */
export function stripDayPrefix(s: string): string {
  return splitDayPrefix(s).place;
}
