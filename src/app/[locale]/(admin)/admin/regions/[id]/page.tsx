import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui";
import { getRegion } from "@/lib/queries/regions";
import { RegionForm } from "../RegionForm";

export default async function EditRegionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const region = await getRegion(Number(id));
  if (!region) notFound();

  return (
    <>
      <PageHeader title={region.label} back={{ href: "/admin/regions", label: "Regions" }} />
      <RegionForm region={region} />
    </>
  );
}
