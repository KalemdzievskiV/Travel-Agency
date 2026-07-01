import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Icon } from "@/components/ui";
import { SectionHead } from "@/components/sections/SectionHead";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { TripGrid } from "@/components/sections/TripGrid";
import { EnquireButton } from "@/components/site/EnquireButton";
import { RegionLanding } from "@/components/sections/RegionLanding";
import {
  getDestinationBySlug,
  getDestinations,
  getTripsForDestination,
} from "@/lib/queries/public";
import { getRegionBySlug } from "@/lib/queries/regions";

export async function generateMetadata(
  props: PageProps<"/[locale]/destinations/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const region = await getRegionBySlug(slug);
  if (region) return { title: region.label };
  const d = await getDestinationBySlug(slug);
  if (!d) return { title: "Destination not found" };
  return { title: d.title, description: d.teaser };
}

export default async function DestinationPage(
  props: PageProps<"/[locale]/destinations/[slug]">,
) {
  const { slug } = await props.params;

  // A region slug (e.g. /destinations/africa) renders the region landing page.
  const region = await getRegionBySlug(slug);
  if (region) {
    const all = await getDestinations();
    const items = all.filter((x) => x.region === region.label);
    return <RegionLanding region={region} destinations={items} />;
  }

  const d = await getDestinationBySlug(slug);
  if (!d) notFound();

  const [trips, all] = await Promise.all([
    getTripsForDestination(slug),
    getDestinations(),
  ]);
  const more = all.filter((x) => x.slug !== d.slug).slice(0, 3);

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
          style={{ position: "relative", paddingBottom: "clamp(36px, 6vw, 56px)", color: "#fff" }}
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
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", maxWidth: 560, margin: "16px 0 0", lineHeight: 1.55 }}>
            {d.teaser}
          </p>
        </div>
      </section>

      {/* Guide body + sidebar */}
      <section style={{ background: "var(--wf-cream)", padding: "clamp(56px, 8vw, 80px) 0" }}>
        <div className="wf-wrap wf-wrap--default wf-split">
          <div>
            <Eyebrow>The place</Eyebrow>
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
              {d.intro}
            </p>

            {/* When to go */}
            {(d.whenToGo || d.bestMonths.length > 0) && (
              <div style={{ marginTop: 36 }}>
                <SubHead>When to go</SubHead>
                {d.whenToGo && (
                  <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "var(--wf-ink-700)", margin: "0 0 14px" }}>
                    {d.whenToGo}
                  </p>
                )}
                <Chips items={d.bestMonths} />
              </div>
            )}

            {/* What it feels like */}
            {d.feelings.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <SubHead>What it feels like</SubHead>
                <Chips items={d.feelings} />
              </div>
            )}

            {/* Don't miss */}
            {d.highlights.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <SubHead>Don&apos;t miss</SubHead>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {d.highlights.map((h) => (
                    <li key={h} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ marginTop: 2 }}>
                        <Icon name="star" size={16} color="var(--wf-coral-500)" />
                      </span>
                      <span style={{ fontSize: 16.5, lineHeight: 1.55, color: "var(--wf-ink-700)" }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
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
            <Fact label="Region" value={d.region} />
            {d.bestMonths.length > 0 && (
              <Fact label="Best season" value={d.bestMonths.join(", ")} />
            )}
            <Fact label="Style" value={d.badge || "Tailor-made"} last />
            <div style={{ marginTop: 24 }}>
              <EnquireButton destination={d.title} fullWidth size="lg">
                Plan a trip here
              </EnquireButton>
            </div>
            <p style={{ fontSize: 13, color: "var(--wf-ink-500)", margin: "14px 0 0", textAlign: "center" }}>
              No planning fees · reply within 24 hours
            </p>
          </aside>
        </div>
      </section>

      {/* Trips that visit here (guide → product) */}
      {trips.length > 0 && (
        <section style={{ background: "var(--wf-cream)", padding: "0 0 clamp(64px, 9vw, 104px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <div style={{ marginBottom: 36 }}>
              <SectionHead eyebrow="Ready to book" title={`Trips that visit ${d.title}`} />
            </div>
            <TripGrid items={trips} height={380} />
          </div>
        </section>
      )}

      {/* More places */}
      <section style={{ background: "var(--wf-cream)", padding: "0 0 clamp(64px, 9vw, 104px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div style={{ marginBottom: 36 }}>
            <SectionHead eyebrow="Keep exploring" title="More places" />
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

function SubHead({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </h2>
  );
}

function Chips({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {items.map((i) => (
        <span
          key={i}
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
          {i}
        </span>
      ))}
    </div>
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
