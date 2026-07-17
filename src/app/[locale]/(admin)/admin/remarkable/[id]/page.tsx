import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui";
import { getRemarkableExperience, listTrips } from "@/lib/queries/admin";
import { RemarkableForm } from "../RemarkableForm";

export default async function EditRemarkablePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [experience, trips] = await Promise.all([getRemarkableExperience(Number(id)), listTrips()]);
  if (!experience) notFound();

  return (
    <>
      <PageHeader title={experience.title} back={{ href: "/admin/remarkable", label: "Remarkable experiences" }} />
      <RemarkableForm experience={experience} allTrips={trips.map((t) => ({ id: t.id, title: t.title }))} />
    </>
  );
}
