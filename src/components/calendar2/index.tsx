import React, { useEffect, useState } from 'react';
import './style.css';
import { api } from '../../api';
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    nextDay,
    startOfMonth,
    startOfWeek
} from "date-fns";
import { ru } from "date-fns/locale"

let startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
const Calendar2 = ({initialDayStates}: {initialDayStates?: Record<string, string>}) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [dayStates, setDayStates] = useState<Record<string, string>>(initialDayStates || {})

    const select = useSelect()
    const renderDays = () => {
        const dateFormat = "iiiiii";
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="calendar-cell" key={i}>
                    {format(addDays(startDate, i), dateFormat, { locale: ru })}
                </div>
            );
        }

        return <div id="month days" className="calendar-row border-bottom">{days}</div>;
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, day: Date) => {
        e.preventDefault()
        select.clear()
        select.setBegin(day)
        select.setEnd(day)
    }
    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>, day: Date) => {
        e.preventDefault()
        select.setIsActive(true)
    }
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, day: Date) => {
        e.preventDefault()
        if (select.isActive || !select.begin) {
            return;
        }
        select.setEnd(day)
    }
    const renderCells = () => {
        const dateFormat = "d";
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);

        const startDate = startOfWeek(monthStart, {weekStartsOn: 1});
        const endDate = endOfWeek(monthEnd, {weekStartsOn: 1});

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const dayKey = format(day, 'yyyy-MM-dd');
                if (day < monthStart || day > monthEnd) {
                    dayStates[dayKey] = "cell-disabled"
                }
                const dayState = dayStates[dayKey] || '';
                const dayCopyState = new Date(day) // чтобы js замыкал текущее состояние
                days.push(
                    <div
                        className={"calendar-cell " + dayState}
                        key={day.toString()}
                        onMouseDown={(e) => handleMouseDown(e, dayCopyState)}
                        onMouseUp={e => handleMouseUp(e, dayCopyState)}
                        onMouseEnter={e => handleMouseEnter(e, dayCopyState)}
                    >
                        {format(day, dateFormat)}
                    </div>
                );
                day = addDays(day, 1)
            }
            rows.push(
                <div className="calendar-row" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div id="calendar-dates">{rows}</div>
    }

    useEffect(() => {
        if (!select.end || !select.begin) return;
        const newDayStates: Record<string, string> = {};
        let begin = new Date(select.begin);
        let end = new Date(select.end);
        if (begin > end) {
            const ref = begin
            begin = end
            end = ref
        }
        const keyBegin = format(begin, 'yyyy-MM-dd')
        const keyEnd = format(end, 'yyyy-MM-dd')
        const endCopy = end
        while (begin <= end) {
            const dayKey = format(begin, 'yyyy-MM-dd');
            newDayStates[dayKey] = "cell-selected";
            begin = addDays(begin, 1);
        }
        if (keyBegin !== keyEnd) {
            newDayStates[keyBegin] += " cell-selected-left"
            newDayStates[keyEnd] += " cell-selected-right"
        } else {
            newDayStates[keyBegin] += " cell-selected-point"
        }
        setDayStates(newDayStates);
    }, [select.end, select.begin]);

    return (
        <div className='calendar-container'>
            {renderDays()}
            {renderCells()}
        </div>
    )
};

export default Calendar2;


const useSelect = () => {
    const [begin, setBegin] = useState<Date | null>(null)
    const [end, setEnd] = useState<Date | null>(null)
    const [isActive, setIsActive] = useState<Boolean>(false)
    const clear = () => {
        setBegin(null)
        setEnd(null)
        setIsActive(false)
    }
    return {
        begin, setBegin,
        end, setEnd,
        clear,
        isActive, setIsActive
    }
}