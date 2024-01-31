import React, {useEffect} from 'react';
import './style.css';
import {addDays, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek} from "date-fns";
import {ru} from "date-fns/locale"
import {CalendarController, DAY_STATE, stateStyle} from "./useCalendar";
import {formatKey} from "../../utils/utils";

let startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
const CalendarForm = (
    {controller}: {controller: CalendarController}
) => {
    const {
        select,
        monthMask,
        setMonthMask,
    } = controller
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
        const monthStart = startOfMonth(controller.month);
        const monthEnd = endOfMonth(monthStart);

        const startDate = startOfWeek(monthStart, {weekStartsOn: 1});
        const endDate = endOfWeek(monthEnd, {weekStartsOn: 1});

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const dayKey = formatKey(day);
                if (controller.isPast(day)) {
                    monthMask[dayKey] = DAY_STATE.PAST
                }
                const dayStyle = stateStyle[monthMask[dayKey]];
                const dayCopy = new Date(day) // чтобы js замыкал текущее состояние
                days.push(
                    <div
                        className={"calendar-cell " + dayStyle}
                        key={day.toString()}
                        onMouseDown={(e) => handleMouseDown(e, dayCopy)}
                        onMouseUp={e => handleMouseUp(e, dayCopy)}
                        onMouseEnter={e => handleMouseEnter(e, dayCopy)}
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
        if (!controller.mayUpdate()) {
            return
        }
        const monthStart = startOfMonth(controller.month);
        const monthEnd = endOfMonth(monthStart);

        const newDayStates = {...controller.initMonthMask};
        let begin = new Date(select.begin!);
        let end = new Date(select.end!);

        if (begin > end) {
            const ref = begin
            begin = end
            end = ref
        }

        let keyBegin = formatKey(controller.checkBegin(begin))
        let keyEnd = formatKey(end)

        if (controller.initMonthMask[keyBegin] === DAY_STATE.BOOKED) {
            controller.select.setIsActive(false)
            return;
        }

        console.log(keyBegin, keyEnd)

        while (begin <= end) {
            const dayKey = formatKey(begin)

            if (monthMask[dayKey] === DAY_STATE.BOOKED) {
                keyEnd = formatKey(addDays(begin, -1))
                select.setIsActive(true)
                console.log(keyEnd)
                break
            }

            newDayStates[dayKey] = DAY_STATE.SELECTED;
            begin = addDays(begin, 1);
        }
        if (keyBegin !== keyEnd) {
            newDayStates[keyBegin] = DAY_STATE.LEFT_SELECTED;
            newDayStates[keyEnd] = DAY_STATE.RIGHT_SELECTED;
        } else {
            newDayStates[keyBegin] = DAY_STATE.POINT_SELECTED;
        }
        setMonthMask(newDayStates);
    }, [select.end, select.begin]);

    return (
        <div className='calendar-container'>
            {renderDays()}
            {renderCells()}
        </div>
    )
};

export default CalendarForm;