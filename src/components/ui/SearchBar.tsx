"use client";

import React from "react";

/**
 * SearchBar — the bookit booking widget. A horizontal row of segmented
 * fields (where / when / who) with a coral submit. Stacks on narrow widths.
 */
export type SearchField = { label: string; value: string; hint?: string };

type SearchBarProps = {
  fields?: SearchField[];
  onSearch?: React.MouseEventHandler<HTMLButtonElement>;
  ctaLabel?: string;
};

export function SearchBar({
  fields,
  onSearch,
  ctaLabel = "Search",
}: SearchBarProps) {
  const data: SearchField[] = fields || [
    { label: "Where", value: "Anywhere", hint: "Search destinations" },
    { label: "When", value: "Any week", hint: "Add dates" },
    { label: "Who", value: "Add guests", hint: "" },
  ];
  const [hover, setHover] = React.useState(false);

  return (
    <div
      className="wf-searchbar"
      style={{
        background: "var(--wf-paper)",
        border: "1px solid var(--wf-border-strong)",
        borderRadius: "var(--wf-radius-md)",
        boxShadow: "var(--wf-shadow-md)",
        overflow: "hidden",
        fontFamily: "var(--wf-font-sans)",
      }}
    >
      {data.map((f, i) => (
        <button
          key={i}
          style={{
            flex: 1,
            minWidth: 0,
            textAlign: "left",
            padding: "14px 20px",
            background: "transparent",
            border: "none",
            borderRight:
              i < data.length - 1 ? "1px solid var(--wf-border)" : "none",
            cursor: "pointer",
            transition: "background var(--wf-dur-fast) var(--wf-ease-out)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--wf-coral-050)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--wf-ink-500)",
            }}
          >
            {f.label}
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color:
                f.value && f.value !== "Add guests" && f.value !== "Anywhere"
                  ? "var(--wf-ink-900)"
                  : "var(--wf-ink-400)",
              marginTop: "3px",
            }}
          >
            {f.value}
          </div>
        </button>
      ))}
      <button
        onClick={onSearch}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "16px 30px",
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
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        {ctaLabel}
      </button>
    </div>
  );
}
