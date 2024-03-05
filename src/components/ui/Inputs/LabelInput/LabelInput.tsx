import React, { useState } from 'react'
import styles from './LabelInput.module.scss'



const LabelInput = ({controller}: 
  {controller: LabelInputController}) => {
  return (
    <div className={[styles.container, controller.className].join(' ')}>
      <h3>{controller.label}</h3>
      <input 
        {...controller}
        className={''}
      />
    </div>
  )
}

export default LabelInput


export interface LabelInputController {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const useLabelInput = ({
  label,
  placeholder,
  className,
}: {
  label: string
  placeholder: string
  className?: string
}): LabelInputController => {
  const [value, setValue] = useState('')
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    placeholder,
    label,
    className,
  }
}