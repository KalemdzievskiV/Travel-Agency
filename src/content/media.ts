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
 * Section backdrops for the content pages (regions, destinations, trips). Four
 * artboards of contour line-work, drawn in pale turquoise (#D4EAEE) bar board
 * 2, which is the pale green (#EDF6E1) cut of the same drawing. Ordered
 * 1 / 3 / 2 / 4 so the side the line-work sits on alternates
 * right-left-right-left down the page rather than following the file
 * numbering. Use `pageBackdrop(i)` rather than reaching for these directly.
 *
 * **Vector, traced from the client's rasters.** They supplied these as
 * 1366×768 PNGs — a laptop screen's worth of pixels, where the set before them
 * was 2048px wide — and asked why the result looked soft. At 1366px the boards
 * are upscaled on any desktop page and doubled again on a 2× screen, and no
 * CSS fixes that. The drawings are smooth, flat-colour curves with no fine
 * detail, so they trace cleanly: `potrace` at the midpoint threshold between
 * each board's ink and white, which lands every board's stroke weight within
 * 3% of the original (measured as coverage weighted by distance from white).
 * The PNGs are kept beside them as the source the traces came from — re-trace,
 * don't hand-edit. If the client ever sends the real vector artwork, drop it
 * in over these.
 *
 * These replace the earlier warm-beige set (bg1–bg3, still in
 * `public/images/background/` should the beige ever be wanted back).
 */
const pageBoards = [
  // Each board is a 16:9 white artboard with its line-work against one edge, so
  // it has to be anchored to that edge: centre these and the artwork can fall
  // outside the section entirely, leaving the plain white we were asked to get
  // rid of. The vertical half named here is the one the board's largest wave
  // occupies — and since the boards are sized to the section's *width* (see
  // `pageBackdrop`), that vertical keyword is the part that does the work.
  { src: "/images/background/1.svg", position: "right top" },
  { src: "/images/background/3.svg", position: "left top" },
  { src: "/images/background/2.svg", position: "right bottom" },
  { src: "/images/background/4.svg", position: "left top" },
] as const;

/** The board itself, for callers that compose their own background layers. */
export function pageBoard(i: number) {
  return pageBoards[i % pageBoards.length];
}

/**
 * Longhand background properties for a light section, cycling the boards by
 * position down the page so consecutive bands never repeat the same corner.
 * Longhands only: the white base has to stay underneath the artboard.
 *
 * `100% auto`, not `cover`. The client asked why these had gone soft and
 * "развлечена", and `cover` was the answer: it scales to whichever axis needs
 * more, so a *tall* band magnifies the artwork by its height. The boards are
 * 1366×768, and the bands they sit behind are not short — the destinations
 * listing runs 10,458px, which had `cover` blowing a 768px-tall drawing up
 * 13.6× (27× on a 2× screen). Sizing to the width instead pins every band to
 * ~1.05× whatever its height, which is as sharp as a 1366px file gets on a
 * 1440px page.
 *
 * A band taller than the board would then run out of artwork, so the boards
 * tile down it. That works because the drawings bleed off the *sides*, not the
 * top and bottom: the top and bottom edges of all four carry 2–5% ink, in pale
 * #D4EAEE, so the seam is white meeting white nearly all the way across.
 *
 * Sharpness is no longer the constraint it was — the boards are vectors now
 * (see `pageBoards`), so they rasterise at whatever size the band asks for.
 */
export function pageBackdrop(i: number) {
  const board = pageBoards[i % pageBoards.length];
  return {
    backgroundColor: "var(--wf-cream)",
    backgroundImage: `url(${board.src})`,
    backgroundSize: "100% auto",
    backgroundPosition: board.position,
    backgroundRepeat: "repeat-y",
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
