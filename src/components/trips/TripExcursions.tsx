"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/sections/SectionHead";
import type { Excursion } from "@/content/types";

/**
 * Optional excursions (ФАКУЛТАТИВИ) — "За ова ќе раскажуваш". One excursion at
 * a time: its photo and the copy that belongs to it change together, stepped
 * by the arrows (or a swipe on the photo). Every photo is mounted and stacked,
 * so switching is a crossfade with nothing left to load.
 */
export function TripExcursions({
  items,
  labels,
}: {
  items: Excursion[];
  labels: {
    eyebrow: string;
    title: string;
    intro: string;
    perPerson: string;
    note: string;
    noteSub: string;
    prev: string;
    next: string;
  };
}) {
  const [i, setI] = React.useState(0);
  const n = items.length;
  const go = (d: -1 | 1) => setI((cur) => (cur + d + n) % n);
  const swipeX = React.useRef<number | null>(null);
  const cur = items[i];

  return (
    <section style={{ padding: "clamp(40px, 6vw, 72px) 0" }} aria-roledescription="carousel" aria-label={labels.title}>
      <div className="wf-wrap wf-wrap--wide">
        <div className="wf-excursions__head">
          <SectionHead eyebrow={labels.eyebrow} title={labels.title} intro={labels.intro} />
          {n > 1 && (
            <div className="wf-excursions__controls">
              <span className="wf-excursions__count" aria-live="polite">
                {i + 1} / {n}
              </span>
              <button type="button" className="wf-excursions__arrow" aria-label={labels.prev} onClick={() => go(-1)}>
                <ArrowLeft size={18} aria-hidden />
              </button>
              <button type="button" className="wf-excursions__arrow wf-excursions__arrow--next" aria-label={labels.next} onClick={() => go(1)}>
                <ArrowRight size={18} aria-hidden />
              </button>
            </div>
          )}
        </div>

        <div className="wf-excursion">
          <div
            className="wf-excursion__media"
            onPointerDown={(e) => {
              swipeX.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (swipeX.current == null || n < 2) return;
              const dx = e.clientX - swipeX.current;
              swipeX.current = null;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            }}
          >
            {items.map((x, k) =>
              x.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={k}
                  src={x.image}
                  alt={k === i ? x.title : ""}
                  aria-hidden={k !== i}
                  draggable={false}
                  loading={k === 0 ? undefined : "lazy"}
                  className={`wf-excursion__img${k === i ? " is-on" : ""}`}
                />
              ) : null,
            )}
            {cur.label && <span className="wf-excursion__label">{cur.label}</span>}
          </div>

          {/* Keyed on the index so the copy re-runs its fade with each photo. */}
          <div key={i} className="wf-excursion__body">
            {cur.eyebrow && <p className="wf-excursion__eyebrow">{cur.eyebrow}</p>}
            <div className="wf-excursion__titlerow">
              <h3 className="wf-excursion__title">{cur.title}</h3>
              {cur.price && (
                <p className="wf-excursion__price">
                  {cur.price} <span>/ {labels.perPerson}</span>
                </p>
              )}
            </div>
            {cur.body && <p className="wf-excursion__text">{cur.body}</p>}
          </div>
        </div>

        <div className="wf-excursions__note">
          <p>{labels.note}</p>
          <p>{labels.noteSub}</p>
        </div>
      </div>
    </section>
  );
}
