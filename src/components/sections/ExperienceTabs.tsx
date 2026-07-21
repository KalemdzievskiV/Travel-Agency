"use client";

import React from "react";
import { Link } from "@/i18n/navigation";

/**
 * ExperienceTabs — the sticky in-page rail on the Experiences hub, carrying the
 * same three entries as the header mega-menu: the two card bands (in-page
 * anchors) and the trip finder (a link out).
 *
 * Items with a `section` are tracked as you scroll so the rail always shows
 * which band you're in; the link-out never becomes active.
 */
export type ExperienceTab = {
  label: string;
  /** Id of the band this tab jumps to — omit for a link out. */
  section?: string;
  /** Route for a link out — omit for an in-page anchor. */
  href?: string;
};

export function ExperienceTabs({ tabs }: { tabs: ExperienceTab[] }) {
  const [active, setActive] = React.useState<string | null>(null);

  // Joined ids rather than the array itself: `tabs` is rebuilt on every parent
  // render, and using it as a dep would tear down the scroll listener each time.
  const sectionKey = tabs.map((t) => t.section ?? "").join("|");

  React.useEffect(() => {
    const ids = sectionKey.split("|").filter(Boolean);
    if (!ids.length) return;

    const onScroll = () => {
      // The band that owns the upper third of the viewport wins — a midpoint
      // test would leave the last (often short) band unreachable.
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionKey]);

  return (
    <nav className="wf-exptabs" aria-label="Experiences">
      <div className="wf-wrap wf-wrap--wide">
        <div className="wf-exptabs__row">
          {tabs.map((tab) =>
            tab.section ? (
              <a
                key={tab.section}
                href={`#${tab.section}`}
                className={`wf-exptabs__link${active === tab.section ? " wf-exptabs__link--on" : ""}`}
                aria-current={active === tab.section ? "true" : undefined}
              >
                {tab.label}
              </a>
            ) : (
              <Link key={tab.href} href={tab.href ?? "/"} className="wf-exptabs__link">
                {tab.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}
