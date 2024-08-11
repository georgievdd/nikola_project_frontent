import {Metadata, ResolvingMetadata} from 'next'

import {getHouses} from 'api/house'
import HousesHolder from 'components/HousesHolder/HousesHolder'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import {House} from 'entity/House'

export async function generateMetadata(
  {params}: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: 'Nikola | Houses',
    description: 'Забранируйте домик для отдыха',
    keywords: 'nikola,houses,',
    openGraph: {
      images: ['/static/logo.png', ...previousImages],
    },
  }
}

const HousesPage = async () => {
  const houses: House[] = await getHouses()
  return (
    <DefaultLayout>
      <HousesHolder initHouses={houses} />
    </DefaultLayout>
  )
}

export default HousesPage
