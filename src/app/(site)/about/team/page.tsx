import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";
import { AboutHero, MediaPlaceholder, Reveal } from "@/components/about";

export const metadata: Metadata = {
  title: "Our team",
  description:
    "The travel designers behind bookit — wanderers and planners who know the ground across North Macedonia and the Balkans.",
};

// Placeholder team — names/photos/bios to be supplied by the client.
const team = [
  { name: "Your planner", role: "Founder & travel designer", grad: "linear-gradient(135deg,#3f6f7a,#1d3c45)" },
  { name: "Your planner", role: "Balkans specialist", grad: "linear-gradient(135deg,#5a6b86,#2a3550)" },
  { name: "Your planner", role: "Experience designer", grad: "linear-gradient(135deg,#7a6a52,#2c2418)" },
  { name: "Your planner", role: "On-the-ground concierge", grad: "linear-gradient(135deg,#4f6f57,#1d2c20)" },
];

export default function TeamPage() {
  return (
    <>
      <AboutHero
        eyebrow="Who we are"
        title="The people who plan your journey"
        intro="A small studio of wanderers and planners. Final names, photos and stories will live here soon."
        grad="linear-gradient(135deg,#5a6b86,#16130f)"
      />

      <section style={{ background: "var(--wf-cream)", padding: "clamp(64px, 9vw, 112px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div className="wf-grid wf-grid-4">
            {team.map((m, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <MediaPlaceholder grad={m.grad} ratio="4 / 5" />
                <h3
                  style={{
                    fontFamily: "var(--wf-font-display)",
                    fontWeight: 500,
                    fontSize: 20,
                    margin: "14px 0 0",
                    color: "var(--wf-ink-900)",
                  }}
                >
                  {m.name}
                </h3>
                <Eyebrow as="p" tone="ink" style={{ marginTop: 6 }}>
                  {m.role}
                </Eyebrow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
