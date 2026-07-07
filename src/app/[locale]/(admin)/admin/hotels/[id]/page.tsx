import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui";
import { getHotel, listDestinations } from "@/lib/queries/admin";
import { HotelForm } from "../HotelForm";

export default async function EditHotelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [hotel, destinations] = await Promise.all([getHotel(Number(id)), listDestinations()]);
  if (!hotel) notFound();

  return (
    <>
      <PageHeader title={hotel.name} back={{ href: "/admin/hotels", label: "Hotels" }} />
      <HotelForm hotel={hotel} allDestinations={destinations.map((d) => ({ id: d.id, title: d.title }))} />
    </>
  );
}
