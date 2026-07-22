"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

/**
 * ExperienceCarousel — a titled band of tall experience tiles that scrolls
 * sideways, with circular pager arrows that appear only where there's more to
 * see. Used twice on the Experiences hub: once for who's travelling, once for
 * the remarkable experiences.
 *
 * Shares the tile look with the header mega-menu (.wf-exp-tile--tall) so the
 * same card reads the same way in both places.
 */
export type ExperienceCarouselItem = {
  slug: string;
  title: string;
  subtitle?: string;
  image?: string;
  grad?: string;
};

export function ExperienceCarousel({
  id,
  eyebrow,
  title,
  items,
  tone = "light",
  backgroundImage,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  items: ExperienceCarouselItem[];
  /** `dark` puts the band on ink-900; `light` keeps it on the white canvas. */
  tone?: "light" | "dark";
  /** Optional backdrop art behind the band. */
  backgroundImage?: string;
}) {
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(true);

  const updateEdges = React.useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    // Not scrollable → report both edges so neither arrow shows.
    const scrollable = el.scrollWidth - el.clientWidth > 4;
    setAtStart(!scrollable || el.scrollLeft <= 4);
    setAtEnd(!scrollable || el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    // Measure after layout and keep in sync as the row and viewport resize —
    // fonts and the fluid card width both shift scrollWidth.
    const raf = requestAnimationFrame(updateEdges);
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    window.addEventListener("resize", updateEdges);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges, items.length]);

  const page = (dir: 1 | -1) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".wf-exp-tile");
    const step = card ? (card.offsetWidth + 16) * 2 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  const dark = tone === "dark";

  return (
    <section
      id={id}
      style={{
        // Longhands only — the flat colour stays as the base so the band still
        // reads if the backdrop is missing.
        backgroundColor: dark ? "var(--wf-ink-900)" : "var(--wf-cream)",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: dark ? "var(--wf-text-on-dark)" : "var(--wf-ink-900)",
        // Tightened from clamp(52px, 7vw, 88px) — the client asked for the dark
        // band to be narrowed where there was room.
        padding: "clamp(40px, 5vw, 64px) 0",
        overflowX: "clip",
        // Clear the site header and the sticky tab rail when jumped to.
        scrollMarginTop: "calc(var(--wf-header-h) + 56px)",
      }}
    >
      <div className="wf-wrap wf-wrap--wide">
        <div style={{ textAlign: "center", marginBottom: "clamp(24px, 3.2vw, 40px)" }}>
          {eyebrow && (
            <span
              style={{
                display: "block",
                fontFamily: "var(--wf-font-sans)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: dark ? "var(--wf-coral-400)" : "var(--wf-ink-500)",
                marginBottom: 12,
              }}
            >
              {eyebrow}
            </span>
          )}
          <h2
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(26px, 3.4vw, 42px)",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              margin: "0 auto",
              maxWidth: "22ch",
            }}
          >
            {title}
          </h2>
        </div>

        <div className="wf-expcar__viewport">
          <div ref={rowRef} className="wf-expcar__row" onScroll={updateEdges}>
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/experiences/${item.slug}`}
                className="wf-exp-tile wf-exp-tile--tall"
              >
                <div
                  className="wf-exp-tile__img"
                  // Longhands only: a `background` shorthand here would reset
                  // background-image on re-render and blank the photo.
                  style={{
                    backgroundImage: item.image ? `url(${item.image})` : item.grad || undefined,
                    backgroundColor: item.image || item.grad ? undefined : "var(--wf-ink-800)",
                  }}
                  aria-hidden
                />
                <div className="wf-exp-tile__scrim" aria-hidden />
                <div className="wf-exp-tile__body">
                  <h3 className="wf-exp-tile__title wf-expcar__title">{item.title}</h3>
                  {item.subtitle && <p className="wf-exp-tile__sub">{item.subtitle}</p>}
                </div>
              </Link>
            ))}
          </div>

          {!atStart && (
            <button
              type="button"
              aria-label="Previous"
              className="wf-carousel-arrow wf-carousel-arrow--prev"
              onClick={() => page(-1)}
            >
              <ChevronLeft size={22} aria-hidden />
            </button>
          )}
          {!atEnd && (
            <button
              type="button"
              aria-label="Next"
              className="wf-carousel-arrow wf-carousel-arrow--next"
              onClick={() => page(1)}
            >
              <ChevronRight size={22} aria-hidden />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
