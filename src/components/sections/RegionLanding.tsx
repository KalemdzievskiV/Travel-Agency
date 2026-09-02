import React from "react";
import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { CountryGrid } from "@/components/sections/CountryGrid";
import { pageBackdrop, plainBand } from "@/content/media";
import { PageTabs } from "./PageTabs";
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
              fontWeight: 400,
              fontSize: "clamp(38px, 7vw, 68px)",
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
              margin: "14px 0 0",
            }}
          >
            {region.label}
          </h1>
        </div>
      </section>

      {/* Section nav (centred), sticky under the header */}
      <PageTabs
        label={region.label}
        tabs={[
          { label: t("overview"), href: "#overview", active: true },
          { label: t("countries"), href: "#countries" },
          { label: tn("tripFinder"), href: "/trip-finder" },
        ]}
      />

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

      {/* Overview — sits straight under the breadcrumb, per the client: these
          opening blocks should start as high up the page as they can. D3 here
          and nowhere else down the page: "само тука има позадина D3, надоле не.
          Ова важи за сите континенти истото." */}
      <section id="overview" style={{ ...pageBackdrop("d3"), padding: "clamp(20px, 3vw, 32px) 0 clamp(44px, 6vw, 64px)", scrollMarginTop: "calc(var(--wf-header-h) + 66px)" }}>
        <div className="wf-wrap" style={{ maxWidth: 980, marginInline: "auto", textAlign: "center" }}>
          <h2 className="wf-h2" style={{ color: "var(--wf-ink-900)", margin: 0 }}>
            {region.introHeading || t("introHeading", { region: region.label })}
          </h2>
          {/* Smaller, italic and run wider than the heading column so the
              paragraph reads as a caption rather than a stack of short lines. */}
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
            {region.introBody || t("introBody", { region: region.label })}
          </p>
        </div>
      </section>

      {/* Countries — plain white, the "надоле не" half of the note above. */}
      <section id="countries" style={{ ...plainBand, padding: "0 0 clamp(64px, 9vw, 104px)", scrollMarginTop: "calc(var(--wf-header-h) + 66px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <h2
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 400,
              fontSize: "clamp(26px, 4vw, 38px)",
              letterSpacing: "0",
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
