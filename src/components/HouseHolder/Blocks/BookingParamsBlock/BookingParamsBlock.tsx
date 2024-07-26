import NumberInput from '@/components/ui/Inputs/NumberInput/NumberInput'
import styles from './BookingParamsBlock.module.scss'
import { INumberInput } from '@/components/ui/Inputs/NumberInput/useNumberInput'
import DatePicker from '@/components/ui/Inputs/DatePicker/DatePicker'
import { DatePickerController } from '@/components/ui/Inputs/DatePicker/useDatePicker'
import { CalendarController } from '@/components/Calendar/CalendarBody/hooks/useCalendar'
import Calendar from '@/components/Calendar/Calendar'
const s = require('@/helpers')
  .importStyles(require('./BookingParamsBlock.module.scss'))

const BookingParamsBlock = ({
  guestsController,
  datePickerController,
  calendarController,
}: {
  guestsController: INumberInput,
  datePickerController: DatePickerController,
  calendarController: CalendarController,
}) => {

  return (
    <section className={styles.container}>
      <NumberInput {...guestsController}/>
      <Calendar calendarController={calendarController}/>
      <DatePicker controller={datePickerController}/>
    </section>
  )
}

export default BookingParamsBlock