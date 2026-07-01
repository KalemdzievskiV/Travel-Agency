import type { Destination } from "./types";
import { slugify } from "../lib/slug";

// Global destination guides for bookit, grouped by region (per the client's
// starter list). Concise starter copy — the admin refines each in the studio.
// Voice: warm, editorial, British English, no emoji. Images are seeded Lorem
// Picsum placeholders until real photography lands.

type Seed = {
  title: string;
  teaser: string;
  badge: string;
  months: string[];
  feelings: string[];
};

const grads = [
  "linear-gradient(135deg,#3f6f7a,#1d3c45)",
  "linear-gradient(135deg,#5a6b86,#2a3550)",
  "linear-gradient(135deg,#7a6a52,#2c2418)",
  "linear-gradient(135deg,#4f6f57,#1d2c20)",
  "linear-gradient(135deg,#6a4f6a,#241a24)",
  "linear-gradient(135deg,#15709b,#0e2a33)",
  "linear-gradient(135deg,#3f8a2e,#10302a)",
  "linear-gradient(135deg,#0c747e,#0e2a33)",
];

const regions: { region: string; places: Seed[] }[] = [
  {
    region: "Africa",
    places: [
      { title: "Egypt", teaser: "Pharaonic temples, the Nile and desert horizons.", badge: "Culture", months: ["Oct", "Nov", "Mar", "Apr"], feelings: ["Wonder", "Challenged"] },
      { title: "Ethiopia", teaser: "Rock-hewn churches and the cradle of coffee.", badge: "Culture", months: ["Oct", "Nov", "Jan", "Feb"], feelings: ["Wonder", "Challenged"] },
      { title: "Kenya", teaser: "The great migration and the wide Rift Valley.", badge: "Safari", months: ["Jul", "Aug", "Sep", "Oct"], feelings: ["Freedom", "Wonder"] },
      { title: "Mauritius", teaser: "Lagoon blues and a slow island rhythm.", badge: "Islands", months: ["May", "Jun", "Sep", "Oct"], feelings: ["Contentment", "Revitalised"] },
      { title: "Morocco", teaser: "Souks, kasbahs and the edge of the Sahara.", badge: "Culture", months: ["Mar", "Apr", "Oct", "Nov"], feelings: ["Wonder", "Freedom"] },
      { title: "Tunisia", teaser: "Roman ruins, medinas and Mediterranean coast.", badge: "Culture", months: ["Apr", "May", "Sep", "Oct"], feelings: ["Wonder", "Contentment"] },
      { title: "Seychelles", teaser: "Granite coves and the clearest of waters.", badge: "Islands", months: ["Apr", "May", "Oct", "Nov"], feelings: ["Contentment", "Revitalised"] },
      { title: "South Africa", teaser: "Cape vineyards, wild coast and the bush.", badge: "Safari", months: ["Feb", "Mar", "Sep", "Oct"], feelings: ["Freedom", "Wonder"] },
      { title: "Tanzania & Zanzibar", teaser: "Serengeti plains and spice-island shores.", badge: "Safari", months: ["Jun", "Jul", "Aug", "Sep"], feelings: ["Wonder", "Freedom"] },
    ],
  },
  {
    region: "Asia",
    places: [
      { title: "Bali", teaser: "Rice terraces, temples and surf-town ease.", badge: "Islands", months: ["Apr", "May", "Jun", "Sep"], feelings: ["Contentment", "Revitalised"] },
      { title: "Philippines", teaser: "Seven thousand islands of white sand and reef.", badge: "Islands", months: ["Jan", "Feb", "Mar", "Apr"], feelings: ["Freedom", "Contentment"] },
      { title: "China", teaser: "Great Wall, misty peaks and ancient cities.", badge: "Culture", months: ["Apr", "May", "Sep", "Oct"], feelings: ["Wonder", "Challenged"] },
      { title: "India", teaser: "Palaces, spice and the sacred Ganges.", badge: "Culture", months: ["Oct", "Nov", "Feb", "Mar"], feelings: ["Wonder", "Challenged"] },
      { title: "Indonesia", teaser: "Volcanoes, jungle and hidden archipelago.", badge: "Islands", months: ["May", "Jun", "Jul", "Sep"], feelings: ["Freedom", "Wonder"] },
      { title: "Japan", teaser: "Neon cities, temple towns and mountain onsen.", badge: "Culture", months: ["Mar", "Apr", "Oct", "Nov"], feelings: ["Wonder", "Contentment"] },
      { title: "South Korea", teaser: "Palaces, night markets and mountain trails.", badge: "Culture", months: ["Apr", "May", "Sep", "Oct"], feelings: ["Wonder", "Revitalised"] },
      { title: "Malaysia", teaser: "Rainforest, islands and a feast of cultures.", badge: "Islands", months: ["Mar", "Apr", "Jul", "Aug"], feelings: ["Contentment", "Wonder"] },
      { title: "Maldives", teaser: "Overwater calm above a coral world.", badge: "Islands", months: ["Nov", "Dec", "Mar", "Apr"], feelings: ["Contentment", "Revitalised"] },
      { title: "Sri Lanka", teaser: "Tea hills, ancient cities and elephant country.", badge: "Culture", months: ["Jan", "Feb", "Mar", "Apr"], feelings: ["Wonder", "Revitalised"] },
      { title: "Thailand", teaser: "Temples, night markets and turquoise bays.", badge: "Islands", months: ["Nov", "Dec", "Jan", "Feb"], feelings: ["Contentment", "Freedom"] },
      { title: "Vietnam", teaser: "Limestone bays, rice fields and street food.", badge: "Culture", months: ["Feb", "Mar", "Apr", "Oct"], feelings: ["Wonder", "Freedom"] },
      { title: "Cambodia", teaser: "The temples of Angkor at first light.", badge: "Culture", months: ["Nov", "Dec", "Jan", "Feb"], feelings: ["Wonder", "Challenged"] },
      { title: "Nepal", teaser: "Himalayan giants and Kathmandu's old lanes.", badge: "Adventure", months: ["Oct", "Nov", "Mar", "Apr"], feelings: ["Challenged", "Wonder"] },
    ],
  },
  {
    region: "South America",
    places: [
      { title: "Argentina", teaser: "Patagonian ice, tango and big-sky wine country.", badge: "Adventure", months: ["Nov", "Dec", "Mar", "Apr"], feelings: ["Freedom", "Wonder"] },
      { title: "Brazil", teaser: "Rainforest, rhythm and endless coast.", badge: "Adventure", months: ["May", "Jun", "Sep", "Oct"], feelings: ["Freedom", "Revitalised"] },
      { title: "Colombia", teaser: "Colonial colour, coffee hills and Caribbean coast.", badge: "Culture", months: ["Dec", "Jan", "Feb", "Mar"], feelings: ["Freedom", "Contentment"] },
      { title: "Peru", teaser: "Machu Picchu, the Andes and the Amazon.", badge: "Adventure", months: ["May", "Jun", "Jul", "Aug"], feelings: ["Challenged", "Wonder"] },
      { title: "Chile", teaser: "Atacama skies to Patagonian towers.", badge: "Adventure", months: ["Nov", "Dec", "Jan", "Feb"], feelings: ["Freedom", "Challenged"] },
      { title: "Bolivia", teaser: "Mirror salt flats and high-altitude wonder.", badge: "Adventure", months: ["May", "Jun", "Jul", "Aug"], feelings: ["Wonder", "Challenged"] },
    ],
  },
  {
    region: "Caribbean & Central America",
    places: [
      { title: "Cuba", teaser: "Classic cars, old Havana and time held still.", badge: "Culture", months: ["Nov", "Dec", "Mar", "Apr"], feelings: ["Wonder", "Contentment"] },
      { title: "Mexico", teaser: "Maya ruins, cenotes and Pacific coast.", badge: "Culture", months: ["Nov", "Dec", "Mar", "Apr"], feelings: ["Wonder", "Freedom"] },
      { title: "Dominican Republic", teaser: "Palm coast and mountain-green interior.", badge: "Islands", months: ["Jan", "Feb", "Mar", "Apr"], feelings: ["Contentment", "Revitalised"] },
      { title: "Panama", teaser: "Two oceans, cloud forest and old-town charm.", badge: "Adventure", months: ["Jan", "Feb", "Mar", "Apr"], feelings: ["Freedom", "Wonder"] },
      { title: "Costa Rica", teaser: "Cloud forest, volcanoes and pura vida.", badge: "Adventure", months: ["Dec", "Jan", "Feb", "Mar"], feelings: ["Revitalised", "Freedom"] },
    ],
  },
  {
    region: "Middle East",
    places: [
      { title: "Israel", teaser: "Ancient stones and the Dead Sea's calm.", badge: "Culture", months: ["Mar", "Apr", "Oct", "Nov"], feelings: ["Wonder", "Contentment"] },
      { title: "Jordan", teaser: "Petra by candlelight and Wadi Rum's red sands.", badge: "Culture", months: ["Mar", "Apr", "Oct", "Nov"], feelings: ["Wonder", "Challenged"] },
      { title: "Oman", teaser: "Wadis, dunes and a gracious old Arabia.", badge: "Adventure", months: ["Nov", "Dec", "Jan", "Feb"], feelings: ["Freedom", "Wonder"] },
      { title: "Qatar", teaser: "Desert modernity and a glittering corniche.", badge: "City", months: ["Nov", "Dec", "Feb", "Mar"], feelings: ["Contentment", "Wonder"] },
      { title: "United Arab Emirates", teaser: "Dubai and Abu Dhabi — skyline to desert.", badge: "City", months: ["Nov", "Dec", "Jan", "Feb"], feelings: ["Contentment", "Freedom"] },
    ],
  },
  {
    region: "North America",
    places: [
      { title: "Canada", teaser: "Rocky Mountains, big lakes and wild coast.", badge: "Adventure", months: ["Jun", "Jul", "Aug", "Sep"], feelings: ["Freedom", "Revitalised"] },
      { title: "United States", teaser: "National parks, road trips and great cities.", badge: "Adventure", months: ["May", "Jun", "Sep", "Oct"], feelings: ["Freedom", "Wonder"] },
    ],
  },
  {
    region: "Europe",
    places: [
      { title: "Italy", teaser: "Art cities, lakes and a coastline made for lingering.", badge: "Culture", months: ["Apr", "May", "Sep", "Oct"], feelings: ["Contentment", "Wonder"] },
      { title: "Spain", teaser: "Moorish palaces, tapas and sun-warmed plazas.", badge: "Culture", months: ["Apr", "May", "Sep", "Oct"], feelings: ["Contentment", "Freedom"] },
      { title: "France", teaser: "Paris, vineyards and a lavender-scented south.", badge: "Culture", months: ["May", "Jun", "Sep", "Oct"], feelings: ["Contentment", "Wonder"] },
      { title: "Turkey", teaser: "Istanbul's bazaars and Cappadocia's spires.", badge: "Culture", months: ["Apr", "May", "Sep", "Oct"], feelings: ["Wonder", "Freedom"] },
      { title: "Greece", teaser: "White-washed isles and ancient light.", badge: "Islands", months: ["May", "Jun", "Sep", "Oct"], feelings: ["Contentment", "Revitalised"] },
      { title: "Netherlands", teaser: "Canals, cycling and Golden Age art.", badge: "City", months: ["Apr", "May", "Jun", "Sep"], feelings: ["Contentment", "Freedom"] },
      { title: "Iceland", teaser: "Waterfalls, volcanoes and the northern lights.", badge: "Adventure", months: ["Jun", "Jul", "Aug", "Sep"], feelings: ["Wonder", "Freedom"] },
      { title: "Germany", teaser: "Fairytale castles, forests and great cities.", badge: "Culture", months: ["May", "Jun", "Sep", "Oct"], feelings: ["Wonder", "Contentment"] },
      { title: "Portugal", teaser: "Tiled towns, wild coast and port-wine hills.", badge: "Culture", months: ["Apr", "May", "Sep", "Oct"], feelings: ["Contentment", "Freedom"] },
      { title: "Russia", teaser: "Golden domes and imperial grandeur.", badge: "Culture", months: ["May", "Jun", "Jul", "Aug"], feelings: ["Wonder", "Challenged"] },
      { title: "Cyprus", teaser: "Ancient ruins and easy Mediterranean days.", badge: "Islands", months: ["Apr", "May", "Sep", "Oct"], feelings: ["Contentment", "Revitalised"] },
      { title: "Malta", teaser: "Honey-stone cities and turquoise coves.", badge: "Islands", months: ["Apr", "May", "Sep", "Oct"], feelings: ["Contentment", "Wonder"] },
    ],
  },
];

let gi = 0;
export const destinations: Destination[] = regions.flatMap(({ region, places }) =>
  places.map((p): Destination => {
    const slug = slugify(p.title);
    const grad = grads[gi++ % grads.length];
    return {
      slug,
      region,
      title: p.title,
      teaser: p.teaser,
      grad,
      image: `https://picsum.photos/seed/bookit-dest-${slug}/1400/1000`,
      badge: p.badge,
      whenToGo: `Best from ${p.months.join(", ")} — the sweet spot for ${p.title}.`,
      bestMonths: p.months,
      feelings: p.feelings,
      intro: `${p.teaser} We plan ${p.title} around how you want to feel — the icons and the quiet corners alike, from the first idea to the moment you're home. No templates, no planning fees.`,
      highlights: [
        `The essentials of ${p.title}, seen without the crowds`,
        "A meal and a story with people who call it home",
        "One remarkable day you'll only find here",
      ],
    };
  }),
);
