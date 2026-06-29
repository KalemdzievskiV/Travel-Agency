import React from "react";
import { ParallaxMedia } from "./ParallaxMedia";
import { Reveal } from "./Reveal";
import type { Reason } from "@/content/about";

/**
 * ReasonsList — numbered 01–0n reasons as alternating image/text rows. Stacked
 * (not a JS carousel) so it stays accessible and fully responsive; the large
 * outline number carries the sequence.
 */
export function ReasonsList({ reasons }: { reasons: Reason[] }) {
  return (
    <div style={{ display: "grid", gap: "clamp(56px, 9vw, 104px)" }}>
      {reasons.map((r, i) => (
        <Reveal
          key={r.no}
          className={`wf-reason ${i % 2 === 1 ? "wf-reason--flip" : ""}`}
        >
          <div className="wf-reason__media">
            <ParallaxMedia grad={r.grad} ratio="5 / 4" />
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                fontSize: "clamp(40px, 6vw, 64px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "transparent",
                WebkitTextStroke: "1px var(--wf-ink-300)",
                display: "block",
              }}
            >
              {r.no}
            </span>
            <h3
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                fontSize: "clamp(26px, 3.6vw, 36px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: "12px 0 0",
                color: "var(--wf-ink-900)",
              }}
            >
              {r.title}
            </h3>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--wf-ink-700)",
                margin: "14px 0 0",
                maxWidth: 480,
              }}
            >
              {r.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
