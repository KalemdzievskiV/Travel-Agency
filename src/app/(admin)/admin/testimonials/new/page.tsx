import { PageHeader } from "@/components/admin/ui";
import { TestimonialForm } from "../TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <>
      <PageHeader
        title="New testimonial"
        back={{ href: "/admin/testimonials", label: "Testimonials" }}
      />
      <TestimonialForm />
    </>
  );
}
