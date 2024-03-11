import { House } from '@/entity/House'
import styles from './HouseCard.module.scss'
import Swiper from '../Swiper/Swiper'
import Button from '../ui/Button/Button'
import Link from 'next/link'
import Feature from '../ui/Feature/Feature'
import { SelectionController } from '../Calendar/CalendarBody/hooks/useSelection'

const HouseCard = ({data, selectionController}: {data: House, selectionController: SelectionController}) => {

  const getPath = () => 
    selectionController.isActive ? `house/${data.id}?${new URLSearchParams({
      check_in_date: selectionController.dateBegin!.getKey(),
      check_out_date: selectionController.dateEnd!.getKey(),
    }).toString()}` : `house/${data.id}`
  
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
          <Link href={getPath()}>
            <Button onClick={() => {}}>
              Забронировать
            </Button>
          </Link>
          <p className={styles.cost}>от {data.base_price} <span>₽</span></p>
        </div>
      </article>
    </div>
  )
}

export default HouseCard