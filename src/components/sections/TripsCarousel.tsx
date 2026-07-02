"use client";

import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Trip } from "@/content/types";

/**
 * TripsCarousel — the dark "example trips" band (modelled on Black Tomato): a
 * fixed intro on the left and a horizontally scrolling row of tall trip cards on
 * the right, with a circular arrow to page through them. Each card reveals its
 * summary on hover (pure CSS). Layout lives in .wf-explore / .wf-trip-card.
 *
 * Reused on the home page and each destination page — pass the intro copy in.
 */
export function TripsCarousel({
  trips,
  eyebrow,
  title,
  description,
}: {
  trips: Trip[];
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  const t = useTranslations("explore");
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);

  const updateEdges = React.useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    // Not scrollable → treat as both edges so no arrow shows.
    const scrollable = el.scrollWidth - el.clientWidth > 4;
    setAtStart(!scrollable || el.scrollLeft <= 4);
    setAtEnd(!scrollable || el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    // Measure after layout, and keep in sync as the row/viewport resizes
    // (fonts, images and the responsive card widths all shift scrollWidth).
    const raf = requestAnimationFrame(updateEdges);
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    window.addEventListener("resize", updateEdges);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges, trips.length]);

  const page = (dir: 1 | -1) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".wf-trip-card");
    const gap = 20;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (trips.length === 0) return null;

  return (
    <section style={{ background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)", padding: "clamp(64px, 9vw, 104px) 0", overflowX: "clip" }}>
      <div className="wf-wrap wf-wrap--wide">
        <div className="wf-explore">
          <div className="wf-explore__intro">
            {eyebrow && (
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--wf-coral-400)",
                  marginBottom: 14,
                }}
              >
                {eyebrow}
              </span>
            )}
            <h2
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                fontSize: "clamp(28px, 3.2vw, 40px)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: "var(--wf-text-on-dark)",
                margin: 0,
              }}
            >
              {title}
            </h2>
            {description && (
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 16px)",
                  lineHeight: 1.65,
                  color: "rgba(233, 245, 246, 0.72)",
                  margin: "18px 0 0",
                  maxWidth: 320,
                }}
              >
                {description}
              </p>
            )}
          </div>

          <div className="wf-explore__viewport">
            <div ref={rowRef} className="wf-explore__row" onScroll={updateEdges}>
              {trips.map((trip) => (
                <Link key={trip.slug} href={`/trips/${trip.slug}`} className="wf-trip-card">
                  <div
                    className="wf-trip-card__img"
                    style={{ backgroundImage: trip.image ? `url(${trip.image})` : trip.grad }}
                    aria-hidden
                  />
                  <div className="wf-trip-card__scrim" aria-hidden />
                  {trip.durationDays != null && trip.durationDays > 0 && (
                    <span className="wf-trip-card__nights">{t("nights", { count: trip.durationDays })}</span>
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
                      {t("exploreTrip")} <ChevronRight size={14} aria-hidden />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {!atStart && (
              <button type="button" aria-label="Previous" className="wf-carousel-arrow wf-carousel-arrow--prev" onClick={() => page(-1)}>
                <ChevronLeft size={22} aria-hidden />
              </button>
            )}
            {!atEnd && (
              <button type="button" aria-label="Next" className="wf-carousel-arrow wf-carousel-arrow--next" onClick={() => page(1)}>
                <ChevronRight size={22} aria-hidden />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
