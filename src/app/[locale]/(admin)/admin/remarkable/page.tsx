import { AdminList } from "@/components/admin/AdminList";
import { listRemarkableExperiences } from "@/lib/queries/admin";
import { deleteRemarkable } from "./actions";

export default async function AdminRemarkablePage() {
  const rows = await listRemarkableExperiences();
  return (
    <AdminList
      title="Remarkable experiences"
      newHref="/admin/remarkable/new"
      newLabel="New experience"
      deleteAction={deleteRemarkable}
      emptyText="No remarkable experiences yet."
      rows={rows.map((e) => ({
        id: e.id,
        primary: e.title,
        secondary: e.teaser,
        published: e.published,
        editHref: `/admin/remarkable/${e.id}`,
      }))}
    />
  );
}
