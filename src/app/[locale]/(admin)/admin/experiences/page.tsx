import { AdminList } from "@/components/admin/AdminList";
import { listExperiences } from "@/lib/queries/admin";
import { deleteExperience } from "./actions";

export default async function AdminExperiencesPage() {
  const rows = await listExperiences();
  return (
    <AdminList
      title="Experiences"
      newHref="/admin/experiences/new"
      newLabel="New experience"
      deleteAction={deleteExperience}
      emptyText="No experiences yet."
      rows={rows.map((e) => ({
        id: e.id,
        primary: e.title,
        secondary: e.eyebrow,
        published: e.published,
        editHref: `/admin/experiences/${e.id}`,
      }))}
    />
  );
}
