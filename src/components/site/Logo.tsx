import Link from "next/link";
import Image from "next/image";

/**
 * bookit lockup — compass mark + serif wordmark. `light` renders the
 * reversed mark and cream wordmark for use over photography / dark bands.
 */
export function Logo({
  light = false,
  size = 32,
  href = "/",
}: {
  light?: boolean;
  size?: number;
  href?: string | null;
}) {
  const content = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
      <Image
        src={light ? "/brand/bookit-mark-reversed.svg" : "/brand/bookit-mark.svg"}
        alt=""
        width={size}
        height={size}
        priority
      />
      <span
        style={{
          fontFamily: "var(--wf-font-display)",
          fontWeight: 500,
          fontSize: Math.round(size * 0.78),
          letterSpacing: "-0.01em",
          color: light ? "#fff" : "var(--wf-ink-900)",
        }}
      >
        bookit
      </span>
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="bookit — home" style={{ textDecoration: "none" }}>
      {content}
    </Link>
  );
}
