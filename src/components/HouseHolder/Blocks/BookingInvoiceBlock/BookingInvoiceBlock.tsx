import Button from '@/components/ui/Button/Button'
import { ChronologicalPosition, NonChronologicalPosition } from '../../dto/Reservations'
import styles from './BookingInvoiceBlock.module.scss'
import { getIconByType } from './helpers'
import { BookingInvoiceController } from './useBookingInvoice'
import Image from 'next/image'

const BookingInvoiceBlock = ({
  controller, 
  makeReservation,
  canMakeReservation
}: {
  controller: BookingInvoiceController,
  makeReservation: () => {},
  canMakeReservation: boolean
}) => {
  const {bill} = controller.data!.reservation
  return (
    <section className={styles.container}>
      <h2>Детализация по дням</h2>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {
            bill.chronological_positions.map(event => (
              <ChronologicalEvent event={event} />
            ))
          }
          {
            bill.non_chronological_positions.map(event => (
              <ChronologicalEvent event={event} />
            ))
          }

        </div>
        <div className={styles.submit}>
          <div className={styles.box}>
            <div className={styles.upshot}>
              <h2>Итого</h2>
              <p>{bill.total} <span>₽</span></p>
            </div>
            <Button 
              round0 
              muted={!canMakeReservation}
              variant={'contained'} 
              onClick={makeReservation}
            >
              Забронировать
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingInvoiceBlock



const ChronologicalEvent = ({event}: {event: ChronologicalPosition | NonChronologicalPosition}) => (
  <div className={styles.event}>
    <div className={styles.title}>
      <Image
        width={22}
        height={22}
        alt='icon'
        src={getIconByType(event.type)}
      />
      <p>{event.description}</p>
    </div>
    <p>{event.price} ₽</p>
  </div>
)