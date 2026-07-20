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
import type { Reason, ReasonsIntro } from "@/content/about";

/**
 * ReasonsScroller — the pinned, scroll-driven sequence (modelled on Black
 * Tomato's 5-reasons page, rebuilt in the bookit design): a sticky stage that
 * opens on a full-width title panel, then steps through the reasons with the
 * photo and the copy swapping sides each time, a 01–0n index tracking progress.
 *
 * Alternating sides is a client requirement — the reference alternates left/right
 * rather than pinning the image to one half — so each reason's image is rendered
 * into the half its position dictates and only the active one is opaque.
 *
 * Progressive enhancement: server-render + small screens + reduced-motion all
 * get an accessible stacked layout; wide screens with motion get the pin.
 */
export function ReasonsScroller({
  reasons,
  intro,
}: {
  reasons: Reason[];
  intro: ReasonsIntro;
}) {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  // SSR and first client paint render the stacked layout (isDesktop === null),
  // so hydration matches; wide+motion screens upgrade to the pinned stage.
  if (!isDesktop || reduced) {
    return <ReasonsStack reasons={reasons} intro={intro} />;
  }
  return <ReasonsPinned reasons={reasons} intro={intro} />;
}

/** Which half a reason's photo occupies — first left, then right, alternating. */
const imageSideFor = (i: number) => (i % 2 === 0 ? "left" : "right");

/* ── Desktop: pinned sticky stage ─────────────────────────────────── */
function ReasonsPinned({ reasons, intro }: { reasons: Reason[]; intro: ReasonsIntro }) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  // Slide 0 is the title panel; slides 1..n are the reasons.
  const n = reasons.length + 1;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const reasonIndex = active - 1;
  const reason = reasonIndex >= 0 ? reasons[reasonIndex] : null;
  // The copy sits opposite the photo. The title slide spans the stage, so it has
  // no side of its own — park it right, where the reference keeps the index.
  const copySide: "left" | "right" = !reason
    ? "right"
    : imageSideFor(reasonIndex) === "left"
      ? "right"
      : "left";

  return (
    <section
      ref={trackRef}
      aria-label={intro.title}
      style={{
        height: `${n * 100}vh`,
        position: "relative",
        // Pull the stage up under the header so the photography and copy run
        // full-bleed behind it (the header floats transparent on this route).
        marginTop: "calc(-1 * var(--wf-header-h))",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "var(--wf-ink-900)",
          color: "var(--wf-text-on-dark)",
        }}
      >
        {/* Photos — each pinned to its own half, only the active one opaque. */}
        {reasons.map((r, i) => (
          <motion.div
            key={r.no}
            aria-hidden={i !== reasonIndex}
            initial={false}
            animate={{ opacity: i === reasonIndex ? 1 : 0, scale: i === reasonIndex ? 1 : 1.06 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "50%",
              left: imageSideFor(i) === "left" ? 0 : "50%",
              background: r.grad,
              backgroundImage: `linear-gradient(to right, rgba(22,19,15,0) 60%, rgba(22,19,15,0.25)), url(${r.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        {/* Title panel — full width, holds the stage until the first reason. */}
        <AnimatePresence>
          {active === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--wf-ink-900)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                alignItems: "center",
                padding: "0 clamp(40px, 7vw, 112px)",
                gap: "clamp(24px, 4vw, 64px)",
              }}
            >
              <h1
                style={{
                  fontFamily: "var(--wf-font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(48px, 8vw, 118px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  color: "var(--wf-coral-400)",
                  margin: 0,
                }}
              >
                {intro.big}
              </h1>
              <div style={{ maxWidth: 420, justifySelf: "end", textAlign: "right" }}>
                <Eyebrow tone="light">{intro.eyebrow}</Eyebrow>
                <p
                  style={{
                    fontFamily: "var(--wf-font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(24px, 2.8vw, 38px)",
                    lineHeight: 1.12,
                    letterSpacing: "-0.02em",
                    margin: "16px 0 0",
                  }}
                >
                  {intro.title}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Copy panel — occupies the half the photo isn't using. */}
        <AnimatePresence mode="wait">
          {reason && (
            <motion.div
              key={reason.no}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "50%",
                left: copySide === "left" ? 0 : "50%",
                background: "var(--wf-ink-900)",
                display: "flex",
                alignItems: "center",
                // Extra room on whichever edge the index rail occupies, so the
                // numbers never crowd the copy.
                paddingBlock: 0,
                paddingLeft: copySide === "left" ? "clamp(72px, 7vw, 120px)" : "clamp(40px, 5vw, 96px)",
                paddingRight: copySide === "right" ? "clamp(72px, 7vw, 120px)" : "clamp(40px, 5vw, 96px)",
              }}
            >
              <div style={{ maxWidth: 460 }}>
                <Eyebrow tone="light">{intro.eyebrow}</Eyebrow>
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
                    whiteSpace: "pre-line",
                  }}
                >
                  {reason.body}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Index 01–0n — tracks the copy panel from side to side, so it always
            sits on the dark half. Over a photo the dim numbers wash out. */}
        <ol
          style={{
            position: "absolute",
            [copySide === "left" ? "left" : "right"]: "clamp(16px, 2vw, 30px)",
            top: "50%",
            transform: "translateY(-50%)",
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            zIndex: 2,
            pointerEvents: "none",
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
                  color: i === reasonIndex ? "var(--wf-coral-400)" : "rgba(244,239,231,0.4)",
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
    </section>
  );
}

/* ── Mobile / SSR / reduced-motion: accessible stacked layout ─────── */
function ReasonsStack({ reasons, intro }: { reasons: Reason[]; intro: ReasonsIntro }) {
  return (
    <>
      <section
        style={{
          background: "var(--wf-ink-900)",
          color: "var(--wf-text-on-dark)",
          padding: "calc(var(--wf-header-h) + clamp(40px, 8vw, 72px)) 0 clamp(40px, 8vw, 64px)",
        }}
      >
        <div className="wf-wrap wf-wrap--wide">
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(44px, 15vw, 88px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--wf-coral-400)",
              margin: 0,
            }}
          >
            {intro.big}
          </h1>
          <div style={{ marginTop: "clamp(20px, 5vw, 32px)" }}>
            <Eyebrow tone="light">{intro.eyebrow}</Eyebrow>
            <p
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                fontSize: "clamp(22px, 5.5vw, 30px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                margin: "12px 0 0",
              }}
            >
              {intro.title}
            </p>
          </div>
        </div>
      </section>

      {/* Dark like the pinned stage, so the whole route stays dark end to end and
          the floating header keeps its light-on-dark treatment throughout. */}
      <section
        style={{
          background: "var(--wf-ink-900)",
          color: "var(--wf-text-on-dark)",
          padding: "clamp(48px, 8vw, 80px) 0",
        }}
      >
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
                  WebkitTextStroke: "1px rgba(244,239,231,0.45)",
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
                }}
              >
                {r.title}
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: "rgba(244,239,231,0.82)",
                  margin: "12px 0 0",
                  whiteSpace: "pre-line",
                }}
              >
                {r.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
