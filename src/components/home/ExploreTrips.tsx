import { getTranslations } from "next-intl/server";
import { TripsCarousel } from "@/components/sections/TripsCarousel";
import type { Trip } from "@/content/types";

/**
 * ExploreTrips — the home "explore our trips" band. Thin wrapper that feeds the
 * shared dark trips carousel its intro copy.
 */
export async function ExploreTrips({ trips }: { trips: Trip[] }) {
  if (trips.length === 0) return null;
  const t = await getTranslations("explore");

  return (
    <TripsCarousel
      trips={trips}
      title={t("title")}
      description={t("subtitle")}
      backgroundImage="/images/Landing1.png"
    />
  );
}
