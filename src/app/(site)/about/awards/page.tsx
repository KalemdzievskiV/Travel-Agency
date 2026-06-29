import type { Metadata } from "next";
import { AboutHero, Reveal } from "@/components/about";

export const metadata: Metadata = {
  title: "Our awards",
  description:
    "Recognition for the journeys we design. Final awards and accreditations to be confirmed with the client.",
};

// Placeholder accolades — replace with real awards/years.
const awards = [
  { year: "Award", title: "Recognition to be confirmed" },
  { year: "Award", title: "Recognition to be confirmed" },
  { year: "Award", title: "Recognition to be confirmed" },
  { year: "Award", title: "Recognition to be confirmed" },
];

export default function AwardsPage() {
  return (
    <>
      <AboutHero
        eyebrow="Who we are"
        title="A little recognition along the way"
        intro="The awards and accreditations we're proud of will be listed here."
        grad="linear-gradient(135deg,#7a6a52,#16130f)"
      />

      <section style={{ background: "var(--wf-cream)", padding: "clamp(64px, 9vw, 112px) 0" }}>
        <div className="wf-wrap wf-wrap--default">
          {awards.map((a, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div
                style={{
                  display: "flex",
                  gap: "clamp(20px, 5vw, 48px)",
                  alignItems: "baseline",
                  padding: "clamp(20px, 3vw, 28px) 0",
                  borderBottom: "1px solid var(--wf-border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--wf-font-sans)",
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "var(--wf-coral-500)",
                    minWidth: 96,
                  }}
                >
                  {a.year}
                </span>
                <span
                  style={{
                    fontFamily: "var(--wf-font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(20px, 3vw, 28px)",
                    letterSpacing: "-0.01em",
                    color: "var(--wf-ink-900)",
                  }}
                >
                  {a.title}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
