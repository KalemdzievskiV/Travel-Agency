import Link from "next/link";
import { BRAND, BRAND_ART } from "@/content/brand";

/**
 * The client's 2026 wordmark, in whichever colourway `BRAND` selects (see
 * src/content/brand.ts). Two files per colourway, identical but for the
 * letters — ink for light grounds, white for dark — with the compass "o"'s
 * needle knocked out so the page colour shows through it.
 */
const {
  ink: ART_INK,
  light: ART_LIGHT,
  ratio: LOGO_RATIO,
  bFraction: B_FRACTION,
  markEndFraction: MARK_END_FRACTION,
  markLift: MARK_LIFT,
} = BRAND_ART[BRAND];

/**
 * bookit logo. `size` sets the rendered height in px; width scales to the
 * wordmark's aspect ratio. `light` renders the letters white, for use over
 * photography and dark bands. `href={null}` renders the mark without a link.
 *
 * The wordmark is drawn as three slices of the same artwork rather than as one
 * <img> — "b", the compass "o", and "okit" — which is what lets the mark
 * collapse to the compass on scroll.
 *
 * `collapsed` runs the header's scroll transition: the b and "okit" both slide
 * left and disappear, leaving the compass — the brand icon — standing. It
 * reverses on the way back up. The letters travel rather than simply fading:
 * each sits pinned to the right edge of a box that narrows to nothing, so the
 * b is dragged out past the logo's left edge and "okit" is dragged in behind
 * the compass. The compass rises as it goes, since in the wordmark it sits on
 * the baseline below the b's ascender, and alone it should sit centred.
 */
export function Logo({
  light = false,
  size = 30,
  href = "/",
  collapsed = false,
}: {
  light?: boolean;
  size?: number;
  href?: string | null;
  /** Collapse to the compass icon alone (the header, once it has left the hero). */
  collapsed?: boolean;
}) {
  const height = size;
  const width = Math.round(height * LOGO_RATIO);
  const bWidth = Math.round(width * B_FRACTION);
  const markEnd = Math.round(width * MARK_END_FRACTION);
  const markWidth = markEnd - bWidth;
  const restWidth = width - markEnd;

  /** One slice of the artwork, drawn at its own scale and offset. */
  const slice = (src: string, offset: number, w: number): React.CSSProperties => ({
    width: w,
    height,
    backgroundImage: `url("${src}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${width}px ${height}px`,
    backgroundPosition: `${-offset}px top`,
  });

  /**
   * A run of letters that folds away on collapse. Pinned right: as the box
   * narrows, the artwork is dragged left with it and clipped, so the letters
   * read as moving rather than as being cut off. Both letter colours are
   * stacked and cross-faded, so the header's light/dark swap stays a fade — a
   * straight file swap pops while the header background is still fading.
   */
  const fold = (offset: number, w: number) => (
    <span aria-hidden className="wf-logo__fold" style={{ width: collapsed ? 0 : w, height }}>
      <span className="wf-logo__fold-inner" style={{ width: w, height, opacity: collapsed ? 0 : 1 }}>
        <span
          className="wf-logo__part wf-logo__art"
          style={{ ...slice(ART_INK, offset, w), opacity: light ? 0 : 1 }}
        />
        <span
          className="wf-logo__part wf-logo__art"
          style={{ ...slice(ART_LIGHT, offset, w), opacity: light ? 1 : 0 }}
        />
      </span>
    </span>
  );

  const img = (
    <span className="wf-logo" role="img" aria-label="bookit" style={{ height }}>
      {fold(0, bWidth)}
      {/* The compass is coloured the same in both files, so it needs no
          light/dark swap. */}
      <span
        aria-hidden
        className="wf-logo__part wf-logo__mark"
        style={{
          ...slice(ART_INK, bWidth, markWidth),
          transform: collapsed ? `translateY(${-Math.round(height * MARK_LIFT)}px)` : "none",
        }}
      />
      {fold(markEnd, restWidth)}
    </span>
  );

  if (href === null) return img;
  return (
    <Link href={href} aria-label="bookit — home" style={{ display: "inline-flex" }}>
      {img}
    </Link>
  );
}
