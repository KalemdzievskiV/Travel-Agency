"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/sections/SectionHead";
import type { Excursion } from "@/content/types";

/**
 * Optional excursions (ФАКУЛТАТИВИ) — "За ова ќе раскажуваш". One excursion at
 * a time: its photos and the copy that belongs to them change together, stepped
 * by the arrows. An excursion with several photos gets dots on the photo; a
 * swipe steps through its photos and runs on into the next excursion at either
 * end. Every photo is mounted and stacked, so switching is a crossfade with
 * nothing left to load.
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
    photo: string;
  };
}) {
  const [{ i, p }, setPos] = React.useState({ i: 0, p: 0 });
  const n = items.length;
  const cur = items[i];
  const photos = cur.images.length;
  // Arrows: whole excursions, always opening on the cover.
  const go = (d: -1 | 1) => setPos((s) => ({ i: (s.i + d + n) % n, p: 0 }));
  // Swipe: photo by photo, spilling into the neighbouring excursion at the ends
  // (onto its last photo when going back).
  const step = (d: -1 | 1) =>
    setPos((s) => {
      const q = s.p + d;
      if (q >= 0 && q < items[s.i].images.length) return { i: s.i, p: q };
      const j = (s.i + d + n) % n;
      return { i: j, p: d < 0 ? Math.max(items[j].images.length - 1, 0) : 0 };
    });
  const swipeX = React.useRef<number | null>(null);

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
              if (swipeX.current == null || (n < 2 && photos < 2)) return;
              const dx = e.clientX - swipeX.current;
              swipeX.current = null;
              if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
            }}
          >
            {items.map((x, k) =>
              x.images.map((src, m) => {
                const on = k === i && m === p;
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${k}-${m}`}
                    src={src}
                    alt={on ? x.title : ""}
                    aria-hidden={!on}
                    draggable={false}
                    loading={k === 0 && m === 0 ? undefined : "lazy"}
                    className={`wf-excursion__img${on ? " is-on" : ""}`}
                  />
                );
              }),
            )}
            {cur.label && <span className="wf-excursion__label">{cur.label}</span>}
            {photos > 1 && (
              <div className="wf-excursion__dots">
                {cur.images.map((_, m) => (
                  <button
                    key={m}
                    type="button"
                    className={`wf-excursion__dot${m === p ? " is-on" : ""}`}
                    aria-label={`${labels.photo} ${m + 1} / ${photos}`}
                    aria-current={m === p}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => setPos({ i, p: m })}
                  />
                ))}
              </div>
            )}
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
