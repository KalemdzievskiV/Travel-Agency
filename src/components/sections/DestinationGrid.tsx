"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { DestinationCard } from "@/components/ui";
import type { Destination } from "@/content/types";
import { displayPrice, showsSaleBadge } from "@/content/pricing";

/**
 * Responsive grid of DestinationCards that navigate to each detail page.
 * Reused on home, the destinations listing and the trip finder results.
 */
export function DestinationGrid({
  items,
  ratio,
  columns = 4,
  fitToItems = true,
  scrollOnMobile = false,
}: {
  items: Destination[];
  /** Card shape; defaults to the shared portrait ratio on DestinationCard. */
  ratio?: string;
  columns?: 2 | 3 | 4;
  /**
   * Widen the cards to fill the row when there are fewer items than columns.
   * On by default; the sale listing turns it off, where a lone item was
   * stretching one card across half the page.
   */
  fitToItems?: boolean;
  /**
   * Below 640px, lay the cards out as a horizontal swipe row rather than a
   * single stacked column — the client's "да се постават лево десно" note.
   * Off by default: the listing pages want the grid at every width.
   */
  scrollOnMobile?: boolean;
}) {
  const router = useRouter();
  const t = useTranslations("cards");
  const tm = useTranslations("months");
  // Fall back to the raw value for any month not in the dictionary.
  const monthLabel = (m: string) => (tm.has(m) ? tm(m) : m);
  // Don't leave an empty column: fewer items than columns squeezed every card
  // into a narrow slot and made them read small. Callers that would rather keep
  // the cards their normal size pass fitToItems={false}.
  const cols = fitToItems ? Math.max(2, Math.min(columns, items.length)) : columns;
  return (
    <div className={`wf-grid wf-grid-${cols}${scrollOnMobile ? " wf-grid--scroll" : ""}`}>
      {items.map((d) => (
        <DestinationCard
          key={d.slug}
          grad={d.grad}
          image={d.image}
          region={d.region}
          title={d.title}
          badge={d.badge}
          price={displayPrice(d) || undefined}
          onSale={showsSaleBadge(d)}
          meta={
            d.bestMonths.length
              // Middle dots, not commas, per the client's correction:
              // "Најдобро време: октомври · ноември · март · април".
              ? t("best", { months: d.bestMonths.map(monthLabel).join(" · ") })
              : undefined
          }
          ratio={ratio}
          onClick={() => router.push(`/destinations/${d.slug}`)}
        />
      ))}
    </div>
  );
}
