import React from 'react'

import Carousel from 'components/ui/Carousel/Carousel'
import FeatureList from 'components/ui/FeatureList/FeatureList'
import {House, HouseOptions} from 'entity/House'
import BasePersonsImage from 'images/persons.svg'

import styles from './HouseDescriptionBlock.module.scss'
interface HouseDescriptionBlock {
  data: House
  houseOptions: HouseOptions
}
const HouseDescriptionBlock = ({data, houseOptions}: HouseDescriptionBlock) => {
  return (
    <div className={styles.container}>
      <header>
        <h1>{data.name}</h1>
      </header>
      <section>
        <Carousel imgs={data.pictures} />
        <div className={styles.features}>
          <FeatureList
            features={[
              ...data.features,
              {
                name: `${houseOptions.base_persons_amount} гостя без доплаты`,
                picture: BasePersonsImage,
                id: 0,
                withoutPrefix: true,
              },
            ]}
            className={styles.features}
          />
        </div>
      </section>
      <article>{data.description}</article>
    </div>
  )
}

export default HouseDescriptionBlock
