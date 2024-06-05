import { getHouse, getHouseOptions } from "@/api/house";
import HouseHolder from "@/components/HouseHolder/HouseHolder";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { House, HouseOptions } from "@/entity/House";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const house = await getHouse(params.id)
  const previousImages = (await parent).openGraph?.images || []
  
  return {
    title:  `Nikola | ${house.name}`,
    description: house.description,
    keywords: house.features.map(e => e.name),
    openGraph: {
      images: [...house.pictures.map(e => e.picture), ...previousImages],
    },
  }
}

export default async function HouseId({params}: Props) {

  const house: House = await getHouse(params.id)
  const houseOptions: HouseOptions | null = await getHouseOptions(params.id)

  return (
    <DefaultLayout>
      <HouseHolder house={house} houseOptions={houseOptions}/>
    </DefaultLayout>
  );
}