import Link from "next/link";

// Final Bookit wordmark (converted from public/brand/Final LOGO.ai).
const LOGO_RATIO = 900 / 257; // intrinsic aspect ratio of the wordmark
const DARK_SRC = "/brand/bookit-logo.png";
const LIGHT_SRC = "/brand/bookit-logo-white.png";

/**
 * Where the B ends. Measured off the artwork's alpha channel: the B occupies
 * x 0–216 of 900 and the first "o" starts at 224, so the cut falls in the gap
 * between them.
 */
const B_FRACTION = 220 / 900;

/**
 * bookit logo. `size` sets the rendered height in px; width scales to the
 * wordmark's aspect ratio. `light` swaps to the white knockout for use over
 * photography / dark bands. `href={null}` renders the mark without a link.
 *
 * The wordmark is drawn as two boxes — the B, and "ookit" — each showing its
 * own slice of the same artwork as a background image, so the mark renders
 * exactly as the file does. `collapsed` then runs the header's scroll
 * transition: "ookit" slides left and disappears behind the B, which is left
 * standing in the brand accent. It reverses on the way back up.
 *
 * The letters travel rather than simply fading: the artwork stays pinned to
 * the right edge of a box that narrows to nothing, so the whole word is
 * dragged leftward and clipped against the B.
 *
 * The standing B can't be recoloured as an image, so it is a second layer —
 * the same artwork as a CSS mask, filled with the accent — crossfaded in as
 * the collapse runs. Over a hero the mark is already white and stays that way.
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
  // Only on a light header: over a hero the mark is white already, and tinting
  // it there would put the accent on photography.
  const tinted = collapsed && !light;

  /** One slice of the artwork, as an image layer. `offset` is the slice's x. */
  const art = (src: string, offset: number, w: number): React.CSSProperties => ({
    backgroundImage: `url(${src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${width}px ${height}px`,
    backgroundPosition: `${-offset}px top`,
    width: w,
    height,
  });

  /** The same slice as a mask, so it can be filled with a flat colour. */
  const stencil = (offset: number, w: number): React.CSSProperties => ({
    maskImage: `url(${LIGHT_SRC})`,
    WebkitMaskImage: `url(${LIGHT_SRC})`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: `${width}px ${height}px`,
    WebkitMaskSize: `${width}px ${height}px`,
    maskPosition: `${-offset}px top`,
    WebkitMaskPosition: `${-offset}px top`,
    width: w,
    height,
  });

  const img = (
    <span className="wf-logo" role="img" aria-label="bookit" style={{ height }}>
      <span aria-hidden className="wf-logo__b" style={{ width: bWidth, height }}>
        <span className="wf-logo__layer" style={{ ...art(DARK_SRC, 0, bWidth), opacity: light || tinted ? 0 : 1 }} />
        <span className="wf-logo__layer" style={{ ...art(LIGHT_SRC, 0, bWidth), opacity: light ? 1 : 0 }} />
        <span
          className="wf-logo__layer"
          style={{ ...stencil(0, bWidth), backgroundColor: "var(--wf-accent)", opacity: tinted ? 1 : 0 }}
        />
      </span>
      <span aria-hidden className="wf-logo__rest" style={{ width: collapsed ? 0 : restWidth, height }}>
        {/* Pinned right: as the box narrows, the artwork is dragged left with
            it and clipped against the B, so the letters read as moving rather
            than as being cut off. */}
        <span className="wf-logo__rest-inner" style={{ width: restWidth, height, opacity: collapsed ? 0 : 1 }}>
          <span className="wf-logo__layer" style={{ ...art(DARK_SRC, bWidth, restWidth), opacity: light ? 0 : 1 }} />
          <span className="wf-logo__layer" style={{ ...art(LIGHT_SRC, bWidth, restWidth), opacity: light ? 1 : 0 }} />
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
