import { PageHeader } from "@/components/admin/ui";
import { listTrips } from "@/lib/queries/admin";
import { RemarkableForm } from "../RemarkableForm";

export default async function NewRemarkablePage() {
  const trips = await listTrips();
  return (
    <>
      <PageHeader title="New experience" back={{ href: "/admin/remarkable", label: "Remarkable experiences" }} />
      <RemarkableForm allTrips={trips.map((t) => ({ id: t.id, title: t.title }))} />
    </>
  );
}
