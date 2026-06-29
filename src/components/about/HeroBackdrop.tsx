"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * HeroBackdrop — the full-bleed hero background layer, drifting and easing its
 * scale a touch as the page scrolls (the cinematic settle BT uses on its hero).
 * Oversized so the drift never reveals an edge. Static under reduced motion.
 */
export function HeroBackdrop({ grad, image }: { grad: string; image?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);

  const fill: React.CSSProperties = {
    backgroundImage: image ? `url(${image})` : grad,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div ref={ref} aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {reduced ? (
        <div style={{ position: "absolute", inset: 0, ...fill }} />
      ) : (
        <motion.div
          style={{
            position: "absolute",
            inset: "-8% 0",
            ...fill,
            y,
            scale,
            willChange: "transform",
          }}
        />
      )}
    </div>
  );
}
