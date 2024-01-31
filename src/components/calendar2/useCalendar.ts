import {useState} from "react";
import {addDays, addMonths, format} from "date-fns";
import {formatKey} from "../../utils/utils";

export enum DAY_STATE {
    PAST,
    BOOKED,
    HOLIDAY,
    SELECTED,
    LEFT_SELECTED,
    RIGHT_SELECTED,
    POINT_SELECTED,
}
export interface CalendarController {
    monthMask: Record<string, DAY_STATE>,
    setMonthMask: (param: Record<string, DAY_STATE>) => void,
    month: Date,
    setMonth: (param: Date) => void,
    nextMonth: () => void,
    prevMonth: () => void,
    select: SelectController,
    today: Date,
    isPast: (day: Date) => boolean,
    mayUpdate: () => boolean,
    checkBegin: (day: Date) => Date,
    initMonthMask: Record<string, DAY_STATE>,
}


export function useCalendar(
    initMonth: Date,
    initMonthMask: Record<string, DAY_STATE>,
): CalendarController {
    const [month, setMonth] = useState<Date>(initMonth)
    const [monthMask, setMonthMask] = useState<Record<string, DAY_STATE>>(initMonthMask)
    const select = useSelect()
    const today = addDays(new Date(), -1)
    const nextMonth = () => setMonth(prev => addMonths(prev, 1))
    const prevMonth = () => setMonth(prev => addMonths(prev, -1))

    const isPast = (day: Date) => {
        return day < today
    }
    const mayUpdate = () => {
        if (!select.begin || !select.end) return false
        const dayType = monthMask[formatKey(select.begin!)]
        return dayType !== DAY_STATE.BOOKED && dayType !== DAY_STATE.PAST
    }

    const checkBegin = (day: Date) => {
        if (day > today) return day
        return new Date()
    }
    return {
        select,
        monthMask, setMonthMask,
        month, setMonth,
        nextMonth,
        prevMonth,
        today,
        isPast,
        mayUpdate,
        checkBegin,
        initMonthMask,
    }
}

export const stateStyle = {
    [DAY_STATE.PAST]: "cell-disabled",
    [DAY_STATE.BOOKED]: "cell-booked",
    [DAY_STATE.HOLIDAY]: "cell-holiday",
    [DAY_STATE.SELECTED]: "cell-selected",

    // детали реализации
    [DAY_STATE.LEFT_SELECTED]: "cell-selected-left",
    [DAY_STATE.RIGHT_SELECTED]: "cell-selected-right",
    [DAY_STATE.POINT_SELECTED]: "cell-selected-point",
}


interface SelectController {
    begin: Date | null, setBegin: (param: Date) => void,
    end: Date | null, setEnd: (param: Date) => void,
    clear: () => void,
    isActive: Boolean, setIsActive: (param: Boolean) => void
}
export const useSelect = (): SelectController => {
    const [begin, setBegin] = useState<Date | null>(null)
    const [end, setEnd] = useState<Date | null>(null)
    const [isActive, setIsActive] = useState<Boolean>(false)
    const clear = () => {
        setBegin(null)
        setEnd(null)
        setIsActive(false)
    }
    return {
        begin, setBegin,
        end, setEnd,
        clear,
        isActive, setIsActive
    }
}