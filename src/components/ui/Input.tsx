"use client";

import React from "react";

/**
 * Input — text field with uppercase label, hairline underline by default
 * (editorial) or boxed. Coral focus.
 */
type InputProps = {
  label?: string;
  variant?: "box" | "underline";
  error?: string;
  iconLeft?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;

export function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  variant = "box",
  error = "",
  disabled = false,
  iconLeft = null,
  id,
  ...rest
}: InputProps) {
  const [focus, setFocus] = React.useState(false);
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  const wrap: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    fontFamily: "var(--wf-font-sans)",
    width: "100%",
  };
  // Field labels, per the type brief: Manrope 600 at 12px. Sentence case — a
  // form label is read, not scanned, so it loses the uppercase eyebrow
  // treatment the rest of the site's small text carries.
  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.02em",
    color: error ? "var(--wf-error)" : "var(--wf-ink-500)",
  };
  const borderColor = error
    ? "var(--wf-error)"
    : focus
      ? "var(--wf-ink-900)"
      : "var(--wf-border-strong)";
  const fieldRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: variant === "box" ? "var(--wf-paper)" : "transparent",
    border: variant === "box" ? `1px solid ${borderColor}` : "none",
    borderBottom: `1px solid ${borderColor}`,
    borderRadius: variant === "box" ? "var(--wf-radius-md)" : 0,
    padding: variant === "box" ? "12px 14px" : "8px 0",
    transition: "border-color var(--wf-dur-fast) var(--wf-ease-out)",
    opacity: disabled ? 0.5 : 1,
    boxShadow: focus && variant === "box" ? "var(--wf-focus-shadow)" : "none",
  };
  const input: React.CSSProperties = {
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "var(--wf-font-sans)",
    fontSize: "14px",
    color: "var(--wf-ink-900)",
    width: "100%",
    padding: 0,
  };

  return (
    <div style={wrap}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}
      <div style={fieldRow}>
        {iconLeft}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={input}
          {...rest}
        />
      </div>
      {error && (
        <span style={{ fontSize: "12px", color: "var(--wf-error)" }}>{error}</span>
      )}
    </div>
  );
}
