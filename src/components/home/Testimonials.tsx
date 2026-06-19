"use client";

import React from "react";
import { Eyebrow } from "@/components/ui";
import type { Testimonial } from "@/content/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = React.useState(0);
  const testimonials = items;
  if (testimonials.length === 0) return null;
  const t = testimonials[i % testimonials.length];
  return (
    <section style={{ background: "var(--wf-sand)", padding: "clamp(64px, 9vw, 100px) 0" }}>
      <div className="wf-wrap" style={{ maxWidth: 880, textAlign: "center" }}>
        <Eyebrow>Why travellers choose us</Eyebrow>
        <blockquote
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 500,
            fontSize: "clamp(26px, 5vw, 38px)",
            lineHeight: 1.18,
            letterSpacing: "-0.01em",
            color: "var(--wf-ink-900)",
            margin: "24px 0 0",
          }}
        >
          “{t.quote}”
        </blockquote>
        <div
          style={{
            marginTop: 24,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "var(--wf-ink-700)",
          }}
        >
          {t.who} · <span style={{ color: "var(--wf-coral-600)" }}>{t.where}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 9,
            marginTop: 30,
          }}
        >
          {testimonials.map((_, n) => (
            <button
              key={n}
              aria-label={`Testimonial ${n + 1}`}
              onClick={() => setI(n)}
              style={{
                width: n === i ? 28 : 9,
                height: 9,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: n === i ? "var(--wf-ink-900)" : "var(--wf-ink-300)",
                transition: "all .3s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
