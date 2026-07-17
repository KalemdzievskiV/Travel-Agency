import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { FlightTicketsForm } from "@/components/site/FlightTicketsForm";

export const metadata: Metadata = {
  title: "Flight tickets",
  description: "Tell us where you're flying and we'll send you our best offer.",
};

export default async function FlightTicketsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("flightTickets");

  return (
    <section style={{ background: "var(--wf-cream)", padding: "calc(var(--wf-header-h) + clamp(28px, 5vw, 56px)) 0 clamp(48px, 8vw, 96px)", minHeight: "100vh" }}>
      <div className="wf-wrap wf-wrap--wide">
        <div style={{ maxWidth: 760, margin: "0 auto clamp(28px, 4vw, 44px)", textAlign: "center" }}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: "clamp(30px, 5vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1.08, margin: "14px 0 0", color: "var(--wf-ink-900)" }}>
            {t("title")}
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--wf-ink-700)", margin: "16px auto 0", maxWidth: 560 }}>{t("intro")}</p>
        </div>
        <FlightTicketsForm />
      </div>
    </section>
  );
}
