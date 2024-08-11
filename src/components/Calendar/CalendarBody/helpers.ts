import {SyntheticEvent} from 'react'

import {startOfWeek, format, addMonths} from 'date-fns'
import {ru} from 'date-fns/locale'
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

export enum DayType {
  Holiday,
  Disabled,
}

export const dayStyle = {
  [DayType.Disabled]: 'date_disabled',
  [DayType.Holiday]: 'date_holiday',
}

const extractMonthIdFromElement = (e: Element): number | undefined => {
  const id = e.id.at(-1)
  return id ? +id : undefined
}

export const extractIdFromEvent = (e: SyntheticEvent) =>
  extractMonthIdFromElement(e.target as Element)

export const extractMonthIdFromYear = (
  e: SyntheticEvent,
): number | undefined => {
  const month = (e.target as Element).parentNode!.querySelector('p')!
  return extractMonthIdFromElement(month)
}
