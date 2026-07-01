import { PageHeader } from "@/components/admin/ui";
import { getAllFilterGroups } from "@/lib/queries/filters";
import { listRegions } from "@/lib/queries/regions";
import { DestinationForm } from "../DestinationForm";

export default async function NewDestinationPage() {
  const [filterGroups, regions] = await Promise.all([getAllFilterGroups(), listRegions()]);
  return (
    <>
      <PageHeader
        title="New destination"
        back={{ href: "/admin/destinations", label: "Destinations" }}
      />
      <DestinationForm filterGroups={filterGroups} regions={regions} />
    </>
  );
}
