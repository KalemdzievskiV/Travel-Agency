"use client";

import { useRouter } from "next/navigation";
import { DestinationCard } from "@/components/ui";
import type { Destination } from "@/content/types";

/**
 * Responsive grid of DestinationCards that navigate to each detail page.
 * Reused on home, the destinations listing and the trip finder results.
 */
export function DestinationGrid({
  items,
  height = 420,
  columns = 3,
}: {
  items: Destination[];
  height?: number;
  columns?: 2 | 3 | 4;
}) {
  const router = useRouter();
  return (
    <div className={`wf-grid wf-grid-${columns}`}>
      {items.map((d) => (
        <DestinationCard
          key={d.slug}
          grad={d.grad}
          image={d.image}
          region={d.region}
          title={d.title}
          price={d.priceFrom}
          rating={d.rating}
          badge={d.badge}
          height={height}
          onClick={() => router.push(`/destinations/${d.slug}`)}
        />
      ))}
    </div>
  );
}
