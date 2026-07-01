"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Tag } from "@/components/ui";
import { DestinationGrid } from "./DestinationGrid";
import type { Destination } from "@/content/types";
import { feelings } from "@/content/site";

/**
 * Filterable destinations listing — chips filter by the bookit "feelings"
 * taxonomy, true to the Feelings Engine idea. Filter values stay English (they
 * match the DB taxonomy); only the labels are translated.
 */
export function DestinationsBrowser({ items }: { items: Destination[] }) {
  const tb = useTranslations("browser");
  const tf = useTranslations("feelings");
  const [sel, setSel] = React.useState("All");
  const filters = ["All", ...feelings];
  const list =
    sel === "All" ? items : items.filter((d) => d.feelings.includes(sel));
  const filterLabel = (f: string) => (f === "All" ? tb("all") : tf(f));

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          padding: "12px 0 32px",
          position: "sticky",
          top: "var(--wf-header-h)",
          background: "var(--wf-cream)",
          zIndex: 10,
        }}
      >
        {filters.map((f) => (
          <Tag key={f} selected={sel === f} onClick={() => setSel(f)}>
            {filterLabel(f)}
          </Tag>
        ))}
      </div>
      {list.length > 0 ? (
        <DestinationGrid items={list} height={380} />
      ) : (
        <p
          style={{
            padding: "48px 0",
            color: "var(--wf-ink-500)",
            fontSize: 16,
          }}
        >
          {tb("empty")}
        </p>
      )}
    </>
  );
}
