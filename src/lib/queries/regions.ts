import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { getLocale } from "next-intl/server";
import { db } from "@/db";
import { regions as regionsTable, destinations as destinationsTable } from "@/db/schema";
import type { Region } from "@/db/schema";

async function isMk(): Promise<boolean> {
  try {
    return (await getLocale()) === "mk";
  } catch {
    return false;
  }
}

export type RegionNavItem = {
  id: number;
  slug: string;
  label: string;
  image: string | null;
  grad: string | null;
  destinations: { slug: string; title: string }[];
};

/** Published regions with their published destinations (title-sorted) — for the
 * Destinations mega-menu and the destinations page. Degrades to an empty list
 * if the regions table isn't present yet. */
export async function getRegionsWithDestinations(): Promise<RegionNavItem[]> {
  try {
    const [mk, rows] = await Promise.all([
      isMk(),
      db.query.regions.findMany({
        where: eq(regionsTable.published, true),
        orderBy: [asc(regionsTable.sortOrder), asc(regionsTable.id)],
        with: {
          destinations: {
            where: eq(destinationsTable.published, true),
            orderBy: [asc(destinationsTable.title)],
            columns: { slug: true, title: true, titleMk: true },
          },
        },
      }),
    ]);
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      label: mk && r.labelMk ? r.labelMk : r.label,
      image: r.image,
      grad: r.grad,
      destinations: r.destinations.map((d) => ({
        slug: d.slug,
        title: mk && d.titleMk ? d.titleMk : d.title,
      })),
    }));
  } catch {
    return [];
  }
}

/** All regions (for the admin + the destination region picker). */
export async function listRegions(): Promise<Region[]> {
  try {
    return await db
      .select()
      .from(regionsTable)
      .orderBy(asc(regionsTable.sortOrder), asc(regionsTable.id));
  } catch {
    return [];
  }
}

export async function getRegion(id: number): Promise<Region | undefined> {
  const [r] = await db.select().from(regionsTable).where(eq(regionsTable.id, id)).limit(1);
  return r;
}

/** A published region by slug — for the region landing page. */
export async function getRegionBySlug(slug: string): Promise<Region | undefined> {
  try {
    const [mk, [r]] = await Promise.all([
      isMk(),
      db
        .select()
        .from(regionsTable)
        .where(and(eq(regionsTable.slug, slug), eq(regionsTable.published, true)))
        .limit(1),
    ]);
    if (!r) return undefined;
    // Resolve the display label for the active locale.
    return { ...r, label: mk && r.labelMk ? r.labelMk : r.label };
  } catch {
    return undefined;
  }
}
