import {addMonths, startOfMonth} from 'date-fns'

import {axiosInstance} from 'api/instance'
import {CheckInCalendar, CommonCalendar} from 'Calendar/CalendarBody/dto'
import {CalendarDataController} from 'Calendar/CalendarBody/hooks/useCalendarData'
import {
  mapFromCheckInDateCalendar,
  mapFromCommonCalendar,
} from 'Calendar/CalendarBody/mapper'

import {capacity} from './config'

const preprocessDates = (
  controller: CalendarDataController,
  dateIndex: number,
  withClear: boolean = false,
) => {
  const whiteList: number[] = []
  const blackList = withClear
    ? controller.beenLoaded.map(() => false)
    : controller.beenLoaded.slice()
  for (let index = dateIndex > 0 ? -1 : 0; index <= capacity; ++index) {
    if (!blackList[dateIndex + index]) {
      whiteList.push(dateIndex + index)
      blackList[dateIndex + index] = true
    }
  }
  controller.setBeenLoaded(blackList)
  return whiteList
}

export async function getCommonCalendar(
  dataController: CalendarDataController,
  dateIndex: number,
  endpoint: string,
  total_persons_amount: number,
  withClear: boolean,
) {
  try {
    const begin = startOfMonth(new Date())
    const nonCachedDates = preprocessDates(dataController, dateIndex, withClear)
    const response = await Promise.all(
      nonCachedDates.map(async (daysToAdd) => {
        const month = addMonths(begin, daysToAdd)
        const data = {
          month: month.getMonth() + 1,
          year: month.getFullYear(),
          total_persons_amount,
        }
        return axiosInstance
          .get<CommonCalendar>(endpoint, {params: data})
          .then((r) => r.data)
      }),
    )
    return mapFromCommonCalendar(response)
  } catch (e) {
    throw e
  }
}

export async function getCheckInCalendar(
  dataController: CalendarDataController,
  dateIndex: number,
  checkInDate: Date,
  endpoint: string,
  total_persons_amount: number,
  withClear: boolean,
) {
  try {
    const begin = startOfMonth(new Date())
    const nonCachedDates = preprocessDates(dataController, dateIndex, withClear)
    const response = await Promise.all(
      nonCachedDates.map(async (daysToAdd) => {
        const month = addMonths(begin, daysToAdd)
        const data = {
          month: month.getMonth() + 1,
          year: month.getFullYear(),
          chosen_check_in_date: checkInDate.getKey(),
          total_persons_amount,
        }
        return axiosInstance
          .get<CheckInCalendar>(endpoint, {params: data})
          .then((r) => r.data)
      }),
    )
    return mapFromCheckInDateCalendar(checkInDate, response)
  } catch (e) {
    throw e
  }
}
