import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { getLocale } from "next-intl/server";
import { db } from "@/db";
import { hotels as hotelsTable, destinations as destinationsTable } from "@/db/schema";
import type { Hotel } from "@/content/types";

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
