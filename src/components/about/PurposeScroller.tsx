"use client";

import React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { Eyebrow } from "@/components/ui";
import { useIsDesktop } from "./useIsDesktop";

/**
 * PurposeScroller — the purpose statement as a full-screen pinned stage
 * (modelled on Black Tomato's about-us purpose section): the background and the
 * headline stay fixed while the supporting facet cross-fades as you scroll.
 * Server render, small screens and reduced-motion fall back to a static band
 * listing every facet.
 */
export function PurposeScroller({
  eyebrow,
  statement,
  facets,
  grad,
}: {
  eyebrow: string;
  statement: string;
  facets: string[];
  grad: string;
}) {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  if (!isDesktop || reduced) {
    return <PurposeStack eyebrow={eyebrow} statement={statement} facets={facets} grad={grad} />;
  }
  return <PurposePinned eyebrow={eyebrow} statement={statement} facets={facets} grad={grad} />;
}

const statementStyle: React.CSSProperties = {
  fontFamily: "var(--wf-font-display)",
  fontWeight: 500,
  fontSize: "clamp(30px, 5.2vw, 58px)",
  lineHeight: 1.12,
  letterSpacing: "-0.02em",
  margin: "22px auto 0",
  maxWidth: 900,
};

/* ── Desktop: pinned, scroll-driven stage ─────────────────────────── */
function PurposePinned({ eyebrow, statement, facets, grad }: { eyebrow: string; statement: string; facets: string[]; grad: string }) {
  const trackRef = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState(0);
  const n = facets.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setActive((prev) => (prev === i ? prev : i));
  });

  return (
    <section ref={trackRef} aria-label={eyebrow} style={{ height: `${n * 65}vh`, position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: grad,
          color: "var(--wf-text-on-dark)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div className="wf-wrap wf-wrap--default" style={{ textAlign: "center" }}>
          <Eyebrow tone="light" style={{ textAlign: "center" }}>
            {eyebrow}
          </Eyebrow>
          <p style={statementStyle}>{statement}</p>

          <div style={{ position: "relative", minHeight: "clamp(96px, 14vh, 128px)", marginTop: "clamp(28px, 5vw, 48px)" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  margin: "0 auto",
                  maxWidth: 640,
                  fontSize: "clamp(17px, 2.2vw, 22px)",
                  lineHeight: 1.6,
                  color: "rgba(233, 245, 246, 0.86)",
                }}
              >
                {facets[active]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: "clamp(24px, 4vw, 36px)" }}>
            {facets.map((f, i) => (
              <span
                key={f}
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: i === active ? "var(--wf-text-on-dark)" : "rgba(233,245,246,0.4)",
                  transition: "background .3s var(--wf-ease-out)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile / SSR / reduced-motion: static band, all facets listed ── */
function PurposeStack({ eyebrow, statement, facets, grad }: { eyebrow: string; statement: string; facets: string[]; grad: string }) {
  return (
    <section style={{ background: grad, color: "var(--wf-text-on-dark)", padding: "clamp(72px, 14vw, 120px) 0" }}>
      <div className="wf-wrap wf-wrap--default" style={{ textAlign: "center" }}>
        <Eyebrow tone="light" style={{ textAlign: "center" }}>
          {eyebrow}
        </Eyebrow>
        <p style={statementStyle}>{statement}</p>
        <div style={{ display: "grid", gap: "clamp(18px, 4vw, 28px)", marginTop: "clamp(32px, 7vw, 48px)" }}>
          {facets.map((f) => (
            <p
              key={f}
              style={{
                margin: "0 auto",
                maxWidth: 600,
                fontSize: "clamp(16px, 2.2vw, 20px)",
                lineHeight: 1.6,
                color: "rgba(233, 245, 246, 0.86)",
              }}
            >
              {f}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
