import { House } from '@/entity/House'
import styles from './HouseCard.module.scss'
import Swiper from '../Swiper/Swiper'
import Button from '../ui/Button/Button'
import Link from 'next/link'
import Feature from '../ui/Feature/Feature'

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
              <Feature key={feature.id} icon={feature.icon} name={feature.name}/>
            ))}
          </div>
        </div>
        <div className={styles["bottom-group"]}>
          <Link href={`house/${data.id}`}>
            <Button onClick={() => {}}>
              Забронировать
            </Button>
          </Link>
          <p className={styles.cost}>{data.base_price} <span>₽</span></p>
        </div>
      </article>
    </div>
  )
}

export default HouseCard