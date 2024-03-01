import { House } from '@/entity/House'
import styles from './HouseCard.module.scss'
import Image from 'next/image'
import Swiper from '../Swiper/Swiper'
import { STATIC_URL } from '@/api/instance'
import Button from '../ui/Button/Button'

const HouseCard = ({data}: {data: House}) => {
  return (
    <div className={styles.container}>
      <Swiper className={styles.preview} links={data.pictures}/>
      <article>
        <header>
          <h1>{data.name}</h1>
        </header>
        <div className={styles["description-group"]}>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.features}>
            {data.features.map((feature) => (
              <div key={feature.id} className={styles.item}>
                <Image width={17} height={17} alt='icon' src={feature.icon}/>
                <p>{feature.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles["bottom-group"]}>
          <Button onClick={() => {}}>
            Забронировать
          </Button>
          <p className={styles.cost}>{data.base_price} <span>₽</span></p>
        </div>
      </article>
    </div>
  )
}

export default HouseCard