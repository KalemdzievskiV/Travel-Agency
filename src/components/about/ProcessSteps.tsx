"use client";

import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { Reveal } from "./Reveal";
import { useIsDesktop } from "./useIsDesktop";
import type { ProcessStep } from "@/content/about";

/**
 * ProcessSteps — the "how it all works" sequence (modelled on Black Tomato's
 * pinned process page, rebuilt in the bookit design).
 *
 * Desktop + motion get a full-bleed pinned stage: a cinematic image on the left,
 * a warm-ink panel on the right, the section title centred up top, and a circular
 * progress ring straddling the divide whose number swaps and whose arc + travelling
 * dot scrub as you scroll. Server render, small screens and reduced-motion fall
 * back to the accessible numbered list.
 */
export function ProcessSteps({ steps, title }: { steps: ProcessStep[]; title: string }) {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  if (!isDesktop || reduced) {
    return <ProcessStack steps={steps} />;
  }
  return <ProcessPinned steps={steps} title={title} />;
}

/* ── Desktop: pinned, scroll-driven stage ─────────────────────────── */
const RING_R = 46; // SVG circle radius in a 100×100 viewBox

function ProcessPinned({ steps, title }: { steps: ProcessStep[]; title: string }) {
  const trackRef = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState(0);
  const n = steps.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setActive((prev) => (prev === i ? prev : i));
  });

  // Travelling dot: position on the ring derived from scroll progress.
  const dotX = useTransform(scrollYProgress, (p) => 50 + RING_R * Math.cos((p * 360 - 90) * (Math.PI / 180)));
  const dotY = useTransform(scrollYProgress, (p) => 50 + RING_R * Math.sin((p * 360 - 90) * (Math.PI / 180)));

  const step = steps[active];

  return (
    <section
      ref={trackRef}
      aria-label={title}
      style={{ height: `${n * 90}vh`, position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: "var(--wf-header-h)",
          height: "calc(100vh - var(--wf-header-h))",
          overflow: "hidden",
          color: "var(--wf-text-on-dark)",
        }}
      >
        {/* Two panes: image left, warm-ink panel right */}
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ position: "relative", overflow: "hidden" }}>
            {steps.map((s, i) => (
              <motion.div
                key={s.no}
                aria-hidden
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: s.grad,
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </div>
          <div style={{ background: "var(--wf-ink-900)" }} />
        </div>

        {/* Title — centred along the top */}
        <h2
          style={{
            position: "absolute",
            top: "clamp(28px, 6vh, 64px)",
            left: 0,
            right: 0,
            textAlign: "center",
            margin: 0,
            fontFamily: "var(--wf-font-sans)",
            fontSize: "clamp(15px, 1.6vw, 20px)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
          }}
        >
          {title}
        </h2>

        {/* Circular progress ring + number, straddling the divide */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(240px, 30vw, 380px)",
            aspectRatio: "1",
          }}
        >
          {/* Soft darkening so the white number reads over the bright image half */}
          <div
            style={{
              position: "absolute",
              inset: "-30%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(22,19,15,0.45) 0%, rgba(22,19,15,0) 70%)",
            }}
          />
          <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
            {/* Base ring */}
            <circle cx="50" cy="50" r={RING_R} fill="none" stroke="rgba(244,239,231,0.3)" strokeWidth="0.5" />
            {/* Progress arc */}
            <motion.circle
              cx="50"
              cy="50"
              r={RING_R}
              fill="none"
              stroke="var(--wf-coral-500)"
              strokeWidth="1"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ pathLength: scrollYProgress }}
            />
            {/* Step markers */}
            {steps.map((s, i) => {
              const a = ((i / n) * 360 - 90) * (Math.PI / 180);
              const cx = 50 + RING_R * Math.cos(a);
              const cy = 50 + RING_R * Math.sin(a);
              const on = i === active;
              return (
                <circle
                  key={s.no}
                  cx={cx}
                  cy={cy}
                  r={on ? 2 : 1.6}
                  fill={on ? "var(--wf-coral-500)" : "var(--wf-ink-900)"}
                  stroke="rgba(244,239,231,0.6)"
                  strokeWidth="0.4"
                />
              );
            })}
            {/* Travelling dot at the progress head */}
            <motion.circle cx={dotX} cy={dotY} r="2.4" fill="var(--wf-cream)" />
          </svg>

          {/* Number in the centre */}
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={step.no}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "var(--wf-font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(44px, 5.5vw, 76px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {step.no}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Step label + body, in the right pane clear of the ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "calc(50% + clamp(150px, 16vw, 230px))",
            right: "clamp(40px, 6vw, 96px)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step.no}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: 340 }}
            >
              <span
                style={{
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--wf-coral-400)",
                }}
              >
                Step {step.no}
              </span>
              <h3
                style={{
                  fontFamily: "var(--wf-font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(24px, 2.4vw, 34px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: "12px 0 0",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "rgba(244,239,231,0.82)",
                  margin: "16px 0 0",
                  whiteSpace: "pre-line",
                }}
              >
                {step.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile / SSR / reduced-motion: accessible numbered list ──────── */
function ProcessStack({ steps }: { steps: ProcessStep[] }) {
  return (
    <section style={{ background: "var(--wf-cream)", padding: "clamp(56px, 10vw, 88px) 0" }}>
      <div className="wf-wrap wf-wrap--default">
        <ol
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            borderLeft: "1px solid var(--wf-border-strong)",
          }}
        >
          {steps.map((s, i) => (
            <Reveal
              key={s.no}
              as="li"
              delay={i * 0.05}
              style={{
                position: "relative",
                paddingLeft: "clamp(28px, 5vw, 56px)",
                paddingBottom: i === steps.length - 1 ? 0 : "clamp(36px, 5vw, 56px)",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: -1,
                  top: 4,
                  transform: "translateX(-50%)",
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "var(--wf-coral-500)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: "var(--wf-ink-500)",
                }}
              >
                STEP {s.no}
              </span>
              <h3
                style={{
                  fontFamily: "var(--wf-font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(22px, 3vw, 30px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.01em",
                  margin: "8px 0 0",
                  color: "var(--wf-ink-900)",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: "var(--wf-ink-700)",
                  margin: "12px 0 0",
                  maxWidth: 600,
                  whiteSpace: "pre-line",
                }}
              >
                {s.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
