/**
 * Builds src/content/airports.json — the dataset behind the flight form's
 * airport picker.
 *
 * Merges three sources, in increasing order of authority:
 *
 *   1. OurAirports (public domain, rebuilt nightly) for the codes and Latin
 *      names, filtered to airports with an IATA code and scheduled passenger
 *      service. That filter is what takes 85,000+ rows down to ~3,200 — the
 *      rest are airstrips, heliports and military fields nobody flies from.
 *   2. Wikidata for Macedonian city and country names, keyed by IATA code.
 *   3. src/content/airport-overrides.ts, hand-maintained, which wins over both.
 *
 * Wikidata is a *build-time* input on purpose. Its public endpoint 502s on a
 * query this size and has to be batched with a pause between — fine for a
 * script run occasionally, unacceptable in a page load. The output is committed
 * so a deploy never depends on two external services being up, and so a bad
 * upstream change shows up as a diff in review rather than shipping silently.
 *
 * Run: npx tsx scripts/build-airports.ts
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { AIRPORT_OVERRIDES } from "../src/content/airport-overrides";

const AIRPORTS_CSV = "https://davidmegginson.github.io/ourairports-data/airports.csv";
const COUNTRIES_CSV = "https://davidmegginson.github.io/ourairports-data/countries.csv";
const WDQS = "https://query.wikidata.org/sparql";
const OUT = "src/content/airports.json";

// Wikidata rejects a query covering every code at once; 60 is comfortably
// under the limit, and the pause keeps us a polite client of a free service.
const BATCH = 60;
const PAUSE_MS = 900;

type Row = Record<string, string>;

/** Minimal CSV reader — the OurAirports files quote fields containing commas. */
function parseCsv(text: string): Row[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else quoted = false;
      } else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (ch !== "\r") cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const head = rows.shift();
  if (!head) return [];
  return rows
    .filter((r) => r.length === head.length)
    .map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])) as Row);
}

async function getText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

async function sparql(query: string): Promise<Record<string, { value: string }>[]> {
  const res = await fetch(`${WDQS}?query=${encodeURIComponent(query)}`, {
    headers: {
      Accept: "application/sparql-results+json",
      // Wikidata asks for an identifying agent; anonymous clients get throttled.
      "User-Agent": "bookit-airports/1.0 (https://bookit.mk; build script)",
    },
  });
  if (!res.ok) throw new Error(`wikidata → ${res.status}`);
  const json = (await res.json()) as { results: { bindings: Record<string, { value: string }>[] } };
  return json.results.bindings;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Macedonian labels for the cities behind a batch of IATA codes. */
async function cityNames(codes: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (let i = 0; i < codes.length; i += BATCH) {
    const values = codes.slice(i, i + BATCH).map((c) => `"${c}"`).join(" ");
    const q = `SELECT ?iata (SAMPLE(?l) AS ?mk) WHERE {
      ?a wdt:P238 ?iata . VALUES ?iata { ${values} }
      OPTIONAL { ?a wdt:P931 ?c . ?c rdfs:label ?l . FILTER(lang(?l) = "mk") }
    } GROUP BY ?iata`;
    try {
      for (const b of await sparql(q)) {
        if (b.mk?.value) out.set(b.iata.value, b.mk.value);
      }
    } catch (e) {
      // A dropped batch costs a few Macedonian names, not the build — those
      // airports fall back to their Latin name, which is the same behaviour as
      // the ones Wikidata has no label for at all.
      console.warn(`  batch ${i / BATCH + 1} failed (${(e as Error).message}) — skipping`);
    }
    process.stdout.write(`\r  cities: ${Math.min(i + BATCH, codes.length)}/${codes.length}`);
    await sleep(PAUSE_MS);
  }
  process.stdout.write("\n");
  return out;
}

/** Macedonian labels for countries, by ISO 3166-1 alpha-2 code. */
async function countryNames(codes: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (let i = 0; i < codes.length; i += BATCH) {
    const values = codes.slice(i, i + BATCH).map((c) => `"${c}"`).join(" ");
    const q = `SELECT ?iso (SAMPLE(?l) AS ?mk) WHERE {
      ?c wdt:P297 ?iso . VALUES ?iso { ${values} }
      ?c rdfs:label ?l . FILTER(lang(?l) = "mk")
    } GROUP BY ?iso`;
    try {
      for (const b of await sparql(q)) {
        if (b.mk?.value) out.set(b.iso.value, b.mk.value);
      }
    } catch (e) {
      console.warn(`  country batch failed (${(e as Error).message})`);
    }
    await sleep(PAUSE_MS);
  }
  return out;
}

async function main() {
  console.log("fetching OurAirports…");
  const [airportsCsv, countriesCsv] = await Promise.all([
    getText(AIRPORTS_CSV),
    getText(COUNTRIES_CSV),
  ]);

  const all = parseCsv(airportsCsv);
  const countryEn = new Map(parseCsv(countriesCsv).map((c) => [c.code, c.name]));

  const kept = all.filter(
    (r) =>
      r.iata_code?.trim() &&
      r.scheduled_service === "yes" &&
      (r.type === "large_airport" || r.type === "medium_airport"),
  );
  console.log(`  ${all.length} rows → ${kept.length} with an IATA code and scheduled service`);

  const codes = kept.map((r) => r.iata_code);
  const isoCodes = [...new Set(kept.map((r) => r.iso_country))];

  // Cached because the Wikidata pass takes minutes and the rest of the script
  // gets iterated on far more often than the names change. Delete the file (or
  // pass --refresh) to pull fresh labels.
  const CACHE = "scripts/.airports-cache.json";
  let mkCity: Map<string, string>;
  let mkCountry: Map<string, string>;
  const refresh = process.argv.includes("--refresh");
  if (!refresh && existsSync(CACHE)) {
    const c = JSON.parse(readFileSync(CACHE, "utf8")) as { cities: [string, string][]; countries: [string, string][] };
    mkCity = new Map(c.cities);
    mkCountry = new Map(c.countries);
    console.log(`reusing ${CACHE} (--refresh to re-query Wikidata)`);
  } else {
    console.log("fetching Macedonian names from Wikidata…");
    mkCity = await cityNames(codes);
    mkCountry = await countryNames(isoCodes);
    writeFileSync(CACHE, JSON.stringify({ cities: [...mkCity], countries: [...mkCountry] }), "utf8");
  }
  console.log(`  ${mkCity.size}/${codes.length} cities, ${mkCountry.size}/${isoCodes.length} countries`);

  const airports = kept
    .map((r) => {
      const code = r.iata_code;
      const o = AIRPORT_OVERRIDES[code] ?? {};
      // The upstream municipality is sometimes an administrative district
      // rather than the city — Skopje is filed under "Ilinden" — so an override
      // beats it, and the airport's own name is the last resort.
      // `||` not `??`: fifty airports have an empty municipality rather than a
      // missing one, and `??` treats "" as a value — leaving them with no city
      // at all, which crashes any consumer that lowercases it.
      const city = o.city || r.municipality || r.name;
      return {
        iata: code,
        city,
        cityMk: o.cityMk ?? mkCity.get(code) ?? undefined,
        qualifier: o.qualifier ?? undefined,
        qualifierMk: o.qualifierMk ?? undefined,
        country: countryEn.get(r.iso_country) ?? r.iso_country,
        countryMk: mkCountry.get(r.iso_country) ?? undefined,
        // Only when it says something the city doesn't. "Istanbul Airport" adds
        // nothing next to Istanbul and costs ~12 KB gzipped across the file;
        // "Sabiha Gökçen Havalimanı" is worth carrying, and worth matching on.
        name: r.name.toLowerCase().includes(city.toLowerCase()) ? undefined : r.name,
        // Alternate names and old codes the upstream data carries — "Londres"
        // for Heathrow, "NYC" for JFK. Cheap extra matches.
        keywords: [r.keywords, o.alt].filter(Boolean).join(" ") || undefined,
        // Large airports outrank medium ones on equal text relevance, so
        // "париз" leads with Charles de Gaulle rather than Paris-Vatry.
        big: r.type === "large_airport" || undefined,
        primary: o.primary || undefined,
      };
    })
    .sort((a, b) => a.iata.localeCompare(b.iata));

  // Drop empty keys rather than emitting nulls — smaller, and a missing field
  // reads unambiguously as "upstream had nothing".
  const clean = airports.map((a) =>
    Object.fromEntries(Object.entries(a).filter(([, v]) => v != null && v !== "")),
  );
  writeFileSync(OUT, JSON.stringify(clean) + "\n", "utf8");

  const withMk = airports.filter((a) => a.cityMk).length;
  console.log(`\nwrote ${OUT}`);
  console.log(`  ${airports.length} airports, ${withMk} with a Macedonian name (${Math.round((100 * withMk) / airports.length)}%)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
