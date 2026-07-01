import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TripFinder } from "@/components/sections/TripFinder";
import { getDestinations } from "@/lib/queries/public";

export const metadata: Metadata = {
  title: "Trip finder",
  description:
    "Tell us how you want to feel and when you want to travel — the Feelings Engine finds the journeys that fit.",
};

export default async function TripFinderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const destinations = await getDestinations();
  return <TripFinder destinations={destinations} />;
}
