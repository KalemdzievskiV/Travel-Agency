// Site-wide configuration and copy for bookit. Kept in one place so it is
// trivial to externalise into a CMS or i18n dictionary later.

export const site = {
  name: "bookit",
  tagline: "Every journey starts with a feeling.",
  phone: "+389 2 312 1212",
  email: "hello@bookit.mk",
  established: "Est. 2014",
  description:
    "Tailor-made luxury travel from North Macedonia, designed entirely around how you want to feel. No templates. No planning fees.",
};

export const nav: { label: string; href: string }[] = [
  { label: "Destinations", href: "/destinations" },
  { label: "Trips", href: "/trips" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Trip finder", href: "/trip-finder" },
  { label: "About", href: "/about" },
];

// The "About" mega-menu — two groups, each opening its own pages. Mirrors the
// client brief (Who we are / Why book with us). Drives both the desktop dropdown
// and the mobile accordion in SiteHeader.
export const aboutMenu: {
  group: string;
  key: string;
  href: string;
  items: { label: string; key: string; href: string }[];
}[] = [
  {
    group: "Who we are",
    key: "whoWeAre",
    href: "/about",
    items: [
      { label: "Our purpose", key: "purpose", href: "/about" },
      { label: "Our team", key: "team", href: "/about/team" },
      { label: "Our awards", key: "awards", href: "/about/awards" },
      { label: "Client testimonials", key: "testimonials", href: "/about/testimonials" },
      { label: "In the press", key: "press", href: "/about/press" },
    ],
  },
  {
    group: "Why book with us",
    key: "whyBookWithUs",
    href: "/about/5-reasons",
    items: [
      { label: "5 reasons to book with us", key: "fiveReasons", href: "/about/5-reasons" },
      { label: "Why not just do it yourself?", key: "whyNotDiy", href: "/about/why-not-diy" },
      { label: "How it all works", key: "howItWorks", href: "/about/how-it-works" },
      { label: "Regenerative travel", key: "regenerative", href: "/about/regenerative-travel" },
    ],
  },
];

export const press: string[] = [
  "CONDÉ NAST",
  "NATIONAL GEOGRAPHIC",
  "TRAVEL + LEISURE",
  "LONELY PLANET",
  "BALKAN INSIGHT",
];

export const feelings: string[] = [
  "Contentment",
  "Revitalised",
  "Freedom",
  "Wonder",
  "Challenged",
];

export const months: string[] = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Column + item keys map to the `footer` namespace in the message dictionaries.
export const footerColumns: { key: string; items: string[] }[] = [
  { key: "whoWeAre", items: ["purpose", "team", "awards", "press"] },
  { key: "experiences", items: ["family", "couples", "honeymoons", "adventure", "slowTravel"] },
  { key: "useful", items: ["howItWorks", "faq", "bookingConditions", "careers"] },
];

export const whyPoints: { icon: "award" | "globe" | "phone" | "pin"; label: string }[] = [
  { icon: "award", label: "Award-winning planners" },
  { icon: "globe", label: "Balkans & beyond" },
  { icon: "phone", label: "24/7 on-the-ground support" },
  { icon: "pin", label: "Expert private guides" },
];

// "Why bookit?" reasons (modelled on Black Tomato's row). Each point uses either
// a custom SVG (`src`, in /public/brand/icons) or a lucide glyph key (`icon`,
// mapped in the WhyBookit component); `src` wins when both are set.
export const whyBookit: {
  icon: "award" | "quote" | "map" | "support" | "guide";
  src?: string;
  label: string;
}[] = [
  { icon: "award", src: "/brand/icons/award.svg", label: "Award-winning planners" },
  { icon: "quote", src: "/brand/icons/quotes.svg", label: "No-obligation quotes" },
  { icon: "map", src: "/brand/icons/fees.svg", label: "No planning fees" },
  { icon: "support", src: "/brand/icons/support.svg", label: "24/7 on-the-ground support" },
  { icon: "guide", src: "/brand/icons/guide.svg", label: "Expert private guides" },
];

// "Start your journey" — landing tabs (modelled on Black Tomato). Front-end
// placeholders for now (images via Lorem Picsum); the destinations backend will
// wire these to real filters later. Each card links to /destinations for now.
export type JourneyCard = { label: string; image: string; href: string };
export type JourneyTab = { key: string; label: string; cards: JourneyCard[] };

export const journeyTabs: JourneyTab[] = [
  {
    key: "traveller",
    label: "By traveller",
    cards: [
      { label: "Family", image: "https://picsum.photos/seed/bookit-jr-family/800/1100", href: "/destinations" },
      { label: "Couples", image: "https://picsum.photos/seed/bookit-jr-couples/800/1100", href: "/destinations" },
      { label: "Groups", image: "https://picsum.photos/seed/bookit-jr-groups/800/1100", href: "/destinations" },
      { label: "Honeymoon", image: "https://picsum.photos/seed/bookit-jr-honeymoon/800/1100", href: "/destinations" },
      { label: "Solo", image: "https://picsum.photos/seed/bookit-jr-solo/800/1100", href: "/destinations" },
    ],
  },
  {
    key: "popular",
    label: "Most popular",
    cards: [
      { label: "Lake Ohrid", image: "https://picsum.photos/seed/bookit-jr-ohrid/800/1100", href: "/destinations" },
      { label: "Mavrovo", image: "https://picsum.photos/seed/bookit-jr-mavrovo/800/1100", href: "/destinations" },
      { label: "Matka Canyon", image: "https://picsum.photos/seed/bookit-jr-matka/800/1100", href: "/destinations" },
      { label: "Prespa", image: "https://picsum.photos/seed/bookit-jr-prespa/800/1100", href: "/destinations" },
      { label: "Galičica", image: "https://picsum.photos/seed/bookit-jr-galicica/800/1100", href: "/destinations" },
    ],
  },
  {
    key: "month",
    label: "By month",
    cards: [
      { label: "January", image: "https://picsum.photos/seed/bookit-jr-jan/800/1100", href: "/destinations" },
      { label: "February", image: "https://picsum.photos/seed/bookit-jr-feb/800/1100", href: "/destinations" },
      { label: "March", image: "https://picsum.photos/seed/bookit-jr-mar/800/1100", href: "/destinations" },
      { label: "April", image: "https://picsum.photos/seed/bookit-jr-apr/800/1100", href: "/destinations" },
      { label: "May", image: "https://picsum.photos/seed/bookit-jr-may/800/1100", href: "/destinations" },
      { label: "June", image: "https://picsum.photos/seed/bookit-jr-jun/800/1100", href: "/destinations" },
      { label: "July", image: "https://picsum.photos/seed/bookit-jr-jul/800/1100", href: "/destinations" },
      { label: "August", image: "https://picsum.photos/seed/bookit-jr-aug/800/1100", href: "/destinations" },
      { label: "September", image: "https://picsum.photos/seed/bookit-jr-sep/800/1100", href: "/destinations" },
      { label: "October", image: "https://picsum.photos/seed/bookit-jr-oct/800/1100", href: "/destinations" },
      { label: "November", image: "https://picsum.photos/seed/bookit-jr-nov/800/1100", href: "/destinations" },
      { label: "December", image: "https://picsum.photos/seed/bookit-jr-dec/800/1100", href: "/destinations" },
    ],
  },
];
