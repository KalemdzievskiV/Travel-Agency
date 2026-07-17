import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { getLocale } from "next-intl/server";
import { db } from "@/db";
import { hotels as hotelsTable, destinations as destinationsTable } from "@/db/schema";
import type { Hotel, HotelDetail } from "@/content/types";

type HotelRow = typeof hotelsTable.$inferSelect;

async function localeIsMk(): Promise<boolean> {
  try {
    return (await getLocale()) === "mk";
  } catch {
    return false;
  }
}

function toHotel(r: HotelRow, mk: boolean, dest?: { slug: string; title: string }): Hotel {
  const pick = (en: string, mkVal: string | null | undefined) => (mk && mkVal ? mkVal : en);
  return {
    slug: r.slug,
    name: pick(r.name, r.nameMk),
    teaser: pick(r.teaser, r.teaserMk),
    grad: r.grad ?? "",
    image: r.image ?? undefined,
    images: r.images,
    priceFrom: r.priceFrom,
    stars: r.stars ?? undefined,
    style: r.style,
    lat: r.lat ?? undefined,
    lng: r.lng ?? undefined,
    destinationSlug: dest?.slug,
    destinationTitle: dest?.title,
  };
}

/** Published hotels for a destination, in order — for the "Where to stay" section. */
export async function getHotelsForDestination(destinationSlug: string): Promise<Hotel[]> {
  const mk = await localeIsMk();
  const rows = await db
    .select({
      hotel: hotelsTable,
      destSlug: destinationsTable.slug,
      destTitle: destinationsTable.title,
      destTitleMk: destinationsTable.titleMk,
    })
    .from(hotelsTable)
    .innerJoin(destinationsTable, eq(hotelsTable.destinationId, destinationsTable.id))
    .where(and(eq(destinationsTable.slug, destinationSlug), eq(hotelsTable.published, true)))
    .orderBy(asc(hotelsTable.sortOrder), asc(hotelsTable.id));

  return rows.map((r) =>
    toHotel(r.hotel, mk, { slug: r.destSlug, title: mk && r.destTitleMk ? r.destTitleMk : r.destTitle }),
  );
}

/** A single hotel plus other hotels in the same destination. */
export async function getHotelBySlug(
  slug: string,
): Promise<{ hotel: HotelDetail; others: Hotel[] } | undefined> {
  const mk = await localeIsMk();
  const [row] = await db
    .select({
      hotel: hotelsTable,
      destSlug: destinationsTable.slug,
      destTitle: destinationsTable.title,
      destTitleMk: destinationsTable.titleMk,
    })
    .from(hotelsTable)
    .leftJoin(destinationsTable, eq(hotelsTable.destinationId, destinationsTable.id))
    .where(and(eq(hotelsTable.slug, slug), eq(hotelsTable.published, true)))
    .limit(1);
  if (!row) return undefined;

  const dest = row.destSlug ? { slug: row.destSlug, title: mk && row.destTitleMk ? row.destTitleMk : row.destTitle ?? "" } : undefined;
  const pick = (en: string, mkVal: string | null | undefined) => (mk && mkVal ? mkVal : en);
  const hotel: HotelDetail = {
    ...toHotel(row.hotel, mk, dest),
    description: pick(row.hotel.description, row.hotel.descriptionMk),
  };

  const others = row.hotel.destinationId
    ? (
        await db
          .select()
          .from(hotelsTable)
          .where(and(eq(hotelsTable.destinationId, row.hotel.destinationId), eq(hotelsTable.published, true)))
          .orderBy(asc(hotelsTable.sortOrder), asc(hotelsTable.id))
      )
        .filter((h) => h.slug !== slug)
        .map((h) => toHotel(h, mk, dest))
    : [];

  return { hotel, others };
}
