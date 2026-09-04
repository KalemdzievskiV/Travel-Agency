"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/**
 * ScrollRevealText — the cinematic statement reveal: each word lifts from faint
 * to full as the line scrolls through the viewport (scroll-scrubbed, not a
 * one-shot fade). Calm and slow, per the Wayfare motion rules; renders as plain
 * text for visitors who prefer reduced motion.
 */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  // Keep a real trailing space so the sentence stays one readable text run for
  // screen readers and copy-paste; inline flow handles wrapping + centring.
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

export function ScrollRevealText({
  text,
  style,
  progress,
  range = [0, 1],
}: {
  text: string;
  style?: React.CSSProperties;
  /**
   * Drive the reveal from an outer scroll progress instead of this paragraph's
   * own position in the viewport. A pinned stage needs this: while the stage is
   * stuck to the top of the screen the paragraph does not move through the
   * viewport at all, so its own `useScroll` freezes mid-way and the words never
   * finish filling. Pass the pinned track's progress and the reveal scrubs with
   * the scroll that actually happens.
   */
  progress?: MotionValue<number>;
  /** Which slice of that outer progress the reveal runs across. */
  range?: [number, number];
}) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  // Both are computed every render — hooks can't be conditional — and the
  // remapped outer progress simply wins when one is supplied. useTransform
  // clamps to the output range by default, so the words hold at full opacity
  // once `range` is passed rather than over-running.
  const outer = useTransform(progress ?? scrollYProgress, range, [0, 1]);
  const driver = progress ? outer : scrollYProgress;
  const words = text.split(" ");

  if (reduced) {
    return <p style={style}>{text}</p>;
  }

  return (
    <p ref={ref} style={{ ...style, textAlign: "center" }}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={driver} range={[start, end]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}
