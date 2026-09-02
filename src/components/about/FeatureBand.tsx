import React from "react";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { HeroBackdrop } from "./HeroBackdrop";
import { Reveal } from "./Reveal";

/**
 * FeatureBand — a full-bleed, centred-overlay feature section (the treatment the
 * About page uses for the regenerative-travel and "your world" bands). A parallax
 * tonal background with a darkening scrim and centred copy; an optional light
 * outline link keeps the coral accent reserved for the page's primary CTA.
 */
export function FeatureBand({
  eyebrow,
  title,
  body,
  grad,
  image,
  scrim = 0.5,
  ctaLabel,
  ctaHref,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  grad: string;
  image?: string;
  /** Darkening over the backdrop. Raise it for pale imagery — white body copy
   *  needs 4.5:1, and this band centres text over the middle of the picture. */
  scrim?: number;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "clamp(440px, 62vh, 600px)",
        padding: "clamp(64px, 10vw, 120px) 0",
        textAlign: "center",
      }}
    >
      <HeroBackdrop grad={grad} image={image} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `rgba(22,19,15,${scrim})` }} />
      <div className="wf-wrap wf-wrap--default" style={{ position: "relative" }}>
        <Reveal>
          {eyebrow && (
            <Eyebrow tone="light" style={{ textAlign: "center" }}>
              {eyebrow}
            </Eyebrow>
          )}
          <h2
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 400,
              fontSize: "clamp(28px, 5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "0",
              margin: "16px auto 0",
              maxWidth: 760,
            }}
          >
            {title}
          </h2>
          {body && (
            <p
              style={{
                fontSize: "clamp(16px, 2.2vw, 19px)",
                lineHeight: 1.7,
                color: "rgba(244,239,231,0.86)",
                maxWidth: 620,
                margin: "18px auto 0",
              }}
            >
              {body}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: "clamp(24px, 4vw, 34px)",
                padding: "14px 28px",
                border: "1px solid rgba(244,239,231,0.6)",
                borderRadius: "var(--wf-radius-md)",
                color: "#fff",
                fontFamily: "var(--wf-font-sans)",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.02em",
                textDecoration: "none",
              }}
            >
              {ctaLabel}
              <ChevronRight size={16} aria-hidden />
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
