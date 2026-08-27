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
 * Section backdrops for the content pages (regions, destinations, trips). Four
 * white artboards with the same contour line-work as `backdrop`, drawn in pale
 * turquoise (#D4EAEE) bar board 2, which is the pale green (#EDF6E1) cut of the
 * same drawing. Ordered 1 / 3 / 2 / 4 so the side the line-work sits on
 * alternates right-left-right-left down the page rather than following the file
 * numbering. Use `pageBackdrop(i)` rather than reaching for these directly.
 *
 * These replace the earlier warm-beige set (bg1–bg3, still in
 * `public/images/background/` should the beige ever be wanted back).
 */
const pageBoards = [
  // Each board is a 16:9 white artboard with its line-work against one edge, so
  // it has to be anchored to that edge. `cover` on a short, wide band crops to
  // the middle strip — centre these and the artwork falls outside the section
  // entirely, leaving the plain white we were asked to get rid of. The vertical
  // half named here is the one the board's largest wave actually occupies.
  { src: "/images/background/1.png", position: "right center" },
  { src: "/images/background/3.png", position: "left center" },
  { src: "/images/background/2.png", position: "right bottom" },
  { src: "/images/background/4.png", position: "left top" },
] as const;

/** The board itself, for callers that compose their own background layers. */
export function pageBoard(i: number) {
  return pageBoards[i % pageBoards.length];
}

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
 * The green plaster band behind the About masthead, replacing the old orange
 * gradient. The ink wash is doing legibility work, not decoration: white sits
 * at 4.4:1 on the bare plaster, just under AA for the small eyebrow. Don't
 * lighten it without re-checking that.
 */
export const aboutMastheadBand =
  "linear-gradient(rgba(16,24,16,0.32), rgba(16,24,16,0.32))," +
  " url(/images/about/masthead.webp) center/cover no-repeat, var(--wf-ink-900)";

/** World map behind the "Твојот свет" closing band. */
export const aboutWorldImage = "/images/about/your-world.webp";

/**
 * The five ЗА НАС photographs, numbered as the client sent them. They land on
 * the five portrait slots of /about, top to bottom: the masthead, the three
 * story rows, then "why the name?". The closing `world` band is landscape and
 * is deliberately not in this set.
 */
export const aboutPhoto = [1, 2, 3, 4, 5].map((n) => `/images/about/${n}.avif`);

/**
 * Photography for the newsletter popup, portrait to suit its tall left column.
 * Drawn from the ЗА НАС set the client sent, minus number 5 — that one is the
 * logo plate, and they asked for "некоја од човек интересна", a person. One is
 * picked at random each time the popup opens.
 */
export const newsletterPhoto = [1, 2, 3, 4].map((n) => `/images/about/${n}.avif`);

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
