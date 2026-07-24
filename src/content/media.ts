// Client-supplied artwork. The files sit in `public/images/Design Images svg/`,
// a folder name with spaces in it — so the paths are pre-encoded here once and
// imported by name rather than retyped (and mis-escaped) at each call site.

const DIR = "/images/Design%20Images%20svg";

/**
 * Section backdrops — the line-art artboards the client sent to replace the
 * first set. `dark` is the colour-corrected olive board that sits behind the
 * white-on-dark carousels; the rest are white boards with the turquoise
 * contour waves drawn into a different corner each, so consecutive light bands
 * don't repeat the same silhouette.
 */
export const backdrop = {
  dark: `${DIR}/1.svg`,
  cta: `${DIR}/2.svg`,
  intro: `${DIR}/3.svg`,
  points: `${DIR}/4.svg`,
} as const;

/** Deep-blue plaster texture behind the "why us" panels. */
export const royalBlue = `${DIR}/Royal%20Blue%20background.png`;

/**
 * That texture as a ready-to-use panel background. The raw plaster is a bright
 * mid-blue (≈#0568AC) — the coral display type sits at 1.85:1 on it and body
 * copy barely better — so the ink scrim is doing legibility work, not
 * decoration. Don't lighten it without re-checking those two against AA.
 */
export const royalBluePanel = `linear-gradient(rgba(17,26,34,0.60), rgba(17,26,34,0.70)), url(${royalBlue}) center/cover no-repeat, var(--wf-ink-900)`;

/** Photography for the five reasons, in order (01 → 05). */
export const reasonPhoto = [1, 2, 3, 4, 5].map((n) => `${DIR}/${n}.avif`);

/** Photography for the "how it all works" steps, in order (01 → 07). */
export const processPhoto = [11, 12, 13, 14, 15, 16, 17].map((n) => `${DIR}/${n}.avif`);
