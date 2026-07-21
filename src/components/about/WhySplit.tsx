"use client";

import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { ChevronRight, Clock, Lightbulb, Wallet, ShieldCheck, BadgeCheck } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { useIsDesktop } from "./useIsDesktop";
import type { WhyTopic } from "@/content/about";

/**
 * WhySplit — pinned, scroll-driven tab split (modelled on Black Tomato's "why
 * not do it yourself" page, rebuilt in the bookit design): a sticky full-height
 * stage where a white left column lists the topics and a coloured right panel
 * swaps its icon, title and body as you scroll, the coral chevron tracking the
 * active topic. Topics are also clickable — picking one scrolls to its step.
 *
 * Progressive enhancement (same contract as ReasonsScroller): server render,
 * small screens and reduced-motion all get an accessible stacked layout; wide
 * screens with motion get the pin.
 */

// One thin-stroke icon per topic, in content order (time, ideas, value, peace,
// watertight). Falls back to the first if a topic is added without a match.
const TOPIC_ICONS = [Clock, Lightbulb, Wallet, ShieldCheck, BadgeCheck];

export function WhySplit({
  eyebrow,
  title,
  intro,
  topics,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  topics: WhyTopic[];
}) {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  // SSR and first client paint render the stacked layout (isDesktop === null),
  // so hydration matches; wide + motion screens upgrade to the pinned stage.
  if (!isDesktop || reduced) {
    return <WhyStack eyebrow={eyebrow} title={title} intro={intro} topics={topics} />;
  }
  return <WhyPinned eyebrow={eyebrow} title={title} intro={intro} topics={topics} />;
}

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--wf-font-display)",
  fontWeight: 500,
  fontSize: "clamp(34px, 4.6vw, 56px)",
  lineHeight: 1.05,
  letterSpacing: "-0.02em",
  margin: "16px 0 0",
  color: "var(--wf-ink-900)",
};

/* ── Desktop: pinned sticky stage ─────────────────────────────────── */
function WhyPinned({ eyebrow, title, intro, topics }: { eyebrow: string; title: string; intro: string; topics: WhyTopic[] }) {
  const trackRef = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState(0);
  const n = topics.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setActive((prev) => (prev === i ? prev : i));
  });

  // Scroll the window so the given topic's step is centred in the track.
  const jumpTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const trackTop = rect.top + window.scrollY;
    const progress = (i + 0.5) / n;
    window.scrollTo({
      top: trackTop + progress * (rect.height - window.innerHeight),
      behavior: "smooth",
    });
  };

  const topic = topics[active];
  const Icon = TOPIC_ICONS[active] ?? TOPIC_ICONS[0];

  return (
    <section
      ref={trackRef}
      aria-label={title}
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
          background: "var(--wf-cream)",
        }}
      >
        {/* Left — title, intro and topic list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft:
              "max(clamp(20px, 5vw, 32px), calc((100vw - var(--wf-container-wide)) / 2 + clamp(20px, 5vw, 32px)))",
            paddingRight: "clamp(32px, 5vw, 64px)",
          }}
        >
          <div style={{ maxWidth: 460 }}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 style={headingStyle}>{title}</h1>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--wf-ink-500)", margin: "18px 0 0", whiteSpace: "pre-line" }}>
              {intro}
            </p>

            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={title}
              style={{ marginTop: "clamp(28px, 4vw, 44px)", display: "flex", flexDirection: "column" }}
            >
              {topics.map((t, i) => {
                const on = i === active;
                return (
                  <button
                    key={t.nav}
                    role="tab"
                    id={`why-tab-${i}`}
                    aria-selected={on}
                    aria-controls="why-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => jumpTo(i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 14,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "12px 0",
                      fontFamily: "var(--wf-font-sans)",
                      fontSize: 15,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: on ? "var(--wf-coral-500)" : "var(--wf-ink-700)",
                      transition: "color .2s var(--wf-ease-out)",
                    }}
                  >
                    <span>{t.nav}</span>
                    <ChevronRight
                      size={18}
                      strokeWidth={2}
                      aria-hidden
                      style={{
                        flexShrink: 0,
                        color: "var(--wf-coral-500)",
                        opacity: on ? 1 : 0,
                        transform: on ? "none" : "translateX(-6px)",
                        transition: "opacity .2s var(--wf-ease-out), transform .2s var(--wf-ease-out)",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right — coloured panel; background cross-fades, copy swaps per step */}
        <div
          id="why-panel"
          role="tabpanel"
          aria-labelledby={`why-tab-${active}`}
          style={{
            position: "relative",
            color: "var(--wf-text-on-dark)",
            display: "flex",
            alignItems: "center",
            padding: "0 clamp(40px, 7vw, 112px)",
            overflow: "hidden",
          }}
        >
          {/* Cross-fading colour layers (gradients can't transition directly). */}
          {topics.map((t, i) => (
            <motion.div
              key={t.nav}
              aria-hidden
              initial={false}
              animate={{ opacity: i === active ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", inset: 0, background: t.grad }}
            />
          ))}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", maxWidth: 460 }}
            >
              <Icon size={40} strokeWidth={1.25} aria-hidden style={{ opacity: 0.9 }} />
              <h2
                style={{
                  fontFamily: "var(--wf-font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(26px, 3.6vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: "clamp(20px, 3vw, 28px) 0 0",
                }}
              >
                {topic.title}
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.7, margin: "16px 0 0", opacity: 0.92, whiteSpace: "pre-line" }}>
                {topic.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile / SSR / reduced-motion: accessible stacked layout ─────── */
function WhyStack({ eyebrow, title, intro, topics }: { eyebrow: string; title: string; intro: string; topics: WhyTopic[] }) {
  return (
    <section style={{ background: "var(--wf-cream)", padding: "calc(var(--wf-header-h) + clamp(40px, 8vw, 72px)) 0 clamp(48px, 8vw, 80px)" }}>
      <div className="wf-wrap wf-wrap--wide">
        <div style={{ maxWidth: 460 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 style={headingStyle}>{title}</h1>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--wf-ink-500)", margin: "18px 0 0", whiteSpace: "pre-line" }}>
            {intro}
          </p>
        </div>

        <div style={{ display: "grid", gap: "clamp(28px, 6vw, 44px)", marginTop: "clamp(40px, 8vw, 64px)" }}>
          {topics.map((t, i) => {
            const Icon = TOPIC_ICONS[i] ?? TOPIC_ICONS[0];
            return (
              <article
                key={t.nav}
                style={{
                  background: t.grad,
                  color: "var(--wf-text-on-dark)",
                  borderRadius: "var(--wf-radius-md)",
                  padding: "clamp(28px, 7vw, 40px)",
                }}
              >
                <Icon size={36} strokeWidth={1.25} aria-hidden style={{ opacity: 0.9 }} />
                <h2
                  style={{
                    fontFamily: "var(--wf-font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(24px, 6vw, 32px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    margin: "16px 0 0",
                  }}
                >
                  {t.title}
                </h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, margin: "12px 0 0", opacity: 0.92, whiteSpace: "pre-line" }}>
                  {t.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
