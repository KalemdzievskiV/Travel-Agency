"use client";

import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Trip } from "@/content/types";
import { displayPrice, showsSaleBadge } from "@/content/pricing";
import { photoLayers } from "@/lib/photo";

/**
 * TripsCarousel — the dark "example trips" band (modelled on Black Tomato): a
 * fixed intro on the left and a horizontally scrolling row of tall trip cards on
 * the right, with a circular arrow to page through them. Each card reveals its
 * summary on hover (pure CSS). Layout lives in .wf-explore / .wf-trip-card.
 *
 * Reused on the home page and each destination page — pass the intro copy in.
 */
/** Pause between automatic steps, in ms. */
const AUTO_MS = 3000;

export function TripsCarousel({
  id,
  trips,
  eyebrow,
  title,
  description,
  backgroundImage,
}: {
  /** Anchor target, when a page's tab rail links to this band. */
  id?: string;
  trips: Trip[];
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional backdrop behind the band. Opt-in, so the reuses on destination
   *  and experience pages keep the plain ink field. */
  backgroundImage?: string;
}) {
  const t = useTranslations("explore");
  const tc = useTranslations("cards");
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);
  // Endless loop: once the real cards overflow the row, a second copy follows
  // them, so the row can always glide forward and quietly jump back by one set
  // when it passes the first. Off while everything fits, where nothing moves.
  const [loop, setLoop] = React.useState(false);
  const loopRef = React.useRef(false);
  React.useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  /** Width of one full set of cards — the distance of the silent loop jump. */
  const setWidth = React.useCallback(() => {
    const el = rowRef.current;
    const clone = el?.querySelector<HTMLElement>("[data-clone]");
    const first = el?.querySelector<HTMLElement>(".wf-trip-card");
    return clone && first ? clone.offsetLeft - first.offsetLeft : 0;
  }, []);

  const updateEdges = React.useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    if (loopRef.current) {
      // A loop has no ends — both arrows stay.
      setAtStart(false);
      setAtEnd(false);
      return;
    }
    // Not scrollable → treat as both edges so no arrow shows.
    const scrollable = el.scrollWidth - el.clientWidth > 4;
    setAtStart(!scrollable || el.scrollLeft <= 4);
    setAtEnd(!scrollable || el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    if (scrollable && trips.length > 1) setLoop(true);
  }, [trips.length]);

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
  }, [updateEdges, trips.length, loop]);

  // Glide: our own eased scroll rather than the browser's quick smooth scroll,
  // so a step reads as a carousel moving, not a click. Scroll-snap is lifted
  // for the duration (it would pull every frame back to a card) and restored
  // after, and a pass into the copied set is folded back without a visible jump.
  const anim = React.useRef<number | null>(null);
  const gliding = React.useRef(false);
  const lastMove = React.useRef(0);

  const normalise = React.useCallback(() => {
    const el = rowRef.current;
    const w = setWidth();
    if (!el || !loopRef.current || !w) return;
    if (el.scrollLeft >= w - 1) el.scrollLeft -= w;
  }, [setWidth]);

  const glide = React.useCallback(
    (dir: 1 | -1, ms: number) => {
      const el = rowRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>(".wf-trip-card");
      const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
      if (anim.current) cancelAnimationFrame(anim.current);
      el.style.scrollSnapType = "none";
      gliding.current = true;
      // Going back from the very start: hop forward one set first (it looks
      // identical), so there's always room to glide left.
      const w = setWidth();
      if (loopRef.current && w && dir < 0 && el.scrollLeft < step) el.scrollLeft += w;
      const from = el.scrollLeft;
      // Land on a card edge even if a previous glide was cut short.
      const to = Math.round((from + dir * step) / step) * step;
      const t0 = performance.now();
      const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      const frame = (now: number) => {
        const p = Math.min(1, (now - t0) / ms);
        el.scrollLeft = from + (to - from) * ease(p);
        if (p < 1) {
          anim.current = requestAnimationFrame(frame);
          return;
        }
        anim.current = null;
        normalise();
        el.style.scrollSnapType = "";
        gliding.current = false;
        lastMove.current = Date.now();
        updateEdges();
      };
      anim.current = requestAnimationFrame(frame);
    },
    [normalise, setWidth, updateEdges],
  );

  const page = (dir: 1 | -1) => {
    glide(dir, 650);
    lastMove.current = Date.now();
  };

  // Auto-rotate: one card every AUTO_MS, gliding on round the loop. Holds while
  // the reader is on the band (hover, touch, keyboard focus), while it's off
  // screen or the tab is hidden, and never runs for reduced motion. Any manual
  // move restarts the wait, so it never moves right after a click or swipe.
  const sectionRef = React.useRef<HTMLElement>(null);
  const held = React.useRef(false);
  const hold = (on: boolean) => {
    held.current = on;
    lastMove.current = Date.now();
  };
  React.useEffect(() => {
    const el = rowRef.current;
    const section = sectionRef.current;
    if (!el || !section || !loop) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) lastMove.current = Date.now();
    }, { threshold: 0.4 });
    io.observe(section);
    // Native swipes and trackpad scrolls count as a manual move, and fold back
    // into the first set once they settle.
    let settle = 0;
    const onScroll = () => {
      if (gliding.current) return;
      lastMove.current = Date.now();
      window.clearTimeout(settle);
      settle = window.setTimeout(normalise, 160);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    lastMove.current = Date.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = reduced
      ? 0
      : window.setInterval(() => {
          if (!visible || held.current || document.hidden || gliding.current) return;
          if (Date.now() - lastMove.current < AUTO_MS) return;
          glide(1, 1400);
        }, 250);
    return () => {
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      window.clearTimeout(settle);
      if (tick) window.clearInterval(tick);
    };
  }, [loop, glide, normalise]);

  React.useEffect(
    () => () => {
      if (anim.current) cancelAnimationFrame(anim.current);
    },
    [],
  );

  if (trips.length === 0) return null;

  return (
    <section
      id={id}
      ref={sectionRef}
      onMouseEnter={() => hold(true)}
      onMouseLeave={() => hold(false)}
      onTouchStart={() => hold(true)}
      onTouchEnd={() => hold(false)}
      onFocus={() => hold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hold(false);
      }}
      style={{
        // Longhands only — the ink field stays as the base colour so the band
        // still reads correctly if the backdrop is absent or fails to load.
        backgroundColor: "var(--wf-ink-900)",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "var(--wf-text-on-dark)",
        padding: "clamp(64px, 9vw, 104px) 0",
        overflowX: "clip",
      }}
    >
      <div className="wf-wrap wf-wrap--wide">
        <div className="wf-explore">
          <div className="wf-explore__intro">
            {eyebrow && (
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 12,
                  fontWeight: 700,
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
                fontWeight: 400,
                fontSize: "clamp(28px, 3.2vw, 40px)",
                lineHeight: 1.05,
                letterSpacing: "0",
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
              {(loop ? [...trips, ...trips] : trips).map((trip, k) => (
                // The copied set (k ≥ trips.length) is only there for the loop:
                // hidden from assistive tech and out of the tab order.
                <div
                  key={`${trip.slug}-${k}`}
                  className="wf-trip-card"
                  data-clone={k === trips.length ? "" : undefined}
                  aria-hidden={k >= trips.length || undefined}
                  inert={k >= trips.length || undefined}
                >
                  <div
                    className="wf-trip-card__img"
                    style={{ backgroundImage: photoLayers(trip.image, trip.grad) }}
                    aria-hidden
                  />
                  <div className="wf-trip-card__scrim" aria-hidden />
                  {/* The price has left this corner for the title row below,
                      per the client. The Select pill sits top-left so the
                      nights label on the right stays visible on every card,
                      sale ones included. */}
                  {showsSaleBadge(trip) && (
                    <div className="wf-trip-card__corner--left">
                      <Link href="/on-sale" className="wf-trip-card__sale" aria-label={tc("onSale")}>
                        {/* No flame — see the note on DestinationCard's badge. */}
                        {tc("onSale")}
                      </Link>
                    </div>
                  )}
                  <div className="wf-trip-card__corner">
                    {trip.durationDays != null && trip.durationDays > 0 && (
                      <span className="wf-trip-card__nights">{t("nights", { count: trip.durationDays })}</span>
                    )}
                  </div>
                  <Link href={`/trips/${trip.slug}`} className="wf-trip-card__link">
                  <div className="wf-trip-card__body">
                    {/* The region, not the feeling the card used to show: the
                        trip titles already name the country ("Egypt: The Nile
                        & the Pyramids"), so the place above them is the region
                        — which is also the eyebrow DestinationCard uses, so the
                        two card families read the same way. Falls back to the
                        feeling for a trip with no destination linked yet. */}
                    {(trip.places?.[0]?.region ?? trip.feelings?.[0]) && (
                      <span className="wf-trip-card__eyebrow">
                        {trip.places?.[0]?.region ?? trip.feelings[0]}
                      </span>
                    )}
                    <div className="wf-trip-card__titlerow">
                      <h3 className="wf-trip-card__title">{trip.title}</h3>
                      {displayPrice(trip) && (
                        <span className="wf-trip-card__corner-price">
                          <span>{tc("nowFrom")} </span>
                          <b>{displayPrice(trip)}</b>
                        </span>
                      )}
                    </div>
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
                </div>
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
