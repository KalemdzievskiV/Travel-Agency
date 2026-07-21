"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * ParallaxMedia — a tonal-gradient media slot whose contents drift vertically as
 * the frame scrolls through the viewport, giving the editorial parallax depth.
 * The inner layer is oversized so the drift never reveals an edge. Swap the
 * gradient for a real <Image> later. Falls back to a static slot for visitors
 * who prefer reduced motion.
 */
export function ParallaxMedia({
  grad,
  image,
  label = "Your photo",
  ratio = "4 / 3",
  amount = 36,
}: {
  grad: string;
  image?: string;
  label?: string;
  ratio?: string;
  amount?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

  const labelEl = (
    <span
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--wf-font-sans)",
        fontSize: 12,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: "rgba(255,255,255,0.66)",
      }}
    >
      {label}
    </span>
  );

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        aspectRatio: ratio,
        borderRadius: "var(--wf-radius-md)",
        overflow: "hidden",
      }}
    >
      {reduced ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: image ? `url(${image})` : grad,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!image && labelEl}
        </div>
      ) : (
        <motion.div
          style={{
            position: "absolute",
            // Oversize top/bottom so the parallax drift stays within bounds.
            left: 0,
            right: 0,
            top: `-${amount}px`,
            height: `calc(100% + ${amount * 2}px)`,
            backgroundImage: image ? `url(${image})` : grad,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y,
            willChange: "transform",
          }}
        >
          {!image && labelEl}
        </motion.div>
      )}
    </div>
  );
}
