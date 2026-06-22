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
  { label: "About", href: "/#about" },
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
