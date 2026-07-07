import { AdminList } from "@/components/admin/AdminList";
import { listHotels } from "@/lib/queries/admin";
import { deleteHotel } from "./actions";

export default async function AdminHotelsPage() {
  const rows = await listHotels();
  return (
    <AdminList
      title="Hotels"
      newHref="/admin/hotels/new"
      newLabel="New hotel"
      deleteAction={deleteHotel}
      emptyText="No hotels yet."
      rows={rows.map((h) => ({
        id: h.id,
        primary: h.name,
        secondary: h.teaser,
        published: h.published,
        editHref: `/admin/hotels/${h.id}`,
      }))}
    />
  );
}
