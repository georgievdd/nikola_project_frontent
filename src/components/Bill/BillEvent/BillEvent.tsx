import Image from 'next/image'

import {
  ChronologicalPosition,
  NonChronologicalPosition,
} from 'entity/Reservation'

import styles from './BillEvent.module.scss'
import {getIconByType} from './helpers'
export const BillEvent = ({
  event,
}: {
  event: ChronologicalPosition | NonChronologicalPosition
}) => (
  <div className={styles.event}>
    <div className={styles.title}>
      <Image quality={100}
        width={22}
        height={22}
        alt="icon"
        src={getIconByType(event.type)}
      />
      <p>{event.description}</p>
    </div>
    <p>{event.price} ₽</p>
  </div>
)
