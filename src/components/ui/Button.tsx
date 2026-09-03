"use client";

import React from "react";

/**
 * bookit Button — editorial-luxury. Square-ish corners, calm motion.
 * Variants: primary (accent), dark (ink), outline, ghost, link, accentLocked.
 * Ported from the Wayfare design system.
 *
 * `primary` is the site's one CTA appearance, per the client: accent fill with
 * white type, inverting to a white fill with accent type on hover. Every button
 * that leads to the enquiry form uses it, the header's included. The white
 * label is the sanctioned --wf-text-on-accent-white exception (the green accent
 * is light, so white on it is 2.50:1); the inverted state takes the darker
 * --wf-accent-ink, since the bright accent is unreadable as type on white.
 *
 * `accentLocked` is the same fill holding one appearance through every state,
 * with no hover invert. Nothing uses it — kept as a one-line way back if a
 * locked button is ever wanted again.
 */
export type ButtonVariant =
  | "primary"
  | "dark"
  | "outline"
  | "ghost"
  | "link"
  | "accentLocked";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /**
   * Render as a native button (default), an anchor, or a span.
   *
   * `span` is for a button-looking *link*: wrap it in the locale-aware `Link`
   * from `@/i18n/navigation` so the anchor stays the interactive element (a
   * <button> inside an <a> is invalid HTML). Note this stays a string union on
   * purpose — a component like `Link` can't be passed as a prop from a server
   * component to this client one, and doing so fails at runtime, not build.
   */
  as?: "button" | "a" | "span";
  href?: string;
  type?: "button" | "submit" | "reset";
} & Omit<
  React.HTMLAttributes<HTMLElement>,
  "color" | "children"
>;

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
}: ButtonProps) {

  // Per the type brief, a button is Manrope 700 at 11–12px, uppercase, tracked
  // 0.08–0.10em — at every size. A button grows by its padding, not its type:
  // 14–15px label text reads as body copy sitting in a box and loses the
  // luxury feel the brief is after. The label case comes from the button, not
  // from the copy, so translators can write sentence case in `messages/`.
  const sizes = {
    sm: { padding: "8px 16px", font: "var(--wf-button-size-sm)", gap: "6px" },
    md: { padding: "12px 22px", font: "var(--wf-button-size)", gap: "8px" },
    lg: { padding: "16px 30px", font: "var(--wf-button-size)", gap: "10px" },
  } as const;
  const s = sizes[size] || sizes.md;

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--wf-font-sans)",
    fontWeight: 700,
    fontSize: s.font,
    letterSpacing: "var(--wf-tracking-button)",
    textTransform: "uppercase",
    padding: s.padding,
    width: fullWidth ? "100%" : "auto",
    borderRadius: "var(--wf-radius-md)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition:
      "background var(--wf-dur-fast) var(--wf-ease-out), color var(--wf-dur-fast) var(--wf-ease-out), border-color var(--wf-dur-fast) var(--wf-ease-out), transform var(--wf-dur-fast) var(--wf-ease-out)",
    textDecoration: "none",
    lineHeight: 1,
    whiteSpace: "nowrap",
  };

  const variants: Record<ButtonVariant, React.CSSProperties> = {
    // Routed through element-scoped custom properties so a class can restate
    // them under a media query — `.wf-cta-mono` turns this button black-and-
    // white on mobile, per the client, without touching desktop or any button
    // that doesn't opt in. The fallbacks are the unchanged desktop appearance.
    primary: {
      background: "var(--wf-btn-bg, var(--wf-accent))",
      color: "var(--wf-btn-fg, var(--wf-text-on-accent-white))",
    },
    dark: { background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)" },
    outline: {
      background: "transparent",
      color: "var(--wf-ink-900)",
      borderColor: "var(--wf-ink-900)",
    },
    ghost: { background: "transparent", color: "var(--wf-ink-900)" },
    link: {
      background: "transparent",
      color: "var(--wf-ink-900)",
      padding: 0,
      borderRadius: 0,
      borderBottom: "1px solid var(--wf-ink-900)",
      letterSpacing: "var(--wf-tracking-label)",
      fontSize: "var(--wf-button-size-sm)",
      paddingBottom: "4px",
    },
    accentLocked: {
      background: "var(--wf-accent)",
      color: "var(--wf-text-on-accent-white)",
    },
  };

  const hover: Record<
    ButtonVariant,
    (el: HTMLElement, on: boolean) => void
  > = {
    // Invert on hover: white background, accent text + border. Reads the same
    // vars as the resting state so `.wf-cta-mono` inverts to ink, not accent.
    primary: (el, on) => {
      el.style.background = on
        ? "var(--wf-btn-bg-hover, #fff)"
        : "var(--wf-btn-bg, var(--wf-accent))";
      el.style.color = on
        ? "var(--wf-btn-fg-hover, var(--wf-accent-ink))"
        : "var(--wf-btn-fg, var(--wf-text-on-accent-white))";
      el.style.borderColor = on
        ? "var(--wf-btn-bd-hover, var(--wf-accent-ink))"
        : "transparent";
    },
    // Invert on hover: white background, dark text + border.
    dark: (el, on) => {
      el.style.background = on ? "#fff" : "var(--wf-ink-900)";
      el.style.color = on ? "var(--wf-ink-900)" : "var(--wf-text-on-dark)";
      el.style.borderColor = on ? "var(--wf-ink-900)" : "transparent";
    },
    outline: (el, on) => {
      el.style.background = on ? "var(--wf-ink-900)" : "transparent";
      el.style.color = on ? "var(--wf-text-on-dark)" : "var(--wf-ink-900)";
    },
    ghost: (el, on) => {
      el.style.background = on ? "var(--wf-coral-050)" : "transparent";
    },
    link: (el, on) => {
      el.style.color = on ? "var(--wf-accent-ink)" : "var(--wf-ink-900)";
      el.style.borderColor = on ? "var(--wf-accent-ink)" : "var(--wf-ink-900)";
    },
    // Deliberately inert: this variant holds one appearance in every state.
    // The press nudge in `base` still fires, so the click stays acknowledged.
    accentLocked: () => {},
  };

  const Tag = as as React.ElementType;
  return (
    <Tag
      style={{ ...base, ...(variants[variant] || variants.primary) }}
      disabled={as === "button" ? disabled : undefined}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) =>
        !disabled && hover[variant]?.(e.currentTarget, true)
      }
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) =>
        !disabled && hover[variant]?.(e.currentTarget, false)
      }
      onMouseDown={(e: React.MouseEvent<HTMLElement>) =>
        !disabled && (e.currentTarget.style.transform = "translateY(1px)")
      }
      onMouseUp={(e: React.MouseEvent<HTMLElement>) =>
        !disabled && (e.currentTarget.style.transform = "translateY(0)")
      }
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
