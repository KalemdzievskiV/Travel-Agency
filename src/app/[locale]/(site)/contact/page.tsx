import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow, Icon } from "@/components/ui";
import { EnquireButton } from "@/components/site/EnquireButton";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with bookit — phone, email, address and opening hours.",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tc] = await Promise.all([getTranslations("contact"), getTranslations("common")]);

  const rows: { icon: "phone" | "globe" | "pin" | "calendar"; label: string; value: string; href?: string }[] = [
    { icon: "phone", label: t("phoneLabel"), value: site.phone, href: `tel:${site.phone.replace(/\s+/g, "")}` },
    { icon: "globe", label: t("emailLabel"), value: site.email, href: `mailto:${site.email}` },
    { icon: "pin", label: t("addressLabel"), value: site.address },
    { icon: "calendar", label: t("hoursLabel"), value: t("hoursValue") },
  ];

  return (
    <section style={{ background: "var(--wf-cream)", padding: "calc(var(--wf-header-h) + clamp(40px, 6vw, 72px)) 0 clamp(64px, 9vw, 104px)" }}>
      <div className="wf-wrap" style={{ maxWidth: 720, marginInline: "auto", textAlign: "center" }}>
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
        <p style={{ fontSize: "clamp(16px, 1.9vw, 18px)", lineHeight: 1.7, color: "var(--wf-ink-700)", margin: "18px auto 0", maxWidth: 520 }}>
          {t("intro")}
        </p>

        <div style={{ display: "grid", gap: 2, margin: "clamp(32px, 5vw, 48px) auto 0", maxWidth: 460, textAlign: "left" }}>
          {rows.map((r) => (
            <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 4px", borderTop: "1px solid var(--wf-divider)" }}>
              <span style={{ flex: "none", display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: "50%", background: "var(--wf-paper)", border: "1px solid var(--wf-border)" }}>
                <Icon name={r.icon} size={18} color="var(--wf-coral-600)" />
              </span>
              <span>
                <span style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--wf-ink-500)" }}>{r.label}</span>
                {r.href ? (
                  <a href={r.href} style={{ fontSize: 16.5, fontWeight: 700, color: "var(--wf-ink-900)", textDecoration: "none" }}>{r.value}</a>
                ) : (
                  <span style={{ fontSize: 16.5, fontWeight: 700, color: "var(--wf-ink-900)" }}>{r.value}</span>
                )}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "clamp(32px, 5vw, 44px)", display: "flex", justifyContent: "center" }}>
          <EnquireButton size="lg">{tc("enquireNow")}</EnquireButton>
        </div>
      </div>
    </section>
  );
}
