import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui";
import {
  getTrip,
  listDestinations,
  getTripDestinationIds,
} from "@/lib/queries/admin";
import { TripForm } from "../TripForm";

export default async function EditTripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trip = await getTrip(Number(id));
  if (!trip) notFound();

  const [destinations, selectedIds] = await Promise.all([
    listDestinations(),
    getTripDestinationIds(trip.id),
  ]);

  return (
    <>
      <PageHeader title={trip.title} back={{ href: "/admin/trips", label: "Trips" }} />
      <TripForm
        trip={trip}
        allDestinations={destinations.map((d) => ({
          id: d.id,
          title: d.title,
          region: d.region,
        }))}
        selectedIds={selectedIds}
      />
    </>
  );
}
