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
 * warm beige — bg1 right, bg3 left, bg2 right. Ordered so the side the
 * line-work sits on alternates down the page rather than the file numbering.
 * Use `pageBackdrop(i)` rather than reaching for these directly.
 *
 * These are flattened from the client's SVGs (kept in `brand-source/backgrounds/`)
 * at 2048px wide. Nothing is lost: the SVGs held no vector art, just a white
 * rect and an embedded PNG drawn twice — once as the image, once as its own
 * luminance mask — which is why they weighed 1.2 MB apiece to render 2%-contrast
 * lines. Re-export from the masters if the artwork changes; don't hand-edit.
 */
const pageBoards = [
  // Each board is a 16:9 white artboard with its line-work against one edge, so
  // it has to be anchored to that edge. `cover` on a short, wide band crops to
  // the middle strip — centre these and the artwork falls outside the section
  // entirely, leaving the plain white we were asked to get rid of.
  { src: "/images/background/bg1.webp", position: "right center" },
  { src: "/images/background/bg3.webp", position: "left bottom" },
  { src: "/images/background/bg2.webp", position: "right bottom" },
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
