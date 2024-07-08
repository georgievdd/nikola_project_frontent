import NumberInput from '@/components/ui/Inputs/NumberInput/NumberInput'
import styles from './BookingParamsBlock.module.scss'
import { INumberInput } from '@/components/ui/Inputs/NumberInput/useNumberInput'
import DatePicker from '@/components/ui/Inputs/DatePicker/DatePicker'
import { DatePickerController } from '@/components/ui/Inputs/DatePicker/useDatePicker'
import { CalendarController } from '@/components/Calendar/CalendarBody/hooks/useCalendar'
import Calendar from '@/components/Calendar/Calendar'
import Reloader from '@/components/ui/Reloader/Reloader'


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
      <NumberInput {...guestsController} style={{gridArea: 'a'}}/>
      <Calendar calendarController={calendarController} style={{gridArea: 'b'}}/>
      <DatePicker controller={datePickerController} style={{gridArea: 'd'}}/>
    </section>
  )
}

export default BookingParamsBlock