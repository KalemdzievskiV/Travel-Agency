// AUTO-GENERATED dev fallback — mirrors component sources so UI kits preview
// before the real _ds_bundle.js is compiled. Safe no-op once the bundle loads.
(function(){
  if (window.WayfareDesignSystem_5f474a) return;

/* Badge.jsx */

/**
 * Badge — small status/category marker. Solid or soft.
 */
function Badge({ children, tone = "neutral", variant = "soft", ...rest }) {
  const palette = {
    neutral: { soft: ["var(--wf-ink-100)", "var(--wf-ink-700)"], solid: ["var(--wf-ink-900)", "#fff"] },
    coral: { soft: ["var(--wf-coral-050)", "var(--wf-coral-700)"], solid: ["var(--wf-coral-500)", "#fff"] },
    success: { soft: ["#E4EDE4", "var(--wf-success)"], solid: ["var(--wf-success)", "#fff"] },
    warning: { soft: ["#F6ECD9", "var(--wf-warning)"], solid: ["var(--wf-warning)", "#fff"] },
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
        fontWeight: 600,
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


/* Button.jsx */

/**
 * Wayfare Button — editorial-luxury. Square-ish corners, calm motion.
 * Variants: primary (coral), dark (ink), outline, ghost, link.
 */
function Button({
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


/* Eyebrow.jsx */

/**
 * Eyebrow — uppercase, wide-tracked label. The connective tissue of
 * Wayfare's editorial layouts. Sits above serif headlines.
 */
function Eyebrow({ children, tone = "coral", as = "div", ...rest }) {
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


/* Tag.jsx */

/**
 * Tag / filter chip — pill, selectable. Used in trip filters & nav rails.
 */
function Tag({ children, selected = false, onClick, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--wf-font-sans)",
        fontSize: "13px",
        fontWeight: 500,
        padding: "8px 16px",
        borderRadius: "var(--wf-radius-pill)",
        cursor: "pointer",
        transition: "all var(--wf-dur-fast) var(--wf-ease-out)",
        background: selected ? "var(--wf-ink-900)" : hover ? "var(--wf-ink-100)" : "transparent",
        color: selected ? "var(--wf-text-on-dark)" : "var(--wf-ink-700)",
        border: `1px solid ${selected ? "var(--wf-ink-900)" : "var(--wf-border-strong)"}`,
        lineHeight: 1.2,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}


/* Input.jsx */

/**
 * Input — text field with floating uppercase label, hairline underline
 * by default (editorial) or boxed. Coral focus.
 */
function Input({
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


/* SearchBar.jsx */

/**
 * SearchBar — the Wayfare booking widget. A horizontal row of segmented
 * fields (where / when / who) with a coral submit. Stacks on narrow widths.
 */
function SearchBar({ fields, onSearch, ctaLabel = "Search", compact = false }) {
  const data = fields || [
    { label: "Where", value: "Anywhere", hint: "Search destinations" },
    { label: "When", value: "Any week", hint: "Add dates" },
    { label: "Who", value: "Add guests", hint: "" },
  ];
  const [hover, setHover] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        background: "var(--wf-paper)",
        border: "1px solid var(--wf-border-strong)",
        borderRadius: "var(--wf-radius-md)",
        boxShadow: "var(--wf-shadow-md)",
        overflow: "hidden",
        fontFamily: "var(--wf-font-sans)",
        flexWrap: compact ? "wrap" : "nowrap",
      }}
    >
      {data.map((f, i) => (
        <button
          key={i}
          style={{
            flex: 1,
            minWidth: compact ? "50%" : 0,
            textAlign: "left",
            padding: "14px 20px",
            background: "transparent",
            border: "none",
            borderRight: i < data.length - 1 ? "1px solid var(--wf-border)" : "none",
            cursor: "pointer",
            transition: "background var(--wf-dur-fast) var(--wf-ease-out)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--wf-coral-050)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--wf-ink-500)" }}>{f.label}</div>
          <div style={{ fontSize: "15px", fontWeight: 600, color: f.value && f.value !== "Add guests" && f.value !== "Anywhere" ? "var(--wf-ink-900)" : "var(--wf-ink-400)", marginTop: "3px" }}>{f.value}</div>
        </button>
      ))}
      <button
        onClick={onSearch}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          flex: compact ? "1 0 100%" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: compact ? "16px" : "0 30px",
          background: hover ? "var(--wf-accent-hover)" : "var(--wf-accent)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--wf-font-sans)",
          fontWeight: 600,
          fontSize: "14px",
          letterSpacing: "0.02em",
          transition: "background var(--wf-dur-fast) var(--wf-ease-out)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        {ctaLabel}
      </button>
    </div>
  );
}


/* Card.jsx */

/**
 * Card — generic editorial content card (stories, inspiration, guides).
 * Image on top, eyebrow + serif title + body beneath on paper.
 */
function Card({ image, eyebrow, title, body, footer, height = 200, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--wf-surface-card)",
        border: "1px solid var(--wf-border)",
        borderRadius: "var(--wf-radius-md)",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        fontFamily: "var(--wf-font-sans)",
        boxShadow: hover ? "var(--wf-shadow-md)" : "var(--wf-shadow-xs)",
        transition: "box-shadow var(--wf-dur-base) var(--wf-ease-out)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", height, overflow: "hidden", background: "var(--wf-ink-700)" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: image ? `url(${image}) center/cover no-repeat` : "linear-gradient(135deg,#8a8073,#4a423a)",
          transform: hover ? "scale(1.04)" : "scale(1)",
          transition: "transform var(--wf-dur-slow) var(--wf-ease-out)",
        }} />
        {!image && <span style={{ position: "absolute", top: 12, left: 14, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Your photo</span>}
      </div>
      <div style={{ padding: "20px 22px 22px" }}>
        {eyebrow && <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--wf-coral-500)", marginBottom: 10 }}>{eyebrow}</div>}
        <div style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 23, lineHeight: 1.12, letterSpacing: "-0.01em", color: "var(--wf-ink-900)" }}>{title}</div>
        {body && <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--wf-ink-500)", margin: "10px 0 0" }}>{body}</p>}
        {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
      </div>
    </div>
  );
}


/* DestinationCard.jsx */

/**
 * DestinationCard — the signature Wayfare card. Full-bleed image with a
 * bottom protection gradient, region eyebrow, serif title, and optional
 * price / rating. Image is supplied via `image` (URL); falls back to a
 * tonal placeholder so layouts read before photography lands.
 */
function DestinationCard({
  image,
  region,
  title,
  meta,
  price,
  rating,
  badge,
  height = 420,
  onClick,
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        height,
        borderRadius: "var(--wf-radius-md)",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        fontFamily: "var(--wf-font-sans)",
        background: "var(--wf-ink-700)",
        boxShadow: hover ? "var(--wf-shadow-hover)" : "var(--wf-shadow-sm)",
        transition: "box-shadow var(--wf-dur-base) var(--wf-ease-out)",
      }}
    >
      {/* image / placeholder */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: image
            ? `url(${image}) center/cover no-repeat`
            : "linear-gradient(135deg, #6b6258, #3a332b 72%)",
          transform: hover ? "scale(1.05)" : "scale(1)",
          transition: "transform var(--wf-dur-slow) var(--wf-ease-out)",
        }}
      />
      {!image && (
        <span style={{ position: "absolute", top: 14, left: 16, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Your photo</span>
      )}
      {/* protection gradient */}
      <div style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-bottom)" }} />

      {/* top row: badge + save */}
      <div style={{ position: "absolute", top: 14, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 2 }}>
        <span>
          {badge && (
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(255,255,255,0.92)", color: "var(--wf-ink-900)", padding: "5px 10px", borderRadius: "var(--wf-radius-sm)" }}>{badge}</span>
          )}
        </span>
        <span
          style={{ width: 34, height: 34, borderRadius: "999px", background: "rgba(22,19,15,0.32)", backdropFilter: "blur(6px)", display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,0.35)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 5a5 5 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9z"/></svg>
        </span>
      </div>

      {/* caption */}
      <div style={{ position: "absolute", left: 18, right: 18, bottom: 18, zIndex: 2, color: "#fff" }}>
        {region && <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--wf-coral-400)", marginBottom: 6 }}>{region}</div>}
        <div style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 27, lineHeight: 1.08, letterSpacing: "-0.01em" }}>{title}</div>
        {(meta || price || rating) && (
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, fontSize: 13 }}>
            {price && <span><span style={{ color: "rgba(255,255,255,0.75)" }}>from </span><b style={{ fontWeight: 600 }}>{price}</b></span>}
            {rating && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--wf-coral-400)"><path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"/></svg>{rating}
              </span>
            )}
            {meta && <span style={{ color: "rgba(255,255,255,0.75)" }}>{meta}</span>}
          </div>
        )}
      </div>
    </div>
  );
}


  window.WayfareDesignSystem_5f474a = { Badge, Button, Eyebrow, Tag, Input, SearchBar, Card, DestinationCard };
})();
