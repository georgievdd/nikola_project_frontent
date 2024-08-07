import Button from '@/components/ui/Button/Button'
import styles from './BookingInvoiceBlock.module.scss'
import { getIconByType } from './helpers'
import { BookingInvoiceController } from './useBookingInvoice'
import Image from 'next/image'
import LabelInput from '@/components/ui/Inputs/LabelInput/LabelInput'
import { ChronologicalPosition, NonChronologicalPosition } from '@/entity/Reservation'

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
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2 className={styles.header}>Детализация по дням</h2>
          {
            bill.chronological_positions.map((event, i) => (
              <BillEvent event={event} key={event.description + i} />
            ))
          }
          {
            bill.non_chronological_positions.map((event, i) => (
              <BillEvent event={event} key={event.description + i} />
            ))
          }
        </div>
        <div className={styles.submit}>
          <div className={styles.box}>
            <LabelInput controller={controller.promoController} />
            <div className={styles.inner}>
              <div className={styles.upshot}>
                <h2>Итого</h2>
                <p>{bill.total.toLocaleString('ru-RU')} <span>₽</span></p>
              </div>
              <Button 
                round0 
                disabled={!canMakeReservation}
                variant={'contained'} 
                onClick={makeReservation}
              >
                Забронировать
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingInvoiceBlock



const BillEvent = (
  {event}: {event: ChronologicalPosition | NonChronologicalPosition}
) => (
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