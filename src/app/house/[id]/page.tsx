'use client'
import { getHouse } from "@/api/house";
import HouseHolder from "@/components/HouseHolder/HouseHolder";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { House } from "@/entity/House";
import { Metadata } from "next";

interface Props {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Nikola | {Вставить домик}",
  description: "{Вставить description}",
  keywords: "{Вставить features}",
}

export default async function HouseId({params}: Props) {

  const house: House = await getHouse(params.id)

  return (
    <DefaultLayout>
      <HouseHolder data={house}/>
    </DefaultLayout>
  );
}