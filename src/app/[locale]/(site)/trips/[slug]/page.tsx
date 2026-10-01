import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button, Eyebrow } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "@/components/sections/SectionHead";
import { TripsCarousel } from "@/components/sections/TripsCarousel";
import { HotelGrid } from "@/components/sections/HotelGrid";
import { type MapStop, type MapDay } from "@/components/trips/showcase-shared";
import { TripShowcase } from "@/components/trips/TripShowcase";
import { TripExcursions } from "@/components/trips/TripExcursions";
import { EnquireButton } from "@/components/site/EnquireButton";
import { getTripWithDestinations, getSimilarTrips } from "@/lib/queries/public";
import { getHotelsForDestination } from "@/lib/queries/hotels";
import { parseItinerary, dayLabel } from "@/lib/itinerary";
import { months as MONTHS } from "@/content/site";
import { formatPrice } from "@/content/pricing";
import { backdrop, ctaPlasterPanel, pageBackdrop, plainBand } from "@/content/media";

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

  // "Where we'd stay" — hotels for the trip's first destination — and the
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
  // On sale: the normal price struck through with the sale price under it —
  // the trip page is the one place the client wants both shown (3.2).
  const salePrice = trip.onSale ? formatPrice(trip.salePriceFrom) : "";
  const regularPrice = formatPrice(trip.priceFrom);
  const priceValue: React.ReactNode =
    salePrice && regularPrice ? (
      <>
        <s style={{ color: "var(--wf-ink-400)", textDecorationThickness: 1 }}>{regularPrice}</s>
        <span style={{ display: "block", marginTop: 4, color: "var(--wf-accent)" }}>{salePrice}</span>
      </>
    ) : (
      salePrice || regularPrice || t("onEnquiry")
    );
  const howLongValue = trip.durationDays ? tc("days", { count: trip.durationDays }) : "—";

  // Gallery — fall back to the hero image if no gallery has been added.
  const galleryImages = trip.images.length ? trip.images : trip.image ? [trip.image] : [];
  // A still image shown beside the itinerary while the map is hidden.
  const staticImg = galleryImages[1] ?? galleryImages[0] ?? trip.image ?? "";

  // Route map. Each itinerary line can carry its own place + coordinates, in
  // Macedonian or English (see lib/itinerary.ts for the forms it accepts):
  //   "Ден 1 - 3 Скопје | 41.99 | 21.43 | Краток опис"
  // giving true city-to-city stops in itinerary order (so a single-country trip
  // can still move between cities). A line without coordinates is a description
  // day that stays at the previous stop. Trips whose itinerary has no coordinates
  // fall back to country-level pins from the linked destinations, so older,
  // free-text itineraries keep working.
  //
  // Day labels are rebuilt from the numbers in the reader's language, so a line
  // typed "Ден 1 - 3" reads "Days 1–3" in English. A line without a day number
  // continues from the one before it ("Ден 1 - 3", then "Ден 4").
  const dayWords = { day: t("day"), days: t("days") };
  const parsed = parseItinerary(trip.itinerary).map((p) => ({
    ...p,
    label: p.from != null ? dayLabel(p.from, p.to, dayWords) : null,
  }));
  const hasStructured = parsed.some((p) => p.lat != null && p.lng != null);

  let stops: MapStop[] = [];
  let days: MapDay[] = [];

  if (hasStructured) {
    let cur = -1;
    const dayStop = parsed.map((p) => {
      if (p.lat != null && p.lng != null) {
        stops.push({ name: p.place || `Stop ${stops.length + 1}`, slug: "", lat: p.lat, lng: p.lng });
        cur = stops.length - 1;
      }
      return cur;
    });
    days = parsed.map((p, i) => ({ n: p.n, text: p.body || p.place, stopIndex: Math.max(0, dayStop[i]), label: p.label }));
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
      days = parsed.map((p, i) => ({
        n: p.n,
        label: p.label,
        text: [p.place, p.body].filter(Boolean).join(" — "),
        stopIndex: anyMatch ? Math.max(0, Math.min(matched[i], stops.length - 1)) : Math.floor((i / n) * stops.length),
      }));
    } else {
      days = geoDests.map((d, i) => ({ n: i + 1, text: d.teaser || d.intro || d.title, stopIndex: i }));
    }
  }

  return (
    <>
      {/* Header — title + facts row. Back to flat white in 3.2, which reverses
          the 3.1 note that put a board here: "во програма само кај текстот, не
          кај насловот". The backdrop starts one section down, under the intro
          copy and Програма. */}
      <section
        style={{
          ...plainBand,
          padding: "clamp(28px, 4vw, 44px) 0 clamp(36px, 5vw, 56px)",
          textAlign: "center",
        }}
      >
        <div className="wf-wrap" style={{ maxWidth: 900, marginInline: "auto" }}>
          {destinations[0] && <Eyebrow>{destinations[0].title}</Eyebrow>}
          <h1
            style={{
              fontFamily: "var(--wf-font-display)",
              fontWeight: 400,
              fontSize: "clamp(30px, 5.2vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "0",
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

      {/* Gallery + itinerary: intro text, then a sticky map/gallery panel beside
          the day-by-day list, switched by the Карта / Галерија buttons. */}
      <TripShowcase
        images={galleryImages}
        title={trip.title}
        grad={trip.grad || ""}
        staticImg={staticImg}
        stops={stops}
        days={days}
        labels={{
          eyebrow: t("onThisJourney"),
          itinerary: t("itineraryHeading"),
          gallery: t("galleryHeading"),
          map: t("mapHeading"),
          day: t("day"),
        }}
        introText={trip.description}
      />

      {/* Optional excursions (ФАКУЛТАТИВИ) — "За ова ќе раскажуваш", per the
          client's reference videos: one photo at a time, its copy changing
          with it. Edited per trip in Admin → Trips; hidden when there are none. */}
      {trip.excursions.length > 0 && (
        <TripExcursions
          items={trip.excursions}
          labels={{
            eyebrow: t("excursionsEyebrow"),
            title: t("excursionsTitle"),
            intro: t("excursionsIntro"),
            perPerson: t("excursionsPerPerson"),
            note: t("excursionsNote"),
            noteSub: t("excursionsNoteSub"),
            prev: t("excursionsPrev"),
            next: t("excursionsNext"),
          }}
        />
      )}

      {/* What you need to know (ШТО ТРЕБА ДА ЗНАЕШ) — D4, per 3.2. Three
          cards after the client's reference video (IMG_0299): included on
          ink, not included on the light frame, visa and entry on the orange.
          Side by side on desktop, stacked on phones. */}
      {(trip.included.length > 0 || trip.notIncluded.length > 0 || trip.visaNotes) && (
        <section style={{ ...pageBackdrop("d4"), padding: "clamp(40px, 6vw, 72px) 0 clamp(48px, 7vw, 72px)" }}>
          <div className="wf-wrap wf-wrap--wide">
            <div style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}>
              <SectionHead eyebrow={t("beforeYouGo")} title={t("importantNotes")} intro={t("notesIntro")} />
            </div>
            <div className="wf-notes">
              {trip.included.length > 0 && (
                <NotesCard
                  tone="dark"
                  eyebrow={t("includedEyebrow")}
                  title={t("includedTitle")}
                  sub={t("includedSub")}
                  rows={trip.included.map((text) => ({ text }))}
                />
              )}
              {trip.notIncluded.length > 0 && (
                <NotesCard
                  tone="light"
                  eyebrow={t("notIncludedEyebrow")}
                  title={t("notIncludedTitle")}
                  sub={t("notIncludedSub")}
                  rows={trip.notIncluded.map((text) => ({ text }))}
                />
              )}
              {trip.visaNotes && (
                <NotesCard
                  tone="accent"
                  eyebrow={t("visaEyebrow")}
                  title={t("visaTitle")}
                  sub={t("visaSub")}
                  rows={visaRows(trip.visaNotes)}
                />
              )}
            </div>
            {/* Payment currency, in the accent, under the three cards (3.2). */}
            <p className="wf-notes__payment">{t("paymentNote")}</p>
          </div>
        </section>
      )}

      {/* Make this itinerary yours (enquire, pre-filled with this trip). No
          board: the brief names only the text and the notes on a programme,
          and the card below carries the blue plaster of its own. */}
      <section style={{ ...plainBand, padding: "0 0 clamp(48px, 7vw, 72px)" }}>
        <div className="wf-wrap wf-wrap--wide">
          {/* The client's blue plaster (image 21) behind this card, ink field
              underneath it so the card still reads if the texture is slow. */}
          <div style={{ background: ctaPlasterPanel, color: "var(--wf-text-on-dark)", borderRadius: "var(--wf-radius-md)", padding: "clamp(32px, 6vw, 56px)", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--wf-font-display)",
                fontWeight: 400,
                fontSize: "clamp(24px, 3.6vw, 36px)",
                letterSpacing: "0",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {t("makeYoursTitle")}
            </h2>
            <p style={{ fontSize: "clamp(15px, 1.9vw, 17px)", lineHeight: 1.7, color: "rgba(245,245,245,0.85)", maxWidth: 620, margin: "16px auto clamp(24px, 4vw, 32px)" }}>
              {t("makeYoursBody")}
            </p>
            <EnquireButton trip={trip.slug} destination={destinations[0]?.title} size="lg" className="wf-cta-mono--light">
              {tCommon("planMyTrip")}
            </EnquireButton>
          </div>
        </div>
      </section>

      {/* Where we'd stay (КАДЕ БИ ОДСЕДНАЛЕ НИЕ) — plain white: a
          programme carries two boards now, D3 on the text and D4 on the
          notes, and nothing else. */}
      {suggestedHotels.length > 0 && (
        <section
          style={{
            ...plainBand,
            padding: "clamp(40px, 6vw, 64px) 0 clamp(56px, 8vw, 88px)",
          }}
        >
          <div className="wf-wrap wf-wrap--wide">
            <div style={{ marginBottom: 36 }}>
              <SectionHead eyebrow={t("onThisJourney")} title={t("suggestedStay")} />
            </div>
            <HotelGrid items={suggestedHotels} scrollOnMobile />
          </div>
        </section>
      )}

      {/* Similar experiences — the dark carousel band, same as the home page. */}
      <TripsCarousel trips={similarTrips} title={t("similarExperiences")} backgroundImage={backdrop.dark} />

      {/* Closing "view all trips" — secondary to the enquiry CTA above, so
          outline rather than accent. */}
      <section style={{ ...plainBand, padding: "clamp(44px, 6vw, 68px) 0 clamp(64px, 9vw, 104px)" }}>
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

/**
 * Visa & entry notes as rows. Each line of the admin field is one row, and a
 * line written "Label | text" (e.g. "Пасош | Провери ја важноста…") gets its
 * label above the text, as in the client's reference. Plain prose still works:
 * it becomes a single row.
 */
function visaRows(notes: string): NoteRow[] {
  return notes
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const k = l.indexOf("|");
      return k > 0 ? { label: l.slice(0, k).trim(), text: l.slice(k + 1).trim() } : { text: l };
    });
}

type NoteRow = { label?: string; text: string };

/**
 * One card of the "what you need to know" trio. The tone sets the whole card —
 * ink, the light frame, or the orange — and the styling lives on the
 * `wf-note` classes in responsive.css. The title ends on a full stop in the
 * accent (ink on the orange card, where the accent would vanish).
 */
function NotesCard({
  tone,
  eyebrow,
  title,
  sub,
  rows,
}: {
  tone: "dark" | "light" | "accent";
  eyebrow: string;
  title: string;
  sub: string;
  rows: NoteRow[];
}) {
  return (
    <article className={`wf-note wf-note--${tone}`}>
      <p className="wf-note__eyebrow">{eyebrow}</p>
      <h3 className="wf-note__title">
        {title}
        <span className="wf-note__dot">.</span>
      </h3>
      <p className="wf-note__sub">{sub}</p>
      <ul className="wf-note__list">
        {rows.map((r, k) => (
          <li key={k}>
            {r.label && <span className="wf-note__label">{r.label}</span>}
            {r.text}
          </li>
        ))}
      </ul>
    </article>
  );
}

type FactTone = 1 | 2 | 3;

function Fact({ label, value, tone = 1 }: { label: string; value: React.ReactNode; tone?: FactTone }) {
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
