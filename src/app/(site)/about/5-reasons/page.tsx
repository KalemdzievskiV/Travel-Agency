import type { Metadata } from "next";
import { Button } from "@/components/ui";
import { ReasonsScroller } from "@/components/about";
import { reasons } from "@/content/about";

export const metadata: Metadata = {
  title: "5 reasons to book with us",
  description:
    "Why travellers plan with bookit: remarkable people, journeys you can't buy off a shelf, brilliant partners on the ground, and care from first idea to home.",
};

export default function FiveReasonsPage() {
  return (
    <>
      <ReasonsScroller reasons={reasons} />

      <section style={{ background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)", padding: "clamp(64px, 9vw, 96px) 0" }}>
        <div className="wf-wrap wf-wrap--default" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(28px, 4.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Ready when you are
          </h2>
          <div style={{ marginTop: 28 }}>
            <Button variant="primary" size="lg" as="a" href="/trip-finder">
              Start your journey
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
