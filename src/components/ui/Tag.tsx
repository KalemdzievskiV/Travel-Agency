"use client";

import React from "react";

/**
 * Tag / filter chip — pill, selectable. Used in trip filters & nav rails.
 */
type TagProps = {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick">;

export function Tag({ children, selected = false, onClick, ...rest }: TagProps) {
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
        background: selected
          ? "var(--wf-ink-900)"
          : hover
            ? "var(--wf-ink-100)"
            : "transparent",
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
