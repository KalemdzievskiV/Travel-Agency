"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * DestinationCard — the signature bookit card. Full-bleed image with a
 * bottom protection gradient, region eyebrow, serif title, and optional
 * price / rating. The ON SALE pill owns the top-right corner; the price sits
 * there too, unless the pill is showing — then it moves down beside the title
 * rather than stacking under the pill. `image` (URL) is preferred; `grad` is a
 * tonal placeholder gradient used until real photography lands.
 */
type DestinationCardProps = {
  image?: string;
  grad?: string;
  region?: string;
  title: React.ReactNode;
  meta?: string;
  price?: string;
  /**
   * Show the ON SALE badge. The caller decides via showsSaleBadge() in
   * src/content/pricing.ts — the card doesn't re-derive it, so one rule governs
   * every surface. The price label is "now from" either way: the client wants
   * that phrasing on every card, sale or not.
   */
  onSale?: boolean;
  rating?: string;
  badge?: string;
  /**
   * Card shape, as a CSS aspect-ratio. Ratio rather than a fixed height so the
   * card keeps its portrait proportion as the grid column widens — at a pinned
   * 520px these went nearly square on a large screen. `height` still wins if a
   * caller genuinely needs a fixed size.
   */
  ratio?: string;
  height?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

/**
 * ON SALE pill. The client supplied a reference image: a soft peach pill with a
 * flame, deliberately off-palette (see --wf-sale-* in colors.css). It links to
 * the sale listing; the card around it links to the item, so it stops the
 * click bubbling.
 */
function SaleBadge({ label }: { label: string }) {
  return (
    <Link
      href="/on-sale"
      aria-label={label}
      // The card around this is itself clickable, so the badge has to stop the
      // click bubbling or it would navigate to the item instead of the sale
      // listing the client asked it to open.
      onClick={(e) => e.stopPropagation()}
      style={{
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: "var(--wf-sale-bg)",
        color: "var(--wf-sale-ink)",
        fontFamily: "var(--wf-font-sans)",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        padding: "5px 11px",
        borderRadius: 999,
        whiteSpace: "nowrap",
        boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
      }}
    >
      <span aria-hidden style={{ fontSize: 12, lineHeight: 1 }}>🔥</span>
      {label}
    </Link>
  );
}

/**
 * The "now from €990" line. Lives in the top-right corner, or next to the title
 * when the sale pill has taken that corner.
 */
function Price({ value, label }: { value: string; label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--wf-font-sans)",
        // Up from 13, then 15: the client asked twice for the price to read
        // larger. It is the one number on the card, and at 13 it lost to the
        // months line below it.
        fontSize: 17,
        color: "#fff",
        textShadow: "0 1px 3px rgba(0,0,0,0.45)",
        whiteSpace: "nowrap",
        lineHeight: 1.2,
      }}
    >
      {/* 0.92 not 0.75: the label sits over a photo, and the lighter tint
          dropped it under 4:1 on a pale sky. Weight carries the hierarchy
          instead. */}
      <span style={{ color: "rgba(255,255,255,0.92)" }}>{label} </span>
      <b style={{ fontWeight: 700 }}>{value}</b>
    </span>
  );
}

export function DestinationCard({
  image,
  grad,
  region,
  title,
  meta,
  price,
  onSale = false,
  rating,
  badge,
  ratio = "2 / 3",
  height,
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
        ...(height ? { height } : { aspectRatio: ratio }),
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
      {(price || onSale) && (
        <div
          style={{
            position: "absolute",
            insetInline: 0,
            top: 0,
            height: "38%",
            background: "var(--wf-overlay-top)",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: 14,
          left: 16,
          right: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          // Keeps the style badge and the corner content apart on a narrow
          // card, where the two would otherwise meet in the middle.
          gap: 8,
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
        {/* The pill owns this corner when it is showing, and the price goes
            down to the title — one thing up here, per the client. */}
        {onSale ? <SaleBadge label={t("onSale")} /> : price ? <Price value={price} label={t("nowFrom")} /> : null}
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
        {/* Title, with the price after it when the sale pill has taken the
            corner. Aligned to the bottom rather than the baseline: a title that
            wraps to two lines takes its baseline from the *first* line, which
            would leave the price stranded up beside it. It wraps to its own
            line on a narrow card instead of squeezing the title. */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "2px 12px",
          }}
        >
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
          {onSale && price && <Price value={price} label={t("nowFrom")} />}
        </div>
        {(meta || rating) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // Wrap rather than compress: a price and a long month list share
              // this row on destination cards, and without wrapping the price
              // breaks mid-value ("сега од 990 / EUR") against the months.
              flexWrap: "wrap",
              columnGap: 14,
              rowGap: 4,
              marginTop: 10,
              fontSize: 13,
            }}
          >
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
