"use client";

import React from "react";
import { useLocale } from "next-intl";
import {
  airportCountry,
  airportLabel,
  searchAirports,
  type Airport,
} from "@/content/airport-types";

/** Most people find what they want in the first few; more is a wall of text. */
const MAX_RESULTS = 8;

/**
 * The dataset is ~34 KB gzipped, so it is fetched on first focus rather than
 * shipped with the page — most visitors never touch this field. Module-level
 * so the two fields on the form share one download, and a second focus doesn't
 * re-request it.
 */
let cache: Airport[] | null = null;
let inflight: Promise<Airport[]> | null = null;

function loadAirports(): Promise<Airport[]> {
  if (cache) return Promise.resolve(cache);
  inflight ??= import("@/content/airports.json").then((m) => {
    cache = (m.default ?? m) as unknown as Airport[];
    return cache;
  });
  return inflight;
}

const control: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--wf-font-sans)",
  fontSize: 15,
  color: "var(--wf-ink-900)",
  background: "var(--wf-paper)",
  border: "1px solid var(--wf-border-strong)",
  borderRadius: "var(--wf-radius-md)",
  padding: "12px 14px",
};

/**
 * AirportCombobox — the Од / До field on the flight form.
 *
 * Follows the client's reference (avio.net.mk): typing a few letters lists
 * matching airports as city · country · IATA badge. Search covers the IATA
 * code, the Macedonian and Latin city names, the airport's own name and the
 * upstream alternate names, so "skp", "скопје" and "skopje" all find the same
 * place.
 *
 * Free text is deliberately still valid. If someone types a place the list
 * doesn't carry, the form takes it — this is a request for a quote, not a
 * booking engine, and refusing the enquiry would be worse than an unmatched
 * string. The chosen IATA code rides along in a hidden field when there is one.
 */
export function AirportCombobox({
  id,
  name,
  placeholder,
  required = false,
}: {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  const mk = useLocale() === "mk";
  const [query, setQuery] = React.useState("");
  const [code, setCode] = React.useState("");
  const [airports, setAirports] = React.useState<Airport[] | null>(cache);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const results = React.useMemo(
    () => (airports ? searchAirports(airports, query, MAX_RESULTS) : []),
    [airports, query],
  );

  // Close when the focus or the pointer goes elsewhere. Without this the list
  // hangs over the fields below it after the visitor has moved on.
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const choose = (a: Airport) => {
    // Middot, not brackets: qualified airports already carry a bracketed part,
    // and "Истанбул (Сабиха) (SAW)" reads like a mistake.
    setQuery(`${airportLabel(a, mk)} · ${a.iata}`);
    setCode(a.iata);
    setOpen(false);
    setActive(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") { setOpen(false); setActive(-1); return; }
    if (!open || results.length === 0) {
      if (e.key === "ArrowDown" && results.length) setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      // Only swallow Enter when a suggestion is highlighted, so the form can
      // still be submitted from the field otherwise.
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Tab" && active >= 0) {
      choose(results[active]);
    }
  };

  const listId = `${id}-listbox`;

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <input
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        value={query}
        autoComplete="off"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
        onFocus={() => {
          if (!airports) loadAirports().then(setAirports);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setCode("");
          setActive(-1);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
        style={control}
      />
      {/* The code, for whoever eventually receives this form. */}
      <input type="hidden" name={`${name}Code`} value={code} />

      {open && results.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          style={{
            position: "absolute",
            zIndex: 20,
            top: "calc(100% + 4px)",
            left: 0,
            // Wider than the field when the grid column is narrow, so a row
            // reads as city · country · code instead of colliding. Capped to
            // the viewport so it can't push the page sideways on a phone.
            minWidth: "min(300px, calc(100vw - 48px))",
            width: "100%",
            margin: 0,
            padding: 4,
            listStyle: "none",
            background: "var(--wf-paper)",
            border: "1px solid var(--wf-border-strong)",
            borderRadius: "var(--wf-radius-md)",
            boxShadow: "var(--wf-shadow-lg)",
            maxHeight: 320,
            overflowY: "auto",
          }}
        >
          {results.map((a, i) => (
            <li
              key={a.iata}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              // mousedown, not click: the input's blur would close the list
              // before a click ever landed.
              onMouseDown={(e) => { e.preventDefault(); choose(a); }}
              onMouseEnter={() => setActive(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 10px",
                borderRadius: "var(--wf-radius-sm)",
                cursor: "pointer",
                background: i === active ? "var(--wf-sand)" : "transparent",
              }}
            >
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontSize: 14.5,
                  color: "var(--wf-ink-900)",
                  // Without this a long city name runs underneath the country
                  // rather than shortening — the row has no room to grow.
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {airportLabel(a, mk)}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--wf-ink-500)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flexShrink: 1,
                }}
              >
                {airportCountry(a, mk)}
              </span>
              <span
                style={{
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  background: "var(--wf-accent)",
                  color: "var(--wf-text-on-accent)",
                  padding: "3px 7px",
                  borderRadius: "var(--wf-radius-sm)",
                }}
              >
                {a.iata}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
