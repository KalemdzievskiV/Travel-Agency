import Link from "next/link";
import { BRAND, BRAND_ART } from "@/content/brand";

/**
 * The client's 2026 wordmark, in whichever colourway `BRAND` selects (see
 * src/content/brand.ts). Two files per colourway, identical but for the
 * letters — ink for light grounds, white for dark — with the compass "o"'s
 * needle knocked out so the page colour shows through it.
 */
const { ink: ART_INK, light: ART_LIGHT, ratio: LOGO_RATIO, bFraction: B_FRACTION } =
  BRAND_ART[BRAND];

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
