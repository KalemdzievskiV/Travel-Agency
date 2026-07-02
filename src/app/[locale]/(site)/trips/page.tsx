import { redirect } from "@/i18n/navigation";

/**
 * The trips listing has been consolidated into the trip finder results page.
 * Keep the route as a permanent redirect so old links (and any query filters)
 * still land on the finder. Trip detail pages live at /trips/[slug].
 */
export default async function TripsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const qs = new URLSearchParams(
    Object.entries(sp).flatMap(([k, v]) =>
      v == null ? [] : Array.isArray(v) ? v.map((x) => [k, x] as [string, string]) : [[k, v] as [string, string]],
    ),
  ).toString();
  redirect({ href: qs ? `/trip-finder/results?${qs}` : "/trip-finder/results", locale });
}
