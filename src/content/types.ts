// Content model for bookit. In-repo and typed for now — designed so it can be
// swapped for a headless CMS later without changing component code.

// A destination is an evergreen *guide to a place* — not a sellable product.
// The bookable products are Trips, which link to destinations.
export type Destination = {
  slug: string;
  region: string;
  /** Slug of the destination's region (stable key for grouping). */
  regionSlug?: string;
  title: string;
  /** One-line card teaser. */
  teaser: string;
  /** Tonal placeholder gradient until real photography lands. */
  grad: string;
  /** Real photo URL (preferred over `grad` when present). */
  image?: string;
  /** Geo coordinates, for plotting on trip route maps. */
  lat?: number;
  lng?: number;
  /** Category tag, e.g. "Lakeside". */
  badge: string;
  /** Editorial "when to go" note. */
  whenToGo: string;
  bestMonths: string[];
  feelings: string[];
  /** Long-form editorial body, sentence-case, British English. */
  intro: string;
  /** Don't-miss experiences in this place. */
  highlights: string[];
  /** "General notes" — an editable FAQ shown on the destination page. */
  generalNotes: Faq[];
};

export type Experience = {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  grad: string;
  image?: string;
};

// A "WHO" experience category — Families, Couples, Groups, Honeymoon, Solo.
/** Which mega-menu group a category belongs to. */
export type ExperienceKind = "who" | "remarkable";

export type ExperienceCategory = {
  slug: string;
  kind: ExperienceKind;
  title: string;
  subtitle: string;
  heroText: string;
  grad: string;
  image?: string;
};

export type Faq = { q: string; a: string };

export type ExperienceCategoryDetail = ExperienceCategory & {
  concept: string;
  recommendations: string;
  faqs: Faq[];
  trips: Trip[];
  /** "Our favourite … destinations" band; empty when the category has none. */
  destinationsHeading: string;
  destinationsIntro: string;
  destinations: Destination[];
};

// A curated place to stay, tied to a destination.
export type Hotel = {
  slug: string;
  name: string;
  teaser: string;
  grad: string;
  image?: string;
  images: string[];
  priceFrom: string;
  stars?: number;
  style: string[];
  lat?: number;
  lng?: number;
  destinationSlug?: string;
  destinationTitle?: string;
};

export type HotelDetail = Hotel & { description: string };

export type RemarkableExperience = {
  slug: string;
  title: string;
  teaser: string;
  description: string;
  grad: string;
  image?: string;
  /** Slug of the trip this experience showcases, if any — the card links to it. */
  tripSlug?: string;
};

export type Testimonial = {
  quote: string;
  who: string;
  where: string;
};

// A trip is the concrete, sellable product: fixed length, price, day-by-day
// itinerary, and departure dates. It visits one or more destinations.
export type Trip = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  durationDays: number | null;
  priceFrom: string;
  grad: string;
  image?: string;
  /** Gallery images (URLs) for the trip carousel. */
  images: string[];
  feelings: string[];
  /** Day-by-day plan, one entry per day/stage. */
  itinerary: string[];
  /** Fixed departure dates. */
  departures: string[];
  /** "Important notes" — what's included / not included, and visa & entry. */
  included: string[];
  notIncluded: string[];
  visaNotes: string;
};
