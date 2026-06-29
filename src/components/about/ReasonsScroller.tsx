"use client";

import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { Eyebrow } from "@/components/ui";
import { useIsDesktop } from "./useIsDesktop";
import type { Reason } from "@/content/about";

/**
 * ReasonsScroller — the pinned, scroll-driven sequence (modelled on Black
 * Tomato's 5-reasons page, rebuilt in the bookit design): a sticky two-panel
 * stage where the left image and right copy swap per reason as you scroll, with
 * a 01–0n index tracking the active step.
 *
 * Progressive enhancement: server-render + small screens + reduced-motion all
 * get an accessible stacked layout; wide screens with motion get the pin.
 */
export function ReasonsScroller({ reasons }: { reasons: Reason[] }) {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  // SSR and first client paint render the stacked layout (isDesktop === null),
  // so hydration matches; wide+motion screens upgrade to the pinned stage.
  if (!isDesktop || reduced) {
    return <ReasonsStack reasons={reasons} />;
  }
  return <ReasonsPinned reasons={reasons} />;
}

/* ── Desktop: pinned sticky stage ─────────────────────────────────── */
function ReasonsPinned({ reasons }: { reasons: Reason[] }) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const n = reasons.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const reason = reasons[active];

  return (
    <section
      ref={trackRef}
      aria-label="Five reasons to book with us"
      style={{ height: `${n * 100}vh`, position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: "var(--wf-header-h)",
          height: "calc(100vh - var(--wf-header-h))",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}
      >
        {/* Left — cross-fading image stack */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {reasons.map((r, i) => (
            <motion.div
              key={r.no}
              aria-hidden={i !== active}
              initial={false}
              animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background: `${r.grad}`,
                backgroundImage: `linear-gradient(to right, rgba(22,19,15,0) 60%, rgba(22,19,15,0.25)), url(${r.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>

        {/* Right — dark copy panel + numbered index */}
        <div
          style={{
            position: "relative",
            background: "var(--wf-ink-900)",
            color: "var(--wf-text-on-dark)",
            display: "flex",
            alignItems: "center",
            padding: "0 clamp(40px, 7vw, 112px)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={reason.no}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: 460 }}
            >
              <Eyebrow tone="light">Reason {reason.no}</Eyebrow>
              <h2
                style={{
                  fontFamily: "var(--wf-font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(30px, 3.4vw, 46px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  margin: "16px 0 0",
                }}
              >
                {reason.title}
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "rgba(244,239,231,0.82)",
                  margin: "20px 0 0",
                }}
              >
                {reason.body}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Index 01–0n */}
          <ol
            style={{
              position: "absolute",
              right: "clamp(20px, 3vw, 44px)",
              top: "50%",
              transform: "translateY(-50%)",
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
            }}
          >
            {reasons.map((r, i) => (
              <li
                key={r.no}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 18,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--wf-font-display)",
                    fontSize: 20,
                    fontWeight: 500,
                    color: i === active ? "var(--wf-coral-400)" : "rgba(244,239,231,0.4)",
                    transition: "color .3s var(--wf-ease-out)",
                  }}
                >
                  {r.no}
                </span>
                {i < reasons.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      width: 1,
                      height: 26,
                      background: "rgba(244,239,231,0.25)",
                    }}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile / SSR / reduced-motion: accessible stacked layout ─────── */
function ReasonsStack({ reasons }: { reasons: Reason[] }) {
  return (
    <section style={{ background: "var(--wf-cream)", padding: "clamp(48px, 8vw, 80px) 0" }}>
      <div
        className="wf-wrap wf-wrap--wide"
        style={{ display: "grid", gap: "clamp(40px, 8vw, 64px)" }}
      >
        {reasons.map((r) => (
          <article key={r.no}>
            <div
              style={{
                aspectRatio: "4 / 3",
                borderRadius: "var(--wf-radius-md)",
                background: `${r.grad}`,
                backgroundImage: `url(${r.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <span
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                fontSize: "clamp(36px, 11vw, 48px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "transparent",
                WebkitTextStroke: "1px var(--wf-ink-300)",
                display: "block",
                margin: "18px 0 0",
              }}
            >
              {r.no}
            </span>
            <h2
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                fontSize: "clamp(24px, 6vw, 32px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: "8px 0 0",
                color: "var(--wf-ink-900)",
              }}
            >
              {r.title}
            </h2>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--wf-ink-700)",
                margin: "12px 0 0",
              }}
            >
              {r.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

