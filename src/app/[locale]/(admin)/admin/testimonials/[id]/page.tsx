import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui";
import { getTestimonial } from "@/lib/queries/admin";
import { TestimonialForm } from "../TestimonialForm";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonial(Number(id));
  if (!testimonial) notFound();

  return (
    <>
      <PageHeader
        title="Edit testimonial"
        back={{ href: "/admin/testimonials", label: "Testimonials" }}
      />
      <TestimonialForm testimonial={testimonial} />
    </>
  );
}
