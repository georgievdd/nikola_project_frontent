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

import {
  dayStyle,
  DayType,
  extractIdFromEvent,
  extractMonthIdFromYear,
  getMonthName,
  monday,
  weekArray,
} from 'Calendar/CalendarBody/helpers'
import {CalendarController} from 'Calendar/CalendarBody/hooks/useCalendar'
import {SelectionController} from 'Calendar/CalendarBody/hooks/useSelection'

export default function Calendar3({
  controller,
}: {
  controller: CalendarController
}) {
  const {
    id,
    selectionController,
    processDateClick,
    opacity,
    calendarCellsRef,
    scrollController,
    dataController,
    onLoad,
  } = controller
  const calendarMonthNameColumnRef = useRef<HTMLDivElement>(null)
  const monthClick = useCallback((e: SyntheticEvent) => {
    const id = extractIdFromEvent(e)!
    scrollController.scrollToMonth(id)
  }, [])
  const yearClick = useCallback((e: SyntheticEvent) => {
    const id = extractMonthIdFromYear(e)!
    scrollController.scrollToMonth(id)
  }, [])

  return (
    <div className={'calendar-container'}>
      <div className="calendar-months" ref={calendarMonthNameColumnRef}>
        {scrollController.currentMonthIndex !== undefined && (
          <CalendarHighlighter
            selectedMonthIndex={scrollController.currentMonthIndex}
            calendarMonthNameColumnRef={calendarMonthNameColumnRef}
          />
        )}
        {Array.from({length: opacity}).map((_, i) => {
          const date = addMonths(new Date(), i)
          return (
            <div style={{zIndex: 1}} key={date.getKey()}>
              {(date.getMonth() === 0 || i == 0) && (
                <h3 onClick={yearClick} className={'year-name pointer'}>
                  {date.getFullYear()}
                </h3>
              )}
              <p
                onClick={monthClick}
                id={`${id}month-name${i}`}
                className="month-name pointer"
                key={id + i}
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
          ref={calendarCellsRef}
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
          {Array.from({length: opacity}).map((_, i) => {
            const month = addMonths(new Date(), i)
            return (
              <div key={month.getKey()} style={{marginBottom: '10px'}}>
                <h3 id={i + ''} className="month-name-title">
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

const CalendarHighlighter = ({
  selectedMonthIndex,
  calendarMonthNameColumnRef,
}: {
  selectedMonthIndex: number
  calendarMonthNameColumnRef: RefObject<HTMLDivElement>
}) => {
  const calendarHighlighterRef = useRef<HTMLDivElement>(null)
  const [highlighterTop, setHighlighterTop] = useState(0)
  const [highlighterWidth, setHighlighterWidth] = useState(0)

  useEffect(() => {
    const elements =
      calendarMonthNameColumnRef.current!.querySelectorAll('.month-name')
    const month = elements[selectedMonthIndex].getBoundingClientRect()
    const column = calendarMonthNameColumnRef.current!.getBoundingClientRect()
    const top =
      month.top - column.top + calendarMonthNameColumnRef.current!.scrollTop
    setHighlighterTop(top - 5)
    setHighlighterWidth(month.width + 20)
  }, [selectedMonthIndex, calendarMonthNameColumnRef])

  const [prevHighlighterRect, setPrevHighlighterRect] = useState(0)
  useEffect(() => {
    const column = calendarMonthNameColumnRef.current!
    const columnRect = column.getBoundingClientRect()
    const highlighter = calendarHighlighterRef.current!
    const highlighterRect = highlighter.getBoundingClientRect()
    const direction = highlighterRect.bottom - prevHighlighterRect

    if (columnRect.bottom - highlighterRect.bottom < 100) {
      column.scrollTo({
        top: column.scrollTop + 120,
        behavior: 'smooth',
      })
      setPrevHighlighterRect((prev) => highlighterRect.bottom - 120)
      return
    }

    if (highlighterRect.bottom - columnRect.bottom < 60 && direction <= 0) {
      column.scrollTo({
        top: column.scrollTop - 200,
        behavior: 'smooth',
      })
      setPrevHighlighterRect((prev) => highlighterRect.bottom + 200)
      return
    }
    setPrevHighlighterRect(highlighterRect.bottom)
  }, [highlighterTop, calendarMonthNameColumnRef])
  return (
    <div
      id="calendar-highlighter"
      className="month-name-highlighter"
      ref={calendarHighlighterRef}
      style={{top: `${highlighterTop}px`, width: `${highlighterWidth}px`}}
    />
  )
}

interface MonthProps {
  month: Date
  selectionController: SelectionController
  processDateClick: (day: Date) => void
  mapState: Record<string, DayType>
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
  const getStyle = (day: Date): string => {
    let style = ''
    if (isActive) {
      if (isSameDay(day, dateBegin!)) {
        if (isSameDay(day, dateEnd!)) {
          style += 'date_select-point '
        } else {
          style += 'date_select-left '
        }
      } else if (isSameDay(day, dateEnd!)) {
        style += 'date_select-right '
      } else if (dateBegin! < day && day < dateEnd!) {
        style += 'date_select '
      }
    } else if (dateBegin && isSameDay(day, dateBegin)) {
      style += 'date_select-start '
    }
    if (mapState[day.getKey()] == undefined) return style
    return style + dayStyle[mapState[day.getKey()]]
  }
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
                  <div className="date__coin">{costs[day.getKey()]}</div>
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
