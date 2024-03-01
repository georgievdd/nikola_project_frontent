'use client'

import React from 'react'
import styles from './NumberInput.module.scss'
import { INumberInput } from './useNumberInput'
import PlusImg from '../../../../../public/images/plus.svg'
import MinusImg from '../../../../../public/images/minus.svg'
import Image from 'next/image'

const NumberInput = (props: INumberInput) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <label>
          <p>{props.label}</p>
        </label>
        <div className={styles.under_labale}>
          <button onClick={props.substract}>
            <Image src={MinusImg} alt='' width={18} height={18}/>
          </button>
          <p className={styles.value}>{props.value}</p>
          <button onClick={props.add}>
            <Image src={PlusImg} alt='' width={18} height={18}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NumberInput