import {Dispatch, SetStateAction, useState} from 'react'

import {HouseOptions} from 'entity/House'

export interface DatePickerController {
  currentFirst: string
  setCurrentFirst: Dispatch<SetStateAction<string>>
  currentSecond: string
  setCurrentSecond: Dispatch<SetStateAction<string>>
  data: HouseOptions
  clear: () => void
}

export function useDatePicker(data: HouseOptions): DatePickerController {
  const [currentFirst, setCurrentFirst] = useState(data.check_in_times.default)
  const [currentSecond, setCurrentSecond] = useState(
    data.check_out_times.default,
  )
  const clear = () => {
    setCurrentFirst(data.check_in_times.default)
    setCurrentSecond(data.check_out_times.default)
  }
  return {
    currentFirst,
    setCurrentFirst,
    currentSecond,
    setCurrentSecond,
    data,
    clear,
  }
}
