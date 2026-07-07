"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { Link } from "@/i18n/navigation";
import { footerNav, socials, site } from "@/content/site";

// Brand glyphs (lucide dropped brand icons), 24×24, drawn with currentColor.
function SocialGlyph({ name }: { name: "facebook" | "instagram" | "linkedin" | "youtube" }) {
  const p = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": true } as const;
  switch (name) {
    case "facebook":
      return (
        <svg {...p} fill="currentColor">
          <path d="M15 8h2V5h-2.3C12.7 5 11.5 6.3 11.5 8v1.6H9.5v2.8h2V21h2.9v-8.6H16.5l.5-2.8h-2.6V8.4c0-.3.2-.4.6-.4z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...p} fill="none" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...p} fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3.3 9h3.4v12H3.3zM9 9h3.3v1.7h.05c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8V21h-3.4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21H9z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...p} fill="currentColor">
          <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 00-1.75-1.75C19.35 5.1 12 5.1 12 5.1s-7.35 0-8.85.45A2.5 2.5 0 001.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 001.75 1.75C4.65 18.9 12 18.9 12 18.9s7.35 0 8.85-.45A2.5 2.5 0 0022.6 16.7C23 15.2 23 12 23 12zM9.8 15.3V8.7l6 3.3z" />
        </svg>
      );
  }
}

const colTitle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(244,239,231,0.55)",
  marginBottom: 16,
};
const linkStyle: React.CSSProperties = {
  fontSize: 14.5,
  color: "rgba(244,239,231,0.85)",
  textDecoration: "none",
};

export function SiteFooter() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const [subscribed, setSubscribed] = React.useState(false);

  return (
    <footer style={{ background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)", padding: "clamp(56px, 8vw, 72px) 0 36px" }}>
      <div className="wf-wrap wf-wrap--wide">
        <div className="wf-footer-grid" style={{ paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
          {/* Bookit — brand, primary links, newsletter */}
          <div>
            <Logo light href={null} size={34} />
            <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 0", display: "flex", flexDirection: "column", gap: 11 }}>
              {footerNav.bookit.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} style={linkStyle}>{t(`footer.nav.${l.key}`)}</Link>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 30, maxWidth: 320 }}>
              <div style={colTitle}>{t("footer.newsletter.heading")}</div>
              {subscribed ? (
                <p style={{ fontSize: 14, color: "rgba(244,239,231,0.85)", margin: 0 }}>{t("footer.newsletter.done")}</p>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: 8 }}
                >
                  <input
                    type="email"
                    required
                    placeholder={t("footer.newsletter.placeholder")}
                    aria-label={t("footer.newsletter.placeholder")}
                    style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 14, fontFamily: "var(--wf-font-sans)" }}
                  />
                  <button type="submit" aria-label={t("footer.newsletter.cta")} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "grid", placeItems: "center", padding: 2 }}>
                    <ArrowRight size={18} aria-hidden />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Legal */}
          <div>
            <div style={colTitle}>{t("footer.columns.legal")}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
              {footerNav.legal.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} style={linkStyle}>{t(`footer.legal.${l.key}`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <div style={colTitle}>{t("footer.columns.follow")}</div>
            <div style={{ display: "flex", gap: 14 }}>
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  aria-label={s.key}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "rgba(244,239,231,0.85)",
                  }}
                >
                  <SocialGlyph name={s.key} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 28, fontSize: 13, color: "rgba(244,239,231,0.5)" }}>
          {t("footer.copyright", { year, name: site.name })}
        </div>
      </div>
    </footer>
  );
}
