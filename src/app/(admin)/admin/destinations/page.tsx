import { AdminList } from "@/components/admin/AdminList";
import { listDestinations } from "@/lib/queries/admin";
import { deleteDestination } from "./actions";

export default async function AdminDestinationsPage() {
  const rows = await listDestinations();
  return (
    <AdminList
      title="Destinations"
      newHref="/admin/destinations/new"
      newLabel="New destination"
      deleteAction={deleteDestination}
      emptyText="No destinations yet. Create your first one."
      rows={rows.map((d) => ({
        id: d.id,
        primary: d.title,
        secondary: `${d.region}${d.priceFrom ? ` · ${d.priceFrom}` : ""}`,
        published: d.published,
        editHref: `/admin/destinations/${d.id}`,
      }))}
    />
  );
}
