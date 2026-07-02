"use client";

import React from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TripFilters, type FilterGroupUI } from "@/components/sections/TripFilters";

export type SortKey = "" | "price-asc" | "price-desc" | "duration-asc" | "duration-desc";

/**
 * TripFinderResults — the Black Tomato-style results chrome: a header with the
 * live count, a toolbar (show/hide filters, sort, clear all), and a collapsible
 * filter sidebar. The grid itself is server-rendered and passed as children so
 * filtering and sorting stay in the URL and run on the server.
 */
export function TripFinderResults({
  groups,
  count,
  children,
}: {
  groups: FilterGroupUI[];
  count: number;
  children: React.ReactNode;
}) {
  const t = useTranslations("filters");
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const hasSelection = groups.some((g) => (sp.get(g.key) ?? "").length > 0);
  const [showFilters, setShowFilters] = React.useState(hasSelection);

  const sort = (sp.get("sort") ?? "") as SortKey;
  const setSort = (value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set("sort", value);
    else params.delete("sort");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => router.replace(pathname, { scroll: false });

  const toolBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "none",
    border: "1px solid var(--wf-border-strong)",
    borderRadius: "var(--wf-radius-sm)",
    padding: "10px 16px",
    cursor: "pointer",
    fontFamily: "var(--wf-font-sans)",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--wf-ink-900)",
  };

  return (
    <>
      {/* Header — title + live count */}
      <section style={{ background: "var(--wf-paper)", padding: "clamp(40px, 6vw, 64px) 0 32px", textAlign: "center" }}>
        <div className="wf-wrap wf-wrap--wide">
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(30px, 5vw, 44px)",
              letterSpacing: "-0.02em",
              margin: 0,
              color: "var(--wf-ink-900)",
            }}
          >
            {t("resultsTitle")}
          </h1>
          <p style={{ fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--wf-ink-500)", margin: "12px 0 0" }}>
            {t("resultsCount", { count })}
          </p>
        </div>
      </section>

      <section style={{ background: "var(--wf-cream)", padding: "clamp(24px, 4vw, 40px) 0 96px" }}>
        <div className="wf-wrap wf-wrap--wide">
          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => setShowFilters((v) => !v)} style={toolBtn} aria-expanded={showFilters}>
                {showFilters ? t("hideFilters") : t("showFilters")}
                <SlidersHorizontal size={16} aria-hidden />
              </button>

              <label style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--wf-ink-500)", marginRight: 10 }}>
                  {t("sortBy")}
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{
                    appearance: "none",
                    background: "none",
                    border: "none",
                    fontFamily: "var(--wf-font-sans)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--wf-ink-900)",
                    cursor: "pointer",
                    paddingRight: 22,
                  }}
                >
                  <option value="">{t("sortRecommended")}</option>
                  <option value="price-asc">{t("sortPriceLow")}</option>
                  <option value="price-desc">{t("sortPriceHigh")}</option>
                  <option value="duration-asc">{t("sortDurationShort")}</option>
                  <option value="duration-desc">{t("sortDurationLong")}</option>
                </select>
                <ChevronDown size={16} aria-hidden style={{ position: "absolute", right: 0, pointerEvents: "none", color: "var(--wf-ink-500)" }} />
              </label>
            </div>

            {hasSelection && (
              <button
                onClick={clearAll}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--wf-coral-600)", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {t("clearAll")}
              </button>
            )}
          </div>

          {/* Filters + results */}
          {showFilters && groups.length > 0 ? (
            <div className="wf-filter-layout">
              <aside className="wf-filter-layout__aside">
                <TripFilters groups={groups} />
              </aside>
              <div>{children}</div>
            </div>
          ) : (
            children
          )}
        </div>
      </section>
    </>
  );
}
