import React from "react";
import { Reveal } from "./Reveal";
import type { ValueColumn } from "@/content/about";

/**
 * ValueColumns — three short values in a row (steps to two/one column on
 * smaller screens via wf-grid). Quiet, type-led, no accent colour.
 */
export function ValueColumns({ values }: { values: ValueColumn[] }) {
  return (
    <div className="wf-grid wf-grid-3">
      {values.map((v, i) => (
        <Reveal key={v.title} delay={i * 0.16} y={36}>
          <div
            style={{
              borderTop: "1px solid var(--wf-border-strong)",
              paddingTop: 20,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                fontSize: "clamp(22px, 2.6vw, 28px)",
                letterSpacing: "-0.01em",
                margin: 0,
                color: "var(--wf-ink-900)",
              }}
            >
              {v.title}
            </h3>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.65,
                color: "var(--wf-ink-700)",
                margin: "12px 0 0",
              }}
            >
              {v.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
