"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, Icon } from "@/components/ui";
import { Link, useRouter } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { RegionNavItem } from "@/lib/queries/regions";
import type { ExperienceCategory } from "@/content/types";
import { nav, aboutMenu, site } from "@/content/site";

/**
 * MobileNav — the drawer behind the burger, per the client's mobile brief
 * (pages 5–7 of "МОБИЛНА ВЕРЗИЈА 1.0").
 *
 * It replaces an in-flow dropdown that listed the four top-level entries and
 * hid everything below them behind a single About accordion. The brief asks for
 * the reference's drill-down instead: tapping ДЕСТИНАЦИИ opens the continents,
 * tapping a continent opens its countries, and a BACK row walks the stack up
 * again — with the same treatment for ДОЖИВУВАЊА and ЗА НАС, so every page in
 * the site is reachable from the phone menu rather than just the four hubs.
 *
 * Motion: "кога ќе го кликнеш имаат транзиција да се движи од лево кон десно" —
 * the drawer enters from the left edge travelling right. Panels within it slide
 * horizontally too: a deeper panel comes in from the right, and BACK sends it
 * back the way it came.
 *
 * Rendered only below 860px (`.wf-drawer` is display:none above), and only
 * while open, so it costs nothing on desktop.
 */

type DrawerItem = {
  key: string;
  label: string;
  /** Navigates away and closes the drawer. */
  href?: string;
  /** Pushes a deeper panel instead of navigating. */
  panel?: string;
  /** Renders as a small uppercase group heading rather than a row. */
  heading?: boolean;
  /** Emphasised row — the "all of X" entry that opens each section's hub. */
  lead?: boolean;
};

type DrawerPanel = { title: string; items: DrawerItem[] };

export function MobileNav({
  open,
  onClose,
  regionsNav,
  experienceCategories,
  remarkableCategories,
  navLabel,
}: {
  open: boolean;
  onClose: () => void;
  regionsNav: RegionNavItem[];
  experienceCategories: ExperienceCategory[];
  remarkableCategories: ExperienceCategory[];
  /** The header's own label lookup, so both menus read the same dictionary. */
  navLabel: (href: string) => string;
}) {
  const t = useTranslations();
  const router = useRouter();
  // The trail of panel ids below the root. Empty = the root panel is showing.
  const [stack, setStack] = React.useState<string[]>([]);
  // Which way the panels are currently travelling, so the leaving panel exits
  // on the opposite side from the one arriving.
  const [back, setBack] = React.useState(false);

  // Reset to the root whenever the drawer is closed, so reopening never lands
  // the visitor three panels deep in a section they have since navigated away
  // from. Deferred to the close transition so the reset isn't visible.
  React.useEffect(() => {
    if (open) return;
    const id = setTimeout(() => {
      setStack([]);
      setBack(false);
    }, 320);
    return () => clearTimeout(id);
  }, [open]);

  // Close on Escape, and hold the page still behind the drawer.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  /* ── Panels ─────────────────────────────────────────────────────
     Built as a flat map keyed by id rather than a nested tree: the drill-down
     is a stack of ids, and a map is what that indexes into. */
  const panels: Record<string, DrawerPanel> = {};

  // Destinations → continents → that continent's countries.
  panels.destinations = {
    title: navLabel("/destinations"),
    items: [
      // "НАЈГОРЕ ДА СИ БИДЕ СИТЕ ДЕСТИНАЦИИ" — pinned above the continents.
      { key: "all", label: t("destinationsMenu.allDestinations"), href: "/destinations", lead: true },
      ...regionsNav.map((r) => ({
        key: r.slug,
        label: r.label,
        // A continent with nothing published under it would open an empty
        // panel, so it links straight to its own page instead.
        ...(r.destinations.length > 0 ? { panel: `region:${r.slug}` } : { href: `/destinations/${r.slug}` }),
      })),
    ],
  };
  for (const r of regionsNav) {
    if (r.destinations.length === 0) continue;
    panels[`region:${r.slug}`] = {
      title: r.label,
      items: [
        {
          key: "all",
          label: t("destinationsMenu.browseAll", { region: r.label }),
          href: `/destinations/${r.slug}`,
          lead: true,
        },
        ...r.destinations.map((d) => ({ key: d.slug, label: d.title, href: `/destinations/${d.slug}` })),
      ],
    };
  }

  // Experiences — "кај нас нека стојат сите подкатегории што ги имаме", so both
  // category families are listed in full under their own headings.
  panels.experiences = {
    title: navLabel("/experiences"),
    items: [
      { key: "all", label: t("experiencesMenu.viewAll"), href: "/experiences", lead: true },
      ...(experienceCategories.length
        ? [
            { key: "h-who", label: t("experiencesMenu.who"), heading: true },
            ...experienceCategories.map((c) => ({
              key: `who-${c.slug}`,
              label: c.title,
              href: `/experiences/${c.slug}`,
            })),
          ]
        : []),
      ...(remarkableCategories.length
        ? [
            { key: "h-rem", label: t("experiencesMenu.remarkable"), heading: true },
            ...remarkableCategories.map((c) => ({
              key: `rem-${c.slug}`,
              label: c.title,
              href: `/experiences/${c.slug}`,
            })),
          ]
        : []),
      { key: "finder", label: t("experiencesMenu.finder"), href: "/trip-finder" },
      { key: "sale", label: t("experiencesMenu.onSale"), href: "/on-sale" },
    ],
  };

  // About — the two groups; the one with pages under it drills one deeper
  // ("Истото е и Зошто да патувате со нас делот").
  panels.about = {
    title: navLabel("/about"),
    items: aboutMenu.map((g) =>
      g.items.length > 0
        ? { key: g.key, label: t(`aboutMenu.groups.${g.key}`), panel: `about:${g.key}` }
        : { key: g.key, label: t(`aboutMenu.groups.${g.key}`), href: g.href },
    ),
  };
  for (const g of aboutMenu) {
    if (g.items.length === 0) continue;
    panels[`about:${g.key}`] = {
      title: t(`aboutMenu.groups.${g.key}`),
      items: [
        { key: "all", label: t(`aboutMenu.groups.${g.key}`), href: g.href, lead: true },
        ...g.items.map((it) => ({ key: it.key, label: t(`aboutMenu.items.${it.key}`), href: it.href })),
      ],
    };
  }

  // The root is the header's own nav list, with each hub that has a panel
  // pointing at it instead of linking straight out.
  const root: DrawerPanel = {
    title: "",
    items: nav.map((l) => {
      const panel =
        l.href === "/destinations"
          ? "destinations"
          : l.href === "/experiences"
            ? "experiences"
            : l.href === "/about"
              ? "about"
              : undefined;
      return panel && panels[panel]
        ? { key: l.href, label: navLabel(l.href), panel }
        : { key: l.href, label: navLabel(l.href), href: l.href };
    }),
  };

  const currentId = stack[stack.length - 1];
  const current = currentId ? panels[currentId] : root;
  const atRoot = stack.length === 0;

  const push = (id: string) => {
    setBack(false);
    setStack((s) => [...s, id]);
  };
  const pop = () => {
    setBack(true);
    setStack((s) => s.slice(0, -1));
  };

  return (
    <>
      <div
        className={`wf-drawer__scrim${open ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden
      />
      <div
        className={`wf-drawer${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={t("common.openMenu")}
        // Kept mounted so it can animate out, but taken out of the tab order
        // and the accessibility tree while it is off-screen. (React 19 takes
        // `inert` as a real boolean; earlier versions needed a string.)
        inert={!open}
      >
        <div className="wf-drawer__top">
          {atRoot ? (
            <Logo />
          ) : (
            <button type="button" className="wf-drawer__back" onClick={pop}>
              <ChevronLeft size={17} strokeWidth={2} aria-hidden />
              <span>{current.title}</span>
            </button>
          )}
          <button
            type="button"
            className="wf-drawer__close"
            onClick={onClose}
            aria-label={t("common.closeMenu")}
          >
            <Icon name="x" size={24} color="var(--wf-ink-900)" />
          </button>
        </div>

        <div className="wf-drawer__body">
          {/* Keyed on the panel id so React swaps the subtree and the CSS
              animation restarts — without the key the rows would change text
              in place and the slide would never play. */}
          <div
            key={currentId ?? "__root"}
            className={`wf-drawer__panel${back ? " wf-drawer__panel--back" : ""}`}
          >
            {current.items.map((item) =>
              item.heading ? (
                <span key={item.key} className="wf-drawer__heading">
                  {item.label}
                </span>
              ) : item.panel ? (
                <button
                  key={item.key}
                  type="button"
                  className="wf-drawer__row"
                  onClick={() => push(item.panel!)}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={17} strokeWidth={1.75} aria-hidden />
                </button>
              ) : (
                <Link
                  key={item.key}
                  href={item.href ?? "/"}
                  className={`wf-drawer__row${item.lead ? " wf-drawer__row--lead" : ""}`}
                  onClick={onClose}
                >
                  <span>{item.label}</span>
                </Link>
              ),
            )}
          </div>
        </div>

        {/* Pinned foot: the phone, the MK/EN pair the client asked to keep, and
            the one accented button. */}
        <div className="wf-drawer__foot">
          <a className="wf-drawer__phone" href={`tel:${site.phone.replace(/\s+/g, "")}`}>
            {site.phone}
          </a>
          <LanguageSwitcher />
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => {
              onClose();
              router.push("/make-an-enquiry");
            }}
          >
            {t("common.enquireNow")}
          </Button>
        </div>
      </div>
    </>
  );
}
