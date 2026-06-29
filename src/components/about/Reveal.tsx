"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Reveal — a calm, single-shot scroll reveal (fade + slight rise) used across
 * the About pages. Slow and quiet per the Wayfare motion rules; fully disabled
 * when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: keyof typeof motion;
  style?: React.CSSProperties;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const M = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as as React.ElementType;
    return (
      <Tag style={style} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
