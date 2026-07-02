import React from "react";
import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { CountryGrid } from "@/components/sections/CountryGrid";
import { RegionExperienceFinder } from "@/components/sections/RegionExperienceFinder";
import type { Region } from "@/db/schema";
import type { Destination } from "@/content/types";

/**
 * RegionLanding — the region page (modelled on Black Tomato's region pages):
 * a full-bleed hero, a breadcrumb, a small section nav, an editorial intro with
 * links to the region's countries, and a grid of those countries.
 */
export async function RegionLanding({
  region,
  destinations,
}: {
  region: Region;
  destinations: Destination[];
}) {
  const t = await getTranslations("regionPage");
  const tn = await getTranslations("nav");

  const linkStyle: React.CSSProperties = {
    color: "var(--wf-ink-700)",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  };

  const subLink: React.CSSProperties = {
    textDecoration: "none",
    fontFamily: "var(--wf-font-sans)",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--wf-ink-700)",
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
            background: region.grad ?? "var(--wf-ink-800)",
            backgroundImage: region.image ? `url(${region.image})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(14,42,51,0.45)" }} />
        <div className="wf-wrap wf-wrap--default" style={{ position: "relative", color: "#fff" }}>
          <Eyebrow tone="light">{tn("destinations")}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(38px, 7vw, 68px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              margin: "14px 0 0",
            }}
          >
            {region.label}
          </h1>
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
            {t("overview")}
          </a>
          <a href="#countries" style={subLink}>{t("countries")}</a>
          <Link href="/trip-finder" style={subLink}>{tn("tripFinder")}</Link>
        </nav>
      </div>

      {/* Breadcrumb — below the bar */}
      <div className="wf-wrap wf-wrap--wide" style={{ paddingTop: 16, fontSize: 12.5, color: "var(--wf-ink-500)" }}>
        <Link href="/" style={{ color: "var(--wf-ink-500)", textDecoration: "underline", textUnderlineOffset: "2px" }}>
          {t("home")}
        </Link>
        {" / "}
        <Link href="/destinations" style={{ color: "var(--wf-ink-500)", textDecoration: "underline", textUnderlineOffset: "2px" }}>
          {tn("destinations")}
        </Link>
        {" / "}
        <span style={{ color: "var(--wf-ink-700)" }}>{region.label}</span>
      </div>

      {/* Overview */}
      <section id="overview" style={{ background: "var(--wf-cream)", padding: "clamp(56px, 8vw, 88px) 0", scrollMarginTop: "calc(var(--wf-header-h) + 66px)" }}>
        <div className="wf-wrap" style={{ maxWidth: 760, textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--wf-font-sans)",
              fontWeight: 600,
              fontSize: "clamp(15px, 2vw, 20px)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--wf-ink-900)",
              margin: 0,
            }}
          >
            {t("introHeading", { region: region.label })}
          </h2>
          <p style={{ fontSize: "clamp(16px, 1.9vw, 19px)", lineHeight: 1.7, color: "var(--wf-ink-700)", margin: "clamp(20px, 3vw, 28px) 0 0" }}>
            {t("introBody", { region: region.label })}
          </p>
          {destinations.length > 0 && (
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--wf-ink-700)", margin: "18px 0 0" }}>
              {t("whereWeGo")}:{" "}
              {destinations.map((d, i) => (
                <React.Fragment key={d.slug}>
                  {i > 0 && ", "}
                  <Link href={`/destinations/${d.slug}`} style={linkStyle}>
                    {d.title}
                  </Link>
                </React.Fragment>
              ))}
              .
            </p>
          )}
        </div>
      </section>

      {/* Countries */}
      <section id="countries" style={{ background: "var(--wf-cream)", padding: "0 0 clamp(64px, 9vw, 104px)", scrollMarginTop: "calc(var(--wf-header-h) + 66px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <h2
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(26px, 4vw, 38px)",
              letterSpacing: "-0.02em",
              margin: "0 0 clamp(24px, 4vw, 40px)",
              color: "var(--wf-ink-900)",
            }}
          >
            {t("countries")}
          </h2>
          {destinations.length > 0 ? (
            <CountryGrid items={destinations} initialCount={6} />
          ) : (
            <p style={{ color: "var(--wf-ink-500)" }}>{t("empty")}</p>
          )}
        </div>
      </section>

      {/* Find your experience — region-scoped trip finder */}
      {destinations.length > 0 && (
        <RegionExperienceFinder
          regionLabel={region.label}
          image={region.image}
          grad={region.grad}
        />
      )}
    </>
  );
}
