import { PageHeader } from "@/components/admin/ui";
import { getAllFilterGroups } from "@/lib/queries/filters";
import { DestinationForm } from "../DestinationForm";

export default async function NewDestinationPage() {
  const filterGroups = await getAllFilterGroups();
  return (
    <>
      <PageHeader
        title="New destination"
        back={{ href: "/admin/destinations", label: "Destinations" }}
      />
      <DestinationForm filterGroups={filterGroups} />
    </>
  );
}
