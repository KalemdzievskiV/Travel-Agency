"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { Logo } from "./Logo";
import { useEnquiry } from "./EnquiryProvider";
import { footerColumns, site } from "@/content/site";

export function SiteFooter() {
  const t = useTranslations();
  const { open } = useEnquiry();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--wf-ink-900)",
        color: "var(--wf-text-on-dark)",
        padding: "clamp(56px, 8vw, 72px) 0 36px",
      }}
    >
      <div className="wf-wrap wf-wrap--wide">
        <div
          className="wf-footer-grid"
          style={{
            paddingBottom: 48,
            borderBottom: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div>
            <Logo light href={null} size={34} />
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: "rgba(244,239,231,0.7)",
                maxWidth: 320,
                margin: "18px 0 22px",
              }}
            >
              {t("footer.description")}
            </p>
            <Button variant="primary" size="md" onClick={() => open()}>
              {t("footer.startJourney")}
            </Button>
          </div>
          {footerColumns.map((col) => (
            <div key={col.key}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(244,239,231,0.55)",
                  marginBottom: 16,
                }}
              >
                {t(`footer.columns.${col.key}`)}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                }}
              >
                {col.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: 14.5,
                      color: "rgba(244,239,231,0.85)",
                      cursor: "pointer",
                    }}
                  >
                    {t(`footer.items.${item}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px 24px",
            flexWrap: "wrap",
            paddingTop: 28,
            fontSize: 13,
            color: "rgba(244,239,231,0.5)",
          }}
        >
          <span>{t("footer.copyright", { year, name: site.name })}</span>
          <span style={{ display: "flex", gap: 22 }}>
            <span>{t("footer.legal.privacy")}</span>
            <span>{t("footer.legal.terms")}</span>
            <span>{t("footer.legal.sitemap")}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
