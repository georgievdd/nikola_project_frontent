'use client'
import { useState } from "react"


export interface INumberInput {
    label: string
    add: () => void
    substract: () => void
    value: number
    reset: () => void
}

export const useNumberInput = (label: string): INumberInput => {
    const [value, setValue] = useState(0)
    const add = () => setValue(prev => prev + 1)
    const substract = () => {
        if (value === 0) {
            return
        }
        setValue(prev => prev - 1)
    }
    return {
        label,
        value,
        add,
        substract,
        reset: () => setValue(0)
    }
}