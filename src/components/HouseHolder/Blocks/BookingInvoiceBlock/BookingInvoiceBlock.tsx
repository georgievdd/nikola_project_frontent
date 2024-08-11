import {BillEvent} from 'components/Bill/BillEvent/BillEvent'
import Button from 'components/ui/Button/Button'
import LabelInput from 'components/ui/Inputs/LabelInput/LabelInput'

import styles from './BookingInvoiceBlock.module.scss'
import {BookingInvoiceController} from './useBookingInvoice'

const BookingInvoiceBlock = ({
  controller,
  makeReservation,
  canMakeReservation,
}: {
  controller: BookingInvoiceController
  makeReservation: () => {}
  canMakeReservation: boolean
}) => {
  const {bill} = controller.data!.reservation
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2 className={styles.header}>Детализация по дням</h2>
          {bill.chronological_positions.map((event, i) => (
            <BillEvent event={event} key={event.description + i} />
          ))}
          {bill.non_chronological_positions.map((event, i) => (
            <BillEvent event={event} key={event.description + i} />
          ))}
        </div>
        <div className={styles.submit}>
          <div className={styles.box}>
            <LabelInput controller={controller.promoController} />
            <div className={styles.inner}>
              <div className={styles.upshot}>
                <h2>Итого</h2>
                <p>
                  {bill.total.toLocaleString('ru-RU')} <span>₽</span>
                </p>
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
