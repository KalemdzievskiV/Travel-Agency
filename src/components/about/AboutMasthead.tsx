import React from "react";
import { Eyebrow, Prose } from "@/components/ui";
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
  band,
  image,
}: {
  word: string;
  eyebrow: string;
  title: string;
  intro?: string;
  grad: string;
  /** Background for the tonal band. Falls back to `grad` when not given. */
  band?: string;
  image?: string;
}) {
  return (
    <section className="wf-about-masthead">
      <div className="wf-about-masthead__band" style={{ background: band ?? grad }} aria-hidden />
      <div className="wf-wrap wf-wrap--wide wf-about-masthead__inner">
        <p className="wf-about-masthead__word">{word}</p>
        <div className="wf-about-masthead__grid">
          <div className="wf-about-masthead__media">
            <ParallaxMedia grad={grad} image={image} ratio="4 / 5" amount={28} />
          </div>
          <div className="wf-about-masthead__lead">
            {/* The three colours live in .wf-about-masthead__lead (responsive
                .css) rather than inline. On desktop the lead sits inside the
                tonal band and is set light-on-dark; below 860px the grid
                stacks, which pushes the lead past the foot of the band onto
                white — where light type was invisible ("да се реши текстот да
                се чита"). CSS can flip it to ink there; an inline colour
                cannot. */}
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h1
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 400,
                fontSize: "clamp(30px, 4.6vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "0",
                margin: "16px 0 0",
              }}
            >
              {title}
            </h1>
            {intro && (
              <div style={{ margin: "18px 0 0", maxWidth: 460 }}>
                <Prose text={intro} style={{ fontSize: "clamp(14px, 1.6vw, 16px)", lineHeight: 1.65 }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
