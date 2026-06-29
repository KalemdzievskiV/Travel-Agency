"use client";

import React from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { SectionHead } from "@/components/sections/SectionHead";
import { ValueColumns } from "./ValueColumns";
import { useIsDesktop } from "./useIsDesktop";
import type { ValueColumn } from "@/content/about";

/**
 * ValuesScroller — "what we stand for" as a pinned stage (same scroll-driven feel
 * as PurposeScroller): the section pins and the value columns appear one beside
 * the other as you scroll, accumulating across the row. Server render, small
 * screens and reduced-motion fall back to the static revealed grid.
 */
export function ValuesScroller({
  eyebrow,
  title,
  values,
}: {
  eyebrow: string;
  title: string;
  values: ValueColumn[];
}) {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  if (!isDesktop || reduced) {
    return <ValuesStack eyebrow={eyebrow} title={title} values={values} />;
  }
  return <ValuesPinned eyebrow={eyebrow} title={title} values={values} />;
}

/* ── Desktop: pinned, columns accumulate on scroll ────────────────── */
function ValuesPinned({ eyebrow, title, values }: { eyebrow: string; title: string; values: ValueColumn[] }) {
  const trackRef = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(1);
  const n = values.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const count = Math.min(n, Math.max(1, Math.floor(p * n) + 1));
    setVisible((prev) => (prev === count ? prev : count));
  });

  return (
    <section ref={trackRef} aria-label={title} style={{ height: `${n * 72}vh`, position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "var(--wf-sand)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div className="wf-wrap wf-wrap--wide" style={{ width: "100%" }}>
          <SectionHead eyebrow={eyebrow} title={title} />
          <div className="wf-grid wf-grid-3" style={{ marginTop: "clamp(40px, 6vw, 64px)" }}>
            {values.map((v, i) => {
              const on = i < visible;
              return (
                <motion.div
                  key={v.title}
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, y: on ? 0 : 32 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderTop: "1px solid var(--wf-border-strong)", paddingTop: 20 }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--wf-font-display)",
                      fontWeight: 500,
                      fontSize: "clamp(24px, 2.8vw, 32px)",
                      letterSpacing: "-0.01em",
                      margin: 0,
                      color: "var(--wf-ink-900)",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--wf-ink-700)", margin: "12px 0 0" }}>
                    {v.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile / SSR / reduced-motion: static revealed grid ──────────── */
function ValuesStack({ eyebrow, title, values }: { eyebrow: string; title: string; values: ValueColumn[] }) {
  return (
    <section style={{ background: "var(--wf-sand)", padding: "clamp(64px, 9vw, 112px) 0" }}>
      <div className="wf-wrap wf-wrap--wide">
        <SectionHead eyebrow={eyebrow} title={title} />
        <div style={{ marginTop: "clamp(36px, 5vw, 56px)" }}>
          <ValueColumns values={values} />
        </div>
      </div>
    </section>
  );
}
