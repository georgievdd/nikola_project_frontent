import {Dispatch, RefObject, useEffect, useRef, useState} from "react";
import {getCheckInCalendar, getCommonCalendar} from "../api";
import {currentMonthIndex} from "../../../utils/utils";
import {ScrollController, useScroll} from "./useScroll";
import {SelectionController, useSelection} from "./useSelection";
import {DayType} from "../helpers";
import {CalendarDataController, useCalendarData} from "./useCalendarData";

export interface CalendarController {
    id: string
    selectionController: SelectionController
    processDateClick: (day: Date) => void
    dataController: CalendarDataController
    opacity: number
    onLoad: boolean
    scrollController: ScrollController
    calendarCellsRef: RefObject<HTMLDivElement>
}

export function useCalendar (id: string, firstMoveTrigger?: boolean): CalendarController {
    /**
     * Сколько месяцев вперед отображаем
     */
    const opacity = 12 - currentMonthIndex
    const calendarCellsRef = useRef<HTMLDivElement>(null)
    const selectionController = useSelection()
    const scrollController = useScroll(calendarCellsRef)
    const dataController = useCalendarData(opacity)
    const [onLoad, setLoad] = useState(true)

    function validDate(date: Date): boolean {
        if (!dataController.mapState[date.getKey()]) return true
        return dataController.mapState[date.getKey()] !== DayType.Disabled
    }
    function processDateClick(date: Date) {
        if (!validDate(date)) {
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


    /**
     * По дефолту (у main календаря) тригером является didMount
     * У модального окна тригер - open=true
     */
    function triggerActive() {
        return firstMoveTrigger !== undefined && !firstMoveTrigger
    }

    /**
     * При инициализации scrollController.currentMonthIndex = 0 (сегодняшний месяц)
     * При прокрутке будем расширять mapState, если в нем еще нет рассматриваемого месяца (+ opacity)
     */
    useEffect(() => {
        if (triggerActive()) return;
        setLoad(true)
        getCommonCalendar(
            1, // сколько месяцев вперед смотрим дополнительно
            dataController,
            scrollController.currentMonthIndex,
        )
            .then(result => dataController.setMapState(prev =>
                ({...prev, ...result})))
            .finally(() => setLoad(false))
    }, [firstMoveTrigger, scrollController.currentMonthIndex]);


    useEffect(() => {
        if (selectionController.isStart) {
            setLoad(true)
            getCheckInCalendar(selectionController.dateBegin!, opacity)
                .then(result => {
                    const [map, costs] = result
                    dataController.setMapState(map)
                    dataController.setCosts(costs)
                })
                .finally(() => setLoad(false))
        }
    }, [selectionController.isStart]);

    return {
        id,
        selectionController,
        scrollController,
        processDateClick,
        dataController,
        opacity,
        onLoad,
        calendarCellsRef,
    }
}