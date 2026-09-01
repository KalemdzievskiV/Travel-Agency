"use client";

import { useRouter } from "@/i18n/navigation";
import { DestinationCard } from "@/components/ui";
import type { Hotel } from "@/content/types";

/**
 * HotelGrid — grid of hotels using the signature card. Each card opens the
 * hotel's detail page.
 */
export function HotelGrid({
  items,
  columns = 4,
  ratio,
  scrollOnMobile = false,
}: {
  items: Hotel[];
  columns?: 2 | 3 | 4;
  /** Card shape; defaults to the shared portrait ratio on DestinationCard. */
  ratio?: string;
  /**
   * Below 640px, lay the cards out as a horizontal swipe row rather than a
   * single stacked column — the client's "да се постават лево десно" note.
   * Off by default: the listing pages want the grid at every width.
   */
  scrollOnMobile?: boolean;
}) {
  const router = useRouter();
  // Don't leave an empty column: fewer items than columns squeezed every
  // card into a narrow slot and made them read small.
  const cols = Math.max(2, Math.min(columns, items.length));
  return (
    <div className={`wf-grid wf-grid-${cols}${scrollOnMobile ? " wf-grid--scroll" : ""}`}>
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
          ratio={ratio}
          onClick={() => router.push(`/hotels/${h.slug}`)}
        />
      ))}
    </div>
  );
}
