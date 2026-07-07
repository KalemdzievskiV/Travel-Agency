"use client";

import { useRouter } from "@/i18n/navigation";
import { DestinationCard } from "@/components/ui";
import type { Hotel } from "@/content/types";

/**
 * HotelGrid — grid of hotels using the signature card. For now each card leads
 * to the enquiry pre-filled with the hotel (a dedicated /stays detail page comes
 * with the browsable hub in a later phase).
 */
export function HotelGrid({
  items,
  columns = 3,
  height = 380,
}: {
  items: Hotel[];
  columns?: 2 | 3 | 4;
  height?: number;
}) {
  const router = useRouter();
  return (
    <div className={`wf-grid wf-grid-${columns}`}>
      {items.map((h) => (
        <DestinationCard
          key={h.slug}
          grad={h.grad}
          image={h.image}
          region={h.destinationTitle}
          title={h.name}
          badge={h.style[0]}
          price={h.priceFrom || undefined}
          rating={h.stars ? String(h.stars) : undefined}
          height={height}
          onClick={() => router.push(`/make-an-enquiry?to=${encodeURIComponent(h.name)}`)}
        />
      ))}
    </div>
  );
}
