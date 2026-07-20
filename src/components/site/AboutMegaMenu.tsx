"use client";

import React from "react";
import { ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui";
import { Link, usePathname } from "@/i18n/navigation";
import { aboutMenu } from "@/content/site";

/**
 * AboutMegaMenu — the За нас menu as a stacked left rail (the client asked for
 * the reference's layout: group headings one under another, the active group's
 * pages listed beside them, rather than the columns-side-by-side panel it used
 * to be).
 *
 * Shares the panel/close/rail chrome with Destinations and Experiences
 * (`wf-destmenu__*`); only the right-hand content differs. Groups with no pages
 * of their own (Who we are) act as plain links in the rail.
 */
export function AboutMegaMenu({
  label,
  triggerStyle,
  triggerClassName,
  iconColor,
  onOpenChange,
}: {
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

  React.useEffect(() => change(false), [pathname, change]);

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

  // Only groups that actually have pages can own the right-hand column.
  const withItems = aboutMenu.filter((g) => g.items.length > 0);
  const group = withItems[Math.min(active, withItems.length - 1)];

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
          <div className="wf-wrap wf-wrap--wide wf-aboutmenu__grid">
            {/* Groups, stacked */}
            <div>
              <ul className="wf-destmenu__regions">
                {aboutMenu.map((g) => {
                  const i = withItems.indexOf(g);
                  const on = i >= 0 && i === active;
                  return (
                    <li
                      key={g.key}
                      onMouseEnter={() => i >= 0 && setActive(i)}
                    >
                      <Link
                        href={g.href}
                        className={`wf-destmenu__region${i < 0 ? " wf-expmenu__link-only" : ""}`}
                        aria-current={on ? "true" : undefined}
                        style={i >= 0 ? { color: on ? "var(--wf-coral-500)" : "var(--wf-ink-900)" } : undefined}
                      >
                        <span>{t(`aboutMenu.groups.${g.key}`)}</span>
                        <ChevronRight size={16} aria-hidden style={{ opacity: on ? 1 : 0.4 }} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Pages in the active group */}
            <div>
              {group?.items.map((item) => (
                <Link key={item.key} href={item.href} className="wf-destmenu__country">
                  {t(`aboutMenu.items.${item.key}`)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
