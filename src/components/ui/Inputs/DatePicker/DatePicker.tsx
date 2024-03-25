import { DatePickerController } from './useDatePicker'
import styles from './DatePicker.module.scss'
import SelectInput from '../SelectInput/SelectInput'
import Moon from '../../../../../public/images/moon.svg'
import Circle from '../../../../../public/images/circle.svg'


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
           labelImage={Circle}
           times={controller.data.check_in_times.times}
           defaultValue={controller.data.check_in_times.default}
           onChange={(v: string) => controller.setCurrentFirst(v)}
          />
        </div>
        <div className={styles.group}>
          <label>Время выезда</label>
          <SelectInput
            labelImage={Moon}
            times={controller.data.check_out_times.times}
            defaultValue={controller.data.check_out_times.default}
            onChange={(v: string) => controller.setCurrentSecond(v)}
          />
        </div>
      </div>
    </div>
  )
}

export default DatePicker