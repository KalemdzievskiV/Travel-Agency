import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Icon } from "@/components/ui";
import { SectionHead } from "@/components/sections/SectionHead";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { EnquireButton } from "@/components/site/EnquireButton";
import { getTripWithDestinations } from "@/lib/queries/public";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getTripWithDestinations(slug);
  if (!result) return { title: "Trip not found" };
  return { title: result.trip.title, description: result.trip.summary };
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getTripWithDestinations(slug);
  if (!result) notFound();
  const { trip, destinations } = result;

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: 460,
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          marginTop: "calc(-1 * var(--wf-header-h))",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: trip.image
              ? `url(${trip.image}) center/cover no-repeat`
              : trip.grad || "linear-gradient(135deg,#6b6258,#3a332b 72%)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-bottom)" }} />
        <div
          className="wf-wrap wf-wrap--default"
          style={{ position: "relative", paddingBottom: "clamp(36px, 6vw, 56px)", color: "#fff" }}
        >
          <Eyebrow tone="light">Itinerary</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(36px, 7vw, 62px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              margin: "16px 0 0",
            }}
          >
            {trip.title}
          </h1>
          {trip.summary && (
            <p
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.85)",
                maxWidth: 560,
                margin: "16px 0 0",
                lineHeight: 1.55,
              }}
            >
              {trip.summary}
            </p>
          )}
        </div>
      </section>

      {/* Body + facts */}
      <section style={{ background: "var(--wf-cream)", padding: "clamp(56px, 8vw, 80px) 0" }}>
        <div className="wf-wrap wf-wrap--default wf-split">
          <div>
            <Eyebrow>The journey</Eyebrow>
            <p
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: "var(--wf-ink-900)",
                margin: "16px 0 0",
                fontSize: "clamp(22px, 3.5vw, 28px)",
              }}
            >
              {trip.description || trip.summary}
            </p>

            {trip.itinerary.length > 0 && (
              <div style={{ marginTop: 36 }}>
                <h2
                  style={{
                    fontFamily: "var(--wf-font-sans)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--wf-ink-500)",
                    margin: "0 0 16px",
                  }}
                >
                  The itinerary
                </h2>
                <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
                  {trip.itinerary.map((step, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 16,
                        padding: "14px 0",
                        borderTop: i === 0 ? "none" : "1px solid var(--wf-divider)",
                      }}
                    >
                      <span
                        style={{
                          flex: "none",
                          width: 26,
                          fontFamily: "var(--wf-font-display)",
                          fontSize: 18,
                          color: "var(--wf-coral-600)",
                          lineHeight: 1.4,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: 16, lineHeight: 1.55, color: "var(--wf-ink-700)" }}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {trip.feelings.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h2
                  style={{
                    fontFamily: "var(--wf-font-sans)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--wf-ink-500)",
                    margin: "0 0 14px",
                  }}
                >
                  How you&apos;ll feel
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {trip.feelings.map((f) => (
                    <span
                      key={f}
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--wf-ink-700)",
                        background: "var(--wf-paper)",
                        border: "1px solid var(--wf-border-strong)",
                        borderRadius: "var(--wf-radius-pill)",
                        padding: "7px 16px",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside
            className="wf-split__aside"
            style={{
              background: "var(--wf-paper)",
              border: "1px solid var(--wf-border)",
              borderRadius: "var(--wf-radius-md)",
              padding: "28px 28px 32px",
              boxShadow: "var(--wf-shadow-sm)",
            }}
          >
            <Fact label="From" value={trip.priceFrom || "On enquiry"} />
            <Fact
              label="Duration"
              value={trip.durationDays ? `${trip.durationDays} days` : "Tailor-made"}
            />
            <Fact
              label="Destinations"
              value={String(destinations.length)}
              last={trip.departures.length === 0}
            />
            {trip.departures.length > 0 && (
              <div style={{ padding: "12px 0 0" }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--wf-ink-500)" }}>
                  Departures
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
                  {trip.departures.map((d) => (
                    <li
                      key={d}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 14.5,
                        fontWeight: 600,
                        color: "var(--wf-ink-900)",
                      }}
                    >
                      <Icon name="calendar" size={15} color="var(--wf-coral-600)" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div style={{ marginTop: 24 }}>
              <EnquireButton destination={trip.title} fullWidth size="lg">
                Plan this trip
              </EnquireButton>
            </div>
            <p style={{ fontSize: 13, color: "var(--wf-ink-500)", margin: "14px 0 0", textAlign: "center" }}>
              No planning fees · reply within 24 hours
            </p>
          </aside>
        </div>
      </section>

      {/* Destinations on this trip */}
      {destinations.length > 0 && (
        <section style={{ background: "var(--wf-cream)", padding: "0 0 clamp(64px, 9vw, 104px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <div style={{ marginBottom: 36 }}>
              <SectionHead eyebrow="On this journey" title="Where you'll go" />
            </div>
            <DestinationGrid items={destinations} height={380} />
          </div>
        </section>
      )}

      <section style={{ background: "var(--wf-cream)", padding: "0 0 clamp(64px, 9vw, 104px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <Link
            href="/trips"
            style={{
              textDecoration: "none",
              color: "var(--wf-ink-900)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              borderBottom: "1px solid var(--wf-ink-900)",
              paddingBottom: 4,
            }}
          >
            View all trips
          </Link>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        padding: "12px 0",
        borderBottom: last ? "none" : "1px solid var(--wf-divider)",
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--wf-ink-500)" }}>
        {label}
      </span>
      <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--wf-ink-900)", textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}
