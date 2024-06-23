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
  resetAction,
}: {
  guestsController: INumberInput,
  datePickerController: DatePickerController,
  calendarController: CalendarController,
  resetAction: () => void
}) => {

  const clear = () => {
    datePickerController.clear(),
    calendarController.reset(), 
    guestsController.reset(), 
    sessionStorage.clear(),
    resetAction()
  }
  
  return (
    <section className={styles.container}>
      <NumberInput {...guestsController}/>
      <Calendar calendarController={calendarController}/>
      <Reloader onClick={clear}/>
      <DatePicker controller={datePickerController}/>
    </section>
  )
}

export default BookingParamsBlock