import styles from './BookingInvoiceBlock.module.scss'

const BookingInvoiceBlock = () => {
  return (
    <section className={styles.container}>
      <h2>Детализация по дням</h2>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          content
        </div>
        <div className={styles.submit}>
          submit
        </div>
      </div>
    </section>
  )
}

export default BookingInvoiceBlock