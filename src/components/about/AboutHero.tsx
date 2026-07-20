import React from "react";
import { Eyebrow } from "@/components/ui";
import { HeroBackdrop } from "./HeroBackdrop";

/**
 * AboutHero — full-bleed editorial hero for the About pages. A big Bodoni
 * headline and eyebrow sit over a tonal gradient (swap for real photography
 * later). Server-safe.
 */
export function AboutHero({
  eyebrow,
  title,
  intro,
  grad,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  grad: string;
}) {
  return (
    <section
      style={{
        position: "relative",
        color: "#fff",
        overflow: "hidden",
        minHeight: "clamp(420px, 64vh, 620px)",
        display: "flex",
        alignItems: "flex-end",
        padding: "calc(var(--wf-header-h) + clamp(48px, 9vw, 104px)) 0 clamp(48px, 7vw, 80px)",
      }}
    >
      {/* Parallax background that drifts/settles on scroll. */}
      <HeroBackdrop grad={grad} />
      {/* Protection scrim so text stays legible once a photo replaces the gradient. */}
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-bottom)" }}
      />
      <div className="wf-wrap wf-wrap--wide" style={{ position: "relative" }}>
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 500,
            fontSize: "clamp(38px, 7vw, 72px)",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            margin: "16px 0 0",
            maxWidth: 16 * 60,
          }}
        >
          {title}
        </h1>
        {intro && (
          <p
            style={{
              fontSize: "clamp(16px, 2.2vw, 19px)",
              lineHeight: 1.6,
              color: "rgba(244,239,231,0.86)",
              maxWidth: 620,
              margin: "20px 0 0",
              whiteSpace: "pre-line",
            }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
