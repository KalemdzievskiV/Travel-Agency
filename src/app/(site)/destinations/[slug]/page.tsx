import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Icon } from "@/components/ui";
import { SectionHead } from "@/components/sections/SectionHead";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { EnquireButton } from "@/components/site/EnquireButton";
import { getDestinationBySlug, getDestinations } from "@/lib/queries/public";

export async function generateMetadata(
  props: PageProps<"/destinations/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const d = await getDestinationBySlug(slug);
  if (!d) return { title: "Destination not found" };
  return {
    title: d.title,
    description: d.teaser,
  };
}

export default async function DestinationPage(
  props: PageProps<"/destinations/[slug]">,
) {
  const { slug } = await props.params;
  const d = await getDestinationBySlug(slug);
  if (!d) notFound();

  const more = (await getDestinations())
    .filter((x) => x.slug !== d.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: 520,
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
            background: d.image ? `url(${d.image}) center/cover no-repeat` : d.grad,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-bottom)" }} />
        <div
          className="wf-wrap wf-wrap--default"
          style={{
            position: "relative",
            paddingBottom: "clamp(36px, 6vw, 56px)",
            color: "#fff",
          }}
        >
          <Eyebrow tone="light">{d.region}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(38px, 8vw, 68px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              margin: "16px 0 0",
            }}
          >
            {d.title}
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 560,
              margin: "16px 0 0",
              lineHeight: 1.55,
            }}
          >
            {d.teaser}
          </p>
        </div>
      </section>

      {/* Body + facts sidebar */}
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
                margin: "16px 0 32px",
                fontSize: "clamp(22px, 3.5vw, 28px)",
              }}
            >
              {d.intro}
            </p>

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
              Highlights
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {d.highlights.map((h) => (
                <li key={h} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ marginTop: 2, color: "var(--wf-coral-500)" }}>
                    <Icon name="star" size={16} color="var(--wf-coral-500)" />
                  </span>
                  <span style={{ fontSize: 16.5, lineHeight: 1.55, color: "var(--wf-ink-700)" }}>
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Facts card */}
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
            <Fact label="From" value={d.priceFrom} />
            <Fact label="Duration" value={d.duration} />
            <Fact label="Best months" value={d.bestMonths.join(", ")} />
            <Fact label="Feelings" value={d.feelings.join(", ")} />
            <Fact label="Rating" value={`${d.rating} / 5`} last />
            <div style={{ marginTop: 24 }}>
              <EnquireButton destination={d.title} fullWidth size="lg">
                Plan this trip
              </EnquireButton>
            </div>
            <p style={{ fontSize: 13, color: "var(--wf-ink-500)", margin: "14px 0 0", textAlign: "center" }}>
              No planning fees · reply within 24 hours
            </p>
          </aside>
        </div>
      </section>

      {/* More destinations */}
      <section style={{ background: "var(--wf-cream)", padding: "0 0 clamp(64px, 9vw, 104px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div style={{ marginBottom: 36 }}>
            <SectionHead eyebrow="Keep exploring" title="More journeys to feel" />
          </div>
          <DestinationGrid items={more} height={380} />
          <div style={{ marginTop: 40 }}>
            <Link href="/destinations" style={{ textDecoration: "none", color: "var(--wf-ink-900)", fontSize: 13, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", borderBottom: "1px solid var(--wf-ink-900)", paddingBottom: 4 }}>
              View all destinations
            </Link>
          </div>
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
