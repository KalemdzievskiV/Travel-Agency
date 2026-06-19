import React from "react";

/**
 * Eyebrow — uppercase, wide-tracked label. The connective tissue of
 * Wayfare's editorial layouts. Sits above serif headlines.
 */
export function Eyebrow({ children, tone = "coral", as = "div", ...rest }) {
  const tones = {
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
        fontWeight: 600,
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
