"use client";

import React from "react";
import { useTranslations } from "next-intl";

/**
 * DestinationCard — the signature bookit card. Full-bleed image with a
 * bottom protection gradient, region eyebrow, serif title, and optional
 * price / rating. `image` (URL) is preferred; `grad` is a tonal placeholder
 * gradient used until real photography lands.
 */
type DestinationCardProps = {
  image?: string;
  grad?: string;
  region?: string;
  title: React.ReactNode;
  meta?: string;
  price?: string;
  rating?: string;
  badge?: string;
  height?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export function DestinationCard({
  image,
  grad,
  region,
  title,
  meta,
  price,
  rating,
  badge,
  height = 520,
  onClick,
}: DestinationCardProps) {
  const t = useTranslations("cards");
  const [hover, setHover] = React.useState(false);
  const fill = image
    ? `url(${image}) center/cover no-repeat`
    : grad || "linear-gradient(135deg, #6b6258, #3a332b 72%)";
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: fill,
          transform: hover ? "scale(1.05)" : "scale(1)",
          transition: "transform var(--wf-dur-slow) var(--wf-ease-out)",
        }}
      />
      {!image && (
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 16,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Your photo
        </span>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--wf-overlay-bottom)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 14,
          left: 16,
          right: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          zIndex: 2,
        }}
      >
        <span>
          {badge && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "rgba(255,255,255,0.92)",
                color: "var(--wf-ink-900)",
                padding: "5px 10px",
                borderRadius: "var(--wf-radius-sm)",
              }}
            >
              {badge}
            </span>
          )}
        </span>
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: "999px",
            background: "rgba(22,19,15,0.32)",
            backdropFilter: "blur(6px)",
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(255,255,255,0.35)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="1.8"
          >
            <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 5a5 5 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9z" />
          </svg>
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 18,
          right: 18,
          bottom: 18,
          zIndex: 2,
          color: "#fff",
        }}
      >
        {region && (
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--wf-coral-400)",
              marginBottom: 6,
            }}
          >
            {region}
          </div>
        )}
        <div
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 500,
            fontSize: 27,
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
        {(meta || price || rating) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 10,
              fontSize: 13,
            }}
          >
            {price && (
              <span>
                <span style={{ color: "rgba(255,255,255,0.75)" }}>{t("from")} </span>
                <b style={{ fontWeight: 700 }}>{price}</b>
              </span>
            )}
            {rating && (
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="var(--wf-coral-400)"
                >
                  <path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z" />
                </svg>
                {rating}
              </span>
            )}
            {meta && (
              <span style={{ color: "rgba(255,255,255,0.75)" }}>{meta}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
