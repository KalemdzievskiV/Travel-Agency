import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui";
import { TripGallery } from "@/components/sections/TripGallery";
import { HotelGrid } from "@/components/sections/HotelGrid";
import { EnquireButton } from "@/components/site/EnquireButton";
import { SectionHead } from "@/components/sections/SectionHead";
import { getHotelBySlug } from "@/lib/queries/hotels";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getHotelBySlug(slug);
  if (!result) return { title: "Hotel not found" };
  return { title: result.hotel.name, description: result.hotel.teaser };
}

export default async function HotelPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const result = await getHotelBySlug(slug);
  if (!result) notFound();
  const { hotel, others } = result;
  const [t, tc, tCards] = await Promise.all([
    getTranslations("hotelPage"),
    getTranslations("common"),
    getTranslations("cards"),
  ]);

  const images = hotel.images.length ? hotel.images : hotel.image ? [hotel.image] : [];

  return (
    <section style={{ background: "var(--wf-cream)", padding: "calc(var(--wf-header-h) + clamp(28px, 5vw, 48px)) 0 clamp(56px, 8vw, 96px)" }}>
      <div className="wf-wrap wf-wrap--wide">
        {/* Name + meta */}
        <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto clamp(24px, 4vw, 36px)" }}>
          {hotel.destinationTitle && <Eyebrow>{hotel.destinationTitle}</Eyebrow>}
          <h1 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: "clamp(30px, 5vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.06, margin: "14px 0 0", color: "var(--wf-ink-900)" }}>
            {hotel.name}
          </h1>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12, fontSize: 14, color: "var(--wf-ink-700)" }}>
            {hotel.stars ? <span>{"★".repeat(hotel.stars)}</span> : null}
            {hotel.priceFrom && <span>{tCards("from")} {hotel.priceFrom}</span>}
          </div>
        </div>
      </div>

      {/* Gallery */}
      {images.length > 0 && <TripGallery images={images} title={hotel.name} />}

      <div className="wf-wrap" style={{ maxWidth: 760, marginInline: "auto", textAlign: "center", paddingTop: "clamp(40px, 6vw, 64px)" }}>
        {(hotel.description || hotel.teaser) && (
          <p style={{ fontSize: "clamp(16px, 1.9vw, 18px)", lineHeight: 1.75, color: "var(--wf-ink-700)", whiteSpace: "pre-line", margin: 0 }}>
            {hotel.description || hotel.teaser}
          </p>
        )}
        {hotel.style.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 24 }}>
            {hotel.style.map((s) => (
              <span key={s} style={{ fontSize: 13, fontWeight: 500, color: "var(--wf-ink-700)", background: "var(--wf-paper)", border: "1px solid var(--wf-border-strong)", borderRadius: "var(--wf-radius-pill)", padding: "7px 16px" }}>{s}</span>
            ))}
          </div>
        )}
        <div style={{ marginTop: "clamp(28px, 4vw, 40px)" }}>
          <EnquireButton destination={hotel.name} size="lg">{tc("planMyTrip")}</EnquireButton>
        </div>
      </div>

      {/* Other hotels in the destination */}
      {others.length > 0 && (
        <div className="wf-wrap wf-wrap--wide" style={{ paddingTop: "clamp(56px, 8vw, 88px)" }}>
          <div style={{ marginBottom: 36 }}>
            <SectionHead eyebrow={t("eyebrow")} title={t("otherHotels", { place: hotel.destinationTitle ?? "" })} />
          </div>
          <HotelGrid items={others} />
        </div>
      )}
    </section>
  );
}
