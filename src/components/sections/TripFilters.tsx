"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type FilterGroupUI = {
  key: string;
  label: string;
  options: { key: string; label: string }[];
};

/**
 * TripFilters — collapsible facet groups with checkboxes (modelled on the
 * reference filter panel). Selections live in the URL search params so the
 * server can filter and links are shareable.
 */
export function TripFilters({ groups }: { groups: FilterGroupUI[] }) {
  const t = useTranslations("filters");
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const selectedOf = (gk: string) => new Set((sp.get(gk) ?? "").split(",").filter(Boolean));
  const activeCount = groups.reduce((n, g) => n + selectedOf(g.key).size, 0);

  // A group starts open if it has an active selection.
  const [open, setOpen] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((g) => [g.key, selectedOf(g.key).size > 0])),
  );

  const toggleOption = (gk: string, ok: string) => {
    const set = selectedOf(gk);
    if (set.has(ok)) set.delete(ok);
    else set.add(ok);
    const params = new URLSearchParams(sp.toString());
    if (set.size) params.set(gk, [...set].join(","));
    else params.delete(gk);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => router.replace(pathname, { scroll: false });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
        <span
          style={{
            fontFamily: "var(--wf-font-sans)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--wf-ink-900)",
          }}
        >
          {t("title")}
        </span>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--wf-coral-600)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {t("clearAll")}
          </button>
        )}
      </div>

      {groups.map((g) => {
        const sel = selectedOf(g.key);
        const isOpen = open[g.key];
        return (
          <div key={g.key} style={{ borderTop: "1px solid var(--wf-border)" }}>
            <button
              onClick={() => setOpen((o) => ({ ...o, [g.key]: !o[g.key] }))}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "14px 2px",
                fontFamily: "var(--wf-font-sans)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--wf-ink-900)",
                textAlign: "left",
              }}
            >
              <span>
                {g.label}
                {sel.size > 0 && (
                  <span style={{ color: "var(--wf-coral-600)", marginLeft: 8 }}>{sel.size}</span>
                )}
              </span>
              <ChevronDown
                size={18}
                aria-hidden
                style={{
                  flexShrink: 0,
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform .2s var(--wf-ease-out)",
                  color: "var(--wf-ink-500)",
                }}
              />
            </button>
            {isOpen && (
              <div style={{ display: "grid", gap: 2, padding: "0 2px 14px" }}>
                {g.options.map((o) => (
                  <label
                    key={o.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "8px 0",
                      cursor: "pointer",
                      fontSize: 15,
                      color: "var(--wf-ink-700)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={sel.has(o.key)}
                      onChange={() => toggleOption(g.key, o.key)}
                      style={{ width: 17, height: 17, accentColor: "var(--wf-coral-500)" }}
                    />
                    {o.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
