import {CSSProperties} from 'react'

import SelectInput from 'components/ui/Inputs/SelectInput/SelectInput'

import styles from './DatePicker.module.scss'
import {DatePickerController} from './useDatePicker'

const css = require('src/helpers').importStyles(
  require('./DatePicker.module.scss'),
)

const DatePicker = ({
  controller,
  style,
  className,
}: {
  controller: DatePickerController
  style?: CSSProperties
  className?: string
}) => {
  return (
    <div className={css`wrapper ${className}`} style={style}>
      <div className={styles.divider} />
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
