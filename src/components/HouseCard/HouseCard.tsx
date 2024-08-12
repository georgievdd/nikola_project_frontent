import {differenceInCalendarDays} from 'date-fns'
import Link from 'next/link'

import {SelectionController} from 'Calendar/CalendarBody/hooks/useSelection'
import Button from 'components/ui/Button/Button'
import FeatureList from 'components/ui/FeatureList/FeatureList'
import {INumberInput} from 'components/ui/Inputs/NumberInput/useNumberInput'
import Swiper from 'components/ui/Swiper/Swiper'
import {House} from 'entity/House'
import BasePersonsImage from 'images/persons.svg'
import {getNightsDeclension} from 'localization/night'

import styles from './HouseCard.module.scss'

const getTimeDiff = (dateStart: Date, dateEnd: Date) => {
  return differenceInCalendarDays(dateStart, dateEnd)
}

const HouseCard = ({
  data,
  selectionController,
  guestsController,
}: {
  data: House
  selectionController: SelectionController
  guestsController: INumberInput
}) => {
  const {
    id,
    base_persons_amount,
    max_persons_amount,
    total_price,
    description,
    name,
    features,
    pictures,
    base_price,
  } = data

  const buttonOnClick = () => {
    if (selectionController.isActive) {
      sessionStorage.setItem(
        'check_in_date',
        selectionController.dateBegin!.getKey(),
      )
      sessionStorage.setItem(
        'check_out_date',
        selectionController.dateEnd!.getKey(),
      )
      sessionStorage.setItem('guests', guestsController.value.toString())
    }
  }

  const getCostText = () => {
    if (total_price) {
      const diff = getTimeDiff(
        selectionController.dateEnd!,
        selectionController.dateBegin!,
      )
      return `${total_price} ₽ за ${diff} ${getNightsDeclension(diff)}`
    }
    return `от ${base_price} ₽ за ночь`
  }

  return (
    <div className={styles.container}>
      <Swiper className={styles.preview} links={pictures.slice(0, 8)} />
      <article>
        <header>
          <h1>{name}</h1>
        </header>
        <div className={styles['description-group']}>
          <p className={styles.description}>{description}</p>
          <div className={styles.features}>
            <FeatureList
              features={[
                {
                  name: `${base_persons_amount} - ${max_persons_amount}`,
                  picture: BasePersonsImage,
                  id: 0,
                  withoutPrefix: true,
                },
                ...features,
              ]}
              limit={4}
            />
          </div>
        </div>
        <div className={styles['bottom-group']}>
          <Link href={`house/${id}`}>
            <Button onClick={buttonOnClick}>Забронировать</Button>
          </Link>
          <p className={styles.cost}>{getCostText()}</p>
        </div>
      </article>
    </div>
  )
}

export default HouseCard
