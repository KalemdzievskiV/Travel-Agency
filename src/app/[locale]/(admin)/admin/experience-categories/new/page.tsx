import { PageHeader } from "@/components/admin/ui";
import { ExperienceCategoryForm } from "../ExperienceCategoryForm";

export default function NewExperienceCategoryPage() {
  return (
    <>
      <PageHeader
        title="New experience category"
        back={{ href: "/admin/experience-categories", label: "Experience categories" }}
      />
      <ExperienceCategoryForm />
    </>
  );
}
