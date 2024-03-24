import { Metadata, ResolvingMetadata } from 'next';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import HousesHolder from "@/components/HousesHolder/HousesHolder";
import { getHouses } from "@/api/house";
import { House } from '@/entity/House';
import Logo from '../../../public/images/logo.svg'

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || []

  return {
    title:  `Nikola | Houses`,
    description: "Забранируйте домик для отдыха",
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