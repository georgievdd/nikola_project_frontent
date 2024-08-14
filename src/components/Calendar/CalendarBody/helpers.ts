import {SyntheticEvent} from 'react'

import {startOfWeek, format, addMonths} from 'date-fns'
import {ru} from 'date-fns/locale'

import {CalendarState, DayType} from 'entity/Calendar'
export const monday = startOfWeek(new Date(), {weekStartsOn: 1})
export const weekArray = Array.from({length: 7})

export const getMonthName = (month: number) =>
  [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ][month]

declare global {
  interface Date {
    getKey(): string
    getKeyReverse(): string
    getMonthFromIndexInCalendar(c: number): Date
  }
}

Date.prototype.getKey = function getKeyFromDate() {
  return format(this, 'dd-MM-yyyy')
}
Date.prototype.getKeyReverse = function getKeyFromDate() {
  return format(this, 'yyyy-MM-dd')
}

export const getDateOrPlug = (date: Date | null) => {
  if (!date) {
    return '- -'
  }
  return format(date, 'dd MMM', {locale: ru})
}

export function getMonthFromIndexInCalendar(c: number) {
  return addMonths(new Date(), c)
}

export type DateOrNull = Date | null

const extractGroupIdFromElement = (e: Element): number | undefined => {
  const id = e.id.at(-1)
  return id ? +id : undefined
}

export const extractGroupIdFromEvent = (e: SyntheticEvent) =>
  extractGroupIdFromElement(e.target as Element)

export function addDayTypeToCalendarState(
  calendar: CalendarState,
  key: string,
  type: DayType,
) {
  if (!calendar[key]) {
    calendar[key] = []
  }
  calendar[key].push(type)
}

export const getMonthNameElementByIndex = (
  container: HTMLElement,
  index: number,
) =>
  container.querySelector(
    `.month-name-title#month-name-${index}`,
  )! as HTMLElement
