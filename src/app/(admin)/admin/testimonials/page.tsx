import { AdminList } from "@/components/admin/AdminList";
import { listTestimonials } from "@/lib/queries/admin";
import { deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const rows = await listTestimonials();
  return (
    <AdminList
      title="Testimonials"
      newHref="/admin/testimonials/new"
      newLabel="New testimonial"
      deleteAction={deleteTestimonial}
      emptyText="No testimonials yet."
      rows={rows.map((t) => ({
        id: t.id,
        primary: `“${t.quote.slice(0, 70)}${t.quote.length > 70 ? "…" : ""}”`,
        secondary: [t.who, t.where].filter(Boolean).join(" · "),
        published: t.published,
        editHref: `/admin/testimonials/${t.id}`,
      }))}
    />
  );
}
