import {CheckInCalendar, CommonCalendar} from 'Calendar/CalendarBody/dto'
import {CalendarState, DayType} from 'entity/Calendar'

import {addDayTypeToCalendarState} from './helpers'

/**
 * список на насколько месяцев сразу
 */
export function mapFromCommonCalendar(data: CommonCalendar[]): CalendarState {
  const state: CalendarState = {}
  data.forEach(({calendar}) => {
    Object.keys(calendar).forEach((key) => {
      if (!calendar[key].check_in_is_available) {
        addDayTypeToCalendarState(state, key, DayType.Disabled)
      }
      if (calendar[key].is_holiday) {
        addDayTypeToCalendarState(state, key, DayType.Holiday)
      }
    })
  })
  return state
}

export function mapFromCheckInDateCalendar(
  checkInDate: Date,
  data: CheckInCalendar[],
): [CalendarState, Record<string, number>] {
  const state: CalendarState = {}
  const costs: Record<string, number> = {}
  data.forEach(({calendar}) => {
    Object.keys(calendar).forEach((key) => {
      if (calendar[key].price) {
        costs[key] = calendar[key].price!
      }
      if (!calendar[key].check_out_is_available) {
        if (checkInDate.getKey() !== key) {
          addDayTypeToCalendarState(state, key, DayType.Disabled)
        }
      }
      if (calendar[key].is_holiday) {
        addDayTypeToCalendarState(state, key, DayType.Holiday)
      }
    })
  })
  return [state, costs]
}
