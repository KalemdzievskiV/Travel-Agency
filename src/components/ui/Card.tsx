"use client";

import React from "react";

/**
 * Card — generic editorial content card (stories, inspiration, guides).
 * Image on top, eyebrow + serif title + body beneath on paper.
 */
type CardProps = {
  image?: string;
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  height?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export function Card({
  image,
  eyebrow,
  title,
  body,
  footer,
  height = 200,
  onClick,
}: CardProps) {
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
      <div
        style={{
          position: "relative",
          height,
          overflow: "hidden",
          background: "var(--wf-ink-700)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: image
              ? `url(${image}) center/cover no-repeat`
              : "linear-gradient(135deg,#8a8073,#4a423a)",
            transform: hover ? "scale(1.04)" : "scale(1)",
            transition: "transform var(--wf-dur-slow) var(--wf-ease-out)",
          }}
        />
        {!image && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 14,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Your photo
          </span>
        )}
      </div>
      <div style={{ padding: "20px 22px 22px" }}>
        {eyebrow && (
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--wf-coral-500)",
              marginBottom: 10,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 500,
            fontSize: 23,
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            color: "var(--wf-ink-900)",
          }}
        >
          {title}
        </div>
        {body && (
          <p
            style={{
              fontSize: 14.5,
              lineHeight: 1.6,
              color: "var(--wf-ink-500)",
              margin: "10px 0 0",
            }}
          >
            {body}
          </p>
        )}
        {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
      </div>
    </div>
  );
}
