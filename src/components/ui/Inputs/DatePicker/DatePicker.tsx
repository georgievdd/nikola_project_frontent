import { DatePickerController, useDatePicker } from './useDatePicker'
import styles from './DatePicker.module.scss'
import SelectInput from '../SelectInput/SelectInput'

const DatePicker = ({controller}: {
  controller: DatePickerController
}) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.divider}/>
      <div className={styles.container}>
        <div className={styles.group}>
          <label>{controller.data.first_group.label}</label>
          <SelectInput labelImage={controller.data.first_group.labelImage}/>
        </div>
        <div className={styles.group}>
          <label>{controller.data.second_group.label}</label>
          <SelectInput labelImage={controller.data.second_group.labelImage}/>
        </div>
      </div>
    </div>
  )
}

export default DatePicker