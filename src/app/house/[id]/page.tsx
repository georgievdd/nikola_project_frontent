import {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'

import {getHouse, getHouseOptions} from 'api/house'
import HouseHolder from 'components/HouseHolder/HouseHolder'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import {HouseOptions} from 'entity/House'
import {isApiError} from 'src/helpers'

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const house = await getHouse(params.id)
  if (isApiError(house)) {
    return notFound()
  }
  const previousImages = (await parent).openGraph?.images || []
  return {
    title: `Nikola | ${house.name}`,
    description: house.description,
    keywords: house.features.map((e) => e.name),
    openGraph: {
      images: [...house.pictures.map((e) => e.picture), ...previousImages],
    },
  }
}

export default async function HouseId({params}: Props) {
  const house = await getHouse(params.id)
  if (isApiError(house)) {
    return notFound()
  }
  // показывать ошибку если null
  const houseOptions: HouseOptions | null = await getHouseOptions(params.id)

  return (
    <DefaultLayout>
      <HouseHolder house={house} houseOptions={houseOptions} />
    </DefaultLayout>
  )
}
