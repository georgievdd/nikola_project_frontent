import React, {RefObject, useEffect, useRef, useState} from 'react';
import './style.css'
import {addDays, addMonths, endOfMonth, format, isSameDay, startOfMonth, startOfWeek} from "date-fns";
import {dayStyle, DayType, getMonthName, monday, weekArray} from "./helpers";
import {ru} from "date-fns/locale";
import {CalendarController} from "./hooks/useCalendar";
import {SelectionController} from "./hooks/useSelection";


export default function Calendar3({controller}: {controller: CalendarController}) {
    const {
        id,
        selectionController,
        processDateClick,
        opacity,
        calendarCellsRef,
        scrollController,
        dataController
    } = controller
    const calendarMonthNameColumnRef = useRef<HTMLDivElement>(null)

    return (
        <div className={`calendar-container ${controller.onLoad && 'calendar-container_disabled'}`}>
            <div className='calendar-months' ref={calendarMonthNameColumnRef}>
                {scrollController.currentMonthIndex !== undefined && (
                    <CalendarHighlighter
                        selectedMonthIndex={scrollController.currentMonthIndex}
                        calendarMonthNameColumnRef={calendarMonthNameColumnRef}
                    />
                )}
                {Array.from({length: opacity}).map((_, i) =>
                    <div id={`${id}month-name${i}`} className="month-name calendar__cell" key={id + i}>
                        {getMonthName(addMonths(new Date(), i).getMonth())}
                    </div>
                )}
            </div>
            <div className='calendar-days'>
                <div className='calendar__row days-header'>
                    {weekArray.map((_, i) => {
                        const text = format(addDays(monday, i), "iiiiii", {locale: ru})
                        return (
                            <div className="calendar__cell" key={text + id + i}>
                                {text}
                            </div>
                        )
                    })}
                </div>
                <div className='calendar-cells'
                     ref={calendarCellsRef}
                     onScroll={scrollController.handleScroll}
                >
                    {Array.from({length: opacity}).map((_, i) => {
                        const month = addMonths(new Date(), i)
                        return (
                        <div style={{marginBottom: '10px'}}>
                            <h3 id={i+''} className='month-name-title'>{getMonthName(month.getMonth())}</h3>
                            <Month
                                key={i + 'month'}
                                month={month}
                                selectionController={selectionController}
                                processDateClick={processDateClick}
                                mapState={dataController.mapState}
                                costs={dataController.costs}
                            />
                        </div>
                    )})}
                </div>
            </div>
        </div>
    );
}

const CalendarHighlighter = (
    { selectedMonthIndex, calendarMonthNameColumnRef }:
    { selectedMonthIndex: number, calendarMonthNameColumnRef: RefObject<HTMLDivElement> }
) => {
    const calendarHighlighterRef = useRef<HTMLDivElement>(null);
    const [highlighterTop, setHighlighterTop] = useState(0);
    const [highlighterWidth, setHighlighterWidth] = useState(0);

    useEffect(() => {
        const elements = calendarMonthNameColumnRef.current!.querySelectorAll('.month-name');
        const month = elements[selectedMonthIndex].getBoundingClientRect();
        const column = calendarMonthNameColumnRef.current!.getBoundingClientRect();
        const top = month.top - column.top + calendarMonthNameColumnRef.current!.scrollTop;
        setHighlighterTop(top + month.width / 8);
        setHighlighterWidth(month.width);
    }, [selectedMonthIndex, calendarMonthNameColumnRef]);


    useEffect(() => {
        const column = calendarMonthNameColumnRef.current!;
        const columnRect = column.getBoundingClientRect();
        const highlighter = calendarHighlighterRef.current!;
        const highlighterRect = highlighter.getBoundingClientRect();

        if (columnRect.bottom - highlighterRect.bottom < 200) {
            column.scrollTo({
                top: column.scrollTop + 120,
                behavior: 'smooth',
            })
            return
        }
        if (highlighterRect.bottom - columnRect.bottom < 120) {
            column.scrollTo({
                top: column.scrollTop - 200,
                behavior: 'smooth',
            })
        }
    }, [highlighterTop, calendarMonthNameColumnRef]);


    return (
        <div id="calendar-highlighter" className='month-name-highlighter' ref={calendarHighlighterRef} style={{ top: `${highlighterTop}px`, width: `${highlighterWidth}px` }} />
    );
};
interface MonthProps {
    month: Date
    selectionController: SelectionController
    processDateClick: (day: Date) => void
    mapState: Record<string, DayType>
    costs: Record<string, number>
}
const Month = ({month, processDateClick, mapState, selectionController, costs}: MonthProps) => {

    const {
        dateBegin,
        dateEnd,
        isActive
    } = selectionController
    const getStyle = (day: Date): string => {
        if (isActive) {
            if (isSameDay(day, dateBegin!)) {
                if (isSameDay(day, dateEnd!))
                    return 'date_select-point'
                return 'date_select-left'
            }
            if (isSameDay(day, dateEnd!)) {
                return 'date_select-right'
            }
            if (dateBegin! < day && day < dateEnd!) {
                return 'date_select'
            }
        } else if (dateBegin && isSameDay(day, dateBegin)) {
            return 'date_select-start'
        }
        if (mapState[day.getKey()] === undefined) return ''
        return dayStyle[mapState[day.getKey()]]
    }
    const renderCells = () => {
        const dateFormat = "d";
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);

        const rows = [];
        let days = [];
        let day = startOfWeek(monthStart, {weekStartsOn: 1})

        while (day <= monthEnd) {
            for (let i = 0; i < 7; i++) {
                if (day < monthStart || day > monthEnd) {
                    days.push(<div className={"calendar__cell"} key={day.toString() + month}/>)
                } else {
                    const dayCopy = new Date(day)
                    days.push(
                        <div
                            className={`calendar__cell date ${getStyle(day)}`}
                            key={day.toString() + month}
                            onClick={e => {
                                e.stopPropagation()
                                processDateClick(dayCopy)
                            }}
                        >
                            {format(day, dateFormat)}
                            {costs[day.getKey()] &&
                                <div className='date__coin'>
                                    {costs[day.getKey()]}
                                </div>}
                        </div>
                    );
                }
                day = addDays(day, 1)
            }
            rows.push(
                <div className="calendar__row" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }
        return (
            <div>
                {rows}
            </div>
        )
    }

    return (
        <div className='calendar__month'>
            {renderCells()}
        </div>
    )
}