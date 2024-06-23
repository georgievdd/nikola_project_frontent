import { DatePickerController } from './useDatePicker'
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
          <label>Время заезда</label>
          <SelectInput
            times={controller.data.check_in_times.times}
            value={controller.currentFirst}
            onChange={(v: string) => controller.setCurrentFirst(v)}
          />
        </div>
        <div className={styles.group}>
          <label>Время выезда</label>
          <SelectInput
            times={controller.data.check_out_times.times}
            value={controller.currentSecond}
            onChange={(v: string) => controller.setCurrentSecond(v)}
          />
        </div>
      </div>
    </div>
  )
}

export default DatePicker