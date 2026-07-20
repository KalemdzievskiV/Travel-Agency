import { AdminList } from "@/components/admin/AdminList";
import { listExperienceCategories } from "@/lib/queries/admin";
import { deleteExperienceCategory } from "./actions";

export default async function AdminExperienceCategoriesPage() {
  const rows = await listExperienceCategories();
  return (
    <AdminList
      title="Experience categories"
      newHref="/admin/experience-categories/new"
      newLabel="New category"
      deleteAction={deleteExperienceCategory}
      emptyText="No experience categories yet."
      rows={rows.map((c) => ({
        id: c.id,
        primary: c.title,
        // Lead with the menu group, so the two sets are tellable apart at a glance.
        secondary: [c.kind === "remarkable" ? "Remarkable" : "Who", c.subtitle]
          .filter(Boolean)
          .join(" · "),
        published: c.published,
        editHref: `/admin/experience-categories/${c.id}`,
      }))}
    />
  );
}
