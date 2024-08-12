import React from 'react'

import Carousel from 'components/ui/Carousel/Carousel'
import FeatureList from 'components/ui/FeatureList/FeatureList'
import {House, HouseOptions} from 'entity/House'
import AddPersonImage from 'images/add-person.svg'
import BasePersonsImage from 'images/persons.svg'

const css = require('src/helpers').importStyles(
  require('./HouseDescriptionBlock.module.scss'),
)

interface HouseDescriptionBlock {
  data: House
  houseOptions: HouseOptions
}
const HouseDescriptionBlock = ({data, houseOptions}: HouseDescriptionBlock) => {
  return (
    <div className={css`container`}>
      <header>
        <h1>{data.name}</h1>
      </header>
      <section>
        <Carousel imgs={data.pictures} />
        <div className={css`feature-group`}>
          <FeatureList
            features={[
              {
                name: `${houseOptions.base_persons_amount} гостя без доплаты`,
                picture: BasePersonsImage,
                id: 0,
                withoutPrefix: true,
              },
              {
                name: `${houseOptions.price_per_extra_person} ₽/день`,
                picture: AddPersonImage,
                id: 0,
                withoutPrefix: true,
              },
            ]}
            className={css`features`}
          />
          <FeatureList features={data.features} className={css`features`} />
        </div>
      </section>
      <article>{data.description}</article>
    </div>
  )
}

export default HouseDescriptionBlock
