import { Dispatch, SetStateAction, useState } from "react"

interface DateBucket {
    default: string
    other: string[]
    label: string
    labelImage: any
}

export interface Props {
    first_group: DateBucket
    second_group: DateBucket
}

export interface DatePickerController {
    currentFirst: string
    setCurrentFirst: Dispatch<SetStateAction<string>>
    currentSecond: string
    setCurrentSecond: Dispatch<SetStateAction<string>>
    data: Props
}

export function useDatePicker(data: Props): DatePickerController {
    const [currentFirst, setCurrentFirst] = useState(data.first_group.default)
    const [currentSecond, setCurrentSecond] = useState(data.second_group.default)
    return {
        currentFirst, setCurrentFirst,
        currentSecond, setCurrentSecond,
        data,
    }
}