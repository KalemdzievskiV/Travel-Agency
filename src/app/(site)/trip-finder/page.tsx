import type { Metadata } from "next";
import { TripFinder } from "@/components/sections/TripFinder";
import { getDestinations } from "@/lib/queries/public";

export const metadata: Metadata = {
  title: "Trip finder",
  description:
    "Tell us how you want to feel and when you want to travel — the Feelings Engine finds the journeys that fit.",
};

export default async function TripFinderPage() {
  const destinations = await getDestinations();
  return <TripFinder destinations={destinations} />;
}
