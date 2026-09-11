import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui";
import { getDestination } from "@/lib/queries/admin";
import { listRegions } from "@/lib/queries/regions";
import { DestinationForm } from "../DestinationForm";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await getDestination(Number(id));
  if (!destination) notFound();

  const regions = await listRegions();

  return (
    <>
      <PageHeader
        title={destination.title}
        back={{ href: "/admin/destinations", label: "Destinations" }}
      />
      <DestinationForm destination={destination} regions={regions} />
    </>
  );
}
