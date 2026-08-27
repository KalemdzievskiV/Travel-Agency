import Link from "next/link";

// Final Bookit wordmark (converted from public/brand/Final LOGO.ai).
const LOGO_RATIO = 900 / 257; // intrinsic aspect ratio of the wordmark

/**
 * Where the B ends. Measured off the artwork's alpha channel: the B occupies
 * x 0–216 of 900 and the first "o" starts at 224, so the cut falls in the gap
 * between them.
 */
const B_FRACTION = 220 / 900;

/**
 * The wordmark is drawn as two CSS masks of the same PNG rather than as an
 * <img>. Two reasons: it lets the mark collapse to the B on scroll, and it
 * lets the B take a colour, which a flat raster cannot. The mask reads only
 * the artwork's alpha, so the white knockout serves as the silhouette for
 * every colour.
 *
 * A side effect, and the reason it is drawn this way on light backgrounds too:
 * the mark comes out flat — accent B, ink "ookit" — rather than in the file's
 * old blue-and-green gradient. That is the client's current palette, and the
 * user picked this over the original artwork on sight.
 */
const MASK_SRC = "/brand/bookit-logo-white.png";

/**
 * bookit logo. `size` sets the rendered height in px; width scales to the
 * wordmark's aspect ratio. `light` renders it white, for use over photography
 * and dark bands. `href={null}` renders the mark without a link.
 *
 * `collapsed` runs the header's scroll transition: "ookit" slides left and
 * disappears behind the B, which is left standing in the accent. It reverses
 * on the way back up. The letters travel rather than simply fading — the
 * artwork stays pinned to the right edge of a box that narrows to nothing, so
 * the whole word is dragged leftward and clipped against the B.
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
  /** Collapse to the B alone (the header, once it has left the hero). */
  collapsed?: boolean;
}) {
  const height = size;
  const width = Math.round(height * LOGO_RATIO);
  const bWidth = Math.round(width * B_FRACTION);
  const restWidth = width - bWidth;

  // Over a hero the whole wordmark is white. Everywhere else the letters are
  // ink and the B carries the accent, standing or not.
  const restColour = light ? "#fff" : "var(--wf-ink-900)";
  const bColour = light ? "#fff" : "var(--wf-accent)";

  /** One slice of the silhouette, ready to be filled with a flat colour. */
  const stencil = (offset: number, w: number): React.CSSProperties => ({
    width: w,
    height,
    maskImage: `url(${MASK_SRC})`,
    WebkitMaskImage: `url(${MASK_SRC})`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: `${width}px ${height}px`,
    WebkitMaskSize: `${width}px ${height}px`,
    maskPosition: `${-offset}px top`,
    WebkitMaskPosition: `${-offset}px top`,
  });

  const img = (
    <span className="wf-logo" role="img" aria-label="bookit" style={{ height }}>
      <span
        aria-hidden
        className="wf-logo__part wf-logo__b"
        style={{ ...stencil(0, bWidth), backgroundColor: bColour }}
      />
      <span aria-hidden className="wf-logo__rest" style={{ width: collapsed ? 0 : restWidth, height }}>
        {/* Pinned right: as the box narrows, the artwork is dragged left with
            it and clipped against the B, so the letters read as moving rather
            than as being cut off. */}
        <span
          className="wf-logo__part wf-logo__rest-inner"
          style={{ ...stencil(bWidth, restWidth), backgroundColor: restColour, opacity: collapsed ? 0 : 1 }}
        />
      </span>
    </span>
  );

  if (href === null) return img;
  return (
    <Link href={href} aria-label="bookit — home" style={{ display: "inline-flex" }}>
      {img}
    </Link>
  );
}
