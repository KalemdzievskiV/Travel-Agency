import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "@/components/sections/SectionHead";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { TripsCarousel } from "@/components/sections/TripsCarousel";
import { HotelGrid } from "@/components/sections/HotelGrid";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { EnquireButton } from "@/components/site/EnquireButton";
import { RegionLanding } from "@/components/sections/RegionLanding";
import {
  getDestinationBySlug,
  getDestinations,
  getTripsForDestination,
} from "@/lib/queries/public";
import { getRegionBySlug } from "@/lib/queries/regions";
import { getHotelsForDestination } from "@/lib/queries/hotels";

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
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  // A region slug (e.g. /destinations/africa) renders the region landing page.
  const region = await getRegionBySlug(slug);
  if (region) {
    const all = await getDestinations();
    const items = all.filter((x) => x.regionSlug === region.slug);
    return <RegionLanding region={region} destinations={items} />;
  }

  const d = await getDestinationBySlug(slug);
  if (!d) notFound();

  const [trips, all, hotels, td, tn, tr] = await Promise.all([
    getTripsForDestination(slug),
    getDestinations(),
    getHotelsForDestination(slug),
    getTranslations("destinationPage"),
    getTranslations("nav"),
    getTranslations("regionPage"),
  ]);
  const more = all.filter((x) => x.slug !== d.slug).slice(0, 3);

  const subLink: React.CSSProperties = {
    textDecoration: "none",
    fontFamily: "var(--wf-font-sans)",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--wf-ink-700)",
  };
  const crumbLink: React.CSSProperties = {
    color: "var(--wf-ink-500)",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "clamp(360px, 56vh, 560px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginTop: "calc(-1 * var(--wf-header-h))",
          textAlign: "center",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: d.image ? `url(${d.image}) center/cover no-repeat` : d.grad,
          }}
        />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(14,42,51,0.45)" }} />
        <div className="wf-wrap wf-wrap--default" style={{ position: "relative", color: "#fff" }}>
          <Eyebrow tone="light">{d.region}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(38px, 8vw, 68px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              margin: "14px 0 0",
            }}
          >
            {d.title}
          </h1>
          {d.teaser && (
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", maxWidth: 560, margin: "16px auto 0", lineHeight: 1.55 }}>
              {d.teaser}
            </p>
          )}
        </div>
      </section>

      {/* Section nav (centred), sticky under the header */}
      <div
        style={{
          position: "sticky",
          top: "var(--wf-header-h)",
          zIndex: 40,
          background: "var(--wf-cream)",
          borderBottom: "1px solid var(--wf-border)",
        }}
      >
        <nav
          className="wf-wrap wf-wrap--wide"
          style={{ display: "flex", justifyContent: "center", gap: "clamp(20px, 4vw, 44px)", flexWrap: "wrap", paddingBlock: 18 }}
        >
          <a href="#overview" style={{ ...subLink, color: "var(--wf-coral-500)", borderBottom: "2px solid var(--wf-coral-500)", paddingBottom: 4 }}>
            {td("overview")}
          </a>
          {trips.length > 0 && <a href="#trips" style={subLink}>{td("programs")}</a>}
          {hotels.length > 0 && <a href="#stays" style={subLink}>{td("hotels")}</a>}
        </nav>
      </div>

      {/* Breadcrumb */}
      <div className="wf-wrap wf-wrap--wide" style={{ paddingTop: 16, fontSize: 12.5, color: "var(--wf-ink-500)" }}>
        <Link href="/" style={crumbLink}>{tr("home")}</Link>
        {" / "}
        <Link href="/destinations" style={crumbLink}>{tn("destinations")}</Link>
        {" / "}
        {d.regionSlug ? (
          <>
            <Link href={`/destinations/${d.regionSlug}`} style={crumbLink}>{d.region}</Link>
            {" / "}
          </>
        ) : null}
        <span style={{ color: "var(--wf-ink-700)" }}>{d.title}</span>
      </div>

      {/* Overview — guide body + sidebar */}
      <section id="overview" style={{ background: "var(--wf-cream)", padding: "clamp(40px, 6vw, 72px) 0 clamp(56px, 8vw, 80px)", scrollMarginTop: "calc(var(--wf-header-h) + 66px)" }}>
        <div className="wf-wrap" style={{ maxWidth: 760, marginInline: "auto", textAlign: "center" }}>
          <Eyebrow>{td("thePlace")}</Eyebrow>
          <p
            style={{
              fontFamily: "var(--wf-font-sans)",
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: "-0.005em",
              color: "var(--wf-ink-900)",
              margin: "16px 0 0",
              fontSize: "clamp(24px, 3.8vw, 32px)",
            }}
          >
            {d.intro}
          </p>

          <div style={{ marginTop: 44, display: "flex", justifyContent: "center" }}>
            <EnquireButton destination={d.title} size="lg">
              {td("planTripHere")}
            </EnquireButton>
          </div>
          <p style={{ fontSize: 13, color: "var(--wf-ink-500)", margin: "14px 0 0" }}>
            {td("reassure")}
          </p>
        </div>
      </section>

      {/* Example trips (guide → product) */}
      {trips.length > 0 && (
        <div id="trips" style={{ scrollMarginTop: "calc(var(--wf-header-h) + 66px)" }}>
          <TripsCarousel
            trips={trips}
            eyebrow={td("tripsEyebrow")}
            title={td("tripsTitle", { title: d.title })}
            description={td("tripsIntro")}
          />
        </div>
      )}

      {/* Where to stay (ХОТЕЛИ) */}
      {hotels.length > 0 && (
        <section id="stays" style={{ background: "var(--wf-cream)", padding: "clamp(48px, 7vw, 72px) 0 0", scrollMarginTop: "calc(var(--wf-header-h) + 66px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <div style={{ marginBottom: 36 }}>
              <SectionHead eyebrow={td("stays")} title={td("whereToStay")} />
            </div>
            <HotelGrid items={hotels} />
          </div>
        </section>
      )}

      {/* General notes (ОПШТИ НАПОМЕНИ) */}
      {d.generalNotes.length > 0 && (
        <section style={{ background: "var(--wf-cream)", padding: "clamp(56px, 8vw, 88px) 0 0" }}>
          <div className="wf-wrap" style={{ maxWidth: 820, marginInline: "auto" }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(24px, 4vw, 36px)" }}>
              <SectionHead eyebrow={td("keepExploring")} title={td("generalNotes")} />
            </div>
            <FaqAccordion items={d.generalNotes} />
          </div>
        </section>
      )}

      {/* More places */}
      <section style={{ background: "var(--wf-cream)", padding: "clamp(56px, 8vw, 88px) 0 clamp(64px, 9vw, 104px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div style={{ marginBottom: 36 }}>
            <SectionHead eyebrow={td("keepExploring")} title={td("morePlaces")} />
          </div>
          <DestinationGrid items={more} height={380} />
          <div style={{ marginTop: 40 }}>
            <Link href="/destinations" style={{ textDecoration: "none", color: "var(--wf-ink-900)", fontSize: 13, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", borderBottom: "1px solid var(--wf-ink-900)", paddingBottom: 4 }}>
              {td("viewAll")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

