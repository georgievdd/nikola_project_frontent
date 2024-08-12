'use client'

import React, {CSSProperties} from 'react'

import IconMinus from 'images/svg/minus'
import IconPlus from 'images/svg/plus'

import styles from './NumberInput.module.scss'
import {INumberInput} from './useNumberInput'

const css = require('src/helpers').importStyles(
  require('./NumberInput.module.scss'),
)

const NumberInput = ({
  className,
  style,
  label,
  minValue,
  value,
  substract,
  add,
  maxValue,
}: INumberInput & {className?: string; style?: CSSProperties}) => {
  return (
    <div className={css`wrapper ${className}`} style={style}>
      <div className={styles.container}>
        <label>
          <p>{label}</p>
        </label>
        <div className={styles.under_labale}>
          <button onClick={substract}>
            <IconMinus muted={value === minValue} />
          </button>
          <p className={styles.value}>{value}</p>
          <button onClick={add}>
            <IconPlus muted={value === maxValue} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NumberInput
