import type { Destination } from "./types";

// Placeholder content for bookit — a tailor-made travel studio based in
// North Macedonia. Voice: warm, editorial, British English, no emoji.
// Prices are illustrative (EUR). Replace `grad` with real photography.

export const destinations: Destination[] = [
  {
    slug: "ohrid",
    region: "North Macedonia",
    title: "Lake Ohrid",
    teaser: "One of Europe's oldest lakes, wrapped in Byzantine churches and slow afternoons.",
    grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)",
    image: "/images/ohrid.jpg",
    priceFrom: "€180 / night",
    rating: "4.9",
    badge: "Lakeside",
    duration: "4–7 nights",
    bestMonths: ["May", "Jun", "Sep"],
    feelings: ["Contentment", "Wonder"],
    intro:
      "Three million years old and impossibly clear, Lake Ohrid is where North Macedonia exhales. We pair lakeside boltholes with private boat crossings, a candlelit dinner at a thirteenth-century monastery, and mornings unhurried enough to do nothing at all.",
    highlights: [
      "A private dawn crossing to the church of Sveti Jovan at Kaneo",
      "Tasting the lake's prized trout with a local fisherman's family",
      "Walking the old town's cobbled lanes before the day-trippers arrive",
    ],
  },
  {
    slug: "mavrovo",
    region: "North Macedonia",
    title: "Mavrovo & the Highlands",
    teaser: "Alpine silence, sunken churches and the wildest corner of the country.",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
    image: "/images/mavrovo.jpg",
    priceFrom: "€150 / night",
    rating: "4.8",
    badge: "Mountains",
    duration: "3–5 nights",
    bestMonths: ["Jan", "Feb", "Jul", "Aug"],
    feelings: ["Freedom", "Revitalised"],
    intro:
      "Mavrovo National Park is North Macedonia at its most elemental — glacial lakes, the half-submerged church of Sveti Nikola, and ridgelines that go quiet for miles. We craft it for skiers in winter and walkers in summer, always with a fire and a long table waiting at the end of the day.",
    highlights: [
      "Guided ridge walks through the Bistra massif",
      "The hauntingly beautiful sunken church at the water's edge",
      "Private cheese and rakija tastings in mountain villages",
    ],
  },
  {
    slug: "skopje-matka",
    region: "North Macedonia",
    title: "Skopje & Matka Canyon",
    teaser: "A capital of contrasts, then a kayak into a hidden river gorge.",
    grad: "linear-gradient(135deg,#7a6f5a,#3a3228)",
    image: "/images/skopje-matka.jpg",
    priceFrom: "€140 / night",
    rating: "4.7",
    badge: "City & Canyon",
    duration: "2–4 nights",
    bestMonths: ["Apr", "May", "Sep", "Oct"],
    feelings: ["Wonder", "Challenged"],
    intro:
      "Begin in Skopje — its Ottoman bazaar, its bridges, its theatrical squares — then trade the city for Matka, a river canyon a half-hour away where you can kayak between cliff faces to a cave only reachable by water. Two worlds, one short drive apart.",
    highlights: [
      "A private walk through the Old Bazaar with a Skopje storyteller",
      "Kayaking Matka Canyon to Vrelo cave",
      "Dinner in a restored caravanserai courtyard",
    ],
  },
  {
    slug: "pelister-prespa",
    region: "North Macedonia",
    title: "Pelister & Prespa",
    teaser: "Ancient pines, a tranquil border lake, and pelicans at dawn.",
    grad: "linear-gradient(135deg,#6f7a5a,#363f28)",
    image: "/images/pelister-prespa.jpg",
    priceFrom: "€160 / night",
    rating: "4.8",
    badge: "Nature",
    duration: "3–5 nights",
    bestMonths: ["May", "Jun", "Sep"],
    feelings: ["Contentment", "Freedom"],
    intro:
      "Pelister's molika pines are some of the oldest in Europe, and just beyond them Lake Prespa lies still on three countries' borders. This is slow, soulful travel — birdwatching, apple orchards, and villages where time keeps its own pace.",
    highlights: [
      "Sunrise birdwatching for Dalmatian pelicans on Prespa",
      "A walk among thousand-year-old molika pines",
      "Island visit to the frescoed church on Golem Grad",
    ],
  },
  {
    slug: "amalfi-coast",
    region: "Italy",
    title: "The Amalfi Coast",
    teaser: "Lemon groves, cliffside terraces and the slow theatre of the Tyrrhenian.",
    grad: "linear-gradient(135deg,#5f8a8f,#2f5559)",
    image: "/images/amalfi-coast.jpg",
    priceFrom: "€540 / night",
    rating: "4.7",
    badge: "Coastal",
    duration: "5–8 nights",
    bestMonths: ["May", "Jun", "Sep"],
    feelings: ["Contentment", "Wonder"],
    intro:
      "A short hop from home and a world away in feeling. We plan the Amalfi Coast the way locals live it — a private gozzo along the shore, a long lunch above the lemon groves, and the quietest corners of Ravello while the crowds queue below.",
    highlights: [
      "A private boat day to the grottoes and hidden coves",
      "Pasta-making with a nonna in the hills above Amalfi",
      "An after-hours visit to the gardens of Villa Cimbrone",
    ],
  },
  {
    slug: "santorini",
    region: "Greece",
    title: "Santorini & the Cyclades",
    teaser: "Caldera sunsets and island-hopping beyond the postcard.",
    grad: "linear-gradient(135deg,#5f6f7a,#2a3640)",
    image: "/images/santorini.jpg",
    priceFrom: "€620 / night",
    rating: "4.9",
    badge: "Islands",
    duration: "6–9 nights",
    bestMonths: ["May", "Jun", "Sep", "Oct"],
    feelings: ["Wonder", "Revitalised"],
    intro:
      "We give Santorini back its romance — a cave suite over the caldera, a private sail to Thirassia, then onward to a quieter Cycladic island most travellers never reach. Designed for the sunset and everything around it.",
    highlights: [
      "A private catamaran sunset with dinner aboard",
      "Wine tasting among the assyrtiko vineyards",
      "A day on a barely-trodden neighbouring island",
    ],
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
