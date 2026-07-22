import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { WorldRegionMap } from "@/components/sections/WorldRegionMap";
import { getDestinations } from "@/lib/queries/public";
import { getRegionsWithDestinations } from "@/lib/queries/regions";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Tailor-made journeys across the world — each one planned from scratch around how you want to feel.",
};

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [destinations, regions, t] = await Promise.all([
    getDestinations(),
    getRegionsWithDestinations(),
    getTranslations("destinations"),
  ]);

  // Group destinations by their region label for the per-region sections.
  const byRegion = new Map<string, typeof destinations>();
  for (const d of destinations) {
    const key = d.regionSlug ?? d.region;
    const arr = byRegion.get(key) ?? [];
    arr.push(d);
    byRegion.set(key, arr);
  }

  return (
    <>
      <section
        style={{
          background: "var(--wf-ink-900)",
          color: "#fff",
          padding: "calc(var(--wf-header-h) + 40px) 0 clamp(24px, 4vw, 48px)",
        }}
      >
        <div className="wf-wrap wf-wrap--wide" style={{ textAlign: "center" }}>
          {/* The masthead copy is gone at the client's request — the map is the
              header now. The h1 stays for screen readers and search engines,
              which would otherwise meet a page with no heading at all. */}
          <h1 className="sr-only">{t("title")}</h1>

          {regions.length > 0 && <WorldRegionMap regions={regions} />}
        </div>
      </section>

      <section style={{ background: "var(--wf-cream)", padding: "clamp(40px, 6vw, 72px) 0 96px" }}>
        <div className="wf-wrap wf-wrap--wide">
          {regions.length > 0 ? (
            <>
              {regions.map((reg) => {
                const items = byRegion.get(reg.slug) ?? [];
                if (items.length === 0) return null;
                return (
                  <div
                    key={reg.id}
                    id={reg.slug}
                    style={{ marginTop: "clamp(48px, 8vw, 88px)", scrollMarginTop: "var(--wf-header-h)" }}
                  >
                    <h2
                      style={{
                        fontFamily: "var(--wf-font-display)",
                        fontWeight: 500,
                        fontSize: "clamp(26px, 4vw, 38px)",
                        letterSpacing: "-0.02em",
                        margin: "0 0 clamp(20px, 3vw, 32px)",
                        color: "var(--wf-ink-900)",
                      }}
                    >
                      {reg.label}
                    </h2>
                    <DestinationGrid items={items} />
                  </div>
                );
              })}
            </>
          ) : (
            <DestinationGrid items={destinations} />
          )}
        </div>
      </section>
    </>
  );
}
