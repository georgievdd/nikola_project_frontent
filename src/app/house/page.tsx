import DefaultLayout from "@/components/Layouts/DefaultLayout";
import HousesHolder from "@/components/HousesHolder/HousesHolder";
import { House } from "@/entity/House";
import { getHouses } from "@/api/house";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Nikola | Houses",
  description: "houses to book",
  keywords: "nikola, house"
}


export default async function House() {
  const houses = await getHouses()
  return (
    <DefaultLayout>
      <HousesHolder houses={houses}/>
    </DefaultLayout>
  );
}