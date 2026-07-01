import { PageHeader } from "@/components/admin/ui";
import { RegionForm } from "../RegionForm";

export default function NewRegionPage() {
  return (
    <>
      <PageHeader title="New region" back={{ href: "/admin/regions", label: "Regions" }} />
      <RegionForm />
    </>
  );
}
