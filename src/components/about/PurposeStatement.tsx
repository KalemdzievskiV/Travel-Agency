import React from "react";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "./Reveal";
import { ScrollRevealText } from "./ScrollRevealText";

/**
 * PurposeStatement — the deliberate, slow-reveal statement on an ink band the
 * client called out. One large serif line, generous space, no other colour.
 */
export function PurposeStatement({
  eyebrow,
  statement,
  body,
}: {
  eyebrow: string;
  statement: string;
  body?: string;
}) {
  return (
    <section
      style={{
        background: "var(--wf-ink-900)",
        color: "var(--wf-text-on-dark)",
        padding: "clamp(72px, 12vw, 140px) 0",
      }}
    >
      <div
        className="wf-wrap wf-wrap--default"
        style={{ textAlign: "center" }}
      >
        <Reveal>
          <Eyebrow tone="light" style={{ textAlign: "center" }}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <ScrollRevealText
          text={statement}
          style={{
            fontFamily: "var(--wf-font-display)",
            fontWeight: 500,
            fontSize: "clamp(30px, 5.2vw, 58px)",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            margin: "22px auto 0",
            maxWidth: 900,
          }}
        />
        {body && (
          <Reveal delay={0.2}>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: "rgba(244,239,231,0.78)",
                margin: "26px auto 0",
                maxWidth: 600,
              }}
            >
              {body}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
