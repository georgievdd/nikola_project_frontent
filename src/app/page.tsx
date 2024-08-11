import {Metadata, ResolvingMetadata} from 'next'

import HomePage from 'components/HomePage/HomePage'
import DefaultLayout from 'components/Layouts/DefaultLayout'

export async function generateMetadata(
  {params}: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: 'Welcome to Nikola Lenivets',
    description: 'Welcome to Nikola Lenivets. Book house please!',
    keywords: 'nikola, lenivets, house',
    openGraph: {
      images: ['/static/logo.png', ...previousImages],
    },
  }
}

export default function Home() {
  return (
    <DefaultLayout noContainer>
      <HomePage />
    </DefaultLayout>
  )
}
