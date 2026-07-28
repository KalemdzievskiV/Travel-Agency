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

/**
 * Section backdrops for the content pages (regions, destinations, trips). Three
 * white artboards with the same contour line-work as `backdrop`, drawn in pale
 * warm beige into a different corner each — 1 bottom-left, 2 left, 3 right.
 * Use `pageBackdrop(i)` rather than reaching for these directly.
 */
const pageBoards = [
  // Each board is a 16:9 white artboard with its line-work in one corner, so it
  // has to be anchored to that corner. `cover` on a short, wide band crops to
  // the middle strip — centre these and the artwork falls outside the section
  // entirely, leaving the plain white we were asked to get rid of.
  { src: "/images/background/1.svg", position: "left bottom" },
  { src: "/images/background/2.svg", position: "left center" },
  { src: "/images/background/3.svg", position: "right top" },
] as const;

/**
 * Longhand background properties for a light section, cycling the three boards
 * by position down the page so consecutive bands never repeat the same corner.
 * Longhands only: the white base has to stay underneath the artboard.
 */
export function pageBackdrop(i: number) {
  const board = pageBoards[i % pageBoards.length];
  return {
    backgroundColor: "var(--wf-cream)",
    backgroundImage: `url(${board.src})`,
    backgroundSize: "cover",
    backgroundPosition: board.position,
    backgroundRepeat: "no-repeat",
  } as const;
}

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

/**
 * The five ЗА НАС photographs, numbered as the client sent them. They land on
 * the five portrait slots of /about, top to bottom: the masthead, the three
 * story rows, then "why the name?". The closing `world` band is landscape and
 * is deliberately not in this set.
 */
export const aboutPhoto = [1, 2, 3, 4, 5].map((n) => `/images/about/${n}.avif`);

/**
 * Artwork for the "by month" cards on the home page, keyed by the short English
 * label those cards use. Filenames are the client's Macedonian month names.
 */
export const monthPhoto: Record<string, string> = {
  Jan: "/images/months/Januari1.avif",
  Feb: "/images/months/Fevruari1.avif",
  Mar: "/images/months/Mart1.avif",
  Apr: "/images/months/April1.avif",
  May: "/images/months/Maj1.avif",
  Jun: "/images/months/Juni1.avif",
  Jul: "/images/months/Juli1.avif",
  Aug: "/images/months/Avgust1.avif",
  Sep: "/images/months/Septemvri1.avif",
  Oct: "/images/months/Oktomvri1.avif",
  Nov: "/images/months/Noemvri1.avif",
  Dec: "/images/months/Dekemvri1.avif",
};
