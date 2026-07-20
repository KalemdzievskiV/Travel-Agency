import React from "react";
import { Eyebrow } from "@/components/ui";
import { ParallaxMedia } from "./ParallaxMedia";

/**
 * AboutMasthead — the flagship About header (modelled on Black Tomato's about-us
 * masthead, in the bookit design): a large display word sits on a tonal band with
 * the lead eyebrow + headline beside it, and the hero image overlaps the seam down
 * into the section below. Layout lives in .wf-about-masthead (responsive.css).
 */
export function AboutMasthead({
  word,
  eyebrow,
  title,
  intro,
  grad,
  image,
}: {
  word: string;
  eyebrow: string;
  title: string;
  intro?: string;
  grad: string;
  image?: string;
}) {
  return (
    <section className="wf-about-masthead">
      <div className="wf-about-masthead__band" style={{ background: grad }} aria-hidden />
      <div className="wf-wrap wf-wrap--wide wf-about-masthead__inner">
        <p className="wf-about-masthead__word">{word}</p>
        <div className="wf-about-masthead__grid">
          <div className="wf-about-masthead__media">
            <ParallaxMedia grad={grad} image={image} ratio="4 / 5" amount={28} />
          </div>
          <div className="wf-about-masthead__lead">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h1
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                fontSize: "clamp(30px, 4.6vw, 56px)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                margin: "16px 0 0",
                color: "var(--wf-text-on-dark)",
              }}
            >
              {title}
            </h1>
            {intro && (
              <p
                style={{
                  fontSize: "clamp(15px, 1.8vw, 18px)",
                  lineHeight: 1.65,
                  color: "rgba(244,239,231,0.82)",
                  margin: "18px 0 0",
                  maxWidth: 460,
                  whiteSpace: "pre-line",
                }}
              >
                {intro}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
