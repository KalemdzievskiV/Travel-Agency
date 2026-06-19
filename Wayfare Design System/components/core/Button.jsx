import React from "react";

/**
 * Wayfare Button — editorial-luxury. Square-ish corners, calm motion.
 * Variants: primary (coral), dark (ink), outline, ghost, link.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as = "button",
  ...rest
}) {
  const sizes = {
    sm: { padding: "8px 16px", font: "13px", gap: "6px" },
    md: { padding: "12px 22px", font: "14px", gap: "8px" },
    lg: { padding: "16px 30px", font: "15px", gap: "10px" },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--wf-font-sans)",
    fontWeight: 600,
    fontSize: s.font,
    letterSpacing: "0.02em",
    padding: s.padding,
    width: fullWidth ? "100%" : "auto",
    borderRadius: "var(--wf-radius-md)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "background var(--wf-dur-fast) var(--wf-ease-out), color var(--wf-dur-fast) var(--wf-ease-out), border-color var(--wf-dur-fast) var(--wf-ease-out), transform var(--wf-dur-fast) var(--wf-ease-out)",
    textDecoration: "none",
    lineHeight: 1,
    whiteSpace: "nowrap",
  };

  const variants = {
    primary: { background: "var(--wf-accent)", color: "var(--wf-text-on-accent)" },
    dark: { background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)" },
    outline: { background: "transparent", color: "var(--wf-ink-900)", borderColor: "var(--wf-ink-900)" },
    ghost: { background: "transparent", color: "var(--wf-ink-900)" },
    link: {
      background: "transparent",
      color: "var(--wf-ink-900)",
      padding: 0,
      borderRadius: 0,
      borderBottom: "1px solid var(--wf-ink-900)",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      fontSize: "12px",
      paddingBottom: "4px",
    },
  };

  const hover = {
    primary: (e, on) => { e.currentTarget.style.background = on ? "var(--wf-accent-hover)" : "var(--wf-accent)"; },
    dark: (e, on) => { e.currentTarget.style.background = on ? "var(--wf-ink-700)" : "var(--wf-ink-900)"; },
    outline: (e, on) => {
      e.currentTarget.style.background = on ? "var(--wf-ink-900)" : "transparent";
      e.currentTarget.style.color = on ? "var(--wf-text-on-dark)" : "var(--wf-ink-900)";
    },
    ghost: (e, on) => { e.currentTarget.style.background = on ? "var(--wf-coral-050)" : "transparent"; },
    link: (e, on) => { e.currentTarget.style.color = on ? "var(--wf-accent)" : "var(--wf-ink-900)"; e.currentTarget.style.borderColor = on ? "var(--wf-accent)" : "var(--wf-ink-900)"; },
  };

  const Tag = as;
  return (
    <Tag
      style={{ ...base, ...(variants[variant] || variants.primary) }}
      disabled={as === "button" ? disabled : undefined}
      onMouseEnter={(e) => !disabled && hover[variant] && hover[variant](e, true)}
      onMouseLeave={(e) => !disabled && hover[variant] && hover[variant](e, false)}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "translateY(1px)")}
      onMouseUp={(e) => !disabled && (e.currentTarget.style.transform = "translateY(0)")}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
