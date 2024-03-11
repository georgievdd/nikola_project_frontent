import { Metadata } from 'next';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import HousesHolder from "@/components/HousesHolder/HousesHolder";
import { getHouses } from "@/api/house";
import { House } from '@/entity/House';

export const metadata: Metadata = {
  title: "Nikola | Houses",
  description: "houses to book",
  keywords: "nikola, house"
}

const HousesPage = async () => {
  const houses: House[] = await getHouses()
  return (
    <DefaultLayout>
      <HousesHolder initHouses={houses} />
    </DefaultLayout>
  );
}

export default HousesPage;