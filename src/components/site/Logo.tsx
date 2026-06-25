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
}: {
  light?: boolean;
  size?: number;
  href?: string | null;
}) {
  const height = size;
  const width = Math.round(height * LOGO_RATIO);

  const img = (
    <Image
      src={light ? "/brand/bookit-logo-white.png" : "/brand/bookit-logo.png"}
      alt="bookit"
      width={width}
      height={height}
      priority
      style={{ height, width: "auto", display: "block" }}
    />
  );

  if (href === null) return img;
  return (
    <Link href={href} aria-label="bookit — home" style={{ display: "inline-flex" }}>
      {img}
    </Link>
  );
}
