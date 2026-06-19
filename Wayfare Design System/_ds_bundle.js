/* @ds-bundle: {"format":3,"namespace":"WayfareDesignSystem_5f474a","components":[{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"DestinationCard","sourcePath":"components/cards/DestinationCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SearchBar","sourcePath":"components/search/SearchBar.jsx"}],"sourceHashes":{"components/cards/Card.jsx":"1f1e7f55a857","components/cards/DestinationCard.jsx":"3efa1982d043","components/core/Badge.jsx":"59fa329aff6d","components/core/Button.jsx":"86413a67c47f","components/core/Eyebrow.jsx":"8c3844881618","components/core/Tag.jsx":"79a1bac78b4d","components/forms/Input.jsx":"7497767c81a3","components/search/SearchBar.jsx":"f2cba3989890","ui_kits/app/app.jsx":"45dbd0d7823b","ui_kits/app/data.js":"2780bc690587","ui_kits/app/ios-frame.jsx":"be3343be4b51","ui_kits/website/chrome.jsx":"3f7f5163a6a7","ui_kits/website/data.js":"72490cf36cfa","ui_kits/website/screens.jsx":"d6d7a43f5d29"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WayfareDesignSystem_5f474a = window.WayfareDesignSystem_5f474a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/Card.jsx
try { (() => {
/**
 * Card — generic editorial content card (stories, inspiration, guides).
 * Image on top, eyebrow + serif title + body beneath on paper.
 */
function Card({
  image,
  eyebrow,
  title,
  body,
  footer,
  height = 200,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "var(--wf-surface-card)",
      border: "1px solid var(--wf-border)",
      borderRadius: "var(--wf-radius-md)",
      overflow: "hidden",
      cursor: onClick ? "pointer" : "default",
      fontFamily: "var(--wf-font-sans)",
      boxShadow: hover ? "var(--wf-shadow-md)" : "var(--wf-shadow-xs)",
      transition: "box-shadow var(--wf-dur-base) var(--wf-ease-out)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      overflow: "hidden",
      background: "var(--wf-ink-700)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: image ? `url(${image}) center/cover no-repeat` : "linear-gradient(135deg,#8a8073,#4a423a)",
      transform: hover ? "scale(1.04)" : "scale(1)",
      transition: "transform var(--wf-dur-slow) var(--wf-ease-out)"
    }
  }), !image && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      left: 14,
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.5)"
    }
  }, "Your photo")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 22px 22px"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--wf-coral-500)",
      marginBottom: 10
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 23,
      lineHeight: 1.12,
      letterSpacing: "-0.01em",
      color: "var(--wf-ink-900)"
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.6,
      color: "var(--wf-ink-500)",
      margin: "10px 0 0"
    }
  }, body), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, footer)));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/DestinationCard.jsx
try { (() => {
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
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      height,
      borderRadius: "var(--wf-radius-md)",
      overflow: "hidden",
      cursor: onClick ? "pointer" : "default",
      fontFamily: "var(--wf-font-sans)",
      background: "var(--wf-ink-700)",
      boxShadow: hover ? "var(--wf-shadow-hover)" : "var(--wf-shadow-sm)",
      transition: "box-shadow var(--wf-dur-base) var(--wf-ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: image ? `url(${image}) center/cover no-repeat` : "linear-gradient(135deg, #6b6258, #3a332b 72%)",
      transform: hover ? "scale(1.05)" : "scale(1)",
      transition: "transform var(--wf-dur-slow) var(--wf-ease-out)"
    }
  }), !image && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 14,
      left: 16,
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.5)"
    }
  }, "Your photo"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--wf-overlay-bottom)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      left: 16,
      right: 16,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("span", null, badge && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      background: "rgba(255,255,255,0.92)",
      color: "var(--wf-ink-900)",
      padding: "5px 10px",
      borderRadius: "var(--wf-radius-sm)"
    }
  }, badge)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "999px",
      background: "rgba(22,19,15,0.32)",
      backdropFilter: "blur(6px)",
      display: "grid",
      placeItems: "center",
      border: "1px solid rgba(255,255,255,0.35)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 5a5 5 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9z"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 18,
      right: 18,
      bottom: 18,
      zIndex: 2,
      color: "#fff"
    }
  }, region && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--wf-coral-400)",
      marginBottom: 6
    }
  }, region), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 27,
      lineHeight: 1.08,
      letterSpacing: "-0.01em"
    }
  }, title), (meta || price || rating) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginTop: 10,
      fontSize: 13
    }
  }, price && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.75)"
    }
  }, "from "), /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, price)), rating && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "var(--wf-coral-400)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"
  })), rating), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.75)"
    }
  }, meta))));
}
Object.assign(__ds_scope, { DestinationCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/DestinationCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small status/category marker. Solid or soft.
 */
function Badge({
  children,
  tone = "neutral",
  variant = "soft",
  ...rest
}) {
  const palette = {
    neutral: {
      soft: ["var(--wf-ink-100)", "var(--wf-ink-700)"],
      solid: ["var(--wf-ink-900)", "#fff"]
    },
    coral: {
      soft: ["var(--wf-coral-050)", "var(--wf-coral-700)"],
      solid: ["var(--wf-coral-500)", "#fff"]
    },
    success: {
      soft: ["#E4EDE4", "var(--wf-success)"],
      solid: ["var(--wf-success)", "#fff"]
    },
    warning: {
      soft: ["#F6ECD9", "var(--wf-warning)"],
      solid: ["var(--wf-warning)", "#fff"]
    }
  };
  const [bg, fg] = (palette[tone] || palette.neutral)[variant] || palette.neutral.soft;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      lineHeight: 1.2
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    sm: {
      padding: "8px 16px",
      font: "13px",
      gap: "6px"
    },
    md: {
      padding: "12px 22px",
      font: "14px",
      gap: "8px"
    },
    lg: {
      padding: "16px 30px",
      font: "15px",
      gap: "10px"
    }
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
    whiteSpace: "nowrap"
  };
  const variants = {
    primary: {
      background: "var(--wf-accent)",
      color: "var(--wf-text-on-accent)"
    },
    dark: {
      background: "var(--wf-ink-900)",
      color: "var(--wf-text-on-dark)"
    },
    outline: {
      background: "transparent",
      color: "var(--wf-ink-900)",
      borderColor: "var(--wf-ink-900)"
    },
    ghost: {
      background: "transparent",
      color: "var(--wf-ink-900)"
    },
    link: {
      background: "transparent",
      color: "var(--wf-ink-900)",
      padding: 0,
      borderRadius: 0,
      borderBottom: "1px solid var(--wf-ink-900)",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      fontSize: "12px",
      paddingBottom: "4px"
    }
  };
  const hover = {
    primary: (e, on) => {
      e.currentTarget.style.background = on ? "var(--wf-accent-hover)" : "var(--wf-accent)";
    },
    dark: (e, on) => {
      e.currentTarget.style.background = on ? "var(--wf-ink-700)" : "var(--wf-ink-900)";
    },
    outline: (e, on) => {
      e.currentTarget.style.background = on ? "var(--wf-ink-900)" : "transparent";
      e.currentTarget.style.color = on ? "var(--wf-text-on-dark)" : "var(--wf-ink-900)";
    },
    ghost: (e, on) => {
      e.currentTarget.style.background = on ? "var(--wf-coral-050)" : "transparent";
    },
    link: (e, on) => {
      e.currentTarget.style.color = on ? "var(--wf-accent)" : "var(--wf-ink-900)";
      e.currentTarget.style.borderColor = on ? "var(--wf-accent)" : "var(--wf-ink-900)";
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      ...base,
      ...(variants[variant] || variants.primary)
    },
    disabled: as === "button" ? disabled : undefined,
    onMouseEnter: e => !disabled && hover[variant] && hover[variant](e, true),
    onMouseLeave: e => !disabled && hover[variant] && hover[variant](e, false),
    onMouseDown: e => !disabled && (e.currentTarget.style.transform = "translateY(1px)"),
    onMouseUp: e => !disabled && (e.currentTarget.style.transform = "translateY(0)")
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — uppercase, wide-tracked label. The connective tissue of
 * Wayfare's editorial layouts. Sits above serif headlines.
 */
function Eyebrow({
  children,
  tone = "coral",
  as = "div",
  ...rest
}) {
  const tones = {
    coral: "var(--wf-coral-500)",
    ink: "var(--wf-ink-500)",
    light: "rgba(244,239,231,0.8)"
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: "var(--wf-font-sans)",
      fontSize: "12px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      color: tones[tone] || tones.coral
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag / filter chip — pill, selectable. Used in trip filters & nav rails.
 */
function Tag({
  children,
  selected = false,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
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
      lineHeight: 1.2
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const wrap = {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    fontFamily: "var(--wf-font-sans)",
    width: "100%"
  };
  const labelStyle = {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: error ? "var(--wf-error)" : "var(--wf-ink-500)"
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
    boxShadow: focus && variant === "box" ? "var(--wf-focus-shadow)" : "none"
  };
  const input = {
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "var(--wf-font-sans)",
    fontSize: "15px",
    color: "var(--wf-ink-900)",
    width: "100%",
    padding: 0
  };
  return /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: labelStyle
  }, label), /*#__PURE__*/React.createElement("div", {
    style: fieldRow
  }, iconLeft, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: input
  }, rest))), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      color: "var(--wf-error)"
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/search/SearchBar.jsx
try { (() => {
/**
 * SearchBar — the Wayfare booking widget. A horizontal row of segmented
 * fields (where / when / who) with a coral submit. Stacks on narrow widths.
 */
function SearchBar({
  fields,
  onSearch,
  ctaLabel = "Search",
  compact = false
}) {
  const data = fields || [{
    label: "Where",
    value: "Anywhere",
    hint: "Search destinations"
  }, {
    label: "When",
    value: "Any week",
    hint: "Add dates"
  }, {
    label: "Who",
    value: "Add guests",
    hint: ""
  }];
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      background: "var(--wf-paper)",
      border: "1px solid var(--wf-border-strong)",
      borderRadius: "var(--wf-radius-md)",
      boxShadow: "var(--wf-shadow-md)",
      overflow: "hidden",
      fontFamily: "var(--wf-font-sans)",
      flexWrap: compact ? "wrap" : "nowrap"
    }
  }, data.map((f, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    style: {
      flex: 1,
      minWidth: compact ? "50%" : 0,
      textAlign: "left",
      padding: "14px 20px",
      background: "transparent",
      border: "none",
      borderRight: i < data.length - 1 ? "1px solid var(--wf-border)" : "none",
      cursor: "pointer",
      transition: "background var(--wf-dur-fast) var(--wf-ease-out)"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--wf-coral-050)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--wf-ink-500)"
    }
  }, f.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "15px",
      fontWeight: 600,
      color: f.value && f.value !== "Add guests" && f.value !== "Anywhere" ? "var(--wf-ink-900)" : "var(--wf-ink-400)",
      marginTop: "3px"
    }
  }, f.value))), /*#__PURE__*/React.createElement("button", {
    onClick: onSearch,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
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
      transition: "background var(--wf-dur-fast) var(--wf-ease-out)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })), ctaLabel));
}
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/search/SearchBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/app.jsx
try { (() => {
// Wayfare mobile app — screens + tab bar. Inside <IOSDevice>.
const A = window.WF_APP;
const DS = window.WayfareDesignSystem_5f474a;
function AIcon({
  name,
  size = 24,
  color = "currentColor",
  sw = 1.7,
  fill = false
}) {
  const p = {
    compass: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m16.2 7.8-2.9 6.3-6.3 2.9 2.9-6.3 6.3-2.9z"
    })),
    search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 21-4.3-4.3"
    })),
    bag: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 6h18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 10a4 4 0 0 1-8 0"
    })),
    heart: /*#__PURE__*/React.createElement("path", {
      d: "M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 5a5 5 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9z"
    }),
    user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"
    })),
    star: /*#__PURE__*/React.createElement("path", {
      d: "M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"
    }),
    chevL: /*#__PURE__*/React.createElement("path", {
      d: "m15 18-6-6 6-6"
    }),
    pin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    })),
    arrow: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m12 5 7 7-7 7"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill ? color : "none",
    stroke: fill ? "none" : color,
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "block",
      flex: "none"
    }
  }, p[name]);
}

// ——— Explore (home) ———
function Explore({
  onOpen
}) {
  const [feeling, setFeeling] = React.useState("Contentment");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--wf-cream)",
      minHeight: "100%",
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "60px 22px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--wf-coral-500)"
    }
  }, "Good morning, Jane"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 34,
      letterSpacing: "-0.02em",
      margin: "8px 0 0",
      color: "var(--wf-ink-900)"
    }
  }, "Where to next?")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9,
      overflowX: "auto",
      padding: "0 22px 22px",
      scrollbarWidth: "none"
    }
  }, A.feelings.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setFeeling(f),
    style: {
      flex: "none",
      padding: "9px 16px",
      borderRadius: 999,
      border: `1px solid ${feeling === f ? "var(--wf-ink-900)" : "var(--wf-border-strong)"}`,
      background: feeling === f ? "var(--wf-ink-900)" : "transparent",
      color: feeling === f ? "#fff" : "var(--wf-ink-700)",
      fontFamily: "var(--wf-font-sans)",
      fontSize: 13.5,
      fontWeight: 500
    }
  }, f))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 21,
      margin: 0,
      color: "var(--wf-ink-900)"
    }
  }, "Your journeys")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, A.trips.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => onOpen(t),
    style: {
      position: "relative",
      height: 150,
      borderRadius: "var(--wf-radius-md)",
      overflow: "hidden",
      boxShadow: "var(--wf-shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: t.grad
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--wf-overlay-bottom)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      right: 12,
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "4px 9px",
      borderRadius: "var(--wf-radius-sm)",
      background: t.status === "Confirmed" ? "var(--wf-success)" : "rgba(255,255,255,0.92)",
      color: t.status === "Confirmed" ? "#fff" : "var(--wf-ink-900)"
    }
  }, t.status), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      bottom: 14,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--wf-coral-400)"
    }
  }, t.region), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 24,
      marginTop: 2
    }
  }, t.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "rgba(255,255,255,0.85)",
      marginTop: 3
    }
  }, t.dates)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "26px 22px 0"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 21,
      margin: "0 0 14px",
      color: "var(--wf-ink-900)"
    }
  }, "Inspired by ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic"
    }
  }, feeling.toLowerCase())), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, A.explore.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => onOpen({
      ...d,
      dates: "Tailor-made"
    }),
    style: {
      position: "relative",
      height: 200,
      borderRadius: "var(--wf-radius-md)",
      overflow: "hidden",
      boxShadow: "var(--wf-shadow-xs)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: d.grad
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--wf-overlay-bottom)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 12,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--wf-coral-400)"
    }
  }, d.region), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 18,
      marginTop: 2
    }
  }, d.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 5,
      fontSize: 11.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(AIcon, {
    name: "star",
    size: 11,
    color: "var(--wf-coral-400)",
    fill: true
  }), d.rating), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.8)"
    }
  }, "from ", d.price, "/night"))))))));
}

// ——— Search / Feelings ———
function SearchScreen({
  onOpen
}) {
  const [feeling, setFeeling] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--wf-ink-900)",
      minHeight: "100%",
      color: "#fff",
      padding: "60px 22px 110px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(244,239,231,0.55)"
    }
  }, "The Feelings Engine"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 32,
      letterSpacing: "-0.02em",
      margin: "10px 0 24px"
    }
  }, "How do you want to feel?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10
    }
  }, A.feelings.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setFeeling(f),
    style: {
      padding: "11px 18px",
      borderRadius: 999,
      cursor: "pointer",
      fontFamily: "var(--wf-font-sans)",
      fontSize: 14.5,
      fontWeight: 500,
      background: feeling === f ? "var(--wf-coral-500)" : "transparent",
      color: "#fff",
      border: `1px solid ${feeling === f ? "var(--wf-coral-500)" : "rgba(255,255,255,0.3)"}`
    }
  }, f))), feeling && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(244,239,231,0.55)",
      margin: "34px 0 14px"
    }
  }, feeling, " \xB7 suggested"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, A.explore.slice(0, 3).map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => onOpen({
      ...d,
      dates: "Tailor-made"
    }),
    style: {
      position: "relative",
      height: 130,
      borderRadius: "var(--wf-radius-md)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: d.grad
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--wf-overlay-bottom)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      bottom: 14,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--wf-coral-400)"
    }
  }, d.region), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 21
    }
  }, d.title)))))));
}

// ——— Trips list ———
function TripsScreen({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--wf-cream)",
      minHeight: "100%",
      padding: "60px 22px 110px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 32,
      letterSpacing: "-0.02em",
      margin: "0 0 20px",
      color: "var(--wf-ink-900)"
    }
  }, "Your trips"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, A.trips.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => onOpen(t),
    style: {
      background: "var(--wf-paper)",
      borderRadius: "var(--wf-radius-md)",
      overflow: "hidden",
      border: "1px solid var(--wf-border)",
      boxShadow: "var(--wf-shadow-xs)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 130,
      background: t.grad
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--wf-overlay-bottom)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      right: 12,
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "4px 9px",
      borderRadius: "var(--wf-radius-sm)",
      background: t.status === "Confirmed" ? "var(--wf-success)" : "rgba(255,255,255,0.92)",
      color: t.status === "Confirmed" ? "#fff" : "var(--wf-ink-900)"
    }
  }, t.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--wf-coral-500)"
    }
  }, t.region), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 23,
      color: "var(--wf-ink-900)",
      marginTop: 3
    }
  }, t.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--wf-ink-500)",
      marginTop: 4
    }
  }, t.dates, " \xB7 7 nights"))))));
}

// ——— Destination detail overlay ———
function Detail({
  trip,
  onClose
}) {
  if (!trip) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 80,
      background: "var(--wf-cream)",
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 340,
      background: trip.grad
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--wf-overlay-bottom)"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: "absolute",
      top: 54,
      left: 18,
      width: 40,
      height: 40,
      borderRadius: 999,
      border: "none",
      background: "rgba(255,255,255,0.92)",
      display: "grid",
      placeItems: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(AIcon, {
    name: "chevL",
    size: 20,
    color: "var(--wf-ink-900)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 22,
      bottom: 22,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--wf-coral-400)"
    }
  }, trip.region), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 38,
      marginTop: 4
    }
  }, trip.title))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 22px 120px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22,
      paddingBottom: 22,
      borderBottom: "1px solid var(--wf-border)",
      fontSize: 13.5,
      color: "var(--wf-ink-700)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(AIcon, {
    name: "star",
    size: 15,
    color: "var(--wf-coral-500)",
    fill: true
  }), " ", trip.rating || "4.9"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(AIcon, {
    name: "pin",
    size: 15,
    color: "var(--wf-ink-500)"
  }), " ", trip.dates)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: "var(--wf-ink-700)",
      margin: "22px 0 0"
    }
  }, "A fully tailor-made journey, paced entirely around you. Stay in handpicked retreats, travel with expert private guides, and discover the corners most travellers never reach."), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 22,
      margin: "30px 0 14px",
      color: "var(--wf-ink-900)"
    }
  }, "Trip highlights"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 13
    }
  }, ["Private overwater villa with a personal host", "A day at sea with a marine biologist", "Sunset dinner on a sandbank, just the two of you"].map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      marginTop: 2,
      color: "var(--wf-coral-500)"
    }
  }, /*#__PURE__*/React.createElement(AIcon, {
    name: "compass",
    size: 20,
    color: "var(--wf-coral-500)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      color: "var(--wf-ink-700)"
    }
  }, h))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      padding: "16px 22px 30px",
      background: "linear-gradient(to top, var(--wf-cream) 70%, transparent)",
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--wf-ink-500)"
    }
  }, "from"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontSize: 24,
      fontWeight: 500,
      color: "var(--wf-ink-900)"
    }
  }, trip.price || "$1,240", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wf-font-sans)",
      fontSize: 13,
      color: "var(--wf-ink-500)"
    }
  }, " / night"))), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "primary",
    size: "lg"
  }, "Enquire now")));
}

// ——— Tab bar ———
function TabBar({
  tab,
  setTab
}) {
  const tabs = [["explore", "compass", "Explore"], ["search", "search", "Feel"], ["trips", "bag", "Trips"], ["saved", "heart", "Saved"], ["account", "user", "You"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 70,
      paddingBottom: 26,
      background: "linear-gradient(to top, var(--wf-cream) 62%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "10px 12px 6px",
      margin: "0 14px",
      borderTop: "1px solid var(--wf-border)"
    }
  }, tabs.map(([k, icon, label]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setTab(k),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      color: tab === k ? "var(--wf-coral-600)" : "var(--wf-ink-400)"
    }
  }, /*#__PURE__*/React.createElement(AIcon, {
    name: icon,
    size: 23,
    color: tab === k ? "var(--wf-coral-600)" : "var(--wf-ink-400)",
    fill: tab === k && k === "saved",
    sw: 1.7
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wf-font-sans)",
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: "0.02em"
    }
  }, label)))));
}
function WayfareApp() {
  const [tab, setTab] = React.useState("explore");
  const [detail, setDetail] = React.useState(null);
  const screens = {
    explore: /*#__PURE__*/React.createElement(Explore, {
      onOpen: setDetail
    }),
    search: /*#__PURE__*/React.createElement(SearchScreen, {
      onOpen: setDetail
    }),
    trips: /*#__PURE__*/React.createElement(TripsScreen, {
      onOpen: setDetail
    }),
    saved: /*#__PURE__*/React.createElement(TripsScreen, {
      onOpen: setDetail
    }),
    account: /*#__PURE__*/React.createElement(Explore, {
      onOpen: setDetail
    })
  };
  const dark = tab === "search";
  return /*#__PURE__*/React.createElement(IOSDevice, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%"
    }
  }, screens[tab], /*#__PURE__*/React.createElement(TabBar, {
    tab: tab,
    setTab: setTab
  }), /*#__PURE__*/React.createElement(Detail, {
    trip: detail,
    onClose: () => setDetail(null)
  })));
}
Object.assign(window, {
  WayfareApp
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
// Wayfare mobile app — sample content (placeholders for photography).
window.WF_APP = {
  trips: [{
    region: "Indian Ocean",
    title: "The Maldives",
    dates: "Nov 4 – 11",
    status: "Confirmed",
    grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)"
  }, {
    region: "Latin America",
    title: "Patagonia",
    dates: "Dec 2 – 14",
    status: "Planning",
    grad: "linear-gradient(135deg,#7a6f5a,#3a3228)"
  }],
  explore: [{
    region: "Africa",
    title: "The Serengeti",
    price: "$960",
    rating: "5.0",
    grad: "linear-gradient(135deg,#9a7d4f,#5a4327)"
  }, {
    region: "Europe",
    title: "Amalfi Coast",
    price: "$540",
    rating: "4.7",
    grad: "linear-gradient(135deg,#5f8a8f,#2f5559)"
  }, {
    region: "Asia",
    title: "Kyoto",
    price: "$430",
    rating: "4.9",
    grad: "linear-gradient(135deg,#8a6a6f,#4a2f3a)"
  }, {
    region: "Arctic",
    title: "N. Norway",
    price: "$610",
    rating: "4.9",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)"
  }],
  feelings: ["Contentment", "Revitalised", "Freedom", "Wonder", "Challenged"]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/app/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/chrome.jsx
try { (() => {
// Wayfare website — shared chrome: Icon, Header, Hero, Footer, SectionHead.
// Composes design-system primitives off window.WayfareDesignSystem_5f474a.

const WF = window.WayfareDesignSystem_5f474a;

// ——— Minimal thin-stroke icon set (editorial line glyphs) ———
function Icon({
  name,
  size = 18,
  color = "currentColor",
  strokeWidth = 1.6
}) {
  const paths = {
    search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 21-4.3-4.3"
    })),
    chevron: /*#__PURE__*/React.createElement("path", {
      d: "m6 9 6 6 6-6"
    }),
    arrow: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m12 5 7 7-7 7"
    })),
    phone: /*#__PURE__*/React.createElement("path", {
      d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"
    }),
    menu: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 6h18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 12h18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 18h18"
    })),
    x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M18 6 6 18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 6l12 12"
    })),
    star: /*#__PURE__*/React.createElement("path", {
      d: "M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"
    }),
    pin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    })),
    globe: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M2 12h20"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"
    })),
    award: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8.2 13.9 7 22l5-3 5 3-1.2-8.1"
    })),
    calendar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "4",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 2v4M8 2v4M3 10h18"
    })),
    users: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M22 21v-2a4 4 0 0 0-3-3.9"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: name === "star" ? color : "none",
    stroke: name === "star" ? "none" : color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "block",
      flex: "none"
    }
  }, paths[name]);
}
function Header({
  onNav,
  current,
  onEnquire
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const links = ["Destinations", "Experiences", "Inspiration", "About"];
  const dark = current === "home" && !scrolled;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: dark ? "transparent" : "var(--wf-cream)",
      borderBottom: dark ? "1px solid transparent" : "1px solid var(--wf-border)",
      transition: "background .3s, border-color .3s"
    },
    ref: el => {
      if (!el) return;
      const scroller = el.closest("[data-scroll]");
      if (scroller && !scroller.__bound) {
        scroller.__bound = true;
        scroller.addEventListener("scroll", () => setScrolled(scroller.scrollTop > 60));
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wf-container-wide)",
      margin: "0 auto",
      height: "var(--wf-header-h)",
      padding: "0 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      cursor: "pointer"
    },
    onClick: () => onNav("home")
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wayfare-mark.svg",
    style: {
      width: 32,
      height: 32,
      filter: dark ? "brightness(0) invert(1)" : "none"
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 25,
      color: dark ? "#fff" : "var(--wf-ink-900)"
    }
  }, "Wayfare")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 34
    }
  }, links.map(l => {
    const key = l.toLowerCase();
    const active = current === key || key === "destinations" && current === "destinations";
    return /*#__PURE__*/React.createElement("button", {
      key: l,
      onClick: () => onNav(key === "destinations" ? "destinations" : key === "inspiration" ? "tripfinder" : key),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--wf-font-sans)",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.01em",
        color: dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)",
        paddingBottom: 2,
        borderBottom: active ? `1.5px solid ${dark ? "#fff" : "var(--wf-coral-500)"}` : "1.5px solid transparent"
      }
    }, l);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: 13.5,
      fontWeight: 500,
      color: dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 15,
    color: dark ? "#fff" : "var(--wf-ink-700)"
  }), "+44 207 426 9888"), /*#__PURE__*/React.createElement(WF.Button, {
    variant: dark ? "primary" : "dark",
    size: "sm",
    onClick: onEnquire
  }, "Enquire now"))));
}
function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "ink"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: align === "center" ? 720 : "none",
      margin: align === "center" ? "0 auto" : 0,
      textAlign: align
    }
  }, /*#__PURE__*/React.createElement(WF.Eyebrow, {
    tone: tone === "light" ? "light" : "coral"
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 40,
      lineHeight: 1.08,
      letterSpacing: "-0.02em",
      margin: "14px 0 0",
      color: tone === "light" ? "var(--wf-text-on-dark)" : "var(--wf-ink-900)"
    }
  }, title), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: tone === "light" ? "rgba(244,239,231,0.8)" : "var(--wf-ink-500)",
      margin: "16px 0 0",
      maxWidth: 620,
      marginLeft: align === "center" ? "auto" : 0,
      marginRight: align === "center" ? "auto" : 0
    }
  }, intro));
}
function Footer({
  onEnquire
}) {
  const cols = {
    "Who we are": ["Our purpose", "Our team", "Awards", "Press"],
    "Experiences": ["Family", "Couples", "Honeymoons", "Safari", "Slow travel"],
    "Useful": ["How it works", "FAQ", "Booking conditions", "Careers"]
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--wf-ink-900)",
      color: "var(--wf-text-on-dark)",
      padding: "72px 32px 36px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wf-container-wide)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
      gap: 40,
      paddingBottom: 48,
      borderBottom: "1px solid rgba(255,255,255,0.14)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wayfare-mark-reversed.svg",
    style: {
      width: 34
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 27
    }
  }, "Wayfare")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.65,
      color: "rgba(244,239,231,0.7)",
      maxWidth: 320,
      margin: "18px 0 22px"
    }
  }, "Tailor-made luxury travel, designed entirely around how you want to feel. No templates. No planning fees."), /*#__PURE__*/React.createElement(WF.Button, {
    variant: "primary",
    size: "md",
    onClick: onEnquire
  }, "Start your journey")), Object.entries(cols).map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(244,239,231,0.55)",
      marginBottom: 16
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      fontSize: 14.5,
      color: "rgba(244,239,231,0.85)",
      cursor: "pointer"
    }
  }, i)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 28,
      fontSize: 13,
      color: "rgba(244,239,231,0.5)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Wayfare. A demonstration brand."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("span", null, "Privacy"), /*#__PURE__*/React.createElement("span", null, "Terms"), /*#__PURE__*/React.createElement("span", null, "Sitemap")))));
}
Object.assign(window, {
  Icon,
  Header,
  SectionHead,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// Wayfare website UI kit — sample content. Warm tonal placeholders stand in
// for photography (replace `img` gradients with real photo URLs).
window.WF_DATA = {
  destinations: [{
    region: "Indian Ocean",
    title: "The Maldives",
    price: "$1,240 / night",
    rating: "4.9",
    badge: "Overwater",
    grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)"
  }, {
    region: "Latin America",
    title: "Patagonia",
    price: "$320 / night",
    rating: "4.8",
    badge: "Adventure",
    grad: "linear-gradient(135deg,#7a6f5a,#3a3228)"
  }, {
    region: "Africa",
    title: "The Serengeti",
    price: "$960 / night",
    rating: "5.0",
    badge: "Safari",
    grad: "linear-gradient(135deg,#9a7d4f,#5a4327)"
  }, {
    region: "Europe",
    title: "Amalfi Coast",
    price: "$540 / night",
    rating: "4.7",
    badge: "Coastal",
    grad: "linear-gradient(135deg,#5f8a8f,#2f5559)"
  }, {
    region: "Arctic Circle",
    title: "Northern Norway",
    price: "$610 / night",
    rating: "4.9",
    badge: "Aurora",
    grad: "linear-gradient(135deg,#5a6b86,#2a3550)"
  }, {
    region: "Asia",
    title: "Kyoto & Beyond",
    price: "$430 / night",
    rating: "4.9",
    badge: "Slow Travel",
    grad: "linear-gradient(135deg,#8a6a6f,#4a2f3a)"
  }],
  experiences: [{
    eyebrow: "By Feeling",
    title: "The Pursuit of Feeling",
    body: "It's not where you want to go — it's how you want to feel.",
    grad: "linear-gradient(135deg,#7a5f52,#3a2a24)"
  }, {
    eyebrow: "Family",
    title: "Field Trip",
    body: "A curriculum of real-world encounters for younger explorers.",
    grad: "linear-gradient(135deg,#6f7a5a,#363f28)"
  }, {
    eyebrow: "Solo",
    title: "Get Lost",
    body: "Trained by experts, then dropped into the wild to find your way back.",
    grad: "linear-gradient(135deg,#5f6f7a,#2a3640)"
  }],
  testimonials: [{
    quote: "Hands down the most remarkable thing our family has ever done.",
    who: "Brett",
    where: "Middle East"
  }, {
    quote: "Unique adventures that could only have happened with their guidance.",
    who: "Ike & Alexa",
    where: "Italy"
  }, {
    quote: "A once-in-a-lifetime experience we will forever cherish.",
    who: "Adrienne",
    where: "Patagonia"
  }],
  press: ["FORBES", "CNBC", "CONDÉ NAST", "TRAVEL + LEISURE", "ROBB REPORT"],
  feelings: ["Contentment", "Revitalised", "Freedom", "Wonder", "Challenged"],
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/screens.jsx
try { (() => {
// Wayfare website — screens. Composes DS primitives + local chrome.
const WFS = window.WayfareDesignSystem_5f474a;
const D = window.WF_DATA;

// ————————————————————————————————————————————————
//  HERO
// ————————————————————————————————————————————————
function Hero({
  onSearch
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      height: "calc(100vh - 0px)",
      minHeight: 640,
      display: "flex",
      alignItems: "flex-end",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(135deg,#43525e,#1a2730 70%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(22,19,15,0.78) 0%, rgba(22,19,15,0.25) 45%, rgba(22,19,15,0.35) 100%)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 100,
      left: 34,
      fontSize: 11,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.5)"
    }
  }, "Your hero film / photo"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      maxWidth: "var(--wf-container-wide)",
      margin: "0 auto",
      padding: "0 32px 64px",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement(WFS.Eyebrow, {
    tone: "light"
  }, "Tailor-made \xB7 Est. 2005"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 78,
      lineHeight: 1.02,
      letterSpacing: "-0.02em",
      margin: "20px 0 0"
    }
  }, "Every journey starts", /*#__PURE__*/React.createElement("br", null), "with a ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic"
    }
  }, "feeling"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.55,
      color: "rgba(255,255,255,0.85)",
      margin: "22px 0 0",
      maxWidth: 520
    }
  }, "Fully personalised itineraries for couples, families and solo travellers \u2014 designed around how you want to feel, not where the crowds go.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 38,
      maxWidth: 920
    }
  }, /*#__PURE__*/React.createElement(WFS.SearchBar, {
    fields: [{
      label: "Where",
      value: "Anywhere"
    }, {
      label: "When",
      value: "Any month"
    }, {
      label: "Feeling",
      value: "Choose a feeling"
    }],
    ctaLabel: "Find my trip",
    onSearch: onSearch
  }))));
}

// ————————————————————————————————————————————————
//  FEELING INTRO
// ————————————————————————————————————————————————
function FeelingIntro() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--wf-cream)",
      padding: "104px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(WFS.Eyebrow, null, "The Pursuit of Feeling"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 34,
      lineHeight: 1.28,
      letterSpacing: "-0.01em",
      color: "var(--wf-ink-900)",
      margin: "22px 0 0"
    }
  }, "The world is vast and full of wonder \u2014 yet the more choice there is, the more overwhelmed we feel. So we ask a different question first: not ", /*#__PURE__*/React.createElement("em", null, "where"), " do you want to go, but ", /*#__PURE__*/React.createElement("em", null, "how"), " do you want to feel?"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(WFS.Button, {
    variant: "outline",
    size: "md"
  }, "Read our story"))));
}

// ————————————————————————————————————————————————
//  POPULAR DESTINATIONS
// ————————————————————————————————————————————————
function PopularDestinations({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--wf-cream)",
      padding: "0 32px 104px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wf-container-wide)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Most popular",
    title: "Where our travellers are going"
  }), /*#__PURE__*/React.createElement(WFS.Button, {
    variant: "link",
    onClick: () => onOpen("destinations")
  }, "View all destinations")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 24
    }
  }, D.destinations.slice(0, 6).map((d, i) => /*#__PURE__*/React.createElement(DestPlaceholder, {
    key: i,
    d: d,
    onClick: () => onOpen("destinations")
  })))));
}

// A DestinationCard wrapper that paints the tonal placeholder gradient
function DestPlaceholder({
  d,
  onClick,
  height = 420
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      height,
      borderRadius: "var(--wf-radius-md)",
      overflow: "hidden",
      cursor: "pointer",
      boxShadow: hover ? "var(--wf-shadow-hover)" : "var(--wf-shadow-sm)",
      transition: "box-shadow .3s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: d.grad,
      transform: hover ? "scale(1.05)" : "scale(1)",
      transition: "transform .6s cubic-bezier(.22,1,.36,1)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 14,
      left: 16,
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.5)"
    }
  }, "Your photo"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--wf-overlay-bottom)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      left: 16,
      right: 16,
      display: "flex",
      justifyContent: "space-between",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      background: "rgba(255,255,255,0.92)",
      color: "var(--wf-ink-900)",
      padding: "5px 10px",
      borderRadius: "var(--wf-radius-sm)",
      alignSelf: "flex-start"
    }
  }, d.badge), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 999,
      background: "rgba(22,19,15,0.32)",
      backdropFilter: "blur(6px)",
      display: "grid",
      placeItems: "center",
      border: "1px solid rgba(255,255,255,0.35)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 14,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 18,
      right: 18,
      bottom: 18,
      zIndex: 2,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--wf-coral-400)",
      marginBottom: 6
    }
  }, d.region), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 27,
      lineHeight: 1.08
    }
  }, d.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginTop: 10,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.75)"
    }
  }, "from "), /*#__PURE__*/React.createElement("b", null, d.price)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 13,
    color: "var(--wf-coral-400)"
  }), d.rating))));
}

// ————————————————————————————————————————————————
//  EXPERIENCES (dark editorial band)
// ————————————————————————————————————————————————
function Experiences() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--wf-ink-900)",
      padding: "104px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wf-container-wide)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Remarkable experiences",
    title: "Journeys you won't find anywhere else",
    tone: "light",
    intro: "Each one designed to move you \u2014 crafted with experts, guides and storytellers on the ground."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 24,
      marginTop: 44
    }
  }, D.experiences.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderRadius: "var(--wf-radius-md)",
      overflow: "hidden",
      background: "var(--wf-ink-800)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 260,
      background: e.grad
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      left: 14,
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.5)"
    }
  }, "Your photo"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--wf-overlay-full)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "26px 26px 30px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--wf-coral-400)",
      marginBottom: 12
    }
  }, e.eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 26,
      color: "#fff",
      lineHeight: 1.1
    }
  }, e.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      color: "rgba(244,239,231,0.7)",
      margin: "12px 0 20px"
    }
  }, e.body), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "#fff",
      borderBottom: "1px solid rgba(255,255,255,0.4)",
      paddingBottom: 4,
      cursor: "pointer"
    }
  }, "Discover ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15,
    color: "#fff"
  }))))))));
}

// ————————————————————————————————————————————————
//  TESTIMONIALS
// ————————————————————————————————————————————————
function Testimonials() {
  const [i, setI] = React.useState(0);
  const t = D.testimonials[i];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--wf-sand)",
      padding: "100px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(WFS.Eyebrow, null, "Why travellers choose us"), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 38,
      lineHeight: 1.18,
      letterSpacing: "-0.01em",
      color: "var(--wf-ink-900)",
      margin: "24px 0 0"
    }
  }, "\u201C", t.quote, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: "0.04em",
      color: "var(--wf-ink-700)"
    }
  }, t.who, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wf-coral-600)"
    }
  }, t.where)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 9,
      marginTop: 30
    }
  }, D.testimonials.map((_, n) => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => setI(n),
    style: {
      width: n === i ? 28 : 9,
      height: 9,
      borderRadius: 999,
      border: "none",
      cursor: "pointer",
      background: n === i ? "var(--wf-ink-900)" : "var(--wf-ink-300)",
      transition: "all .3s"
    }
  })))));
}

// ————————————————————————————————————————————————
//  PRESS + WHY
// ————————————————————————————————————————————————
function PressWhy() {
  const why = [{
    icon: "award",
    label: "Award-winning planners"
  }, {
    icon: "globe",
    label: "100+ destinations"
  }, {
    icon: "phone",
    label: "24/7 on-the-ground support"
  }, {
    icon: "pin",
    label: "Expert private guides"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--wf-cream)",
      padding: "80px 32px 104px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wf-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "28px 56px",
      alignItems: "center",
      paddingBottom: 64,
      borderBottom: "1px solid var(--wf-border)"
    }
  }, D.press.map(p => /*#__PURE__*/React.createElement("span", {
    key: p,
    style: {
      fontFamily: "var(--wf-font-display)",
      fontSize: 21,
      letterSpacing: "0.04em",
      color: "var(--wf-ink-400)"
    }
  }, p))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 32,
      marginTop: 56
    }
  }, why.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.label,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 999,
      border: "1px solid var(--wf-border-strong)",
      display: "grid",
      placeItems: "center",
      margin: "0 auto 16px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: w.icon,
    size: 24,
    color: "var(--wf-coral-600)",
    strokeWidth: 1.4
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15.5,
      fontWeight: 600,
      color: "var(--wf-ink-900)"
    }
  }, w.label))))));
}

// ————————————————————————————————————————————————
//  DESTINATIONS SCREEN
// ————————————————————————————————————————————————
function DestinationsScreen({
  onOpen
}) {
  const filters = ["All", "Beach", "Adventure", "Safari", "Cultural", "Honeymoon", "Family"];
  const [sel, setSel] = React.useState("All");
  const list = [...D.destinations, ...D.destinations];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--wf-ink-900)",
      color: "#fff",
      padding: "120px 32px 56px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wf-container-wide)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(WFS.Eyebrow, {
    tone: "light"
  }, "Destinations"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 56,
      letterSpacing: "-0.02em",
      margin: "16px 0 0"
    }
  }, "Find your next horizon"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: "rgba(244,239,231,0.75)",
      maxWidth: 540,
      margin: "16px 0 0",
      lineHeight: 1.6
    }
  }, "Over 100 destinations, each one planned from scratch around you."))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--wf-cream)",
      padding: "32px 32px 96px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wf-container-wide)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      padding: "12px 0 32px",
      position: "sticky",
      top: "var(--wf-header-h)",
      background: "var(--wf-cream)",
      zIndex: 10
    }
  }, filters.map(f => /*#__PURE__*/React.createElement(WFS.Tag, {
    key: f,
    selected: sel === f,
    onClick: () => setSel(f)
  }, f))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 24
    }
  }, list.map((d, i) => /*#__PURE__*/React.createElement(DestPlaceholder, {
    key: i,
    d: d,
    height: 380,
    onClick: () => {}
  }))))));
}

// ————————————————————————————————————————————————
//  TRIP FINDER (feelings engine)
// ————————————————————————————————————————————————
function TripFinder() {
  const [feeling, setFeeling] = React.useState(null);
  const [month, setMonth] = React.useState(null);
  const ready = feeling && month;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--wf-ink-900)",
      minHeight: "100vh",
      color: "#fff",
      padding: "128px 32px 96px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(WFS.Eyebrow, {
    tone: "light"
  }, "The Feelings Engine"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 58,
      letterSpacing: "-0.02em",
      margin: "18px 0 0"
    }
  }, "How do you want to feel?")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(244,239,231,0.55)",
      marginBottom: 16
    }
  }, "01 \u2014 The feeling"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12
    }
  }, D.feelings.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setFeeling(f),
    style: {
      padding: "12px 22px",
      borderRadius: 999,
      cursor: "pointer",
      fontFamily: "var(--wf-font-sans)",
      fontSize: 15,
      fontWeight: 500,
      background: feeling === f ? "var(--wf-coral-500)" : "transparent",
      color: "#fff",
      border: `1px solid ${feeling === f ? "var(--wf-coral-500)" : "rgba(255,255,255,0.3)"}`,
      transition: "all .2s"
    }
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(244,239,231,0.55)",
      marginBottom: 16
    }
  }, "02 \u2014 When"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10
    }
  }, D.months.map(m => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => setMonth(m),
    style: {
      width: 72,
      padding: "12px 0",
      borderRadius: "var(--wf-radius-md)",
      cursor: "pointer",
      fontFamily: "var(--wf-font-sans)",
      fontSize: 14,
      fontWeight: 500,
      background: month === m ? "#fff" : "transparent",
      color: month === m ? "var(--wf-ink-900)" : "rgba(255,255,255,0.8)",
      border: "1px solid rgba(255,255,255,0.25)",
      transition: "all .2s"
    }
  }, m)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(WFS.Button, {
    variant: "primary",
    size: "lg",
    disabled: !ready
  }, ready ? `Show me ${feeling} in ${month}` : "Choose a feeling & month"), ready && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 20,
      width: "100%",
      marginTop: 12
    }
  }, D.destinations.slice(0, 3).map((d, i) => /*#__PURE__*/React.createElement(DestPlaceholder, {
    key: i,
    d: d,
    height: 300,
    onClick: () => {}
  }))))));
}

// ————————————————————————————————————————————————
//  ENQUIRY MODAL
// ————————————————————————————————————————————————
function EnquiryModal({
  open,
  onClose
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "rgba(22,19,15,0.55)",
      backdropFilter: "blur(3px)",
      display: "grid",
      placeItems: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--wf-cream-2)",
      borderRadius: "var(--wf-radius-lg)",
      maxWidth: 560,
      width: "100%",
      padding: "40px 44px",
      boxShadow: "var(--wf-shadow-lg)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: "absolute",
      top: 20,
      right: 20,
      background: "none",
      border: "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 22,
    color: "var(--wf-ink-500)"
  })), /*#__PURE__*/React.createElement(WFS.Eyebrow, null, "Start your journey"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--wf-font-display)",
      fontWeight: 500,
      fontSize: 34,
      letterSpacing: "-0.02em",
      margin: "14px 0 6px",
      color: "var(--wf-ink-900)"
    }
  }, "Let's plan something remarkable"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: "var(--wf-ink-500)",
      margin: "0 0 26px",
      lineHeight: 1.6
    }
  }, "Tell us a little about your trip. No planning fees, no obligation \u2014 one of our experts will be in touch within 24 hours."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(WFS.Input, {
    label: "First name",
    placeholder: "Jane"
  }), /*#__PURE__*/React.createElement(WFS.Input, {
    label: "Last name",
    placeholder: "Appleseed"
  }), /*#__PURE__*/React.createElement(WFS.Input, {
    label: "Email",
    type: "email",
    placeholder: "you@email.com"
  }), /*#__PURE__*/React.createElement(WFS.Input, {
    label: "Destination",
    placeholder: "Where to?"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WFS.Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true
  }, "Send enquiry"))));
}
Object.assign(window, {
  Hero,
  FeelingIntro,
  PopularDestinations,
  Experiences,
  Testimonials,
  PressWhy,
  DestinationsScreen,
  TripFinder,
  EnquiryModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DestinationCard = __ds_scope.DestinationCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SearchBar = __ds_scope.SearchBar;

})();
