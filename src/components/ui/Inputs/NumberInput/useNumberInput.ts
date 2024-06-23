'use client'
import { useState } from "react"


export interface INumberInput {
    label: string
    add: () => void
    substract: () => void
    value: number
    reset: () => void
    set: (v: number) => void
    wasChangedByUser: boolean
    minValue: number
    maxValue: number
}

export const useNumberInput = (
    label: string,
    minValue: number = 0,
    maxValue: number = 100000
    ): INumberInput => {
    const [value, setValue] = useState(minValue)
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
        value,
        add,
        substract,
        reset: () => setValue(prev => minValue),
        set: (v: number) => setValue(prev => v),
        wasChangedByUser,
        minValue,
        maxValue,
    }
}