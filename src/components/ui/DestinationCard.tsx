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
      {/* No flame. The 3.0 brief rebranded this from "ЗГРАБИ ПОПУСТ" to a
          "специјален термин" and was explicit about the pictogram — "не
          🔥🔥🔥. Premium не значи без попуст. Значи без викање дека има
          попуст." The design system bans emoji outright anyway. */}
      {label}
    </Link>
  );
}

/**
 * The "now from €990" line. Sits at the bottom-right of the card, on the title's
 * row — the client asked for one place for the price on every surface, rather
 * than the top corner here and the title row there.
 *
 * `marginLeft: auto` rather than the parent's `justify-content`: on a narrow
 * card the price wraps to a line of its own, and as the only item on that line
 * it would otherwise fall back to the left edge, under the title.
 */
function Price({ value, label }: { value: string; label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--wf-font-sans)",
        // 13 → 15 → 17 → 21 → 18: the client asked four times for this to read
        // larger, then the type brief capped prices at 15–18px. 18 is the top
        // of that range, so this stays the one number on the card and still
        // sits inside the spec. If it now reads too small, that is a conflict
        // between two client notes, not a slip — raise it rather than nudging.
        fontSize: 18,
        marginLeft: "auto",
        color: "#fff",
        textShadow: "0 1px 3px rgba(0,0,0,0.45)",
        whiteSpace: "nowrap",
        lineHeight: 1.2,
      }}
    >
      {/* 0.92 not 0.75: the label sits over a photo, and the lighter tint
          dropped it under 4:1 on a pale sky. Weight carries the hierarchy
          instead. */}
      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.92)" }}>{label} </span>
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
      {/* Only the sale pill lives up top now, so the scrim follows it. */}
      {onSale && (
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
        {/* The sale pill is all that sits up here — the price moved down to
            the title row on every card, per the client. */}
        {onSale ? <SaleBadge label={t("onSale")} /> : null}
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
            className="wf-eyebrow"
            style={{
              color: "var(--wf-coral-400)",
              marginBottom: 6,
            }}
          >
            {region}
          </div>
        )}
        {/* Title left, price right. Aligned to the bottom rather than the
            baseline: a title that wraps to two lines takes its baseline from
            the *first* line, which would leave the price stranded up beside it.
            The price wraps to its own line on a narrow card instead of
            squeezing the title. */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "2px 12px",
          }}
        >
          <div className="wf-h3">{title}</div>
          {price && <Price value={price} label={t("nowFrom")} />}
        </div>
        {(meta || rating) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // Wrap rather than compress: a rating and a long month list
              // share this row on destination cards, and without wrapping the
              // months break mid-list against the stars.
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
