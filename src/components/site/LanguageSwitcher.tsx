"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * LanguageSwitcher — EN / MK toggle that keeps the current path and swaps the
 * locale (English unprefixed, Macedonian under /mk). `dark` tints it for the
 * transparent hero header.
 */
export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const active = useLocale();
  const pathname = usePathname();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "var(--wf-font-sans)",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.06em",
      }}
    >
      {routing.locales.map((loc, i) => {
        const on = loc === active;
        return (
          <React.Fragment key={loc}>
            {i > 0 && (
              <span aria-hidden style={{ opacity: 0.5, color: dark ? "#fff" : "var(--wf-ink-400)" }}>
                /
              </span>
            )}
            <Link
              href={pathname}
              locale={loc}
              aria-current={on ? "true" : undefined}
              style={{
                textDecoration: "none",
                textTransform: "uppercase",
                color: on
                  ? dark
                    ? "#fff"
                    : "var(--wf-ink-900)"
                  : dark
                    ? "rgba(255,255,255,0.6)"
                    : "var(--wf-ink-400)",
              }}
            >
              {loc}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}
