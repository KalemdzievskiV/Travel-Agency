import { AdminList } from "@/components/admin/AdminList";
import { listTrips } from "@/lib/queries/admin";
import { deleteTrip } from "./actions";

export default async function AdminTripsPage() {
  const rows = await listTrips();
  return (
    <AdminList
      title="Trips"
      newHref="/admin/trips/new"
      newLabel="New trip"
      deleteAction={deleteTrip}
      emptyText="No trips yet."
      rows={rows.map((t) => ({
        id: t.id,
        primary: t.title,
        secondary: [
          t.durationDays ? `${t.durationDays} days` : null,
          t.priceFrom || null,
        ]
          .filter(Boolean)
          .join(" · "),
        published: t.published,
        editHref: `/admin/trips/${t.id}`,
      }))}
    />
  );
}
