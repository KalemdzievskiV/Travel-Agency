/**
 * The brand colourway, while the client chooses between two: the 2026 logo
 * with a lime compass (#D5DF43) or an orange one (#FF5C34). Change BRAND and
 * the whole site follows — the logo artwork here, the favicon, and the accent
 * palette (colors.css keys its override off `data-brand` on <html>).
 *
 * Once one is chosen, the other can be deleted: its entry below, its
 * `[data-brand]` block in colors.css, and its files in /public/brand.
 */
export type Brand = "lime" | "orange";

export const BRAND: Brand = "orange";

type BrandArt = {
  /** Wordmark with ink letters, for light grounds. */
  ink: string;
  /** The same wordmark with white letters, for dark grounds. */
  light: string;
  /** Intrinsic aspect ratio of the prepared artwork. */
  ratio: number;
  /**
   * Where the b ends, as a fraction of the width — measured off the artwork,
   * in the empty gap between the b and the compass "o".
   */
  bFraction: number;
  /** Where the compass "o" ends — the gap before the second "o". */
  markEndFraction: number;
  favicon: string;
};

export const BRAND_ART: Record<Brand, BrandArt> = {
  /* From `public/images/CRNO 1.png`, compass recoloured #D3D942 → #D5DF43.
     The white file is derived from the black one: `BELO 1.png` draws its
     letters at a slightly different scale, which would not register in the
     header's cross-fade. b spans x 0–234 of 1128, the compass 247–481 (y 86–321
     of 324), the second "o" starts at 495. */
  lime: {
    ink: "/brand/bookit-logo-2026-lime-ink.png",
    light: "/brand/bookit-logo-2026-lime-white.png",
    ratio: 1128 / 324,
    bFraction: 0.2132,
    markEndFraction: 0.4326,
    favicon: "/brand/bookit-icon-lime.svg",
  },
  /* From `public/images/CRNO 2.png` and `BELO 2.png` (these two do register),
     compass recoloured #F15D38 → #FF5C34. b spans x 0–246 of 1188, the compass
     259–506 (y 90–338 of 340), the second "o" starts at 521. */
  orange: {
    ink: "/brand/bookit-logo-2026-orange-ink.png",
    light: "/brand/bookit-logo-2026-orange-white.png",
    ratio: 1188 / 340,
    bFraction: 0.2125,
    markEndFraction: 0.4322,
    favicon: "/brand/bookit-icon-orange.svg",
  },
};
