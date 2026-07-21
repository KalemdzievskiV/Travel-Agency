"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/content/types";

/**
 * FaqAccordion — a list of expand/collapse questions, modelled on the reference
 * FAQ blocks. Selection is local state; one open at a time.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = React.useState<number | null>(null);
  if (items.length === 0) return null;

  return (
    <div>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderTop: "1px solid var(--wf-border)" }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "20px 2px",
                textAlign: "left",
                fontFamily: "var(--wf-font-sans)",
                fontSize: "clamp(15px, 1.8vw, 17px)",
                fontWeight: 700,
                color: "var(--wf-ink-900)",
              }}
            >
              <span>{f.q}</span>
              <ChevronDown
                size={20}
                aria-hidden
                style={{
                  flexShrink: 0,
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform .25s var(--wf-ease-out)",
                  color: "var(--wf-coral-600)",
                }}
              />
            </button>
            <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows .3s var(--wf-ease-out)" }}>
              <div style={{ overflow: "hidden" }}>
                {f.a && (
                  <p style={{ margin: 0, padding: "0 2px 22px", fontSize: 16, lineHeight: 1.65, color: "var(--wf-ink-700)", maxWidth: 720 }}>
                    {f.a}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
