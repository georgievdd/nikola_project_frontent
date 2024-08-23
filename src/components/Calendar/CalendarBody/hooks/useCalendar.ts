import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

import {differenceInCalendarMonths, isSameDay} from 'date-fns'

import {getCheckInCalendar, getCommonCalendar} from 'Calendar/CalendarBody/api'
import {INumberInput} from 'components/ui/Inputs/NumberInput/useNumberInput'
import {DayType} from 'entity/Calendar'
import {getMessageFromApiError, handleApiError} from 'src/helpers'

import {CalendarDataController, useCalendarData} from './useCalendarData'
import {ScrollController, useScroll} from './useScroll'
import {SelectionController, useSelection} from './useSelection'

export interface CalendarController {
  id: string
  selectionController: SelectionController
  processDateClick: (day: Date) => void
  dataController: CalendarDataController
  scrollController: ScrollController
  onLoad: boolean
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  reset: () => void
}
export function useCalendar(
  id: string,
  defaultShow: boolean,
  endpoint: string,
  guestsController: INumberInput,
): CalendarController {
  /**
   * Сколько месяцев вперед отображаем
   */
  const [show, setShow] = useState(defaultShow)
  const scrollController = useScroll()
  const selectionController = useSelection()
  const dataController = useCalendarData()
  const [onLoad, setLoad] = useState(false)

  function validDate(date: Date): boolean {
    const key = date.getKey()
    const {mapState} = dataController
    if (!mapState[key]) return true
    return !mapState[key].includes(DayType.Disabled)
  }

  const processDateClick = function (date: Date) {
    if (!validDate(date)) {
      return
    }
    if (
      (selectionController.isStart || selectionController.isActive) &&
      isSameDay(date, selectionController.dateBegin!)
    ) {
      reset()
      return
    }
    if (selectionController.isActive) {
      selectionController.setDateEnd(null)
      selectionController.setDateBegin(date)
      return
    }
    if (selectionController.dateBegin) {
      if (selectionController.dateBegin > date) {
        selectionController.setDateEnd(selectionController.dateBegin)
        selectionController.setDateBegin(date)
        return
      }
      selectionController.setDateEnd(date)
      return
    }
    selectionController.setDateBegin(date)
  }
  function setCommonCalendar(withClear: boolean = false) {
    setLoad(true)
    getCommonCalendar(
      dataController,
      scrollController.currentMonthIndex,
      endpoint,
      guestsController.value,
      withClear,
    )
      .then((result) =>
        dataController.setMapState((prev) => ({...prev, ...result})),
      )
      .catch(handleApiError)
      .finally(() => setLoad(false))
  }
  function setCheckInCalendar(
    withClear: boolean = false,
    callback?: (...args: any) => void,
  ) {
    setLoad(true)
    getCheckInCalendar(
      dataController,
      Math.max(scrollController.currentMonthIndex - 1, 0),
      selectionController.dateBegin!,
      endpoint,
      guestsController.value,
      withClear,
    )
      .then((result) => {
        const [map, costs] = result
        if (withClear) {
          dataController.setMapState(map)
          dataController.setCosts(costs)
        } else {
          dataController.setMapState((prev) => ({...map, ...prev}))
          dataController.setCosts((prev) => ({...costs, ...prev}))
        }
        callback && callback(result)
      })
      .catch(handleApiError)
      .finally(() => setLoad(false))
  }

  /**
   * При инициализации
   * scrollController.currentMonthIndex = 0 (сегодняшний месяц)
   *
   * При прокрутке будем расширять mapState, если в
   * нем еще нет рассматриваемого месяца (+ opacity)
   */
  useEffect(() => {
    if (show) {
      if (selectionController.dateBegin) {
        const diff = differenceInCalendarMonths(
          selectionController.dateBegin,
          new Date(),
        )
        scrollController.scrollToMonth(diff)
      } else {
        scrollController.scrollToMonth(0)
      }
    }
  }, [show])

  useEffect(() => {
    if (!show) return
    // isActive оставить в зависимости от требований
    if (selectionController.isStart || selectionController.isActive) {
      setCheckInCalendar()
    } else {
      setCommonCalendar()
    }
  }, [scrollController.currentMonthIndex, show])

  useEffect(() => {
    if (selectionController.isStart) {
      setCheckInCalendar(true)
    }
  }, [selectionController.isStart])

  useEffect(() => {
    if (dataController.wasCleared) {
      setCommonCalendar()
    }
  }, [dataController.wasCleared])

  useEffect(() => {
    if (guestsController.wasChangedByUser) {
      updateCalendar()
    }
  }, [guestsController.value])

  const reset = () => {
    selectionController.clear()
    dataController.clear()
  }

  function updateCalendar() {
    if (selectionController.isActive) {
      setCheckInCalendar(true)
    } else {
      setCommonCalendar(true)
    }
  }

  return {
    id,
    selectionController,
    processDateClick,
    dataController,
    onLoad,
    scrollController,
    show,
    setShow,
    reset,
  }
}
