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
  /**
   * The dark band backdrop, revision 3.1: the client's own blurred artboard,
   * line-work in the lower left. It replaces the colour-corrected olive board
   * (`1.svg`) they had here before, and they asked for it on every dark
   * carousel band — home, destination pages, trip pages, /doživuvanja and each
   * of its subgroups. No scrim: white sits at 10.2:1 on the darkest of it.
   *
   * Raster, and they sent it 1366×768 — a laptop screen's worth of pixels, the
   * same size problem as the boards below. It survives it where those did not:
   * it is a photographic blur with no fine detail to lose, so upscaling reads
   * as softness in something already soft. Ask for 2048px+ if it ever shows.
   */
  dark: "/images/background/dark-band.webp",
  cta: `${DIR}/2.svg`,
  intro: `${DIR}/3.svg`,
  points: `${DIR}/4.svg`,
} as const;

/**
 * Section backdrops for the content pages (regions, destinations, trips).
 *
 * Revision 3.2 threw out the turquoise set and the rotation that went with it.
 * The client sent four grey boards, D1–D4, and — this is the change that
 * matters — a page-by-page brief saying which board goes where and, more often,
 * where a board should no longer appear at all. Boards are chosen by name now,
 * not by position in a page, and a section with no entry here gets plain white.
 *
 * The drawings are the same contour rings as before but drawn in near-white
 * grey: #EFEFEF ink on #FFFFFF, a six-step difference where the old boards were
 * #D4EAEE. They cover more of the artboard (6–9%, against 3%) and read as far
 * less. Two consequences worth knowing before reusing them:
 *
 * - They vanish on anything but pure white. `--wf-sand` and `--wf-cream-2` are
 *   both #F7F7F7, closer to the ink than the ink is to the canvas, so these are
 *   for `--wf-cream` sections only.
 * - They cannot tile. The old boards bled off the sides and kept their top and
 *   bottom edges near-empty, which is what made `repeat-y` invisible; D3 carries
 *   19% ink on its top edge and 27% on its bottom, so tiling butts ring against
 *   ring and draws a line across the band. Every board is `no-repeat` now — the
 *   brief confines them to short sections (notes, FAQs, an intro paragraph), so
 *   there is nothing left to tile down.
 *
 * **Rendered from the client's own artwork**, not traced from it. They sent both
 * 1920×1080 PNGs and SVGs; the SVGs are Affinity exports whose line-work is a
 * dozen PNG tiles placed 1:1 inside an 8000×4500 viewBox, so the artwork's
 * native detail is four times the PNGs'. `scripts/render-backgrounds.mjs`
 * rasterises those at 3840×2160 into lossless WebP (55–107 KB each). Sources
 * live in `brand-source/backgrounds/`; re-render, don't hand-edit.
 *
 * This set replaces the traced turquoise boards (1–4.svg) and, before them, the
 * warm-beige bg1–bg3 — all still in `public/images/background/`.
 */
const pageBoards = {
  /**
   * Ring cluster off the right edge, mid-height. Home intro, flight tickets.
   * Anchored right: its ink centroid sits at 91% across and 43% down.
   */
  d1: { src: "/images/background/d1.webp", position: "right center" },
  /** One low ring, bottom left — nothing in the top two thirds. "Why bookit?", contact. */
  d2: { src: "/images/background/d2.webp", position: "left bottom" },
  /**
   * The busiest of the four: clusters top-right, right, and bottom-left, so no
   * one edge owns it. Centred, which loses the least when a short band crops it.
   */
  d3: { src: "/images/background/d3.webp", position: "center center" },
  /** Two rings down the left edge, top and bottom. Notes, FAQs, the enquiry form. */
  d4: { src: "/images/background/d4.webp", position: "left center" },
} as const;

export type BoardName = keyof typeof pageBoards;

/** The board itself, for callers that compose their own background layers. */
export function pageBoard(name: BoardName) {
  return pageBoards[name];
}

/**
 * Longhand background properties for a light section carrying one named board.
 * Longhands only: the white base has to stay underneath the artboard.
 *
 * `100% auto`, not `cover`. The client asked in 3.1 why these had gone soft and
 * "развлечена", and `cover` was the answer: it scales to whichever axis needs
 * more, so a *tall* band magnifies the artwork by its height. Sizing to the
 * width instead pins the board to the band's own scale, and at 3840px wide it
 * stays sharp doing it. A band taller than 9/16 of its width simply runs out of
 * artwork and finishes in white, which is the right failure now that boards no
 * longer tile — see `pageBoards`.
 *
 * The three variable values are what let a phone override this in a media query
 * rather than at ~30 call sites: these are spread into inline `style`, which
 * can't carry one. `responsive.css` currently sets none of them — the 3.1
 * mobile note that did was answering the old tiled, tinted set — but the hooks
 * stay so the next mobile note is one rule again.
 */
export function pageBackdrop(name: BoardName) {
  const board = pageBoards[name];
  return {
    backgroundColor: "var(--wf-cream)",
    backgroundImage: `var(--wf-board-img, url(${board.src}))`,
    backgroundSize: "var(--wf-board-size, 100% auto)",
    backgroundPosition: `var(--wf-board-pos, ${board.position})`,
    backgroundRepeat: "no-repeat",
  } as const;
}

/**
 * A light section the 3.2 brief asked to strip back to plain white — the
 * destinations listing, a country page above its notes, a programme's title
 * block ("само кај текстот, не кај насловот"). Spelled out rather than left
 * blank so the intent reads as a decision at the call site instead of an
 * omission, and so the band still paints white if it ever sits over something.
 */
export const plainBand = { backgroundColor: "var(--wf-cream)" } as const;

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

/**
 * The photograph behind the "Твојот свет" closing band (client image 25,
 * revision 3.1), replacing the grey world map that was here. It is a saturated
 * picture and the band centres white copy over the middle of it, so the
 * FeatureBand scrim is doing legibility work — see /about's use of it.
 */
export const aboutWorldImage = "/images/about/your-world.webp";

/**
 * The plate beside "Зошто Bookit?" (client image BOOKIT, revision 3.1) — the
 * wordmark over a slot canyon. It is not part of the numbered ЗА НАС set below
 * because it is the one image with the logo burnt into it: it must not be
 * cropped hard or picked up by the newsletter popup, which wants a person.
 */
export const aboutNameImage = "/images/about/why-bookit.webp";

/**
 * The blue plaster behind the "make this itinerary yours" card on every trip
 * page (client image 21, revision 3.1). The scrim is deliberate and mild: the
 * bare plaster carries white body copy at 4.19:1, just under the 4.5:1 that
 * size of type needs, and 0.35 lifts it to 7.8:1 while leaving the blue blue.
 */
export const ctaPlasterPanel =
  "linear-gradient(rgba(22,19,15,0.35), rgba(22,19,15,0.35))," +
  " url(/images/background/cta-plaster.webp) center/cover no-repeat, var(--wf-ink-900)";

/**
 * The five ЗА НАС photographs, numbered as the client sent them. They land on
 * the portrait slots of /about, top to bottom: the masthead and the three story
 * rows. Number 5 held "why the name?" until revision 3.1 gave that slot its own
 * plate (`aboutNameImage`); it stays in the set so the numbering keeps matching
 * the files the client sent. The closing `world` band is landscape and is
 * deliberately not in this set.
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
