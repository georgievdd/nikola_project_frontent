import { House, HouseOptions } from '@/entity/House'
import React from 'react'
import styles from './HouseDescriptionBlock.module.scss'
import Carousel from '../../../ui/Carousel/Carousel'
import Feature from '../../../ui/Feature/Feature'
import BasePersonsImage from '../../../../../public/images/square-with-arrow.svg'
interface HouseDescriptionBlock {
  data: House
  houseOptions: HouseOptions
}
const HouseDescriptionBlock = ({
  data,
  houseOptions,
}: HouseDescriptionBlock) => {
  return (
    <div className={styles.container}>
      <header>
        <h1>{data.name}</h1>
      </header>
      <section>
        <Carousel imgs={data.pictures}/>
        <div className={styles.features}>
          {data.features.map(feature => (
            <Feature key={feature.id} name={feature.name} icon={feature.icon}/>
          ))}
          <Feature name={
            `${houseOptions.base_persons_amount} гостя без доплаты`
          } icon={BasePersonsImage}/>
        </div>
      </section>
      <article>
        {data.description}
      </article>
    </div>
  )
}

export default HouseDescriptionBlock