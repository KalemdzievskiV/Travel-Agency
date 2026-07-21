import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button, Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "@/components/sections/SectionHead";
import { TripsCarousel } from "@/components/sections/TripsCarousel";
import { HotelGrid } from "@/components/sections/HotelGrid";
import { TripGallery } from "@/components/sections/TripGallery";
import { TripItineraryMap, type MapStop, type MapDay } from "@/components/sections/TripItineraryMap";
import { EnquireButton } from "@/components/site/EnquireButton";
import { getTripWithDestinations, getSimilarTrips } from "@/lib/queries/public";
import { getHotelsForDestination } from "@/lib/queries/hotels";
import { splitDayPrefix } from "@/lib/itinerary";
import { months as MONTHS } from "@/content/site";

// Show the interactive route map (map + scroll-synced day descriptions). Trips
// without any coordinates fall back to a static image + itinerary list.
const SHOW_TRIP_MAP = true;

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
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const result = await getTripWithDestinations(slug);
  if (!result) notFound();
  const { trip, destinations } = result;

  const [t, tc, tm, tCommon] = await Promise.all([
    getTranslations("tripPage"),
    getTranslations("cards"),
    getTranslations("months"),
    getTranslations("common"),
  ]);

  // Suggested accommodation — hotels for the trip's first destination — and the
  // closing "similar experiences" band. Independent, so fetch them together.
  const [suggestedHotels, similarTrips] = await Promise.all([
    destinations[0]
      ? getHotelsForDestination(destinations[0].slug).then((h) => h.slice(0, 3))
      : Promise.resolve([]),
    getSimilarTrips(slug),
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
            <Fact label={t("when")} value={whenValue} tone={1} />
            <Fact label={t("price")} value={priceValue} tone={2} />
            <Fact label={t("howLong")} value={howLongValue} tone={3} />
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
                    <span style={{ display: "block", fontFamily: "var(--wf-font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--wf-coral-600)" }}>
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

      {/* Important notes (ВАЖНИ НАПОМЕНИ) */}
      {(trip.included.length > 0 || trip.notIncluded.length > 0 || trip.visaNotes) && (
        <section style={{ background: "var(--wf-cream)", padding: "clamp(40px, 6vw, 72px) 0 clamp(48px, 7vw, 72px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <div style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}>
              <SectionHead eyebrow={t("onThisJourney")} title={t("importantNotes")} align="center" />
            </div>
            <div className="wf-grid wf-grid-3">
              {trip.included.length > 0 && <NotesCol title={t("included")} items={trip.included} />}
              {trip.notIncluded.length > 0 && <NotesCol title={t("notIncluded")} items={trip.notIncluded} />}
              {trip.visaNotes && (
                <div>
                  <SubHead>{t("visaNotes")}</SubHead>
                  <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "var(--wf-ink-700)", whiteSpace: "pre-line" }}>{trip.visaNotes}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Make this itinerary yours (enquire, pre-filled with this trip) */}
      <section style={{ background: "var(--wf-cream)", padding: "0 0 clamp(48px, 7vw, 72px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          <div style={{ background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)", borderRadius: "var(--wf-radius-md)", padding: "clamp(32px, 6vw, 56px)", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 500,
                fontSize: "clamp(24px, 3.6vw, 36px)",
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {t("makeYoursTitle")}
            </h2>
            <p style={{ fontSize: "clamp(15px, 1.9vw, 17px)", lineHeight: 1.7, color: "rgba(245,245,245,0.85)", maxWidth: 620, margin: "16px auto clamp(24px, 4vw, 32px)" }}>
              {t("makeYoursBody")}
            </p>
            <EnquireButton trip={trip.slug} destination={destinations[0]?.title} size="lg">
              {tCommon("planMyTrip")}
            </EnquireButton>
          </div>
        </div>
      </section>

      {/* Suggested accommodation (ПРЕДЛОГ СМЕСТУВАЊЕ) */}
      {suggestedHotels.length > 0 && (
        <section style={{ background: "var(--wf-cream)", padding: "0 0 clamp(56px, 8vw, 88px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <div style={{ marginBottom: 36 }}>
              <SectionHead eyebrow={t("onThisJourney")} title={t("suggestedStay")} />
            </div>
            <HotelGrid items={suggestedHotels} />
          </div>
        </section>
      )}

      {/* Similar experiences — the dark carousel band, same as the home page. */}
      <TripsCarousel trips={similarTrips} title={t("similarExperiences")} />

      {/* Closing "view all trips" — secondary to the enquiry CTA above, so
          outline rather than accent. */}
      <section style={{ background: "var(--wf-cream)", padding: "clamp(44px, 6vw, 68px) 0 clamp(64px, 9vw, 104px)" }}>
        <div className="wf-wrap wf-wrap--wide" style={{ textAlign: "center" }}>
          <Link href="/trip-finder/results" style={{ textDecoration: "none", display: "inline-block" }}>
            <Button as="span" variant="outline" size="lg">
              {t("viewAll")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontFamily: "var(--wf-font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--wf-coral-600)", margin: "0 0 14px" }}>
      {children}
    </h3>
  );
}

function NotesCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <SubHead>{title}</SubHead>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((it) => (
          <li key={it} style={{ fontSize: 15.5, lineHeight: 1.55, color: "var(--wf-ink-700)" }}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

type FactTone = 1 | 2 | 3;

function Fact({ label, value, tone = 1 }: { label: string; value: string; tone?: FactTone }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--wf-font-sans)",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: `var(--wf-fact-${tone})`,
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
