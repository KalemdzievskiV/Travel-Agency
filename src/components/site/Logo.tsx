import Link from "next/link";
import Image from "next/image";

// Final Bookit wordmark (converted from public/brand/Final LOGO.ai).
const LOGO_RATIO = 900 / 257; // intrinsic aspect ratio of bookit-logo.png

/**
 * bookit logo. `size` sets the rendered height in px; width scales to the
 * wordmark's aspect ratio. `light` swaps to the white knockout for use over
 * photography / dark bands. `href={null}` renders the image without a link.
 */
export function Logo({
  light = false,
  size = 30,
  href = "/",
  crossfade = false,
}: {
  light?: boolean;
  size?: number;
  href?: string | null;
  /**
   * Stack both knockouts and fade between them instead of swapping the file.
   * For the header, where `light` flips as the page scrolls off the hero — a
   * straight swap pops while the background is still fading.
   */
  crossfade?: boolean;
}) {
  const height = size;
  const width = Math.round(height * LOGO_RATIO);

  const mark = (src: string, visible: boolean, stacked: boolean) => (
    <Image
      key={src}
      src={src}
      alt={stacked && !visible ? "" : "bookit"}
      aria-hidden={stacked && !visible}
      width={width}
      height={height}
      priority
      style={{
        height,
        width: "auto",
        display: "block",
        ...(stacked
          ? {
              gridArea: "1 / 1",
              opacity: visible ? 1 : 0,
              transition: "opacity .5s var(--wf-ease-out)",
            }
          : null),
      }}
    />
  );

  const img = crossfade ? (
    <span style={{ display: "grid" }}>
      {mark("/brand/bookit-logo.png", !light, true)}
      {mark("/brand/bookit-logo-white.png", light, true)}
    </span>
  ) : (
    mark(light ? "/brand/bookit-logo-white.png" : "/brand/bookit-logo.png", true, false)
  );

  if (href === null) return img;
  return (
    <Link href={href} aria-label="bookit — home" style={{ display: "inline-flex" }}>
      {img}
    </Link>
  );
}
