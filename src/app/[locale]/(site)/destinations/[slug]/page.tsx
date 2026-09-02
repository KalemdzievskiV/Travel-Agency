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
import { backdrop, pageBackdrop, plainBand } from "@/content/media";
import { PageTabs } from "@/components/sections/PageTabs";

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

  const [trips, all, hotels, td, tn, tr, tc] = await Promise.all([
    getTripsForDestination(slug),
    getDestinations(),
    getHotelsForDestination(slug),
    getTranslations("destinationPage"),
    getTranslations("nav"),
    getTranslations("regionPage"),
    getTranslations("common"),
  ]);
  const more = all.filter((x) => x.slug !== d.slug).slice(0, 3);

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
              fontWeight: 400,
              fontSize: "clamp(38px, 8vw, 68px)",
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
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
      <PageTabs
        label={d.title}
        tabs={[
          { label: td("overview"), href: "#overview", active: true },
          ...(trips.length > 0 ? [{ label: td("programs"), href: "#trips" }] : []),
          ...(hotels.length > 0 ? [{ label: td("hotels"), href: "#stays" }] : []),
        ]}
      />

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

      {/* Overview — guide body + sidebar. Plain white from 3.2: on a country
          page the only backdrop is the one under Општи напомени, below. */}
      <section id="overview" style={{ ...plainBand, padding: "clamp(16px, 2.4vw, 28px) 0 clamp(48px, 7vw, 72px)", scrollMarginTop: "calc(var(--wf-header-h) + 66px)" }}>
        <div className="wf-wrap" style={{ maxWidth: 980, marginInline: "auto", textAlign: "center" }}>
          <Eyebrow>{td("thePlace")}</Eyebrow>
          {/* Same caption treatment as the region intro body: small and italic
              so it reads as a lede, not a heading. */}
          <p
            style={{
              fontFamily: "var(--wf-font-sans)",
              fontStyle: "italic",
              fontSize: "clamp(14.5px, 1.5vw, 16px)",
              lineHeight: 1.75,
              color: "var(--wf-ink-700)",
              maxWidth: 920,
              margin: "clamp(16px, 2.4vw, 22px) auto 0",
              // Honour line breaks typed into the admin textarea.
              whiteSpace: "pre-line",
            }}
          >
            {d.intro}
          </p>

          <div style={{ marginTop: 44, display: "flex", justifyContent: "center" }}>
            <EnquireButton destination={d.title} size="lg">
              {tc("planMyTrip")}
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
            backgroundImage={backdrop.dark}
          />
        </div>
      )}

      {/* Where to stay (ХОТЕЛИ) */}
      {hotels.length > 0 && (
        <section id="stays" style={{ ...plainBand, padding: "clamp(48px, 7vw, 72px) 0 0", scrollMarginTop: "calc(var(--wf-header-h) + 66px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <div style={{ marginBottom: 36 }}>
              <SectionHead eyebrow={td("stays")} title={td("whereToStay")} />
            </div>
            <HotelGrid items={hotels} scrollOnMobile />
          </div>
        </section>
      )}

      {/* General notes (ОПШТИ НАПОМЕНИ) — the country page's one backdrop:
          "кога ќе влеземе во земји позадина само кај општи напомени (Д4).
          Ова важи за сите земји." */}
      {d.generalNotes.length > 0 && (
        <section style={{ ...pageBackdrop("d4"), padding: "clamp(56px, 8vw, 88px) 0 0" }}>
          <div className="wf-wrap" style={{ maxWidth: 820, marginInline: "auto" }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(24px, 4vw, 36px)" }}>
              <SectionHead eyebrow={td("keepExploring")} title={td("generalNotes")} align="center" />
            </div>
            <FaqAccordion items={d.generalNotes} />
          </div>
        </section>
      )}

      {/* More places */}
      <section style={{ ...plainBand, padding: "clamp(56px, 8vw, 88px) 0 clamp(64px, 9vw, 104px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div style={{ marginBottom: 36 }}>
            <SectionHead eyebrow={td("keepExploring")} title={td("morePlaces")} />
          </div>
          <DestinationGrid items={more} scrollOnMobile />
          <div style={{ marginTop: 40 }}>
            <Link href="/destinations" style={{ textDecoration: "none", color: "var(--wf-ink-900)", fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", borderBottom: "1px solid var(--wf-ink-900)", paddingBottom: 4 }}>
              {td("viewAll")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

