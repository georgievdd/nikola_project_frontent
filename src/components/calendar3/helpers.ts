import {startOfWeek, format, addDays, addMonths} from "date-fns";
export const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
export const weekArray = Array.from({length: 7})

export const getMonthName = (month: number) =>
    [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь',
    ][month]

declare global {
    interface Date {
        getKey(): string
        getMonthFromIndexInCalendar(c: number): Date
    }
}

Date.prototype.getKey = function getKeyFromDate() {
    return format(this, 'dd-MM-yyyy')
}

export function getMonthFromIndexInCalendar(c: number) {
    return addMonths(new Date(), c)
}

export type DateOrNull = Date | null

export enum DayType {
    Holiday, Disabled
}

export const dayStyle = {
    [DayType.Disabled]: 'date_disabled',
    [DayType.Holiday]: 'date_holiday',
}