'use client'
import {
  CSSProperties,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import Calendar3 from 'Calendar/CalendarBody'
import {
  extractGroupIdFromEvent,
  getDateOrPlug,
} from 'Calendar/CalendarBody/helpers'
import type {CalendarController} from 'Calendar/CalendarBody/hooks/useCalendar'

const css = require('src/helpers').importStyles(
  require('./CalendarInput.module.scss'),
)

const Calendar = ({
  calendarController,
  style,
  className,
}: {
  calendarController: CalendarController
  style?: CSSProperties
  className?: string
}) => {
  const {show, setShow} = calendarController
  const check_in_date = getDateOrPlug(
    calendarController.selectionController.dateBegin,
  )
  const check_out_date = getDateOrPlug(
    calendarController.selectionController.dateEnd,
  )
  const wrapperRef = useRef<HTMLDivElement>(null)
  const groupRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  const hideCalendar = () => {
    wrapperRef.current?.classList.add(css`calendar-hide`)
    groupRefs.forEach(({current}) => current?.classList.remove(css`selected`))
    setTimeout(() => {
      wrapperRef.current?.classList.remove(css`calendar-hide`)
      setShow(false)
    }, 200)
  }
  const groupClick = useCallback((e: SyntheticEvent) => {
    e.stopPropagation()
    const id = extractGroupIdFromEvent(e)!
    groupRefs[id].current?.classList.add(css`selected`)
    groupRefs[1 - id].current?.classList.remove(css`selected`)
    setShow(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        !groupRefs[0].current?.contains(event.target as Node) &&
        !groupRefs[1].current?.contains(event.target as Node)
      ) {
        hideCalendar()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [show])

  useEffect(() => {
    calendarController.selectionController.isActive && hideCalendar()
  }, [calendarController.selectionController.isActive])

  return (
    <div style={style} className={className}>
      <div className={css`wrapper`}>
        <div className={css`divider`} />
        <div className={css`container`}>
          <div
            className={css`group border-right`}
            id="group-0"
            onClick={groupClick}
            ref={groupRefs[0]}
          >
            <div id="d-0">
              <label id="l-0">Заезд</label>
              <p id="p-0">{check_in_date}</p>
            </div>
          </div>
          <div
            className={css`group`}
            id="group-1"
            onClick={groupClick}
            ref={groupRefs[1]}
          >
            <div id="d-1">
              <label id="l-1">Выезд</label>
              <p id="p-1">{check_out_date}</p>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <div className={css`calendar-start`} ref={wrapperRef}>
          <Calendar3 controller={calendarController} />
        </div>
      )}
    </div>
  )
}

export default Calendar
