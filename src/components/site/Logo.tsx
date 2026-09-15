import Link from "next/link";

/**
 * The client's 2026 wordmark, prepared from `public/images/CRNO 1.png`: trimmed
 * to the artwork, the letters kept in the client's black, and the compass "o"
 * recoloured from the file's #D3D942 to the requested #D5DF43. The needle is
 * knocked out, so the page colour shows through it. Two files, identical but
 * for the letters (the white one is derived from the black rather than taken
 * from `BELO 1.png`, whose letters are drawn at a slightly different scale and
 * would not register during the cross-fade):
 */
const ART_INK = "/brand/bookit-logo-2026-v2-ink.png";     /* ink letters, for light grounds */
const ART_LIGHT = "/brand/bookit-logo-2026-v2-white.png"; /* white letters, for dark grounds */

const LOGO_RATIO = 1128 / 324; // intrinsic aspect ratio of the prepared artwork

/**
 * Where the B ends. Measured off the artwork itself: the b occupies x 0–234 of
 * 1128 and the compass "o" starts at 247, so the cut falls in the gap between them.
 */
const B_FRACTION = 0.2132;

/**
 * bookit logo. `size` sets the rendered height in px; width scales to the
 * wordmark's aspect ratio. `light` renders the letters white, for use over
 * photography and dark bands. `href={null}` renders the mark without a link.
 *
 * The wordmark is drawn as two slices of the same artwork rather than as one
 * <img> — that is what lets the mark collapse to the B on scroll.
 *
 * `collapsed` runs the header's scroll transition: "ookit" slides left and
 * disappears behind the B, which is left standing. It reverses on the way back
 * up. The letters travel rather than simply fading — the artwork stays pinned
 * to the right edge of a box that narrows to nothing, so the whole word is
 * dragged leftward and clipped against the B.
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

  /** One slice of the artwork, drawn at its own scale and offset. */
  const slice = (src: string, offset: number, w: number): React.CSSProperties => ({
    width: w,
    height,
    backgroundImage: `url("${src}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${width}px ${height}px`,
    backgroundPosition: `${-offset}px top`,
  });

  const img = (
    <span className="wf-logo" role="img" aria-label="bookit" style={{ height }}>
      {/* The b is a letter, so it cross-fades with the rest of the word. */}
      <span aria-hidden className="wf-logo__b" style={{ width: bWidth, height }}>
        <span
          className="wf-logo__part wf-logo__art"
          style={{ ...slice(ART_INK, 0, bWidth), opacity: light ? 0 : 1 }}
        />
        <span
          className="wf-logo__part wf-logo__art"
          style={{ ...slice(ART_LIGHT, 0, bWidth), opacity: light ? 1 : 0 }}
        />
      </span>
      <span aria-hidden className="wf-logo__rest" style={{ width: collapsed ? 0 : restWidth, height }}>
        {/* Pinned right: as the box narrows, the artwork is dragged left with
            it and clipped against the B, so the letters read as moving rather
            than as being cut off. */}
        <span
          className="wf-logo__rest-inner"
          style={{ width: restWidth, height, opacity: collapsed ? 0 : 1 }}
        >
          {/* Both letter colours are stacked and cross-faded, so the header's
              light/dark swap stays a fade — a straight file swap pops while
              the header background is still fading. */}
          <span
            className="wf-logo__part wf-logo__art"
            style={{ ...slice(ART_INK, bWidth, restWidth), opacity: light ? 0 : 1 }}
          />
          <span
            className="wf-logo__part wf-logo__art"
            style={{ ...slice(ART_LIGHT, bWidth, restWidth), opacity: light ? 1 : 0 }}
          />
        </span>
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
