import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { TripGrid } from "@/components/sections/TripGrid";
import { TripFilters, type FilterGroupUI } from "@/components/sections/TripFilters";
import { getTripsWithFacets } from "@/lib/queries/public";
import { getFilterGroups, derivedGroups } from "@/lib/queries/filters";

export const metadata: Metadata = {
  title: "Trips",
  description:
    "Multi-day tailor-made itineraries across North Macedonia, the Balkans and the Mediterranean — each one shaped around how you want to feel.",
};

export default async function TripsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [trips, taxonomy, t, tf] = await Promise.all([
    getTripsWithFacets(),
    getFilterGroups(),
    getTranslations("trips"),
    getTranslations("filters"),
  ]);
  const sp = await searchParams;

  // Sidebar = published taxonomy groups (that have options) + derived facets.
  const groups: FilterGroupUI[] = [
    ...taxonomy
      .filter((g) => g.options.length > 0)
      .map((g) => ({ key: g.key, label: g.label, options: g.options.map((o) => ({ key: o.key, label: o.label })) })),
    ...derivedGroups.map((g) => ({ key: g.key, label: g.label, options: g.options.map((o) => ({ key: o.key, label: o.label })) })),
  ];

  // Selected options per group from the URL (comma-separated), then filter:
  // OR within a group, AND across groups.
  const selected = groups
    .map((g) => {
      const raw = sp[g.key];
      const val = typeof raw === "string" ? raw : Array.isArray(raw) ? raw.join(",") : "";
      return [g.key, val.split(",").filter(Boolean)] as const;
    })
    .filter(([, opts]) => opts.length > 0);

  const filtered = trips.filter((trip) =>
    selected.every(([gk, opts]) => opts.some((ok) => trip.facets.includes(`${gk}:${ok}`))),
  );

  return (
    <>
      <section
        style={{
          background: "var(--wf-ink-900)",
          color: "#fff",
          padding: "calc(var(--wf-header-h) + 56px) 0 56px",
        }}
      >
        <div className="wf-wrap wf-wrap--wide">
          <Eyebrow tone="light">{t("eyebrow")}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(36px, 7vw, 56px)",
              letterSpacing: "-0.02em",
              margin: "16px 0 0",
            }}
          >
            {t("title")}
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(244,239,231,0.75)",
              maxWidth: 540,
              margin: "16px 0 0",
              lineHeight: 1.6,
            }}
          >
            {t("intro")}
          </p>
        </div>
      </section>

      <section style={{ background: "var(--wf-cream)", padding: "clamp(32px, 5vw, 56px) 0 96px" }}>
        <div className="wf-wrap wf-wrap--wide">
          {groups.length > 0 ? (
            <div className="wf-filter-layout">
              <aside className="wf-filter-layout__aside">
                <TripFilters groups={groups} />
              </aside>
              <div>
                <p style={{ fontSize: 14, color: "var(--wf-ink-500)", margin: "0 0 20px" }}>
                  {tf("results", { count: filtered.length })}
                </p>
                {filtered.length > 0 ? (
                  <TripGrid items={filtered} />
                ) : (
                  <p style={{ color: "var(--wf-ink-500)" }}>{tf("none")}</p>
                )}
              </div>
            </div>
          ) : trips.length > 0 ? (
            <TripGrid items={trips} />
          ) : (
            <p style={{ color: "var(--wf-ink-500)" }}>{t("empty")}</p>
          )}
        </div>
      </section>
    </>
  );
}
