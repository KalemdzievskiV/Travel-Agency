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
export const aboutMenu: { group: string; href: string; items: { label: string; href: string }[] }[] = [
  {
    group: "Who we are",
    href: "/about",
    items: [
      { label: "Our purpose", href: "/about" },
      { label: "Our team", href: "/about/team" },
      { label: "Our awards", href: "/about/awards" },
      { label: "Client testimonials", href: "/about/testimonials" },
      { label: "In the press", href: "/about/press" },
    ],
  },
  {
    group: "Why book with us",
    href: "/about/5-reasons",
    items: [
      { label: "5 reasons to book with us", href: "/about/5-reasons" },
      { label: "Why not just do it yourself?", href: "/about/why-not-diy" },
      { label: "How it all works", href: "/about/how-it-works" },
      { label: "Regenerative travel", href: "/about/regenerative-travel" },
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

export const footerColumns: Record<string, string[]> = {
  "Who we are": ["Our purpose", "Our team", "Awards", "Press"],
  Experiences: ["Family", "Couples", "Honeymoons", "Adventure", "Slow travel"],
  Useful: ["How it works", "FAQ", "Booking conditions", "Careers"],
};

export const whyPoints: { icon: "award" | "globe" | "phone" | "pin"; label: string }[] = [
  { icon: "award", label: "Award-winning planners" },
  { icon: "globe", label: "Balkans & beyond" },
  { icon: "phone", label: "24/7 on-the-ground support" },
  { icon: "pin", label: "Expert private guides" },
];
