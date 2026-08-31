"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { RegionNavItem } from "@/lib/queries/regions";
import { photoLayers } from "@/lib/photo";

/**
 * RegionBrowser — the region index on the destinations page: a list on the left
 * that reveals the region's feature image on the right as you hover. Each region
 * jumps to its section further down the page.
 */
export function RegionBrowser({ regions }: { regions: RegionNavItem[] }) {
  const [active, setActive] = React.useState(0);
  const r = regions[active];
  if (regions.length === 0) return null;

  return (
    <div className="wf-region-browser">
      <ul className="wf-region-browser__list">
        {regions.map((reg, i) => {
          const on = i === active;
          return (
            <li key={reg.id} onMouseEnter={() => setActive(i)}>
              <Link
                href={`/destinations/${reg.slug}`}
                className="wf-region-browser__item"
                style={{ color: on ? "var(--wf-accent-ink)" : "var(--wf-ink-900)" }}
              >
                <span>{reg.label}</span>
                <ChevronRight size={20} aria-hidden style={{ opacity: on ? 1 : 0.3 }} />
              </Link>
            </li>
          );
        })}
      </ul>
      <div
        className="wf-region-browser__image"
        // Longhands only — a `background` shorthand would drop the layered
        // photo/gradient on the next render.
        style={{ backgroundColor: "var(--wf-ink-800)", backgroundImage: photoLayers(r.image, r.grad) }}
        aria-hidden
      />
    </div>
  );
}
