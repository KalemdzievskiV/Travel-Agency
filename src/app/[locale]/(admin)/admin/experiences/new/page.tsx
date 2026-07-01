import { PageHeader } from "@/components/admin/ui";
import { ExperienceForm } from "../ExperienceForm";

export default function NewExperiencePage() {
  return (
    <>
      <PageHeader
        title="New experience"
        back={{ href: "/admin/experiences", label: "Experiences" }}
      />
      <ExperienceForm />
    </>
  );
}
