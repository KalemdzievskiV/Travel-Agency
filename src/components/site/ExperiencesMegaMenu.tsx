"use client";

import React from "react";
import { ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui";
import { Link, usePathname } from "@/i18n/navigation";
import type { ExperienceCategory, RemarkableExperience } from "@/content/types";

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
  remarkable,
  label,
  triggerStyle,
  triggerClassName,
  iconColor,
}: {
  categories: ExperienceCategory[];
  remarkable: RemarkableExperience[];
  label: string;
  triggerStyle: React.CSSProperties;
  triggerClassName?: string;
  iconColor: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const t = useTranslations();

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

  // The card-bearing groups. Trip finder isn't one of them — it's a plain link
  // in the rail (below), so hovering it leaves the current cards in place.
  const groups: { key: string; label: string; href: string; cards: Card[] }[] = [
    {
      key: "who",
      label: t("experiencesMenu.who"),
      href: "/experiences",
      cards: categories.map((c) => ({
        key: c.slug,
        title: c.title,
        sub: c.subtitle,
        href: `/experiences/${c.slug}`,
        image: c.image,
        grad: c.grad,
      })),
    },
    {
      key: "remarkable",
      label: t("experiencesMenu.remarkable"),
      href: "/experiences",
      cards: remarkable.map((e) => ({
        key: e.slug,
        title: e.title,
        sub: e.teaser,
        // Only the ones tied to a trip link anywhere — the rest are display-only.
        href: e.tripSlug ? `/trips/${e.tripSlug}` : undefined,
        image: e.image,
        grad: e.grad,
      })),
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
            aria-label={t("common.closeMenu")}
          >
            <X size={22} aria-hidden />
          </button>
          <div className="wf-wrap wf-wrap--wide wf-expmenu__grid">
            {/* Groups */}
            <div>
              <ul className="wf-destmenu__regions">
                {shown.map((g, i) => {
                  const on = g.key === group.key;
                  return (
                    <li key={g.key} onMouseEnter={() => setActive(i)}>
                      <Link
                        href={g.href}
                        className="wf-destmenu__region"
                        aria-current={on ? "true" : undefined}
                        style={{ color: on ? "var(--wf-coral-500)" : "var(--wf-ink-900)" }}
                      >
                        <span>{g.label}</span>
                        <ChevronRight size={16} aria-hidden style={{ opacity: on ? 1 : 0.4 }} />
                      </Link>
                    </li>
                  );
                })}
                {/* Trip finder — a straight link out, no cards of its own. */}
                <li>
                  <Link
                    href="/trip-finder"
                    className="wf-destmenu__region wf-expmenu__link-only"
                  >
                    <span>{t("experiencesMenu.finder")}</span>
                    <ChevronRight size={16} aria-hidden style={{ opacity: 0.4 }} />
                  </Link>
                </li>
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
                  <Link key={c.key} href={c.href} className="wf-exp-tile">
                    {inner}
                  </Link>
                ) : (
                  <div key={c.key} className="wf-exp-tile">
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
