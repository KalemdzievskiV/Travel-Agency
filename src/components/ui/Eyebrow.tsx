import React from "react";

/**
 * Eyebrow — uppercase, wide-tracked label. The connective tissue of
 * bookit's editorial layouts. Sits above the Oswald headings.
 *
 * The type brief's "small label / eyebrow" role: Manrope 700 at 10–11px with
 * 0.12–0.15em tracking. Sizes come from tokens so the whole class of small
 * labels — eyebrows, feeling tags, footer headings — moves together.
 */
export type EyebrowTone = "coral" | "ink" | "light";

type EyebrowProps = {
  children: React.ReactNode;
  tone?: EyebrowTone;
  as?: React.ElementType;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;

export function Eyebrow({ children, tone = "coral", as = "div", style, ...rest }: EyebrowProps) {
  const tones: Record<EyebrowTone, string> = {
    coral: "var(--wf-accent-ink)",
    ink: "var(--wf-ink-500)",
    light: "rgba(244,239,231,0.8)",
  };
  const Tag = as;
  return (
    <Tag
      style={{
        fontFamily: "var(--wf-font-sans)",
        fontSize: "var(--wf-eyebrow-size)",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "var(--wf-eyebrow-tracking)",
        color: tones[tone] || tones.coral,
        // Caller styles layer on top rather than replacing the label styling.
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
