import React from "react";
import { Award, Lightbulb, Map, PhoneCall, UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { EnquireButton } from "@/components/site/EnquireButton";
import { whyBookit } from "@/content/site";
import { pageBackdrop } from "@/content/media";

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
          ...pageBackdrop("d2"),
          padding: "clamp(64px, 9vw, 104px) 0",
        }}
      >
        <div className="wf-wrap wf-wrap--wide">
          {/* "Зошто bookit?" — a section heading in the brief, and short
              enough that it allows 58–64px where there is room. */}
          <h2 className="wf-h2" style={{ color: "var(--wf-ink-900)", textAlign: "center", margin: 0 }}>
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
                    <Glyph size={46} strokeWidth={1.4} color="var(--wf-accent-ink)" aria-hidden />
                  )}
                  <span
                    style={{
                      fontFamily: "var(--wf-font-sans)",
                      // Benefit titles are SemiBold, not regular: the brief
                      // wants them to read as titles without competing with
                      // the Oswald heading above them.
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: 1.3,
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

      {/* Full-bleed CTA band on the client's orange plaster wall. White on the
          raw texture is 3.73:1 — fine for the large heading, short of AA for
          anything else — so a light scrim lifts it to 4.55:1 while leaving the
          orange vivid. Don't drop the scrim. */}
      <section
        style={{
          backgroundColor: "var(--wf-ink-900)",
          backgroundImage:
            "linear-gradient(rgba(20,18,16,0.22), rgba(20,18,16,0.22)), url(/images/ready-to-start.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#fff",
          padding: "clamp(64px, 10vw, 110px) 0",
          textAlign: "center",
        }}
      >
        <div className="wf-wrap wf-wrap--default">
          {/* "Спремни сте да започнете?" — the brief's large CTA heading:
              Oswald 400, a step above a section heading. */}
          <h2 className="wf-h2 wf-h2--cta" style={{ margin: 0 }}>
            {t("why.ctaHeading")}
          </h2>
          <div style={{ marginTop: "clamp(24px, 4vw, 34px)" }}>
            <EnquireButton size="lg">
              {t("common.getInTouch")}
            </EnquireButton>
          </div>
        </div>
      </section>
    </>
  );
}
