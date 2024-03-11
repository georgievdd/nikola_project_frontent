import {Dispatch, RefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {getCheckInCalendar, getCommonCalendar} from "../api";
import {showAlert} from "../../../../helpers";
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
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
    reset: () => void
}
export function useCalendar (id: string, defaultShow: boolean, endpoint: string): CalendarController {
    /**
     * Сколько месяцев вперед отображаем
     */
    const [show, setShow] = useState(defaultShow);
    const opacity = 16 //- currentMonthIndex
    const calendarCellsRef = useRef<HTMLDivElement>(null)
    const selectionController = useSelection()
    const scrollController = useScroll(calendarCellsRef)
    const dataController = useCalendarData(opacity)
    const [onLoad, setLoad] = useState(false)




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


    function setCommonCalendar() {
        setLoad(true)
        getCommonCalendar(
            1, // сколько месяцев вперед смотрим дополнительно
            dataController,
            scrollController.currentMonthIndex,
            endpoint,
        )
            .then(result => dataController.setMapState(prev =>
                ({...prev, ...result})))
            .catch(e => showAlert(e.response?.data?.message, 'alert-danger'))
            .finally(() => setLoad(false))
    }
    function setCheckInCalendar(withClear: boolean = false) {
        setLoad(true)
        getCheckInCalendar(
            2,
            dataController,
            Math.max(scrollController.currentMonthIndex - 1, 0),
            selectionController.dateBegin!,
            withClear,
            endpoint,
        )
            .then(result => {
                const [map, costs] = result
                if (withClear) {
                    dataController.setMapState(prev => map)
                    dataController.setCosts(prev => costs)
                } else {
                    dataController.setMapState(prev => ({...map, ...prev}))
                    dataController.setCosts(prev => ({...costs, ...prev}))
                }
            })
            .catch(e => showAlert(e.response?.data?.message, 'alert-danger'))
            .finally(() => setLoad(false))
    }
    /**
     * При инициализации scrollController.currentMonthIndex = 0 (сегодняшний месяц)
     * При прокрутке будем расширять mapState, если в нем еще нет рассматриваемого месяца (+ opacity)
     */
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
        if (!show) return
        if (selectionController.isActive) {
            setTimeout(() =>
                scrollController.scrollToMonth(selectionController.dateBegin!.getMonth() - new Date().getMonth())
            , 50)
        }
    }, [show])

    useEffect(() => {
        if (selectionController.isStart) {
            setCheckInCalendar(true)
        }
    }, [selectionController.isStart])

    const reset = () => {
        selectionController.clear()
        dataController.clear()
        setShow(false)
    }


    return {
        id,
        selectionController,
        scrollController,
        processDateClick,
        dataController,
        opacity,
        onLoad,
        calendarCellsRef,
        show, setShow,
        reset,
    }
}