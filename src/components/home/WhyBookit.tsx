import React from "react";
import { Award, Lightbulb, Map, PhoneCall, UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { EnquireButton } from "@/components/site/EnquireButton";
import { whyBookit } from "@/content/site";

/**
 * WhyBookit — the landing "why bookit?" row (modelled on Black Tomato): five
 * icon points, a Trustpilot-style rating, then a full-bleed brand-gradient CTA
 * band. Icons are the closest lucide matches to the reference's custom set.
 */
const ICONS = {
  award: Award,
  quote: Lightbulb,
  map: Map,
  support: PhoneCall,
  guide: UserRound,
} as const;

export async function WhyBookit() {
  const t = await getTranslations();
  return (
    <>
      <section style={{ background: "var(--wf-cream)", padding: "clamp(64px, 9vw, 104px) 0" }}>
        <div className="wf-wrap wf-wrap--wide">
          <h2
            style={{
              fontFamily: "var(--wf-font-sans)",
              fontWeight: 600,
              fontSize: "clamp(18px, 2.6vw, 28px)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--wf-ink-900)",
              textAlign: "center",
              margin: 0,
            }}
          >
            {t("why.heading")}
          </h2>
          <div
            aria-hidden
            style={{ width: 64, height: 2, background: "var(--wf-coral-500)", margin: "clamp(20px, 3vw, 28px) auto 0" }}
          />

          <div className="wf-why-row">
            {whyBookit.map((w) => {
              const Glyph = ICONS[w.icon];
              return (
                <div key={w.label} className="wf-why-point">
                  {w.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={w.src} alt="" width={46} height={46} aria-hidden style={{ display: "block" }} />
                  ) : (
                    <Glyph size={34} strokeWidth={1.4} color="var(--wf-coral-500)" aria-hidden />
                  )}
                  <span
                    style={{
                      fontFamily: "var(--wf-font-sans)",
                      fontSize: 15,
                      lineHeight: 1.4,
                      color: "var(--wf-ink-700)",
                    }}
                  >
                    {t(`why.reasons.${w.icon}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full-bleed CTA band — photographic background under a dark scrim. */}
      <section
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(34,34,34,0.62), rgba(34,34,34,0.72)), url(/images/amalfi-coast.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          padding: "clamp(64px, 10vw, 110px) 0",
          textAlign: "center",
        }}
      >
        <div className="wf-wrap wf-wrap--default">
          <h2
            style={{
              fontFamily: "var(--wf-font-sans)",
              fontWeight: 600,
              fontSize: "clamp(24px, 4vw, 40px)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: 0,
            }}
          >
            {t("why.ctaHeading")}
          </h2>
          <div style={{ marginTop: "clamp(24px, 4vw, 34px)" }}>
            <EnquireButton variant="dark" size="lg">
              {t("common.getInTouch")}
            </EnquireButton>
          </div>
        </div>
      </section>
    </>
  );
}
