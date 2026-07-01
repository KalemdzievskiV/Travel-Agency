import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui";
import { getDestination } from "@/lib/queries/admin";
import { DestinationForm } from "../DestinationForm";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await getDestination(Number(id));
  if (!destination) notFound();

  return (
    <>
      <PageHeader
        title={destination.title}
        back={{ href: "/admin/destinations", label: "Destinations" }}
      />
      <DestinationForm destination={destination} />
    </>
  );
}
