'use client'

import React, { CSSProperties } from 'react'
import styles from './NumberInput.module.scss'
import { INumberInput } from './useNumberInput'
import IconPlus from '../../../../../public/images/svg/plus'
import IconMinus from '../../../../../public/images/svg/minus'
const s = require('@/helpers')
  .importStyles(require('./NumberInput.module.scss'))

const NumberInput = ({
  className,
  style,
  label,
  minValue,
  value,
  substract,
  add,
  maxValue,
}: INumberInput & {className?: string, style?: CSSProperties}) => {

  return (
    <div className={s`wrapper ${className}`} style={style}>
      <div className={styles.container}>
        <label>
          <p>{label}</p>
        </label>
        <div className={styles.under_labale}>
          <button onClick={substract}>
            <IconMinus muted={value === minValue}/>
          </button>
          <p className={styles.value}>{value}</p>
          <button onClick={add}>
            <IconPlus muted={value === maxValue}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NumberInput