import { Metadata, ResolvingMetadata } from 'next';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import HousesHolder from "@/components/HousesHolder/HousesHolder";
import { getHouses } from "@/api/house";
import { House } from '@/entity/House';
import Logo from '../../../public/images/logo.svg'

export const metadata: Metadata = {
  title: "Nikola | Houses",
  description: "houses to book",
  keywords: "nikola, house"
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const houses = await getHouses()
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title:  `Nikola | Houses`,
    description: "Забранируйте домик для отдыха, ради христа",
    keywords: "nikola, houses, ",
    openGraph: {
      images: [Logo, ...previousImages],
    },
  }
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