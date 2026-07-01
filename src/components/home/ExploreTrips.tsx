import React from "react";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Trip } from "@/content/types";

/**
 * ExploreTrips — landing "explore our trips" band (modelled on Black Tomato):
 * a fixed title on the left and a horizontally scrolling row of tall trip cards
 * on the right. Each card reveals its summary on hover (pure CSS). Layout lives
 * in .wf-explore / .wf-trip-card (responsive.css).
 */
export async function ExploreTrips({ trips }: { trips: Trip[] }) {
  if (trips.length === 0) return null;
  const t = await getTranslations();

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
              {t("explore.title")}
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
              {t("explore.subtitle")}
            </p>
          </div>

          <div className="wf-explore__row">
            {trips.map((trip) => (
              <Link key={trip.slug} href={`/trips/${trip.slug}`} className="wf-trip-card">
                <div
                  className="wf-trip-card__img"
                  style={{ backgroundImage: trip.image ? `url(${trip.image})` : trip.grad }}
                  aria-hidden
                />
                <div className="wf-trip-card__scrim" aria-hidden />
                {trip.durationDays != null && trip.durationDays > 0 && (
                  <span className="wf-trip-card__nights">
                    {t("explore.nights", { count: trip.durationDays })}
                  </span>
                )}
                <div className="wf-trip-card__body">
                  {trip.feelings?.[0] && <span className="wf-trip-card__eyebrow">{trip.feelings[0]}</span>}
                  <h3 className="wf-trip-card__title">{trip.title}</h3>
                  <div className="wf-trip-card__reveal">
                    <div>
                      <p className="wf-trip-card__desc">{trip.summary}</p>
                    </div>
                  </div>
                  <span className="wf-trip-card__btn">
                    {t("explore.exploreTrip")} <ChevronRight size={14} aria-hidden />
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
