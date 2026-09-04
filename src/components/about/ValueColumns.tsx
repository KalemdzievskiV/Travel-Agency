import React from "react";
import { Reveal } from "./Reveal";
import type { ValueColumn } from "@/content/about";

/**
 * One value card: kicker and title are two halves of a single line ("Помалку"
 * / "Но подобро" reads as "Помалку, но подобро"), both set in the value's own
 * hue, then the body in ink. White card, so it reads the same on the teal
 * band as it would anywhere else.
 *
 * Sized down from the original 3-card band (КОРЕКЦИИ 3.1.1, "направи ги
 * помали") now that there are five of them in a row rather than three, and
 * the bold caps "lead" line the 3-card version carried between title and
 * body is gone — the kicker+title pair does that job now.
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
        padding: "clamp(16px, 1.8vw, 22px)",
      }}
    >
      <span
        style={{
          display: "block",
          fontFamily: "var(--wf-font-sans)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.14em",
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
          fontSize: "clamp(19px, 2.1vw, 25px)",
          lineHeight: 1.05,
          letterSpacing: "0",
          textTransform: "uppercase",
          color: value.tone,
          margin: "4px 0 0",
        }}
      >
        {value.title}
      </h3>
      <p
        style={{
          fontSize: 13.5,
          lineHeight: 1.6,
          color: "var(--wf-ink-700)",
          margin: "10px 0 0",
        }}
      >
        {value.body}
      </p>
    </article>
  );
}

/**
 * ValueColumns — the five value cards in a row (stepping down via wf-grid-5).
 * The static path: the pinned stage in ValuesScroller reveals the same cards
 * one at a time instead.
 */
export function ValueColumns({ values }: { values: ValueColumn[] }) {
  return (
    <div className="wf-grid wf-grid-5">
      {values.map((v, i) => (
        <Reveal key={v.title} delay={i * 0.12} y={36}>
          <ValueCard value={v} />
        </Reveal>
      ))}
    </div>
  );
}
