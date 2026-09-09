"use client";

import React from "react";
import { Prose } from "@/components/ui";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Reveal } from "./Reveal";
import { useIsDesktop } from "./useIsDesktop";
import type { ProcessStep } from "@/content/about";
import { pageBackdrop } from "@/content/media";
import { photoLayers } from "@/lib/photo";

/**
 * ProcessSteps — the "how it all works" sequence (modelled on Black Tomato's
 * pinned process page, rebuilt in the bookit design).
 *
 * Desktop + motion get a full-bleed pinned stage: a cinematic image on the left,
 * a warm-ink panel on the right, the section title centred up top, and a circular
 * progress ring straddling the divide whose number swaps and whose arc + travelling
 * dot scrub as you scroll.
 *
 * Phones get the same sequence stacked portrait — title and ring over the photo,
 * copy on an ink panel beneath — because the client asked for the reference's
 * mobile treatment rather than the timeline it used to drop to. Server render,
 * short windows and reduced-motion still fall back to the numbered list.
 */
export function ProcessSteps({ steps, title }: { steps: ProcessStep[]; title: string }) {
  const isDesktop = useIsDesktop();
  // The phone pin is one non-scrolling screen holding a photo, a step title and
  // three paragraphs. Below ~600px of viewport the copy cannot fit without
  // clipping, so short windows keep the timeline, which scrolls.
  const isTallPhone = useIsDesktop("(max-width: 979px) and (min-height: 600px)");
  const reduced = useReducedMotion();

  // SSR and the first client paint render the stack (both flags `null`), so
  // hydration matches; the real layout is chosen once matchMedia has answered.
  if (reduced || isDesktop === null) {
    return <ProcessStack steps={steps} withMedia={isDesktop === false} />;
  }
  if (isDesktop) return <ProcessPinned steps={steps} title={title} />;
  // Phones get the reference's pinned stage — title and ring over the step
  // photograph, copy on the ink panel beneath — driven by the same scroll
  // progress as the desktop stage, which is the client's "истиот тркалезен
  // индикатор како на десктоп" note. Short phones fall back to the timeline.
  if (isTallPhone) return <ProcessMobile steps={steps} title={title} />;
  return <ProcessStack steps={steps} withMedia />;
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
            fontFamily: "var(--wf-font-display)",
            fontSize: "var(--wf-h2-size)",
            fontWeight: 400,
            lineHeight: "var(--wf-h2-leading)",
            letterSpacing: "var(--wf-h2-tracking)",
            /* Restated rather than using `.wf-h2`: this heading is absolutely
               positioned over the stage and needs its own layout properties. */
            textTransform: "uppercase",
          }}
        >
          {title}
        </h2>

        {/* Circular progress ring + number, straddling the divide */}
        <ProgressRing
          steps={steps}
          active={active}
          progress={scrollYProgress}
          numberSize="clamp(44px, 5.5vw, 76px)"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(240px, 30vw, 380px)",
          }}
        />

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
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--wf-coral-400)",
                }}
              >
                Step {step.no}
              </span>
              {/* Title and copy are back at the sizes they ran at before the 3.1
                  corrections brought them "down a step" (and set the titles
                  uppercase): the client has asked for the earlier reading on
                  the desktop stage. The phone stage below keeps its own scale. */}
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
              <div style={{ margin: "16px 0 0" }}>
                <Prose text={step.body} style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(244,239,231,0.82)" }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ── Shared: the circular scroll indicator ────────────────────────── */
/**
 * ProgressRing — base ring, a coral arc scrubbed by scroll, a marker per step
 * and a travelling dot at the arc's head, with the active number in the middle.
 *
 * Shared by the desktop stage and the phone stage so the indicator behaves
 * identically at both sizes; only the box it is drawn into and the numeral's
 * size differ. The caller positions it — everything here is relative to the
 * square the `style` width defines.
 */
function ProgressRing({
  steps,
  active,
  progress,
  numberSize,
  style,
}: {
  steps: ProcessStep[];
  active: number;
  progress: MotionValue<number>;
  numberSize: string;
  style?: React.CSSProperties;
}) {
  const n = steps.length;
  // Travelling dot: position on the ring derived from scroll progress.
  const dotX = useTransform(progress, (p) => 50 + RING_R * Math.cos((p * 360 - 90) * (Math.PI / 180)));
  const dotY = useTransform(progress, (p) => 50 + RING_R * Math.sin((p * 360 - 90) * (Math.PI / 180)));

  return (
    <div aria-hidden style={{ aspectRatio: "1", ...style }}>
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
          stroke="var(--wf-accent-ink)"
          strokeWidth="1"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ pathLength: progress }}
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
              fill={on ? "var(--wf-accent-ink)" : "var(--wf-ink-900)"}
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
            key={steps[active].no}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 400,
              fontSize: numberSize,
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            {steps[active].no}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Phone: pinned stage, photo over copy ─────────────────────────── */
/**
 * ProcessMobile — the reference's phone treatment: the section title and the
 * scroll ring sit over the step's photograph, the copy runs on an ink panel
 * beneath it, and the whole thing is pinned so scrolling advances 01 → 02 → …
 * rather than scrolling a list past.
 *
 * Same track maths and the same `ProgressRing` as the desktop stage, so the
 * two stay in step; only the arrangement is portrait. The photo pane is the
 * flexible row — it gives space back to the copy on a shorter phone — and the
 * copy is capped so a long step cannot push the picture out of the stage.
 */
function ProcessMobile({ steps, title }: { steps: ProcessStep[]; title: string }) {
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

  const step = steps[active];

  return (
    <section
      ref={trackRef}
      aria-label={title}
      // Shorter per step than the desktop track: a thumb covers less distance
      // per flick, and 90vh a step made the sequence feel like wading.
      style={{ height: `${n * 75}vh`, position: "relative" }}
    >
      <div className="wf-processm">
        <div className="wf-processm__stage">
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

          {/* Top scrim: the step photographs run from near-black to bright
              sand, so the title needs a ground of its own rather than trusting
              whatever is behind it. */}
          <div className="wf-processm__scrim" aria-hidden />

          {/* Title and ring are flow siblings, not two absolutely-centred
              layers: a two- or three-line title (which the Macedonian copy and
              the longer English headings both produce) pushes the ring down
              instead of running through it. */}
          <h2 className="wf-processm__title">{title}</h2>

          <div className="wf-processm__ringwrap">
            <ProgressRing
              steps={steps}
              active={active}
              progress={scrollYProgress}
              numberSize="clamp(36px, 11vw, 56px)"
              style={{ position: "relative", width: "min(44vw, 26vh)" }}
            />
          </div>
        </div>

        {/* Only the active step is mounted, keyed so remounting replays the
            fade-in. Deliberately not `AnimatePresence` (`mode="wait"` empties
            the panel between steps, which collapses it and drops the photo)
            and deliberately not all seven stacked in one grid cell (that
            reserves the height of the longest step, leaving dead ground under
            the short ones). The panel is content-sized, so the photograph
            simply takes whatever is left over. */}
        <div className="wf-processm__copy">
          <motion.div
            key={step.no}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="wf-processm__step">Step {step.no}</span>
            <h3 className="wf-processm__heading">{step.title}</h3>
            <div style={{ marginTop: 10 }}>
              <Prose
                text={step.body}
                gap="0.6em"
                style={{
                  fontSize: "clamp(13px, 3.4vw, 15px)",
                  lineHeight: 1.6,
                  color: "rgba(244,239,231,0.82)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile / SSR / reduced-motion: accessible numbered list ──────── */
function ProcessStack({ steps, withMedia = false }: { steps: ProcessStep[]; withMedia?: boolean }) {
  return (
    <section style={{ ...pageBackdrop("d3"), padding: "clamp(56px, 10vw, 88px) 0" }}>
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
              {withMedia && s.image && (
                <div
                  className="wf-processstack__media"
                  // photoLayers, not a `background` shorthand: the shorthand
                  // resets background-size/position, which would beat the
                  // class's `cover` and leave the photo at natural size in the
                  // top-left corner. It also keeps the gradient underneath as
                  // the fallback if the image fails.
                  style={{ backgroundImage: photoLayers(s.image, s.grad) }}
                  aria-hidden
                >
                  <span className="wf-processstack__no">{String(s.no).padStart(2, "0")}</span>
                </div>
              )}
              <span
                style={{
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 12,
                  fontWeight: 700,
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
                  fontSize: "clamp(18px, 2.6vw, 24px)",
                  lineHeight: 1.12,
                  letterSpacing: "0",
                  textTransform: "uppercase",
                  margin: "8px 0 0",
                  color: "var(--wf-ink-900)",
                }}
              >
                {s.title}
              </h3>
              <div style={{ margin: "12px 0 0", maxWidth: 600 }}>
                <Prose text={s.body} style={{ fontSize: 15, lineHeight: 1.65, color: "var(--wf-ink-700)" }} />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
