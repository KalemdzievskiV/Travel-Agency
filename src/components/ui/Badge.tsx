import React from "react";

/**
 * Badge — small status/category marker. Solid or soft.
 */
export type BadgeTone = "neutral" | "coral" | "success" | "warning";
export type BadgeVariant = "soft" | "solid";

type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
  variant?: BadgeVariant;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, "children">;

export function Badge({ children, tone = "neutral", variant = "soft", ...rest }: BadgeProps) {
  const palette: Record<BadgeTone, Record<BadgeVariant, [string, string]>> = {
    neutral: {
      soft: ["var(--wf-ink-100)", "var(--wf-ink-700)"],
      solid: ["var(--wf-ink-900)", "#fff"],
    },
    coral: {
      soft: ["var(--wf-coral-050)", "var(--wf-coral-700)"],
      solid: ["var(--wf-coral-500)", "#fff"],
    },
    success: {
      soft: ["#E4EDE4", "var(--wf-success)"],
      solid: ["var(--wf-success)", "#fff"],
    },
    warning: {
      soft: ["#F6ECD9", "var(--wf-warning)"],
      solid: ["var(--wf-warning)", "#fff"],
    },
  };
  const [bg, fg] = (palette[tone] || palette.neutral)[variant] || palette.neutral.soft;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--wf-font-sans)",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "4px 9px",
        borderRadius: "var(--wf-radius-sm)",
        background: bg,
        color: fg,
        lineHeight: 1.2,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
