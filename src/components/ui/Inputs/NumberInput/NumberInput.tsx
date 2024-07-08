'use client'

import React, { CSSProperties } from 'react'
import styles from './NumberInput.module.scss'
import { INumberInput } from './useNumberInput'
import IconPlus from '../../../../../public/images/svg/plus'
import IconMinus from '../../../../../public/images/svg/minus'

const NumberInput = (props: INumberInput & {className?: string, style?: CSSProperties}) => {

  return (
    <div className={[styles.wrapper, props.className].join(' ')} style={props.style}>
      <div className={styles.container}>
        <label>
          <p>{props.label}</p>
        </label>
        <div className={styles.under_labale}>
          <button onClick={props.substract}>
            <IconMinus muted={props.value === props.minValue}/>
          </button>
          <p className={styles.value}>{props.value}</p>
          <button onClick={props.add}>
            <IconPlus muted={props.value === props.maxValue}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NumberInput