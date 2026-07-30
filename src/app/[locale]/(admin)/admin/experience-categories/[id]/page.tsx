import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui";
import { getExperienceCategory } from "@/lib/queries/admin";
import { ExperienceCategoryForm } from "../ExperienceCategoryForm";

export default async function EditExperienceCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getExperienceCategory(Number(id));
  if (!category) notFound();

  return (
    <>
      <PageHeader
        title={category.title}
        back={{ href: "/admin/experience-categories", label: "Experience categories" }}
      />
      <ExperienceCategoryForm category={category} />
    </>
  );
}
