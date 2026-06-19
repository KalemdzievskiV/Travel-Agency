import React from "react";

/**
 * Input — text field with floating uppercase label, hairline underline
 * by default (editorial) or boxed. Coral focus.
 */
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
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  const wrap = { display: "flex", flexDirection: "column", gap: "7px", fontFamily: "var(--wf-font-sans)", width: "100%" };
  const labelStyle = {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: error ? "var(--wf-error)" : "var(--wf-ink-500)",
  };
  const borderColor = error ? "var(--wf-error)" : focus ? "var(--wf-ink-900)" : "var(--wf-border-strong)";
  const fieldRow = {
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
  const input = {
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "var(--wf-font-sans)",
    fontSize: "15px",
    color: "var(--wf-ink-900)",
    width: "100%",
    padding: 0,
  };

  return (
    <div style={wrap}>
      {label && <label htmlFor={inputId} style={labelStyle}>{label}</label>}
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
      {error && <span style={{ fontSize: "12px", color: "var(--wf-error)" }}>{error}</span>}
    </div>
  );
}
