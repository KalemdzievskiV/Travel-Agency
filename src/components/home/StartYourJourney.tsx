"use client";

import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import type { JourneyTab } from "@/content/site";

/**
 * StartYourJourney — the landing "start your journey" section (modelled on Black
 * Tomato): a row of tall image cards with a tab switcher above (by traveller /
 * most popular / by month). Front-end only for now — the cards link to
 * /destinations until the destinations backend is wired to real filters.
 */
export function StartYourJourney({ tabs }: { tabs: JourneyTab[] }) {
  const tr = useTranslations();
  const [active, setActive] = React.useState(tabs[0]?.key ?? "");
  const current = tabs.find((tab) => tab.key === active) ?? tabs[0];

  // Translate a card label: traveller categories live under journey.who.*,
  // month cards under months.* (short keys); otherwise show the raw label.
  const cardLabel = (label: string) => {
    if (tr.has(`journey.who.${label}`)) return tr(`journey.who.${label}`);
    if (tr.has(`months.${label}`)) return tr(`months.${label}`);
    return label;
  };

  const tabLabel = (key: string) => {
    switch (key) {
      case "traveller":
        return tr("journey.tabs.traveller");
      case "popular":
        return tr("journey.tabs.popular");
      case "month":
        return tr("journey.tabs.month");
      default:
        return key;
    }
  };

  return (
    <section style={{ background: "var(--wf-sand)", padding: "clamp(64px, 9vw, 104px) 0" }}>
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
          {tr("journey.heading")}
        </h2>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label={tr("journey.heading")}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(20px, 4vw, 40px)",
            margin: "clamp(24px, 4vw, 36px) 0 clamp(32px, 5vw, 48px)",
          }}
        >
          {tabs.map((tab) => {
            const on = tab.key === active;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(tab.key)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 0",
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: on ? "var(--wf-ink-900)" : "var(--wf-ink-500)",
                  borderBottom: `2px solid ${on ? "var(--wf-coral-500)" : "transparent"}`,
                  transition: "color .2s var(--wf-ease-out)",
                }}
              >
                {tabLabel(tab.key)}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className={`wf-journey-grid${current.cards.length > 6 ? " wf-journey-grid--six" : ""}`}>
          {current.cards.map((c, i) => (
            <motion.div
              key={`${current.key}-${c.label}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={c.href} className="wf-journey-card">
                <div className="wf-journey-card__img" style={{ backgroundImage: `url(${c.image})` }} aria-hidden />
                <div className="wf-journey-card__scrim" aria-hidden />
                <span className="wf-journey-card__label">
                  {cardLabel(c.label)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(36px, 5vw, 52px)" }}>
          <Button as="a" href="/destinations" variant="dark" size="lg">
            {tr("common.viewMore")}
          </Button>
        </div>
      </div>
    </section>
  );
}
