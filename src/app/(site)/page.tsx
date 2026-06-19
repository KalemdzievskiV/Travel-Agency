import Link from "next/link";
import { Button, Eyebrow, Icon } from "@/components/ui";
import { SectionHead } from "@/components/sections/SectionHead";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { HomeHero } from "@/components/home/HomeHero";
import { Testimonials } from "@/components/home/Testimonials";
import {
  getDestinations,
  getExperiences,
  getTestimonials,
} from "@/lib/queries/public";
import { press, whyPoints } from "@/content/site";

export default async function HomePage() {
  const [destinations, experiences, testimonials] = await Promise.all([
    getDestinations(),
    getExperiences(),
    getTestimonials(),
  ]);

  return (
    <>
      <HomeHero />

      {/* Feeling intro */}
      <section
        id="about"
        style={{
          background: "var(--wf-cream)",
          padding: "clamp(64px, 9vw, 104px) 0",
          scrollMarginTop: "var(--wf-header-h)",
        }}
      >
        <div className="wf-wrap" style={{ maxWidth: 760, textAlign: "center" }}>
          <Eyebrow>The Pursuit of Feeling</Eyebrow>
          <p
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(24px, 4.5vw, 34px)",
              lineHeight: 1.28,
              letterSpacing: "-0.01em",
              color: "var(--wf-ink-900)",
              margin: "22px 0 0",
            }}
          >
            The world is vast and full of wonder — yet the more choice there is,
            the more overwhelmed we feel. So we ask a different question first:
            not <em>where</em> do you want to go, but <em>how</em> do you want to
            feel?
          </p>
          <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
            <Button as="a" href="/trip-finder" variant="outline" size="md">
              Find your feeling
            </Button>
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section
        style={{ background: "var(--wf-cream)", padding: "0 0 clamp(64px, 9vw, 104px)" }}
      >
        <div className="wf-wrap wf-wrap--wide">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 36,
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <SectionHead
              eyebrow="Most popular"
              title="Where our travellers are going"
            />
            <Link href="/destinations" style={{ textDecoration: "none" }}>
              <Button variant="link">View all destinations</Button>
            </Link>
          </div>
          <DestinationGrid items={destinations.slice(0, 6)} />
        </div>
      </section>

      {/* Experiences — dark editorial band */}
      <section
        id="experiences"
        style={{
          background: "var(--wf-ink-900)",
          padding: "clamp(64px, 9vw, 104px) 0",
          scrollMarginTop: "var(--wf-header-h)",
        }}
      >
        <div className="wf-wrap wf-wrap--wide">
          <SectionHead
            eyebrow="Remarkable experiences"
            title="Journeys you won't find anywhere else"
            tone="light"
            intro="Each one designed to move you — crafted with experts, guides and storytellers on the ground."
          />
          <div className="wf-grid wf-grid-3" style={{ marginTop: 44 }}>
            {experiences.map((e) => (
              <article
                key={e.slug}
                style={{
                  borderRadius: "var(--wf-radius-md)",
                  overflow: "hidden",
                  background: "var(--wf-ink-800)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: 260,
                    background: e.image
                      ? `url(${e.image}) center/cover no-repeat`
                      : e.grad,
                  }}
                >
                  {!e.image && (
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 14,
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      Your photo
                    </span>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "var(--wf-overlay-full)",
                    }}
                  />
                </div>
                <div style={{ padding: "26px 26px 30px" }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--wf-coral-400)",
                      marginBottom: 12,
                    }}
                  >
                    {e.eyebrow}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--wf-font-display)",
                      fontWeight: 500,
                      fontSize: 26,
                      color: "#fff",
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    {e.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "rgba(244,239,231,0.7)",
                      margin: "12px 0 20px",
                    }}
                  >
                    {e.body}
                  </p>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#fff",
                      borderBottom: "1px solid rgba(255,255,255,0.4)",
                      paddingBottom: 4,
                    }}
                  >
                    Discover <Icon name="arrow" size={15} color="#fff" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} />

      {/* Press + why */}
      <section
        style={{ background: "var(--wf-cream)", padding: "clamp(56px, 8vw, 80px) 0 clamp(64px, 9vw, 104px)" }}
      >
        <div className="wf-wrap wf-wrap--default">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "28px 56px",
              alignItems: "center",
              paddingBottom: 64,
              borderBottom: "1px solid var(--wf-border)",
            }}
          >
            {press.map((p) => (
              <span
                key={p}
                style={{
                  fontFamily: "var(--wf-font-display)",
                  fontSize: 21,
                  letterSpacing: "0.04em",
                  color: "var(--wf-ink-400)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
          <div className="wf-grid wf-grid-4" style={{ marginTop: 56 }}>
            {whyPoints.map((w) => (
              <div key={w.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    border: "1px solid var(--wf-border-strong)",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Icon name={w.icon} size={24} color="var(--wf-coral-600)" strokeWidth={1.4} />
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 600, color: "var(--wf-ink-900)" }}>
                  {w.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
