import HouseHolder from "@/components/HouseHolder/HouseHolder";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata, ResolvingMetadata } from "next";
import ReservationHolder from '../../../components/ReservationHolder/ReservationHolder'
import {getCompletedReservation} from '../../../api/reservation'

interface Props {
  params: {
    id: number
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const reservation = await getCompletedReservation(params.id)
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: `Nikola | бронирование ${reservation.house.name}`,
    description: reservation.house.description,
    keywords: reservation.house.features.map(e => e.name),
    openGraph: {
      images: [...reservation.house.pictures.map(e => e.picture), ...previousImages],
    },
  }
}

export default async function ReservationId({params}: Props) {

  const reservation = await getCompletedReservation(params.id)

  return (
    <DefaultLayout>
      <ReservationHolder reservation={reservation}/>
    </DefaultLayout>
  );
}