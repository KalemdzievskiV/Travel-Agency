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
      <section
        style={{
          backgroundColor: "var(--wf-cream)",
          backgroundImage: "url(/images/bg-lines-3.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "clamp(64px, 9vw, 104px) 0",
        }}
      >
        <div className="wf-wrap wf-wrap--wide">
          <h2
            style={{
              fontFamily: "var(--wf-font-sans)",
              fontWeight: 700,
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
                    <img src={w.src} alt="" width={62} height={62} aria-hidden style={{ display: "block" }} />
                  ) : (
                    <Glyph size={46} strokeWidth={1.4} color="var(--wf-coral-500)" aria-hidden />
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

      {/* Full-bleed CTA band. The terracotta backdrop already clears AA against
          white text on its own (5.65:1), so it carries only a light scrim to
          hold the lighter parts of the texture — heavier would mute the colour
          to brown, which was the reason the previous photo needed one. */}
      <section
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(20,18,16,0.18), rgba(20,18,16,0.26)), url(/images/Landing5.png)",
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
              fontWeight: 700,
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
