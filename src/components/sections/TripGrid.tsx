"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { DestinationCard } from "@/components/ui";
import { displayPrice, showsSaleBadge } from "@/content/pricing";
import type { Trip } from "@/content/types";

/**
 * Grid of trips, styled with the signature card. Navigates to each trip's
 * detail page. Reused on the trips listing and elsewhere.
 */
export function TripGrid({
  items,
  ratio,
  columns = 4,
  fitToItems = true,
}: {
  items: Trip[];
  /** Card shape; defaults to the shared portrait ratio on DestinationCard. */
  ratio?: string;
  columns?: 2 | 3 | 4;
  /**
   * Widen the cards to fill the row when there are fewer items than columns.
   * On by default; the sale listing turns it off, where a lone item was
   * stretching one card across half the page.
   */
  fitToItems?: boolean;
}) {
  const router = useRouter();
  const tr = useTranslations("cards");
  // Don't leave an empty column: fewer items than columns squeezed every card
  // into a narrow slot and made them read small. Callers that would rather keep
  // the cards their normal size pass fitToItems={false}.
  const cols = fitToItems ? Math.max(2, Math.min(columns, items.length)) : columns;
  return (
    <div className={`wf-grid wf-grid-${cols}`}>
      {items.map((trip) => (
        <DestinationCard
          key={trip.slug}
          grad={trip.grad}
          image={trip.image}
          region={tr("itinerary")}
          title={trip.title}
          price={displayPrice(trip) || undefined}
          onSale={showsSaleBadge(trip)}
          badge={trip.durationDays ? tr("days", { count: trip.durationDays }) : undefined}
          ratio={ratio}
          onClick={() => router.push(`/trips/${trip.slug}`)}
        />
      ))}
    </div>
  );
}
