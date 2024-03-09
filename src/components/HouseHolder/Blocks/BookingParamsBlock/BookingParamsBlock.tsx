import NumberInput from '@/components/ui/Inputs/number-input/NumberInput'
import styles from './BookingParamsBlock.module.scss'
import { INumberInput } from '@/components/ui/Inputs/number-input/useNumberInput'
import DatePicker from '@/components/ui/Inputs/DatePicker/DatePicker'
import { DatePickerController } from '@/components/ui/Inputs/DatePicker/useDatePicker'


const BookingParamsBlock = ({
  guestsController,
  datePickerController
}: {
  guestsController: INumberInput,
  datePickerController: DatePickerController
}) => {
  
  
  return (
    <section className={styles.container}>
      <NumberInput {...guestsController}/>
      <h1>Calendar element</h1>
      <DatePicker controller={datePickerController}/>
    </section>
  )
}

export default BookingParamsBlock