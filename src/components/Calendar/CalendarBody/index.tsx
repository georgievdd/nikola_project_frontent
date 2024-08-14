import React, {
  RefObject,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import './style.scss'
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import {ru} from 'date-fns/locale'

import {getMonthName, monday, weekArray} from 'Calendar/CalendarBody/helpers'
import {CalendarController} from 'Calendar/CalendarBody/hooks/useCalendar'
import {SelectionController} from 'Calendar/CalendarBody/hooks/useSelection'
import {CalendarState, dayStyle, DayType} from 'entity/Calendar'

import {calendarSize} from './config'

export default function Calendar3({
  controller,
}: {
  controller: CalendarController
}) {
  const {
    id,
    selectionController,
    processDateClick,
    scrollController,
    dataController,
    onLoad,
  } = controller
  const monthClick = useCallback((e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const monthId = +e.currentTarget.id.split('-').at(-1)!
    scrollController.scrollToMonth(monthId)
  }, [])

  return (
    <div className={'calendar-container'}>
      <div
        className="calendar-months"
        ref={scrollController.monthsContainerRef}
      >
        <div
          className="month-name-highlighter"
          ref={scrollController.highlighterRef}
        />
        {Array.from({length: calendarSize}).map((_, i) => {
          const date = addMonths(new Date(), i)
          return (
            <div id={'month-' + i} key={i} className={'zi-1'}>
              {(date.getMonth() === 0 || i == 0) && (
                <h3
                  onClick={monthClick}
                  className={'year-name pointer'}
                  id={'year-' + i}
                >
                  {date.getFullYear()}
                </h3>
              )}
              <p
                onClick={monthClick}
                className="month-name pointer"
                key={id + i}
                id={'month-' + i}
              >
                {getMonthName(date.getMonth())}
              </p>
            </div>
          )
        })}
      </div>
      <div className="calendar-days">
        <div
          className="calendar-cells"
          ref={scrollController.daysContainerRef}
          onScroll={scrollController.handleScroll}
        >
          <div className="calendar__row days-header">
            {weekArray.map((_, i) => {
              const text = format(addDays(monday, i), 'iiiiii', {locale: ru})
              return (
                <div className="calendar__cell" key={text + id + i}>
                  {text}
                </div>
              )
            })}
          </div>
          {Array.from({length: calendarSize}).map((_, i) => {
            const month = addMonths(new Date(), i)
            return (
              <div key={month.getKey()} style={{marginBottom: '10px'}}>
                <h3 id={'month-name-' + i} className="month-name-title">
                  {getMonthName(month.getMonth())}
                </h3>
                <Month
                  onLoad={onLoad}
                  key={i + 'month'}
                  month={month}
                  selectionController={selectionController}
                  processDateClick={processDateClick}
                  mapState={dataController.mapState}
                  costs={dataController.costs}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

interface MonthProps {
  month: Date
  selectionController: SelectionController
  processDateClick: (day: Date) => void
  mapState: CalendarState
  costs: Record<string, number>
  onLoad: boolean
}
const Month = ({
  month,
  processDateClick,
  mapState,
  selectionController,
  costs,
  onLoad,
}: MonthProps) => {
  const {dateBegin, dateEnd, isActive} = selectionController

  const getStyle = useCallback(
    (day: Date): string => {
      const style: Array<string> = []
      const key = day.getKey()
      if (Array.isArray(mapState[key])) {
        mapState[key].forEach((type) => {
          style.push(dayStyle[type])
        })
      }
      if (isActive) {
        if (dateBegin! <= day && day <= dateEnd!) {
          style.push('date_select')
        }
      }
      if (dateBegin && isSameDay(dateBegin, day)) {
        style.push('date_select-start')
      }
      return style.join(' ')
    },
    [mapState, dateBegin],
  )

  const renderCells = () => {
    const dateFormat = 'd'
    const monthStart = startOfMonth(month)
    const monthEnd = endOfMonth(month)

    const rows = []
    let days = []
    let day = startOfWeek(monthStart, {weekStartsOn: 1})

    while (day <= monthEnd) {
      for (let i = 0; i < 7; i++) {
        if (day < monthStart || day > monthEnd) {
          days.push(
            <div className={'calendar__cell'} key={day.toString() + month} />,
          )
        } else {
          const dayCopy = new Date(day)
          days.push(
            <div
              className={'calendar__cell'}
              key={day.toString() + month}
              onClick={(e) => {
                e.stopPropagation()
                processDateClick(dayCopy)
              }}
            >
              <div
                // eslint-disable-next-line max-len
                className={`date ${getStyle(day)} ${onLoad ? 'noclickable' : ''}`}
              >
                <p>{format(day, dateFormat)}</p>
                {costs[day.getKey()] && (
                  <div className="date_coin">{costs[day.getKey()]}</div>
                )}
              </div>
            </div>,
          )
        }
        day = addDays(day, 1)
      }
      rows.push(
        <div className="calendar__row" key={day.toString()}>
          {days}
        </div>,
      )
      days = []
    }
    return <div>{rows}</div>
  }

  return (
    <div className="calendar__month">
      <div className={'weekend_style'} />
      {renderCells()}
    </div>
  )
}
