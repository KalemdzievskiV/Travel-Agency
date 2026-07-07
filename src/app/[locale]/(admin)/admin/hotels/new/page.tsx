import { PageHeader } from "@/components/admin/ui";
import { listDestinations } from "@/lib/queries/admin";
import { HotelForm } from "../HotelForm";

export default async function NewHotelPage() {
  const destinations = await listDestinations();
  return (
    <>
      <PageHeader title="New hotel" back={{ href: "/admin/hotels", label: "Hotels" }} />
      <HotelForm allDestinations={destinations.map((d) => ({ id: d.id, title: d.title }))} />
    </>
  );
}
