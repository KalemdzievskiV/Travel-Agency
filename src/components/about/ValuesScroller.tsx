"use client";

import React from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { ValueCard, ValueColumns } from "./ValueColumns";
import { useIsDesktop } from "./useIsDesktop";
import type { ValueColumn } from "@/content/about";

/**
 * ValuesScroller — "our values" as a pinned stage: the section pins and the
 * value cards appear one beside the other as you scroll, accumulating across
 * the row. Server render, small screens and reduced-motion fall back to the
 * static revealed grid.
 *
 * The band is the deep teal of the client's reference (FINAL 3.1), with each
 * value named in its own hue — the one place on the site running three accents
 * instead of one. See --wf-values-* / --wf-value-* in colors.css.
 */
export function ValuesScroller({
  title,
  values,
}: {
  title: string;
  values: ValueColumn[];
}) {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  if (!isDesktop || reduced) {
    return <ValuesStack title={title} values={values} />;
  }
  return <ValuesPinned title={title} values={values} />;
}

/* ── The band's own head: just the big tonal title now — КОРЕКЦИИ 3.1.1
   dropped the second heading/subtitle line under it ("под НЕМА друго"). ── */
function ValuesHead({ title }: { title: string }) {
  return (
    <div style={{ maxWidth: 780 }}>
      <h2
        style={{
          fontFamily: "var(--wf-font-display)",
          fontWeight: 400,
          fontSize: "clamp(44px, 8vw, 104px)",
          lineHeight: 0.95,
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          color: "var(--wf-values-heading)",
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ── Desktop: pinned, cards accumulate on scroll ──────────────────── */
function ValuesPinned({ title, values }: { title: string; values: ValueColumn[] }) {
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
          background: "var(--wf-values-bg)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div className="wf-wrap wf-wrap--wide" style={{ width: "100%" }}>
          <ValuesHead title={title} />
          <div
            className="wf-grid wf-grid-5"
            style={{ marginTop: "clamp(28px, 4vw, 48px)", alignItems: "stretch" }}
          >
            {values.map((v, i) => {
              const on = i < visible;
              return (
                <motion.div
                  key={v.title}
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, y: on ? 0 : 32 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ValueCard value={v} />
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
function ValuesStack({ title, values }: { title: string; values: ValueColumn[] }) {
  return (
    <section style={{ background: "var(--wf-values-bg)", padding: "clamp(56px, 9vw, 112px) 0" }}>
      <div className="wf-wrap wf-wrap--wide">
        <ValuesHead title={title} />
        <div style={{ marginTop: "clamp(28px, 5vw, 48px)" }}>
          <ValueColumns values={values} />
        </div>
      </div>
    </section>
  );
}
