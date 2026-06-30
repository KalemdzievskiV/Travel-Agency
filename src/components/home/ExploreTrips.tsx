import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Trip } from "@/content/types";

/**
 * ExploreTrips — landing "explore our trips" band (modelled on Black Tomato):
 * a fixed title on the left and a horizontally scrolling row of tall trip cards
 * on the right. Each card reveals its summary on hover (pure CSS). Layout lives
 * in .wf-explore / .wf-trip-card (responsive.css).
 */
export function ExploreTrips({ trips }: { trips: Trip[] }) {
  if (trips.length === 0) return null;

  return (
    <section style={{ background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)", padding: "clamp(64px, 9vw, 104px) 0" }}>
      <div className="wf-wrap wf-wrap--wide">
        <div className="wf-explore">
          <div className="wf-explore__intro">
            <h2
              style={{
                fontFamily: "var(--wf-font-sans)",
                fontWeight: 600,
                fontSize: "clamp(20px, 2.6vw, 30px)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--wf-text-on-dark)",
                margin: 0,
              }}
            >
              Explore our trips
            </h2>
            <p
              style={{
                fontFamily: "var(--wf-font-display)",
                fontStyle: "italic",
                fontSize: "clamp(16px, 1.8vw, 20px)",
                lineHeight: 1.4,
                color: "rgba(233, 245, 246, 0.7)",
                margin: "16px 0 0",
                maxWidth: 240,
              }}
            >
              Remarkable journeys to inspire the mind.
            </p>
          </div>

          <div className="wf-explore__row">
            {trips.map((t) => (
              <Link key={t.slug} href={`/trips/${t.slug}`} className="wf-trip-card">
                <div
                  className="wf-trip-card__img"
                  style={{ backgroundImage: t.image ? `url(${t.image})` : t.grad }}
                  aria-hidden
                />
                <div className="wf-trip-card__scrim" aria-hidden />
                {t.durationDays != null && t.durationDays > 0 && (
                  <span className="wf-trip-card__nights">{t.durationDays} nights</span>
                )}
                <div className="wf-trip-card__body">
                  {t.feelings?.[0] && <span className="wf-trip-card__eyebrow">{t.feelings[0]}</span>}
                  <h3 className="wf-trip-card__title">{t.title}</h3>
                  <div className="wf-trip-card__reveal">
                    <div>
                      <p className="wf-trip-card__desc">{t.summary}</p>
                    </div>
                  </div>
                  <span className="wf-trip-card__btn">
                    Explore trip <ChevronRight size={14} aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
