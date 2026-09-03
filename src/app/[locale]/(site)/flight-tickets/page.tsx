import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { FlightTicketsForm } from "@/components/site/FlightTicketsForm";
import { pageBackdrop } from "@/content/media";

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

  // "Во авиобилети позадината е Д1."
  return (
    <>
      <section style={{
          ...pageBackdrop("d1"),
          padding: "var(--wf-page-top) 0 clamp(48px, 8vw, 96px)",
        }}>
        <div className="wf-wrap wf-wrap--wide">
          <div style={{ maxWidth: 760, margin: "0 auto clamp(28px, 4vw, 44px)", textAlign: "center" }}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            {/* 3.1 splits this into two headings: "ОД А ДО Б Е ЛЕСНИОТ ДЕЛ" as
                H1, then a smaller H2 that is still a heading, then the body. */}
            <h1 className="wf-h2" style={{ margin: "12px 0 0", color: "var(--wf-ink-900)" }}>
              {t("title")}
            </h1>
            <p
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 400,
                fontSize: "clamp(18px, 2.1vw, 26px)",
                lineHeight: 1.12,
                textTransform: "uppercase",
                color: "var(--wf-ink-700)",
                margin: "10px auto 0",
                maxWidth: 620,
              }}
            >
              {t("subtitle")}
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--wf-ink-700)", margin: "14px auto 0", maxWidth: 580 }}>{t("intro")}</p>
          </div>
          <FlightTicketsForm />
        </div>
      </section>

      {/* "Зошто преку Bookit?" — new in 3.1, asked for as a band under the form
          in the same shape as the values band ("ova da se otvara kako slednava
          slika, boite isti"): teal ground, white cards.

          TODO(3.1): the client also asked for one of the new cream boards
          behind it ("позадината може да е некоја од новите што ти ги пратив").
          Those files have not arrived, so it carries the flat teal for now. */}
      <section style={{ background: "var(--wf-values-bg)", color: "var(--wf-text-on-dark)", padding: "clamp(48px, 7vw, 88px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(28px, 4vw, 44px)" }}>
            <h2 className="wf-h2" style={{ margin: 0 }}>{t("whyTitle")}</h2>
            <p style={{ fontSize: "clamp(15px, 1.7vw, 17px)", lineHeight: 1.6, margin: "14px 0 0", opacity: 0.88 }}>
              {t("whyLead")}
            </p>
          </div>
          <div className="wf-grid wf-grid-3">
            {([1, 2, 3] as const).map((n) => (
              <article
                key={n}
                style={{
                  background: "var(--wf-paper)",
                  borderRadius: "var(--wf-radius-md)",
                  padding: "clamp(22px, 2.6vw, 30px)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--wf-font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(20px, 2.2vw, 26px)",
                    lineHeight: 1.05,
                    textTransform: "uppercase",
                    color: "var(--wf-accent-ink)",
                    margin: 0,
                  }}
                >
                  {t(`why${n}Title`)}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--wf-ink-700)", margin: "12px 0 0" }}>
                  {t(`why${n}Body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
