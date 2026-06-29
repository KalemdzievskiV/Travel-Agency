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
}: {
  text: string;
  style?: React.CSSProperties;
}) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
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
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}
