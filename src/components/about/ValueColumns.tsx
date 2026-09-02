import React from "react";
import { Reveal } from "./Reveal";
import type { ValueColumn } from "@/content/about";

/**
 * One value card: the kicker and the name in the value's own hue, then the
 * lead line and the body in ink. White card, so it reads the same on the teal
 * band as it would anywhere else.
 *
 * `height: 100%` so a row of cards squares off even when one body runs longer
 * — the pinned stage reveals them side by side and ragged bottoms show.
 */
export function ValueCard({ value }: { value: ValueColumn }) {
  return (
    <article
      style={{
        height: "100%",
        background: "var(--wf-paper)",
        borderRadius: "var(--wf-radius-md)",
        padding: "clamp(22px, 2.6vw, 32px)",
      }}
    >
      <span
        style={{
          display: "block",
          fontFamily: "var(--wf-font-sans)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: value.tone,
        }}
      >
        {value.kicker}
      </span>
      <h3
        style={{
          fontFamily: "var(--wf-font-display)",
          fontWeight: 400,
          fontSize: "clamp(28px, 3.4vw, 40px)",
          lineHeight: 1.02,
          letterSpacing: "0",
          textTransform: "uppercase",
          color: value.tone,
          margin: "6px 0 0",
        }}
      >
        {value.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--wf-font-sans)",
          fontSize: 13,
          fontWeight: 700,
          lineHeight: 1.45,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "var(--wf-ink-900)",
          margin: "16px 0 0",
        }}
      >
        {value.lead}
      </p>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.7,
          color: "var(--wf-ink-700)",
          margin: "12px 0 0",
        }}
      >
        {value.body}
      </p>
    </article>
  );
}

/**
 * ValueColumns — the three value cards in a row (stepping to two/one column on
 * smaller screens via wf-grid). The static path: the pinned stage in
 * ValuesScroller reveals the same cards one at a time instead.
 */
export function ValueColumns({ values }: { values: ValueColumn[] }) {
  return (
    <div className="wf-grid wf-grid-3">
      {values.map((v, i) => (
        <Reveal key={v.title} delay={i * 0.16} y={36}>
          <ValueCard value={v} />
        </Reveal>
      ))}
    </div>
  );
}
