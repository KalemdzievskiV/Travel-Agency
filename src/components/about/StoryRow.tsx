import React from "react";
import { Eyebrow } from "@/components/ui";
import { ParallaxMedia } from "./ParallaxMedia";
import { Reveal } from "./Reveal";
import { Prose } from "@/components/ui";
import type { StoryRow as StoryRowData } from "@/content/about";

/**
 * StoryRow — an alternating image / text block, the editorial rhythm of the
 * flagship About page. Image leads when stacked on mobile (see .wf-about-row).
 */
export function StoryRow({ eyebrow, title, body, grad, image, align }: StoryRowData) {
  return (
    <Reveal
      className={`wf-about-row ${align === "right" ? "wf-about-row--right" : ""}`}
    >
      <div className="wf-about-row__media">
        <ParallaxMedia grad={grad} image={image} ratio="4 / 4.2" />
      </div>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 400,
            fontSize: "clamp(26px, 3.6vw, 36px)",
            lineHeight: 1.05,
            letterSpacing: "0",
            margin: "14px 0 0",
            color: "var(--wf-ink-900)",
          }}
        >
          {title}
        </h3>
        <div style={{ margin: "16px 0 0", maxWidth: 520 }}>
          <Prose
            text={body}
            style={{ fontSize: "var(--wf-body-size)", lineHeight: "var(--wf-body-leading)", color: "var(--wf-ink-700)" }}
          />
        </div>
      </div>
    </Reveal>
  );
}
