import {useEffect, useMemo, useState} from 'react'

import {debounce} from 'lodash'

import {inputsConfig as inputs} from './static'

export interface LabelInputController {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  isValid: boolean
  required?: boolean
  type?: string
}

export const useLabelInput = ({
  label,
  placeholder,
  className,
  type,
}: {
  label: string
  placeholder: string
  className?: string
  type?: string
}): LabelInputController => {
  const [value, setValue] = useState('')

  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
    placeholder,
    label,
    className,
    isValid: !!value,
    type,
  }
}

export function useLabelInputGroup() {
  // eslint-disable-next-line
  const controllers = inputs.map((input) => useLabelInput(input))
  const [isValid, setIsValid] = useState(false)
  const callback = debounce(() => {
    let valid = true
    controllers.forEach((controller, idx) => {
      if (inputs[idx].required) {
        if (!controller.isValid) {
          valid = false
        }
      }
    })
    setIsValid((prev) => valid)
  }, 100)
  useEffect(() => {
    callback()
  }, [controllers.map((controller) => controller.value)])

  return {
    controllers,
    isValid,
  }
}
