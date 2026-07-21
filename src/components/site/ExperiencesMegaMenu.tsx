"use client";

import React from "react";
import { ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui";
import { Link, usePathname } from "@/i18n/navigation";
import type { ExperienceCategory } from "@/content/types";

/**
 * ExperiencesMegaMenu — header mega-menu (modelled on the reference): opens on
 * click, with the groups listed on the left; hovering one swaps the card grid on
 * the right. Trip finder sits in the same rail but carries no cards — it's a
 * straight link out. Closes on outside click, Escape, route change, or the ✕.
 * Falls back to a plain link when there's nothing to show.
 *
 * Shares the panel/close chrome with DestinationsMegaMenu (`wf-destmenu__*`) so
 * both menus open the same way; only the grid inside differs.
 */

type Card = {
  key: string;
  title: string;
  sub: string;
  href?: string;
  image?: string;
  grad: string;
};

export function ExperiencesMegaMenu({
  categories,
  remarkableCategories,
  label,
  triggerStyle,
  triggerClassName,
  iconColor,
  onOpenChange,
}: {
  categories: ExperienceCategory[];
  remarkableCategories: ExperienceCategory[];
  label: string;
  triggerStyle: React.CSSProperties;
  triggerClassName?: string;
  iconColor: string;
  /** Notifies the header so it can go solid while the panel is open. */
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
  // Open state is mirrored to the header so it can go solid while a menu is
  // showing — a transparent header over a hero leaves the panel looking detached.
  // The callback is held in a ref so `change` stays referentially stable: it sits
  // in the close-on-route-change effect's deps, and an inline parent handler
  // would otherwise re-run that effect every render and slam the menu shut.
  const onOpenChangeRef = React.useRef(onOpenChange);
  React.useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);
  const change = React.useCallback((v: boolean) => {
    setOpen(v);
    onOpenChangeRef.current?.(v);
  }, []);
  const [active, setActive] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const t = useTranslations();

  // Close on route change.
  React.useEffect(() => change(false), [pathname, change]);

  // Close on outside click + Escape while open.
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) change(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && change(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Both card-bearing groups are experience categories now — they differ only by
  // `kind`, so they render through the same tile grid.
  const toCards = (list: ExperienceCategory[]): Card[] =>
    list.map((c) => ({
      key: c.slug,
      title: c.title,
      sub: c.subtitle,
      href: `/experiences/${c.slug}`,
      image: c.image,
      grad: c.grad,
    }));

  // Both rail groups land on the one shared hub (/experiences), anchored to
  // their own band — the client asked for a single page rather than two.
  const groups: { key: string; label: string; href: string; cards: Card[] }[] = [
    {
      key: "who",
      label: t("experiencesMenu.who"),
      href: "/experiences#who",
      cards: toCards(categories),
    },
    {
      key: "remarkable",
      label: t("experiencesMenu.remarkable"),
      href: "/experiences#how",
      cards: toCards(remarkableCategories),
    },
  ];

  // Drop groups with no cards, so an unseeded section never shows an empty pane.
  const shown = groups.filter((g) => g.cards.length > 0);
  const group = shown[Math.min(active, shown.length - 1)];

  // No cards at all — a menu would just be a link list.
  if (shown.length === 0) {
    return (
      <Link href="/experiences" style={triggerStyle}>
        {label}
      </Link>
    );
  }

  return (
    <div className="wf-destmenu" ref={ref}>
      <button
        type="button"
        className={`${triggerClassName ?? ""}${open ? " wf-navlink--on" : ""}`}
        onClick={() => change(!open)}
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
            onClick={() => change(false)}
            aria-label={t("common.closeMenu")}
          >
            <X size={22} aria-hidden />
          </button>
          <div className="wf-wrap wf-wrap--wide wf-expmenu__grid">
            {/* Groups */}
            <div>
              <ul className="wf-destmenu__regions">
                {shown.map((g, i) => (
                  <React.Fragment key={g.key}>
                    <li onMouseEnter={() => setActive(i)}>
                      <Link
                        href={g.href}
                        className="wf-destmenu__region"
                        aria-current={g.key === group.key ? "true" : undefined}
                        style={{
                          color: g.key === group.key ? "var(--wf-coral-500)" : "var(--wf-ink-900)",
                        }}
                      >
                        <span>{g.label}</span>
                        <ChevronRight
                          size={16}
                          aria-hidden
                          style={{ opacity: g.key === group.key ? 1 : 0.4 }}
                        />
                      </Link>
                    </li>
                    {/* Trip finder sits between the two groups, per the brief. It's
                        a straight link out, so hovering leaves the cards alone. */}
                    {g.key === "who" && (
                      <li>
                        <Link
                          href="/trip-finder"
                          className="wf-destmenu__region wf-expmenu__link-only"
                        >
                          <span>{t("experiencesMenu.finder")}</span>
                          <ChevronRight size={16} aria-hidden style={{ opacity: 0.4 }} />
                        </Link>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
              <Link href="/experiences" className="wf-destmenu__all">
                {t("experiencesMenu.viewAll")}
              </Link>
            </div>

            {/* Cards for the active group */}
            <div className="wf-expmenu__cards">
              {group.cards.map((c) => {
                const inner = (
                  <>
                    <div
                      className="wf-exp-tile__img"
                      // Longhands only. This renders on the client, where React
                      // assigns style keys in order — a `background` shorthand
                      // here (even undefined) resets background-image and blanks
                      // the photo. A gradient is a background-image value too.
                      style={{
                        backgroundImage: c.image ? `url(${c.image})` : c.grad || undefined,
                        backgroundColor: c.image || c.grad ? undefined : "var(--wf-ink-800)",
                      }}
                      aria-hidden
                    />
                    <div className="wf-exp-tile__scrim" aria-hidden />
                    <div className="wf-exp-tile__body">
                      <h3 className="wf-exp-tile__title wf-expmenu__title">{c.title}</h3>
                      {c.sub && <p className="wf-exp-tile__sub">{c.sub}</p>}
                    </div>
                  </>
                );
                return c.href ? (
                  <Link key={c.key} href={c.href} className="wf-exp-tile wf-exp-tile--tall">
                    {inner}
                  </Link>
                ) : (
                  <div key={c.key} className="wf-exp-tile wf-exp-tile--tall">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
