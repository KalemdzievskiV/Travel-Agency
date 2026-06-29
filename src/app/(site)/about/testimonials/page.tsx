import type { Metadata } from "next";
import { AboutHero, Reveal } from "@/components/about";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Client testimonials",
  description:
    "In their own words — what travellers say about the journeys bookit has planned for them.",
};

export default function TestimonialsPage() {
  return (
    <>
      <AboutHero
        eyebrow="Who we are"
        title="In their own words"
        intro="The trips we are proudest of are the ones our travellers can't stop talking about."
        grad="linear-gradient(135deg,#4f6f57,#16130f)"
      />

      <section style={{ background: "var(--wf-cream)", padding: "clamp(64px, 9vw, 112px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div className="wf-grid wf-grid-3">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <figure
                  style={{
                    margin: 0,
                    background: "var(--wf-cream-2)",
                    border: "1px solid var(--wf-border)",
                    borderRadius: "var(--wf-radius-md)",
                    padding: "clamp(24px, 3vw, 32px)",
                    height: "100%",
                  }}
                >
                  <blockquote
                    style={{
                      margin: 0,
                      fontFamily: "var(--wf-font-display)",
                      fontWeight: 500,
                      fontSize: "clamp(20px, 2.4vw, 24px)",
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                      color: "var(--wf-ink-900)",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption
                    style={{
                      marginTop: 20,
                      fontFamily: "var(--wf-font-sans)",
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: "var(--wf-ink-500)",
                    }}
                  >
                    {t.who} · {t.where}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
