"use client";

import React from "react";
import { ChevronRight, X } from "lucide-react";
import { Icon } from "@/components/ui";
import { Link, usePathname } from "@/i18n/navigation";
import type { RegionNavItem } from "@/lib/queries/regions";

/**
 * DestinationsMegaMenu — header mega-menu (modelled on the reference): opens on
 * click, with a region list on the left; hovering a region shows its countries
 * in columns and a feature image on the right. Closes on outside click, Escape,
 * route change, or the ✕. Falls back to a plain link if there are no regions.
 */
export function DestinationsMegaMenu({
  regions,
  label,
  triggerStyle,
  iconColor,
}: {
  regions: RegionNavItem[];
  label: string;
  triggerStyle: React.CSSProperties;
  iconColor: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on route change.
  React.useEffect(() => setOpen(false), [pathname]);

  // Close on outside click + Escape while open.
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const region = regions[active];

  if (regions.length === 0) {
    return (
      <Link href="/destinations" style={triggerStyle}>
        {label}
      </Link>
    );
  }

  return (
    <div className="wf-destmenu" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          ...triggerStyle,
        }}
      >
        {label}
        <Icon name="chevron" size={14} color={iconColor} />
      </button>

      {open && (
        <div className="wf-destmenu__panel">
          <button
            type="button"
            className="wf-destmenu__close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <X size={22} aria-hidden />
          </button>
          <div className="wf-wrap wf-wrap--wide wf-destmenu__grid">
            {/* Regions */}
            <div>
              <ul className="wf-destmenu__regions">
                {regions.map((r, i) => {
                  const on = i === active;
                  return (
                    <li key={r.id} onMouseEnter={() => setActive(i)}>
                      <Link
                        href={`/destinations#${r.slug}`}
                        className="wf-destmenu__region"
                        aria-current={on ? "true" : undefined}
                        style={{ color: on ? "var(--wf-coral-500)" : "var(--wf-ink-900)" }}
                      >
                        <span>{r.label}</span>
                        <ChevronRight size={16} aria-hidden style={{ opacity: on ? 1 : 0.4 }} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link href="/destinations" className="wf-destmenu__all">
                All destinations
              </Link>
            </div>

            {/* Countries in the active region */}
            <div className="wf-destmenu__countries">
              <div className="wf-destmenu__cols">
                {region.destinations.map((d) => (
                  <Link key={d.slug} href={`/destinations/${d.slug}`} className="wf-destmenu__country">
                    {d.title}
                  </Link>
                ))}
              </div>
              <Link href={`/destinations#${region.slug}`} className="wf-destmenu__browse">
                Browse all {region.label}
              </Link>
            </div>

            {/* Feature image */}
            <div
              className="wf-destmenu__image"
              style={{
                background: region.grad ?? "var(--wf-ink-800)",
                backgroundImage: region.image ? `url(${region.image})` : undefined,
              }}
              aria-hidden
            />
          </div>
        </div>
      )}
    </div>
  );
}
