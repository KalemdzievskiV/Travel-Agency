import { PageHeader } from "@/components/admin/ui";
import { listRegions } from "@/lib/queries/regions";
import { DestinationForm } from "../DestinationForm";

export default async function NewDestinationPage() {
  const regions = await listRegions();
  return (
    <>
      <PageHeader
        title="New destination"
        back={{ href: "/admin/destinations", label: "Destinations" }}
      />
      <DestinationForm regions={regions} />
    </>
  );
}
