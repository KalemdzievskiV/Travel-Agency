"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui";
import { useRouter } from "@/i18n/navigation";
import type { RegionNavItem } from "@/lib/queries/regions";

type Item = { slug: string; label: string; kind: "continent" | "country" };

/**
 * SearchOverlay — the header search (lupa). Opens a modal where typing a
 * continent or country filters the list; picking one navigates to its page.
 */
export function SearchOverlay({ regions, dark }: { regions: RegionNavItem[]; dark: boolean }) {
  const t = useTranslations("search");
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const all: Item[] = React.useMemo(() => {
    const continents = regions.map((r) => ({ slug: r.slug, label: r.label, kind: "continent" as const }));
    const countries = regions.flatMap((r) => r.destinations.map((d) => ({ slug: d.slug, label: d.title, kind: "country" as const })));
    return [...continents, ...countries];
  }, [regions]);

  const results = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return all.slice(0, 8);
    return all.filter((i) => i.label.toLowerCase().includes(term)).slice(0, 12);
  }, [q, all]);

  React.useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (slug: string) => {
    setOpen(false);
    setQ("");
    router.push(`/destinations/${slug}`);
  };

  const continents = results.filter((r) => r.kind === "continent");
  const countries = results.filter((r) => r.kind === "country");

  return (
    <>
      <button
        type="button"
        aria-label={t("open")}
        onClick={() => setOpen(true)}
        style={{ display: "inline-flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: 0, color: dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-900)" }}
      >
        <Icon name="search" size={18} color={dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-900)"} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,20,20,0.55)", backdropFilter: "blur(2px)", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "clamp(16px, 8vh, 120px) 16px 16px" }}
        >
          <div style={{ width: "100%", maxWidth: 620, background: "var(--wf-paper)", borderRadius: "var(--wf-radius-md)", boxShadow: "var(--wf-shadow-md)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", borderBottom: "1px solid var(--wf-border)" }}>
              <Icon name="search" size={18} color="var(--wf-ink-500)" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("placeholder")}
                aria-label={t("placeholder")}
                style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--wf-font-sans)", fontSize: 16, color: "var(--wf-ink-900)" }}
              />
              <button type="button" aria-label={t("close")} onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--wf-ink-500)", display: "grid", placeItems: "center" }}>
                <Icon name="x" size={18} />
              </button>
            </div>

            <div style={{ maxHeight: "min(60vh, 460px)", overflowY: "auto", padding: "8px 0" }}>
              {results.length === 0 ? (
                <p style={{ padding: "18px 20px", color: "var(--wf-ink-500)", fontSize: 14.5, margin: 0 }}>{t("noResults")}</p>
              ) : (
                <>
                  {continents.length > 0 && <Group title={t("continents")} items={continents} onPick={go} />}
                  {countries.length > 0 && <Group title={t("countries")} items={countries} onPick={go} />}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Group({ title, items, onPick }: { title: string; items: Item[]; onPick: (slug: string) => void }) {
  return (
    <div style={{ padding: "6px 0" }}>
      <div style={{ padding: "8px 20px 4px", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--wf-ink-500)" }}>{title}</div>
      {items.map((i) => (
        <button
          key={`${i.kind}-${i.slug}`}
          type="button"
          onClick={() => onPick(i.slug)}
          style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "10px 20px", fontFamily: "var(--wf-font-sans)", fontSize: 15.5, color: "var(--wf-ink-900)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--wf-coral-050)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {i.label}
        </button>
      ))}
    </div>
  );
}
