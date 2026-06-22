"use client";

import { useRouter } from "next/navigation";
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
  return (
    <div className={`wf-grid wf-grid-${columns}`}>
      {items.map((t) => (
        <DestinationCard
          key={t.slug}
          grad={t.grad}
          image={t.image}
          region="Itinerary"
          title={t.title}
          price={t.priceFrom}
          badge={t.durationDays ? `${t.durationDays} days` : undefined}
          height={height}
          onClick={() => router.push(`/trips/${t.slug}`)}
        />
      ))}
    </div>
  );
}
