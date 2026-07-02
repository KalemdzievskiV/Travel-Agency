import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TripFinderLanding } from "@/components/sections/TripFinderLanding";

export const metadata: Metadata = {
  title: "Trip finder",
  description:
    "Tell us how you want to feel and when you want to travel — the trip finder points you to the journeys that fit.",
};

export default async function TripFinderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TripFinderLanding />;
}
