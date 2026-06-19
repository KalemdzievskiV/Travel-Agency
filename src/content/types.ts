// Content model for bookit. In-repo and typed for now — designed so it can be
// swapped for a headless CMS later without changing component code.

export type Destination = {
  slug: string;
  region: string;
  title: string;
  /** One-line card teaser. */
  teaser: string;
  /** Tonal placeholder gradient until real photography lands. */
  grad: string;
  /** Real photo URL (preferred over `grad` when present). */
  image?: string;
  priceFrom: string;
  rating: string;
  badge: string;
  duration: string;
  bestMonths: string[];
  feelings: string[];
  /** Long-form editorial body, sentence-case, British English. */
  intro: string;
  highlights: string[];
};

export type Experience = {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  grad: string;
  image?: string;
};

export type Testimonial = {
  quote: string;
  who: string;
  where: string;
};
