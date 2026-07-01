import { PageHeader } from "@/components/admin/ui";
import { DestinationForm } from "../DestinationForm";

export default function NewDestinationPage() {
  return (
    <>
      <PageHeader
        title="New destination"
        back={{ href: "/admin/destinations", label: "Destinations" }}
      />
      <DestinationForm />
    </>
  );
}
