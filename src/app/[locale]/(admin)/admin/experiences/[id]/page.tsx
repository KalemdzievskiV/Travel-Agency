import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui";
import { getExperience } from "@/lib/queries/admin";
import { ExperienceForm } from "../ExperienceForm";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await getExperience(Number(id));
  if (!experience) notFound();

  return (
    <>
      <PageHeader
        title={experience.title}
        back={{ href: "/admin/experiences", label: "Experiences" }}
      />
      <ExperienceForm experience={experience} />
    </>
  );
}
