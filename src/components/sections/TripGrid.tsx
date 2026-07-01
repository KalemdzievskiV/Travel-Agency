"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { DestinationCard } from "@/components/ui";
import type { Trip } from "@/content/types";

/**
 * Grid of trips, styled with the signature card. Navigates to each trip's
 * detail page. Reused on the trips listing and elsewhere.
 */
export function TripGrid({
  items,
  height = 420,
  columns = 3,
}: {
  items: Trip[];
  height?: number;
  columns?: 2 | 3 | 4;
}) {
  const router = useRouter();
  const tr = useTranslations("cards");
  return (
    <div className={`wf-grid wf-grid-${columns}`}>
      {items.map((trip) => (
        <DestinationCard
          key={trip.slug}
          grad={trip.grad}
          image={trip.image}
          region={tr("itinerary")}
          title={trip.title}
          price={trip.priceFrom}
          badge={trip.durationDays ? tr("days", { count: trip.durationDays }) : undefined}
          height={height}
          onClick={() => router.push(`/trips/${trip.slug}`)}
        />
      ))}
    </div>
  );
}
