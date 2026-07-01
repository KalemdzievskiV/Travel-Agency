import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { DestinationsBrowser } from "@/components/sections/DestinationsBrowser";
import { getDestinations } from "@/lib/queries/public";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Tailor-made journeys across North Macedonia, the Balkans and beyond — each one planned from scratch around how you want to feel.",
};

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [destinations, t] = await Promise.all([
    getDestinations(),
    getTranslations("destinations"),
  ]);
  return (
    <>
      <section
        style={{
          background: "var(--wf-ink-900)",
          color: "#fff",
          padding: "calc(var(--wf-header-h) + 56px) 0 56px",
        }}
      >
        <div className="wf-wrap wf-wrap--wide">
          <Eyebrow tone="light">{t("eyebrow")}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(36px, 7vw, 56px)",
              letterSpacing: "-0.02em",
              margin: "16px 0 0",
            }}
          >
            {t("title")}
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(244,239,231,0.75)",
              maxWidth: 540,
              margin: "16px 0 0",
              lineHeight: 1.6,
            }}
          >
            {t("intro")}
          </p>
        </div>
      </section>

      <section style={{ background: "var(--wf-cream)", padding: "32px 0 96px" }}>
        <div className="wf-wrap wf-wrap--wide">
          <DestinationsBrowser items={destinations} />
        </div>
      </section>
    </>
  );
}
