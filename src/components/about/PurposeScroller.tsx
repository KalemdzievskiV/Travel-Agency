"use client";

import React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { Eyebrow } from "@/components/ui";
import { useIsDesktop } from "./useIsDesktop";
import { ScrollRevealText } from "./ScrollRevealText";

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
    return (
      <PurposeStack
        eyebrow={eyebrow}
        statement={statement}
        facets={facets}
        grad={grad}
        // Phones get the statement on the scroll-scrubbed reveal the pinned
        // stage uses, rather than as flat static type — the client's page 15
        // note ("погледни ги транзициите кај нив ... да се смени"). SSR and
        // reduced-motion keep the static paragraph.
        animated={isDesktop === false}
      />
    );
  }
  return <PurposePinned eyebrow={eyebrow} statement={statement} facets={facets} grad={grad} />;
}

const statementStyle: React.CSSProperties = {
  fontFamily: "var(--wf-font-display)",
  fontWeight: 400,
  fontSize: "clamp(30px, 5.2vw, 58px)",
  lineHeight: 1.05,
  letterSpacing: "0",
  margin: "22px auto 0",
  maxWidth: 900,
};

/**
 * The facets read as the answers to the statement, so they carry weight of
 * their own: Manrope 600 (body family stays body family) a step up in size,
 * and a fuller ink-on-dark than ordinary secondary copy.
 */
const facetStyle: React.CSSProperties = {
  margin: "0 auto",
  maxWidth: 760,
  fontSize: "clamp(19px, 2.6vw, 27px)",
  fontWeight: 600,
  lineHeight: 1.45,
  color: "rgba(233, 245, 246, 0.94)",
};

/* ── Desktop: pinned, scroll-driven stage ─────────────────────────── */
function PurposePinned({ eyebrow, statement, facets, grad }: { eyebrow: string; statement: string; facets: string[]; grad: string }) {
  const trackRef = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState(0);
  const n = facets.length;
  const slice = 1 / n;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setActive((prev) => (prev === i ? prev : i));
  });

  // Each facet fills across its own slice of the pinned track. The first one
  // waits for the statement to finish so the question still lands before its
  // answers; the rest start as soon as they swap in. Both end well inside the
  // slice, leaving the fully lit line on screen to be read before the swap.
  const facetRange: [number, number] =
    active === 0
      ? [slice * 0.48, slice * 0.92]
      : [(active + 0.06) * slice, (active + 0.55) * slice];

  return (
    // 80vh of track per facet: the word-by-word fill is scroll-scrubbed, so
    // each slice needs enough travel for the statement and then its facet to
    // fill at the Wayfare "calm and slow" pace rather than snapping.
    <section ref={trackRef} aria-label={eyebrow} style={{ height: `${n * 80}vh`, position: "relative" }}>
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
          {/* The same word-by-word fill the phone already runs on this line
              ("да се пополнуваат буквите ... така ти е направено прашањето на
              мобилната верзија"), scrubbed off the pinned track rather than the
              paragraph's own position — see ScrollRevealText's `progress` note.
              It finishes inside the first facet's slice, so the question lands
              first and the answers follow, in that order. */}
          <ScrollRevealText
            text={statement}
            style={statementStyle}
            progress={scrollYProgress}
            range={[0.02, slice * 0.4]}
          />

          <div style={{ position: "relative", minHeight: "clamp(120px, 18vh, 172px)", marginTop: "clamp(28px, 5vw, 48px)" }}>
            <AnimatePresence mode="wait">
              {/* A div, not a <p> — ScrollRevealText renders the paragraph. */}
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", left: 0, right: 0 }}
              >
                <ScrollRevealText
                  text={facets[active]}
                  style={facetStyle}
                  progress={scrollYProgress}
                  range={facetRange}
                />
              </motion.div>
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
function PurposeStack({
  eyebrow,
  statement,
  facets,
  grad,
  animated = false,
}: {
  eyebrow: string;
  statement: string;
  facets: string[];
  grad: string;
  animated?: boolean;
}) {
  return (
    <section style={{ background: grad, color: "var(--wf-text-on-dark)", padding: "clamp(72px, 14vw, 120px) 0" }}>
      <div className="wf-wrap wf-wrap--default" style={{ textAlign: "center" }}>
        <Eyebrow tone="light" style={{ textAlign: "center" }}>
          {eyebrow}
        </Eyebrow>
        {animated ? (
          <ScrollRevealText text={statement} style={statementStyle} />
        ) : (
          <p style={statementStyle}>{statement}</p>
        )}
        <div style={{ display: "grid", gap: "clamp(22px, 5vw, 34px)", marginTop: "clamp(32px, 7vw, 48px)" }}>
          {facets.map((f) =>
            // On phones each facet fills as it scrolls through the viewport —
            // the same word-by-word reveal as the statement above it, in place
            // of the old one-shot fade-up.
            animated ? (
              <ScrollRevealText key={f} text={f} style={facetStyle} />
            ) : (
              <p key={f} style={facetStyle}>
                {f}
              </p>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
