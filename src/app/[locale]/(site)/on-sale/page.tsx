import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { TripGrid } from "@/components/sections/TripGrid";
import { getOnSaleDestinations, getOnSaleTrips } from "@/lib/queries/public";
import { plainBand } from "@/content/media";

export const metadata: Metadata = {
  title: "On sale",
  description: "Selected departures at special prices.",
};

/**
 * The sale listing — where the ON SALE badge leads.
 *
 * Lists only what the client has flagged by hand, trips and destinations both.
 * Section headings appear only when both kinds are present: with one kind on
 * the page a heading reading "Trips on sale" under a title that already says
 * the same thing is noise.
 *
 * Both grids hold their four columns however few items there are
 * (`fitToItems={false}`): a sale often runs with one or two departures, and
 * the grids' usual widen-to-fill left a single card filling half the page.
 */
export default async function OnSalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [trips, destinations, t] = await Promise.all([
    getOnSaleTrips(),
    getOnSaleDestinations(),
    getTranslations("onSale"),
  ]);

  const both = trips.length > 0 && destinations.length > 0;
  const nothing = trips.length === 0 && destinations.length === 0;

  const heading: React.CSSProperties = {
    fontFamily: "var(--wf-font-display)",
    fontWeight: 500,
    fontSize: "clamp(22px, 3vw, 30px)",
    letterSpacing: "-0.01em",
    color: "var(--wf-ink-900)",
    margin: "0 0 clamp(20px, 3vw, 28px)",
  };

  return (
    <section
      style={{
        ...plainBand,
        padding: "var(--wf-page-top) 0 clamp(48px, 8vw, 96px)",
        minHeight: "100vh",
      }}
    >
      <div className="wf-wrap wf-wrap--wide">
        <div style={{ maxWidth: 760, margin: "0 auto clamp(36px, 5vw, 56px)", textAlign: "center" }}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 400,
              fontSize: "clamp(30px, 5vw, 48px)",
              letterSpacing: "0",
              lineHeight: 1.05,
              margin: "14px 0 0",
              color: "var(--wf-ink-900)",
              textWrap: "balance",
            }}
          >
            {t("title")}
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--wf-ink-700)", margin: "16px auto 0", maxWidth: 620 }}>
            {t("intro")}
          </p>
          {!nothing && (
            <p
              style={{
                fontFamily: "var(--wf-font-sans)",
                fontWeight: 700,
                fontSize: 15,
                color: "var(--wf-accent-ink)",
                margin: "14px 0 0",
              }}
            >
              {t("hurry")}
            </p>
          )}
        </div>

        {nothing ? (
          <p
            style={{
              textAlign: "center",
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--wf-ink-500)",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            {t("empty")}
          </p>
        ) : (
          <>
            {trips.length > 0 && (
              <div>
                {both && <h2 style={heading}>{t("trips")}</h2>}
                <TripGrid items={trips} fitToItems={false} />
              </div>
            )}
            {destinations.length > 0 && (
              <div style={{ marginTop: trips.length > 0 ? "clamp(48px, 8vw, 88px)" : 0 }}>
                {both && <h2 style={heading}>{t("destinations")}</h2>}
                <DestinationGrid items={destinations} fitToItems={false} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
