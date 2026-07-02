"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Icon } from "@/components/ui";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import type { Destination } from "@/content/types";

/**
 * CountryGrid — a DestinationGrid that shows only the first `initialCount`
 * countries and reveals the rest behind a "Show more" toggle. Used on the
 * region landing page so a country-heavy region doesn't dump every card at once.
 */
export function CountryGrid({
  items,
  initialCount = 6,
}: {
  items: Destination[];
  initialCount?: number;
}) {
  const t = useTranslations("regionPage");
  const [expanded, setExpanded] = useState(false);

  const hasMore = items.length > initialCount;
  const shown = expanded || !hasMore ? items : items.slice(0, initialCount);

  return (
    <>
      <DestinationGrid items={shown} />
      {hasMore && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(28px, 4vw, 44px)" }}>
          <Button
            variant="outline"
            onClick={() => setExpanded((v) => !v)}
            iconRight={
              <span
                style={{
                  display: "inline-flex",
                  transition: "transform var(--wf-dur-fast) var(--wf-ease-out)",
                  transform: expanded ? "rotate(180deg)" : "none",
                }}
              >
                <Icon name="chevron" size={16} />
              </span>
            }
          >
            {expanded ? t("showLess") : t("showMore")}
          </Button>
        </div>
      )}
    </>
  );
}
