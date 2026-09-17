"use client";

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
 *
 * Anchor tabs glide to their section, as the home hero's scroll cue does, rather
 * than jumping; the sections' own `scroll-margin-top` keeps them clear of the
 * header and this rail. The underline follows the section you're in and wipes in
 * like the header's (.wf-pagetabs__link::after in responsive.css).
 */
export type PageTab = {
  label: string;
  /** In-page anchor ("#overview") or a route to link out to ("/trip-finder"). */
  href: string;
  /** The section marked current before the visitor has scrolled to any. */
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
  const fallback = tabs.find((t) => t.active)?.href ?? null;
  const [active, setActive] = React.useState<string | null>(fallback);
  const rowRef = React.useRef<HTMLElement>(null);

  // Joined hrefs rather than the array itself: `tabs` is rebuilt on every parent
  // render, and using it as a dep would tear down the scroll listener each time.
  const anchorKey = tabs
    .map((t) => t.href)
    .filter((h) => h.startsWith("#"))
    .join("|");

  React.useEffect(() => {
    const hrefs = anchorKey.split("|").filter(Boolean);
    if (!hrefs.length) return;

    const onScroll = () => {
      // The section that owns the upper third of the viewport wins; at the foot
      // of the page the last one does, since a short closing section may never
      // climb that high.
      const line = window.innerHeight * 0.35;
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = fallback;
      for (const href of hrefs) {
        const el = document.getElementById(href.slice(1));
        if (el && (atEnd || el.getBoundingClientRect().top <= line)) current = href;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [anchorKey, fallback]);

  // On a phone the rail scrolls sideways — keep the current tab in view. The row
  // is scrolled directly: scrollIntoView on the tab would cancel the page's own
  // smooth scroll in Chromium.
  React.useEffect(() => {
    const row = rowRef.current;
    const tab = row?.querySelector<HTMLElement>(".wf-pagetabs__link--on");
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    const left = tab.offsetLeft - row.offsetLeft;
    if (left < row.scrollLeft || left + tab.offsetWidth > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: left - (row.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [active]);

  const glideTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const el = document.getElementById(href.slice(1));
    if (!el || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.history.replaceState(window.history.state, "", href);
  };

  return (
    <div className="wf-pagetabs">
      <nav ref={rowRef} className="wf-wrap wf-wrap--wide wf-pagetabs__row" aria-label={label}>
        {tabs.map((tab) => {
          const on = tab.href === active;
          const className = `wf-pagetabs__link${on ? " wf-pagetabs__link--on" : ""}`;
          // Anchors stay plain <a>: the locale-aware Link would resolve "#faqs"
          // against the routing table and lose the fragment.
          return tab.href.startsWith("#") ? (
            <a
              key={tab.href}
              href={tab.href}
              className={className}
              aria-current={on ? "true" : undefined}
              onClick={(e) => glideTo(e, tab.href)}
            >
              {tab.label}
            </a>
          ) : (
            <Link key={tab.href} href={tab.href} className={className}>
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
