'use client'
import type { Setter } from "@/helpers"
import { useState } from "react"

export interface INumberInput {
    label: string
    add: () => void
    substract: () => void
    reset: () => void
    wasChangedByUser: boolean
    value: number
    minValue: number
    maxValue: number
    setValue: Setter<number>
    setMinValue: Setter<number>
    setMaxValue: Setter<number>
}

export const useNumberInput = (
    label: string,
    minValueDefault: number = 0,
    maxValueDefault: number = 100000
    ): INumberInput => {
        const [value, setValue] = useState(minValueDefault)
        const [minValue, setMinValue] = useState(minValueDefault)
        const [maxValue, setMaxValue] = useState(maxValueDefault)
        const [wasChangedByUser, setWasChangedByUser] = useState(false)
    const add = () => {
        setWasChangedByUser(true)
        if (value === maxValue) {
            return
        }
        setValue(prev => prev + 1)
    }
    const substract = () => {
        if (value === minValue) {
            return
        }
        setValue(prev => prev - 1)
    }
    return {
        label,
        add,
        substract,
        reset: () => setValue(prev => minValue),
        wasChangedByUser,
        minValue,
        maxValue,
        value,
        setValue,
        setMinValue,
        setMaxValue
    }
}