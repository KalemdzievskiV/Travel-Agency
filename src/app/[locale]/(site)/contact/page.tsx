import type { Metadata } from "next";
import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow, Icon } from "@/components/ui";
import { EnquireButton } from "@/components/site/EnquireButton";
import { office, site } from "@/content/site";
import { pageBackdrop } from "@/content/media";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with bookit — call us, email us, or send us your travel plans.",
};

/** OpenStreetMap embed framed on the office, with the pin dropped on it. */
function mapEmbedUrl({ lat, lng }: { lat: number; lng: number }) {
  const d = 0.008; // ~1km of framing either side of the pin
  const bbox = [lng - d, lat - d / 2, lng + d, lat + d / 2].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

/**
 * Contact — the three routes in (call, enquiry form, email) laid out as the
 * client asked, followed by a "come and meet us" map. Deliberately not a form
 * of its own: the enquiry column hands off to /make-an-enquiry, which is where
 * the real brief gets taken.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tc] = await Promise.all([getTranslations("contact"), getTranslations("common")]);

  const colLabel: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 9,
    fontFamily: "var(--wf-font-sans)",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--wf-ink-900)",
  };
  const colBody: React.CSSProperties = {
    fontSize: "clamp(15px, 1.7vw, 16px)",
    lineHeight: 1.7,
    color: "var(--wf-ink-700)",
    margin: "14px 0 0",
  };
  const strongLink: React.CSSProperties = {
    display: "inline-block",
    margin: "10px 0 0",
    fontSize: "clamp(17px, 2vw, 20px)",
    fontWeight: 700,
    color: "var(--wf-ink-900)",
    textDecoration: "none",
  };

  return (
    <>
      {/* Invitation */}
      <section
        style={{
          ...pageBackdrop(0),
          padding: "var(--wf-page-top) 0 clamp(36px, 5vw, 56px)",
        }}
      >
        <div className="wf-wrap" style={{ maxWidth: 760, marginInline: "auto", textAlign: "center" }}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(34px, 6vw, 56px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: "14px 0 0",
              color: "var(--wf-ink-900)",
            }}
          >
            {t("title")}
          </h1>
          <p
            style={{
              fontSize: "clamp(17px, 2vw, 20px)",
              lineHeight: 1.6,
              color: "var(--wf-ink-900)",
              margin: "20px auto 0",
              maxWidth: 620,
            }}
          >
            {t("introLead")}
          </p>
          <p
            style={{
              fontSize: "clamp(15px, 1.8vw, 17px)",
              lineHeight: 1.7,
              color: "var(--wf-ink-700)",
              margin: "12px auto 0",
              maxWidth: 560,
            }}
          >
            {t("introBody")}
          </p>
        </div>
      </section>

      {/* The three ways in */}
      <section style={{ background: "var(--wf-sand)", padding: "clamp(40px, 6vw, 64px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div className="wf-contact-cols">
            <div className="wf-contact-col">
              <span style={colLabel}>
                <Icon name="phone" size={16} color="var(--wf-ink-500)" />
                {t("travelEnquiries")}
              </span>
              <p style={colBody}>{t("travelBody")}</p>
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} style={strongLink}>
                {site.phone}
              </a>
              <p style={{ ...colBody, margin: "8px 0 0", fontSize: 14 }}>{t("hoursValue")}</p>
            </div>

            <div className="wf-contact-col">
              <span style={colLabel}>
                <Icon name="globe" size={16} color="var(--wf-ink-500)" />
                {t("onlineEnquiries")}
              </span>
              <p style={colBody}>{t("onlineBody")}</p>
              <div style={{ marginTop: 18 }}>
                <EnquireButton>{tc("enquireNow")}</EnquireButton>
              </div>
            </div>

            <div className="wf-contact-col">
              <span style={colLabel}>
                <Icon name="pin" size={16} color="var(--wf-ink-500)" />
                {t("emailUsLabel")}
              </span>
              <p style={colBody}>{t("emailBody")}</p>
              <a href={`mailto:${site.email}`} style={strongLink}>
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Come and meet us */}
      <section style={{ ...pageBackdrop(2), padding: "clamp(48px, 7vw, 88px) 0 clamp(64px, 9vw, 104px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div style={{ textAlign: "center", marginBottom: "clamp(24px, 3.5vw, 36px)" }}>
            <h2
              style={{
                fontFamily: "var(--wf-font-sans)",
                fontWeight: 700,
                fontSize: "clamp(16px, 2.2vw, 22px)",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--wf-ink-900)",
                margin: 0,
              }}
            >
              {t("visitTitle")}
            </h2>
            <p style={{ fontSize: 15, color: "var(--wf-ink-500)", margin: "10px 0 0" }}>{t("visitSub")}</p>
          </div>

          <div className="wf-contact-map">
            {/* Desaturated so the map sits back behind the photography-led rest
                of the site rather than competing with it. */}
            <iframe
              src={mapEmbedUrl(office)}
              title={t("mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                width: "100%",
                height: "clamp(280px, 42vw, 420px)",
                border: "1px solid var(--wf-border)",
                borderRadius: "var(--wf-radius-md)",
                filter: "saturate(0.45)",
                display: "block",
              }}
            />
            <div
              style={{
                border: "1px solid var(--wf-border)",
                borderRadius: "var(--wf-radius-md)",
                background: "var(--wf-paper)",
                padding: "clamp(20px, 2.6vw, 30px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <Eyebrow>{t("addressLabel")}</Eyebrow>
              <address style={{ fontStyle: "normal", margin: "12px 0 0", fontSize: 16.5, lineHeight: 1.7, color: "var(--wf-ink-900)" }}>
                {office.lines.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={`https://www.openstreetmap.org/?mlat=${office.lat}&mlon=${office.lng}#map=16/${office.lat}/${office.lng}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginTop: 18,
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--wf-accent-ink)",
                  textDecoration: "none",
                }}
              >
                {t("directions")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
