import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "@/components/sections/SectionHead";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { TripGallery } from "@/components/sections/TripGallery";
import { TripItineraryMap, type MapStop, type MapDay } from "@/components/sections/TripItineraryMap";
import { getTripWithDestinations } from "@/lib/queries/public";
import { splitDayPrefix } from "@/lib/itinerary";
import { months as MONTHS } from "@/content/site";

// The interactive route map is finished but hidden from clients for now. Flip
// to `true` to show it; otherwise a static image + itinerary list is shown.
const SHOW_TRIP_MAP = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getTripWithDestinations(slug);
  if (!result) return { title: "Trip not found" };
  return { title: result.trip.title, description: result.trip.summary };
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getTripWithDestinations(slug);
  if (!result) notFound();
  const { trip, destinations } = result;

  const [t, tc, tm] = await Promise.all([
    getTranslations("tripPage"),
    getTranslations("cards"),
    getTranslations("months"),
  ]);

  // Facts row values.
  const tripMonths = MONTHS.filter((m) =>
    trip.departures.some((dep) => new RegExp(`\\b${m}`, "i").test(dep)),
  ).map((m) => (tm.has(m) ? tm(m) : m));
  const whenValue = tripMonths.length ? tripMonths.join(", ") : t("flexible");
  const priceValue = trip.priceFrom || t("onEnquiry");
  const howLongValue = trip.durationDays ? tc("days", { count: trip.durationDays }) : "—";

  // Gallery — fall back to the hero image if no gallery has been added.
  const galleryImages = trip.images.length ? trip.images : trip.image ? [trip.image] : [];
  // A still image shown beside the itinerary while the map is hidden.
  const staticImg = galleryImages[1] ?? galleryImages[0] ?? trip.image ?? "";

  // Route map. Each itinerary line can carry its own place + coordinates:
  //   "Rio de Janeiro | -22.91 | -43.17 | Christ the Redeemer, Copacabana"
  // giving true city-to-city stops in itinerary order (so a single-country trip
  // can still move between cities). A line without coordinates is a description
  // day that stays at the previous stop. Trips whose itinerary has no coordinates
  // fall back to country-level pins from the linked destinations, so older,
  // free-text itineraries keep working.
  type ParsedDay = { title: string; label: string | null; lat: number | null; lng: number | null; body: string };
  const parsed: ParsedDay[] = trip.itinerary.map((line) => {
    const parts = line.split("|").map((s) => s.trim());
    const lat = Number(parts[1]);
    const lng = Number(parts[2]);
    if (parts.length >= 3 && parts[1] !== "" && parts[2] !== "" && Number.isFinite(lat) && Number.isFinite(lng)) {
      const sp = splitDayPrefix(parts[0]);
      return { title: sp.place, label: sp.label, lat, lng, body: parts.slice(3).join(" | ") };
    }
    // No coordinates (yet) — still split "[Day label] Place | notes" cleanly.
    const sp = parts.length > 1 ? splitDayPrefix(parts[0]) : { label: null, place: "" };
    return {
      title: sp.place,
      label: sp.label,
      lat: null,
      lng: null,
      body: parts.length > 1 ? parts.slice(1).join(" | ") : line,
    };
  });
  const hasStructured = parsed.some((p) => p.lat != null && p.lng != null);

  let stops: MapStop[] = [];
  let days: MapDay[] = [];

  if (hasStructured) {
    let cur = -1;
    const dayStop = parsed.map((p) => {
      if (p.lat != null && p.lng != null) {
        stops.push({ name: p.title || `Stop ${stops.length + 1}`, slug: "", lat: p.lat, lng: p.lng });
        cur = stops.length - 1;
      }
      return cur;
    });
    days = parsed.map((p, i) => ({ n: i + 1, text: p.body || p.title, stopIndex: Math.max(0, dayStop[i]), label: p.label }));
  } else {
    // Fallback: country-level pins from the trip's linked destinations. Days are
    // matched to a stop by naming it, else spread evenly across the stops.
    const geoDests = destinations.filter(
      (d): d is typeof d & { lat: number; lng: number } =>
        typeof d.lat === "number" && typeof d.lng === "number",
    );
    stops = geoDests.map((d) => ({ name: d.title, slug: d.slug, lat: d.lat, lng: d.lng }));
    if (trip.itinerary.length && stops.length) {
      let cur = 0;
      let anyMatch = false;
      const matched = trip.itinerary.map((text) => {
        const lc = text.toLowerCase();
        const f = stops.findIndex((s) => {
          const name = s.name.toLowerCase();
          return lc.includes(name) || name.split(/[^a-zà-ÿ]+/i).some((w) => w.length > 3 && lc.includes(w));
        });
        if (f >= 0) {
          cur = f;
          anyMatch = true;
        }
        return cur;
      });
      const n = trip.itinerary.length;
      days = trip.itinerary.map((text, i) => ({
        n: i + 1,
        text,
        stopIndex: anyMatch ? Math.max(0, Math.min(matched[i], stops.length - 1)) : Math.floor((i / n) * stops.length),
      }));
    } else {
      days = geoDests.map((d, i) => ({ n: i + 1, text: d.teaser || d.intro || d.title, stopIndex: i }));
    }
  }
  const showMap = stops.length >= 1 && days.length >= 1;

  return (
    <>
      {/* Header — title + facts row */}
      <section style={{ background: "var(--wf-paper)", padding: "clamp(32px, 5vw, 56px) 0 clamp(36px, 5vw, 56px)", textAlign: "center" }}>
        <div className="wf-wrap" style={{ maxWidth: 900, marginInline: "auto" }}>
          {destinations[0] && <Eyebrow>{destinations[0].title}</Eyebrow>}
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 500,
              fontSize: "clamp(30px, 5.2vw, 52px)",
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: "var(--wf-ink-900)",
              margin: "14px 0 0",
            }}
          >
            {trip.title}
          </h1>

          <div aria-hidden style={{ width: 64, height: 1, background: "var(--wf-border-strong)", margin: "clamp(24px, 4vw, 36px) auto" }} />

          <div className="wf-trip-facts">
            <Fact label={t("when")} value={whenValue} />
            <Fact label={t("price")} value={priceValue} />
            <Fact label={t("howLong")} value={howLongValue} />
          </div>
        </div>
      </section>

      {/* Gallery carousel */}
      <TripGallery images={galleryImages} title={trip.title} />

      {/* Itinerary. The pinned interactive map is behind SHOW_TRIP_MAP (hidden
          for now); otherwise a static image + day-by-day list is shown. */}
      {showMap && SHOW_TRIP_MAP ? (
        <section style={{ background: "var(--wf-cream)", paddingTop: "clamp(40px, 6vw, 72px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <SectionHead eyebrow={t("onThisJourney")} title={t("itineraryHeading")} />
          </div>
          <TripItineraryMap stops={stops} days={days} dayWord={t("day")} />
        </section>
      ) : days.length > 0 ? (
        <section style={{ background: "var(--wf-cream)", padding: "clamp(40px, 6vw, 72px) 0 clamp(64px, 9vw, 96px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <SectionHead eyebrow={t("onThisJourney")} title={t("itineraryHeading")} />
            <div className="wf-trip-static" style={{ marginTop: "clamp(24px, 4vw, 40px)" }}>
              <div className="wf-trip-static__media" style={{ background: staticImg ? undefined : trip.grad || "var(--wf-ink-800)" }}>
                {staticImg && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={staticImg} alt={trip.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                )}
              </div>
              <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {days.map((d, idx) => (
                  <li key={idx} style={{ padding: "18px 0", borderTop: idx === 0 ? "none" : "1px solid var(--wf-divider)" }}>
                    <span style={{ display: "block", fontFamily: "var(--wf-font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--wf-coral-600)" }}>
                      {d.label || `${t("day")} ${d.n}`}
                    </span>
                    {stops[d.stopIndex]?.name && (
                      <span style={{ display: "block", margin: "8px 0 0", fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: "clamp(20px, 2.4vw, 26px)", letterSpacing: "-0.01em", color: "var(--wf-ink-900)" }}>
                        {stops[d.stopIndex].name}
                      </span>
                    )}
                    <p style={{ margin: "10px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "var(--wf-ink-700)" }}>{d.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      ) : null}

      {/* Where you'll go */}
      {destinations.length > 0 && (
        <section style={{ background: "var(--wf-cream)", padding: "0 0 clamp(64px, 9vw, 104px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <div style={{ marginBottom: 36 }}>
              <SectionHead eyebrow={t("onThisJourney")} title={t("whereYouGo")} />
            </div>
            <DestinationGrid items={destinations} height={380} />
          </div>
        </section>
      )}

      <section style={{ background: "var(--wf-cream)", padding: "0 0 clamp(64px, 9vw, 104px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <Link
            href="/trip-finder/results"
            style={{
              textDecoration: "none",
              color: "var(--wf-ink-900)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              borderBottom: "1px solid var(--wf-ink-900)",
              paddingBottom: 4,
            }}
          >
            {t("viewAll")}
          </Link>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--wf-font-sans)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--wf-coral-600)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--wf-font-display)",
          fontStyle: "italic",
          fontSize: "clamp(16px, 2vw, 19px)",
          color: "var(--wf-ink-700)",
          margin: "10px 0 0",
        }}
      >
        {value}
      </div>
    </div>
  );
}
