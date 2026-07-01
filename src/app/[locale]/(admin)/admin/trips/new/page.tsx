import { PageHeader } from "@/components/admin/ui";
import { listDestinations } from "@/lib/queries/admin";
import { getAllFilterGroups } from "@/lib/queries/filters";
import { TripForm } from "../TripForm";

export default async function NewTripPage() {
  const [destinations, filterGroups] = await Promise.all([
    listDestinations(),
    getAllFilterGroups(),
  ]);
  return (
    <>
      <PageHeader title="New trip" back={{ href: "/admin/trips", label: "Trips" }} />
      <TripForm
        allDestinations={destinations.map((d) => ({
          id: d.id,
          title: d.title,
          region: d.region,
        }))}
        filterGroups={filterGroups}
      />
    </>
  );
}
