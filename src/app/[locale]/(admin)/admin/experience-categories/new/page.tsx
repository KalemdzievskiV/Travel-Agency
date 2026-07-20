import { PageHeader } from "@/components/admin/ui";
import { listDestinations } from "@/lib/queries/admin";
import { ExperienceCategoryForm } from "../ExperienceCategoryForm";

export default async function NewExperienceCategoryPage() {
  const destinations = await listDestinations();
  return (
    <>
      <PageHeader
        title="New experience category"
        back={{ href: "/admin/experience-categories", label: "Experience categories" }}
      />
      <ExperienceCategoryForm destinations={destinations} />
    </>
  );
}
