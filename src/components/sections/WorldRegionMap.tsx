"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import {
  WORLD_VIEWBOX,
  WORLD_COUNTRIES,
  REGION_LABEL_POINTS,
} from "@/content/world-map.generated";
import type { RegionNavItem } from "@/lib/queries/regions";

/**
 * WorldRegionMap — the map of regions on /destinations, modelled on the
 * reference the client supplied: a dark field, grey landmasses, and each region
 * lighting up as the pointer crosses it.
 *
 * Geometry is generated ahead of time into `world-map.generated.ts`
 * (scripts/generate-world-map.mjs) so nothing has to project or parse topojson
 * at runtime. Countries the site doesn't sell are still drawn, in a flatter
 * grey, so the world reads as whole rather than as seven floating shapes.
 *
 * Regions are real links, so the map is keyboard-reachable and works without JS
 * — hover only adds the tint.
 */
export function WorldRegionMap({ regions }: { regions: RegionNavItem[] }) {
  const [active, setActive] = React.useState<string | null>(null);

  // Only regions that actually exist in the CMS are interactive.
  const known = React.useMemo(() => new Set(regions.map((r) => r.slug)), [regions]);
  const labelFor = React.useMemo(
    () => new Map(regions.map((r) => [r.slug, r.label])),
    [regions],
  );

  const grouped = React.useMemo(() => {
    const byRegion = new Map<string, string[]>();
    const inert: string[] = [];
    for (const c of WORLD_COUNTRIES) {
      if (c.region && known.has(c.region)) {
        const arr = byRegion.get(c.region) ?? [];
        arr.push(c.d);
        byRegion.set(c.region, arr);
      } else {
        inert.push(c.d);
      }
    }
    return { byRegion, inert };
  }, [known]);

  return (
    <div className="wf-worldmap">
      <svg
        viewBox={WORLD_VIEWBOX}
        className="wf-worldmap__svg"
        role="img"
        aria-label="Map of regions"
      >
        {/* Countries outside the regions we sell — drawn, but inert. */}
        <path className="wf-worldmap__inert" d={grouped.inert.join(" ")} />

        {regions.map((r) => {
          const paths = grouped.byRegion.get(r.slug);
          if (!paths?.length) return null;
          const on = active === r.slug;
          return (
            <path
              key={r.slug}
              d={paths.join(" ")}
              className={`wf-worldmap__region${on ? " wf-worldmap__region--on" : ""}`}
              onMouseEnter={() => setActive(r.slug)}
              onMouseLeave={() => setActive((p) => (p === r.slug ? null : p))}
            />
          );
        })}
      </svg>

      {/* Labels sit outside the SVG so they keep their own type scale rather
          than being scaled by the viewBox. Positioned from the generated
          centroids as a percentage of the map box. */}
      <div className="wf-worldmap__labels" aria-hidden={false}>
        {regions.map((r) => {
          const pt = REGION_LABEL_POINTS[r.slug];
          if (!pt) return null;
          const [x, y] = pt;
          const on = active === r.slug;
          return (
            <Link
              key={r.slug}
              href={`/destinations/${r.slug}`}
              className={`wf-worldmap__label${on ? " wf-worldmap__label--on" : ""}`}
              style={{ left: `${(x / 1000) * 100}%`, top: `${(y / 500) * 100}%` }}
              onMouseEnter={() => setActive(r.slug)}
              onMouseLeave={() => setActive((p) => (p === r.slug ? null : p))}
              onFocus={() => setActive(r.slug)}
              onBlur={() => setActive((p) => (p === r.slug ? null : p))}
            >
              {labelFor.get(r.slug) ?? r.slug}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
