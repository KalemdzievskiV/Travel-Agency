import type { Destination } from "./types";

// Evergreen place-guides for bookit — North Macedonia and beyond. Voice: warm,
// editorial, British English, no emoji. Destinations describe a place (when to
// go, what it feels like, what not to miss); Trips are the sellable products.

export const destinations: Destination[] = [
  {
    slug: "ohrid",
    region: "North Macedonia",
    title: "Lake Ohrid",
    teaser: "One of Europe's oldest lakes, wrapped in Byzantine churches and slow afternoons.",
    grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)",
    image: "/images/ohrid.jpg",
    badge: "Lakeside",
    whenToGo:
      "Late spring and early autumn — warm, clear water and long light, with the summer crowds safely either side of you.",
    bestMonths: ["May", "Jun", "Sep"],
    feelings: ["Contentment", "Wonder"],
    intro:
      "Three million years old and impossibly clear, Lake Ohrid is where North Macedonia exhales. Byzantine churches cling to the shore, fishermen still work the water at dawn, and the old town's lanes reward an unhurried wander. It is a place that rewards doing very little, very well.",
    highlights: [
      "The cliff-top church of Sveti Jovan at Kaneo, best at first light",
      "The lake's prized trout, eaten with a local fishing family",
      "The cobbled old town before the day-trippers arrive",
    ],
  },
  {
    slug: "mavrovo",
    region: "North Macedonia",
    title: "Mavrovo & the Highlands",
    teaser: "Alpine silence, sunken churches and the wildest corner of the country.",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)",
    image: "/images/mavrovo.jpg",
    badge: "Mountains",
    whenToGo:
      "December to March for snow and skiing; July and August for cool, quiet alpine walking.",
    bestMonths: ["Jan", "Feb", "Jul", "Aug"],
    feelings: ["Freedom", "Revitalised"],
    intro:
      "Mavrovo National Park is North Macedonia at its most elemental — glacial lakes, the half-submerged church of Sveti Nikola, and ridgelines that go quiet for miles. In winter it is a snow country; in summer, a walker's wilderness of pine and stone.",
    highlights: [
      "Ridge walks through the Bistra massif",
      "The hauntingly beautiful sunken church at the water's edge",
      "Cheese and rakija tastings in remote mountain villages",
    ],
  },
  {
    slug: "skopje-matka",
    region: "North Macedonia",
    title: "Skopje & Matka Canyon",
    teaser: "A capital of contrasts, then a kayak into a hidden river gorge.",
    grad: "linear-gradient(135deg,#7a6f5a,#3a3228)",
    image: "/images/skopje-matka.jpg",
    badge: "City & Canyon",
    whenToGo:
      "April–May and September–October, when the city is mild and the canyon is calm and uncrowded.",
    bestMonths: ["Apr", "May", "Sep", "Oct"],
    feelings: ["Wonder", "Challenged"],
    intro:
      "Skopje is a city of layers — an Ottoman bazaar, theatrical squares, bridges over the Vardar — and just half an hour away, Matka Canyon offers a complete change of register: cliff faces, still green water, and a cave reachable only by kayak. Two worlds, one short drive apart.",
    highlights: [
      "The Old Bazaar on foot with a Skopje storyteller",
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
    badge: "Nature",
    whenToGo:
      "May and June for wildflowers and birdsong; September for still, golden days by the lake.",
    bestMonths: ["May", "Jun", "Sep"],
    feelings: ["Contentment", "Freedom"],
    intro:
      "Pelister's molika pines are among the oldest in Europe, and just beyond them Lake Prespa lies still on three countries' borders. This is slow, soulful country — birdwatching, apple orchards, and villages that keep their own unhurried time.",
    highlights: [
      "Sunrise birdwatching for Dalmatian pelicans on Prespa",
      "A walk among thousand-year-old molika pines",
      "The frescoed island church on Golem Grad",
    ],
  },
  {
    slug: "amalfi-coast",
    region: "Italy",
    title: "The Amalfi Coast",
    teaser: "Lemon groves, cliffside terraces and the slow theatre of the Tyrrhenian.",
    grad: "linear-gradient(135deg,#5f8a8f,#2f5559)",
    image: "/images/amalfi-coast.jpg",
    badge: "Coastal",
    whenToGo:
      "May, June and September — the coast at its softest, before and after the August rush.",
    bestMonths: ["May", "Jun", "Sep"],
    feelings: ["Contentment", "Wonder"],
    intro:
      "A short hop from home and a world away in feeling. The Amalfi Coast is best taken the way locals live it — slow boat days along the shore, long lunches above the lemon groves, and the quietest corners of Ravello while the crowds queue below.",
    highlights: [
      "A private boat day to the grottoes and hidden coves",
      "Pasta-making with a nonna in the hills above Amalfi",
      "The gardens of Villa Cimbrone, after hours",
    ],
  },
  {
    slug: "santorini",
    region: "Greece",
    title: "Santorini & the Cyclades",
    teaser: "Caldera sunsets and island-hopping beyond the postcard.",
    grad: "linear-gradient(135deg,#5f6f7a,#2a3640)",
    image: "/images/santorini.jpg",
    badge: "Islands",
    whenToGo:
      "Late spring or October — caldera sunsets and warm seas without the high-summer crush.",
    bestMonths: ["May", "Jun", "Sep", "Oct"],
    feelings: ["Wonder", "Revitalised"],
    intro:
      "Santorini at its most romantic is a quieter thing than the postcards suggest — a cave room over the caldera, a sail to Thirassia, and an onward hop to a Cycladic island most travellers never reach. It is a place built around the sunset and everything around it.",
    highlights: [
      "A catamaran sunset with dinner aboard",
      "Tasting assyrtiko among the vineyards",
      "A day on a barely-trodden neighbouring island",
    ],
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
