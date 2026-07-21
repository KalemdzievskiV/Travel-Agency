import React from "react";

/**
 * TrustBadges — a quiet row of credibility marks (placeholder wordmarks for now;
 * swap for real partner/accreditation logos later). Hairline-bordered, no accent.
 */
export function TrustBadges({
  label = "Trusted by travellers and partners across the Balkans",
  marks = ["IATA", "VIRTUOSO", "ABTA", "ATTA"],
}: {
  label?: string;
  marks?: string[];
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontFamily: "var(--wf-font-sans)",
          fontSize: 12,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "var(--wf-ink-500)",
          margin: "0 0 24px",
        }}
      >
        {label}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(20px, 5vw, 56px)",
        }}
      >
        {marks.map((m) => (
          <span
            key={m}
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(18px, 2.4vw, 24px)",
              letterSpacing: "0.04em",
              color: "var(--wf-ink-400)",
            }}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
