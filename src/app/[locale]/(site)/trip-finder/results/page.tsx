import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TripGrid } from "@/components/sections/TripGrid";
import { TripFinderResults } from "@/components/sections/TripFinderResults";
import { type FilterGroupUI } from "@/components/sections/TripFilters";
import { getTripsWithFacets, getTripDestinationOptions } from "@/lib/queries/public";
import { getFilterGroups, getFeelingOptions, derivedGroups, localisedLabel } from "@/lib/queries/filters";
import { months as monthKeys } from "@/content/site";

export const metadata: Metadata = {
  title: "Trip finder",
  description:
    "Tell us how you want to feel and when you want to travel — filter every tailor-made journey we run and find the ones that fit.",
};

const priceOf = (p: string) => Number((p || "").replace(/[^0-9]/g, "")) || 0;

export default async function TripFinderPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [trips, taxonomy, feelingOptions, destOptions, tf, tMonth] = await Promise.all([
    getTripsWithFacets(),
    getFilterGroups(),
    getFeelingOptions(),
    getTripDestinationOptions(),
    getTranslations("filters"),
    getTranslations("months"),
  ]);
  const mk = locale === "mk";
  const sp = await searchParams;

  // Translate DB/derived filter labels where a translation exists, else keep the
  // stored label. A Macedonian label set in the admin beats the dictionary.
  const groupLabel = (key: string, fallback: string) => (tf.has(`groups.${key}`) ? tf(`groups.${key}`) : fallback);
  const optionLabel = (groupKey: string, optKey: string, fallback: string) =>
    tf.has(`${groupKey}.${optKey}`) ? tf(`${groupKey}.${optKey}`) : fallback;

  // Finder facets (feeling, when) first, then editorial taxonomy, then the
  // derived duration/price bands.
  const groups: FilterGroupUI[] = [
    {
      key: "feeling",
      label: tf("feeling"),
      // Straight from Admin → Filters → Feeling, as in the finder dropdowns.
      options: feelingOptions,
    },
    {
      key: "when",
      label: tf("when"),
      options: monthKeys.map((m) => ({ key: m, label: tMonth.has(m) ? tMonth(m) : m })),
    },
    ...(destOptions.length > 0 ? [{ key: "destination", label: tf("destination"), options: destOptions }] : []),
    // Editorial taxonomy groups, minus the ones built above (the Feeling group
    // is already the first facet).
    ...taxonomy
      .filter((g) => g.options.length > 0 && g.key !== "feeling" && g.key !== "when")
      .map((g) => ({
        key: g.key,
        label: groupLabel(g.key, g.label),
        options: g.options.map((o) => ({
          key: o.key,
          label: mk && o.labelMk ? localisedLabel(o, mk) : optionLabel(g.key, o.key, o.label),
        })),
      })),
    ...derivedGroups.map((g) => ({ key: g.key, label: groupLabel(g.key, g.label), options: g.options.map((o) => ({ key: o.key, label: optionLabel(g.key, o.key, o.label) })) })),
  ];

  // Selected options per group from the URL (comma-separated), then filter:
  // OR within a group, AND across groups.
  const selected = groups
    .map((g) => {
      const raw = sp[g.key];
      const val = typeof raw === "string" ? raw : Array.isArray(raw) ? raw.join(",") : "";
      // Feeling keys are lower-case; older links carried "Freedom" etc.
      const opts = val.split(",").filter(Boolean);
      return [g.key, g.key === "feeling" ? opts.map((o) => o.toLowerCase()) : opts] as const;
    })
    .filter(([, opts]) => opts.length > 0);

  const filtered = trips.filter((trip) =>
    selected.every(([gk, opts]) => opts.some((ok) => trip.facets.includes(`${gk}:${ok}`))),
  );

  // Sort per the ?sort= param; default keeps the editorial order.
  const sortKey = typeof sp.sort === "string" ? sp.sort : "";
  const sorted = [...filtered];
  if (sortKey === "price-asc") sorted.sort((a, b) => priceOf(a.priceFrom) - priceOf(b.priceFrom));
  else if (sortKey === "price-desc") sorted.sort((a, b) => priceOf(b.priceFrom) - priceOf(a.priceFrom));
  else if (sortKey === "duration-asc") sorted.sort((a, b) => (a.durationDays ?? 0) - (b.durationDays ?? 0));
  else if (sortKey === "duration-desc") sorted.sort((a, b) => (b.durationDays ?? 0) - (a.durationDays ?? 0));

  return (
    <TripFinderResults groups={groups} count={sorted.length}>
      {sorted.length > 0 ? (
        <TripGrid items={sorted} columns={4} />
      ) : (
        <p style={{ color: "var(--wf-ink-500)" }}>{tf("none")}</p>
      )}
    </TripFinderResults>
  );
}
