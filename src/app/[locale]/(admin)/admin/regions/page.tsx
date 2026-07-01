import { AdminList } from "@/components/admin/AdminList";
import { listRegions } from "@/lib/queries/regions";
import { deleteRegion } from "./actions";

export default async function AdminRegionsPage() {
  const rows = await listRegions();
  return (
    <AdminList
      title="Regions"
      newHref="/admin/regions/new"
      newLabel="New region"
      deleteAction={deleteRegion}
      emptyText="No regions yet."
      rows={rows.map((r) => ({
        id: r.id,
        primary: r.label,
        secondary: r.slug,
        published: r.published,
        editHref: `/admin/regions/${r.id}`,
      }))}
    />
  );
}
