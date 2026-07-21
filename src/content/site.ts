// Site-wide configuration and copy for bookit. Kept in one place so it is
// trivial to externalise into a CMS or i18n dictionary later.

export const site = {
  name: "bookit",
  tagline: "Every journey starts with a feeling.",
  phone: "+389 2 312 1212",
  email: "hello@bookit.mk",
  address: "Skopje, North Macedonia",
  established: "Est. 2014",
  description:
    "Tailor-made luxury travel from North Macedonia, designed entirely around how you want to feel. No templates. No planning fees.",
};

// Masthead photo for the Experiences hub. Page-level rather than per-category,
// so it lives here rather than in the categories table — swap the path to
// change it.
export const experiencesHeroImage = "/images/exp-feeling.jpg";

export const nav: { label: string; href: string }[] = [
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Flight tickets", href: "/flight-tickets" },
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
    items: [],
  },
  {
    group: "Why travel with us",
    key: "whyBookWithUs",
    href: "/about/5-reasons",
    items: [
      { label: "5 reasons to travel with us", key: "fiveReasons", href: "/about/5-reasons" },
      { label: "Why not do it yourself?", key: "whyNotDiy", href: "/about/why-not-diy" },
      { label: "How the whole process works", key: "howItWorks", href: "/about/how-it-works" },
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

// Footer navigation. Keys map to the `footer` namespace in the dictionaries.
export const footerNav: {
  bookit: { key: string; href: string }[];
  legal: { key: string; href: string }[];
} = {
  bookit: [
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ],
  legal: [
    { key: "terms", href: "/legal/terms" },
    { key: "cookies", href: "/legal/cookies" },
    { key: "privacy", href: "/legal/privacy" },
  ],
};

// Social profiles for the footer "Follow us" column. Replace the "#" hrefs
// with the client's official profile URLs.
export const socials: { key: "facebook" | "instagram" | "linkedin" | "youtube"; href: string }[] = [
  { key: "facebook", href: "#" },
  { key: "instagram", href: "#" },
  { key: "linkedin", href: "#" },
  { key: "youtube", href: "#" },
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
      { label: "Jan", image: "https://picsum.photos/seed/bookit-jr-jan/800/1100", href: "/destinations" },
      { label: "Feb", image: "https://picsum.photos/seed/bookit-jr-feb/800/1100", href: "/destinations" },
      { label: "Mar", image: "https://picsum.photos/seed/bookit-jr-mar/800/1100", href: "/destinations" },
      { label: "Apr", image: "https://picsum.photos/seed/bookit-jr-apr/800/1100", href: "/destinations" },
      { label: "May", image: "https://picsum.photos/seed/bookit-jr-may/800/1100", href: "/destinations" },
      { label: "Jun", image: "https://picsum.photos/seed/bookit-jr-jun/800/1100", href: "/destinations" },
      { label: "Jul", image: "https://picsum.photos/seed/bookit-jr-jul/800/1100", href: "/destinations" },
      { label: "Aug", image: "https://picsum.photos/seed/bookit-jr-aug/800/1100", href: "/destinations" },
      { label: "Sep", image: "https://picsum.photos/seed/bookit-jr-sep/800/1100", href: "/destinations" },
      { label: "Oct", image: "https://picsum.photos/seed/bookit-jr-oct/800/1100", href: "/destinations" },
      { label: "Nov", image: "https://picsum.photos/seed/bookit-jr-nov/800/1100", href: "/destinations" },
      { label: "Dec", image: "https://picsum.photos/seed/bookit-jr-dec/800/1100", href: "/destinations" },
    ],
  },
];
