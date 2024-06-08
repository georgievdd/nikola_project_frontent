import { House } from '@/entity/House'
import styles from './HouseCard.module.scss'
import Swiper from '../Swiper/Swiper'
import Button from '../ui/Button/Button'
import Link from 'next/link'
import Feature from '../ui/Feature/Feature'
import { SelectionController } from '../Calendar/CalendarBody/hooks/useSelection'
import { INumberInput } from '../ui/Inputs/number-input/useNumberInput'
import { getImageUrl } from '@/helpers'

const HouseCard = ({
  data, 
  selectionController, 
  guestsController
}: {
  data: House, 
  selectionController: SelectionController,
  guestsController: INumberInput
}) => {

  const buttonOnClick = () => {
    if (selectionController.isActive) {
      sessionStorage.setItem('check_in_date', selectionController.dateBegin!.getKey())
      sessionStorage.setItem('check_out_date', selectionController.dateEnd!.getKey())
      sessionStorage.setItem('guests', guestsController.value.toString())
    }
  }
  console.log(data.base_price, data.total_price);
    
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
              <Feature key={feature.id} icon={getImageUrl(feature.picture)} name={feature.name}/>
            ))}
          </div>
        </div>
        <div className={styles["bottom-group"]}>
          <Link href={`house/${data.id}`}>
            <Button onClick={buttonOnClick}>
              Забронировать
            </Button>
          </Link>
          <p className={styles.cost}>от {data.total_price || data.base_price} <span>₽</span></p>
        </div>
      </article>
    </div>
  )
}

export default HouseCard