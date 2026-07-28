"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { DestinationCard } from "@/components/ui";
import type { Destination } from "@/content/types";

/**
 * Responsive grid of DestinationCards that navigate to each detail page.
 * Reused on home, the destinations listing and the trip finder results.
 */
export function DestinationGrid({
  items,
  ratio,
  columns = 4,
}: {
  items: Destination[];
  /** Card shape; defaults to the shared portrait ratio on DestinationCard. */
  ratio?: string;
  columns?: 2 | 3 | 4;
}) {
  const router = useRouter();
  const t = useTranslations("cards");
  const tm = useTranslations("months");
  // Fall back to the raw value for any month not in the dictionary.
  const monthLabel = (m: string) => (tm.has(m) ? tm(m) : m);
  // Don't leave an empty column: fewer items than columns squeezed every
  // card into a narrow slot and made them read small.
  const cols = Math.max(2, Math.min(columns, items.length));
  return (
    <div className={`wf-grid wf-grid-${cols}`}>
      {items.map((d) => (
        <DestinationCard
          key={d.slug}
          grad={d.grad}
          image={d.image}
          region={d.region}
          title={d.title}
          badge={d.badge}
          meta={
            d.bestMonths.length
              ? t("best", { months: d.bestMonths.map(monthLabel).join(", ") })
              : undefined
          }
          ratio={ratio}
          onClick={() => router.push(`/destinations/${d.slug}`)}
        />
      ))}
    </div>
  );
}
