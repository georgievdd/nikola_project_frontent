import { HouseOptions } from "@/entity/House"
import { Dispatch, SetStateAction, useState } from "react"

export interface DatePickerController {
    currentFirst: string
    setCurrentFirst: Dispatch<SetStateAction<string>>
    currentSecond: string
    setCurrentSecond: Dispatch<SetStateAction<string>>
    data: HouseOptions
}

export function useDatePicker(data: HouseOptions): DatePickerController {
    const [currentFirst, setCurrentFirst] = useState(data.check_in_times.default)
    const [currentSecond, setCurrentSecond] = useState(data.check_out_times.default)
    return {
        currentFirst, setCurrentFirst,
        currentSecond, setCurrentSecond,
        data,
    }
}