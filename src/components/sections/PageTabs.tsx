import React from "react";
import { Link } from "@/i18n/navigation";

/**
 * PageTabs — the sticky in-page rail that sits under the header on region,
 * destination and experience detail pages (Overview / Countries / Trip finder,
 * Overview / Programmes / Hotels, Concept / Recommendations / FAQs).
 *
 * The three pages carried their own copy of this markup as inline styles. They
 * are one component now because the client's mobile brief asks for the same two
 * changes on all of them — bolder, blacker labels and a rail that scrolls in one
 * line rather than wrapping — and inline styles can't hold a media query.
 * Appearance on desktop is unchanged: `.wf-pagetabs` in responsive.css restates
 * exactly what the inline styles said.
 *
 * No client JS: every one of these pages marks its first tab active and leaves
 * it there, so the active tab is a prop rather than a scroll listener. (The
 * Experiences *hub* rail does track scroll — that one is `ExperienceTabs`.)
 */
export type PageTab = {
  label: string;
  /** In-page anchor ("#overview") or a route to link out to ("/trip-finder"). */
  href: string;
  /** Marks the current section. Exactly one tab should carry it. */
  active?: boolean;
};

export function PageTabs({
  tabs,
  label,
}: {
  tabs: PageTab[];
  /** Accessible name for the rail, e.g. the page title. */
  label?: string;
}) {
  return (
    <div className="wf-pagetabs">
      <nav className="wf-wrap wf-wrap--wide wf-pagetabs__row" aria-label={label}>
        {tabs.map((tab) => {
          const className = `wf-pagetabs__link${tab.active ? " wf-pagetabs__link--on" : ""}`;
          // Anchors stay plain <a>: the locale-aware Link would resolve "#faqs"
          // against the routing table and lose the fragment.
          return tab.href.startsWith("#") ? (
            <a
              key={tab.href}
              href={tab.href}
              className={className}
              aria-current={tab.active ? "true" : undefined}
            >
              {tab.label}
            </a>
          ) : (
            <Link
              key={tab.href}
              href={tab.href}
              className={className}
              aria-current={tab.active ? "true" : undefined}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
