import type { Metadata } from "next";
import { Button } from "@/components/ui";
import { AboutHero, MediaPlaceholder, Reveal } from "@/components/about";
import { regenerative } from "@/content/about";

export const metadata: Metadata = {
  title: "Regenerative travel",
  description:
    "How bookit is building journeys that give more than they take — for the communities and landscapes that make them possible.",
};

export default function RegenerativeTravelPage() {
  return (
    <>
      <AboutHero
        eyebrow={regenerative.eyebrow}
        title={regenerative.title}
        intro={regenerative.intro}
        grad={regenerative.grad}
      />

      <section style={{ background: "var(--wf-cream)", padding: "clamp(64px, 9vw, 112px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <Reveal className="wf-about-row">
            <div className="wf-about-row__media">
              <MediaPlaceholder grad="linear-gradient(135deg,#4f6f57,#1d2c20)" />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--wf-font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(24px, 3.4vw, 34px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "var(--wf-ink-900)",
                  margin: 0,
                }}
              >
                A fuller account of our commitments is on its way.
              </p>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: "var(--wf-ink-700)",
                  margin: "16px 0 0",
                  maxWidth: 520,
                }}
              >
                In the meantime, we&rsquo;d be glad to talk through how we work
                with local hosts, guides and communities on every journey.
              </p>
              <div style={{ marginTop: 24 }}>
                <Button variant="outline" size="md" as="a" href="/trip-finder">
                  Plan a journey with us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
