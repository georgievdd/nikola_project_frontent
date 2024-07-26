'use client'
import styles from './CalendarInput.module.scss'
import {CalendarController} from '../CalendarBody/hooks/useCalendar'
import {extractIdFromEvent, getDateOrPlug} from '../CalendarBody/helpers'
import {CSSProperties, SyntheticEvent, useCallback, useEffect, useRef} from 'react'
import Calendar3 from '../CalendarBody'
const s = require('@/helpers')
  .importStyles(require('./CalendarInput.module.scss'))


const Calendar = ({calendarController, style, className}: {
  calendarController: CalendarController,
  style?: CSSProperties,
  className?: string,
}) => {

  const {
    show,
    setShow
  } = calendarController
  const check_in_date = getDateOrPlug(calendarController.selectionController.dateBegin)
  const check_out_date = getDateOrPlug(calendarController.selectionController.dateEnd)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const groupRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  const hideCalendar = () => {
    wrapperRef.current?.classList.add(s`calendar-hide`)
    groupRefs.forEach(({current}) => current?.classList.remove(s`selected`))
    setTimeout(() => {
      wrapperRef.current?.classList.remove(s`calendar-hide`)
      setShow(false)
    }, 200)
  }
  const groupClick = useCallback((e: SyntheticEvent) => {
    e.stopPropagation()
    const id = extractIdFromEvent(e)!
    console.log(s`selected-${id}`);
    groupRefs[id].current?.classList.add(s`selected`)
    groupRefs[1 - id].current?.classList.remove(s`selected`)
    setShow(true)
  }, [])

  useEffect(() => {
    
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        !groupRefs[0].current?.contains(event.target as Node) &&
        !groupRefs[1].current?.contains(event.target as Node)
      ) {
        hideCalendar()
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [show])

  useEffect(() => {
    calendarController.selectionController.isActive && hideCalendar()
  }, [calendarController.selectionController.isActive])



  return (
    <div style={style} className={className}>
      <div className={s`wrapper`}>
        <div className={s`divider`}/>
        <div className={s`container`}>
          <div className={s`group border-right`} id='group-0' onClick={groupClick} ref={groupRefs[0]}>
            <div id='d-0'>
              <label id='l-0'>Заезд</label>
              <p id='p-0'>{check_in_date}</p>
            </div>
          </div>
          <div className={s`group`} id='group-1' onClick={groupClick} ref={groupRefs[1]}>
            <div id='d-1'>
              <label  id='l-1'>Выезд</label>
              <p  id='p-1'>{check_out_date}</p>
            </div>
          </div>
        </div>
      </div>
      { show &&
        <div className={s`calendar-start`} ref={wrapperRef}>
          <Calendar3 controller={calendarController} />
        </div>
      }
    </div>
  )
}

export default Calendar