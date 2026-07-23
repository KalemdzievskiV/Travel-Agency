"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

/**
 * Temporary 1/2/3 switcher for the trip-page layout prototypes.
 *
 * Deliberately self-contained and unstyled by the design system: it is a
 * decision aid, not part of the site. Once the client picks a layout, delete
 * this file, the two losing TripShowcaseV* files, and the `view` handling in
 * the trip page.
 *
 * Uses next/navigation's plain Link rather than the locale-aware one — it only
 * ever appends a query string to the current path.
 */
export function TripVariantSwitcher({ current }: { current: 1 | 2 | 3 }) {
  const pathname = usePathname();
  const params = useSearchParams();

  const hrefFor = (v: number) => {
    const next = new URLSearchParams(params.toString());
    next.set("view", String(v));
    return `${pathname}?${next.toString()}`;
  };

  return (
    <div className="wf-variant-switch" role="group" aria-label="Trip layout prototype">
      <span className="wf-variant-switch__label">Layout</span>
      {[1, 2, 3].map((v) => (
        <Link
          key={v}
          href={hrefFor(v)}
          scroll={false}
          aria-current={current === v}
          className={`wf-variant-switch__btn${current === v ? " wf-variant-switch__btn--on" : ""}`}
        >
          {v}
        </Link>
      ))}
    </div>
  );
}
