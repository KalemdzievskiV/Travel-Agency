import React from "react";

/**
 * Eyebrow — uppercase, wide-tracked label. The connective tissue of
 * bookit's editorial layouts. Sits above serif headlines.
 */
export type EyebrowTone = "coral" | "ink" | "light";

type EyebrowProps = {
  children: React.ReactNode;
  tone?: EyebrowTone;
  as?: React.ElementType;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;

export function Eyebrow({ children, tone = "coral", as = "div", ...rest }: EyebrowProps) {
  const tones: Record<EyebrowTone, string> = {
    coral: "var(--wf-coral-500)",
    ink: "var(--wf-ink-500)",
    light: "rgba(244,239,231,0.8)",
  };
  const Tag = as;
  return (
    <Tag
      style={{
        fontFamily: "var(--wf-font-sans)",
        fontSize: "12px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: tones[tone] || tones.coral,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
