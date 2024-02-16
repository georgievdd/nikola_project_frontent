import {Dispatch, RefObject, useEffect, useRef, useState} from "react";
import {getCheckInCalendar, getCommonCalendar} from "../api";
import {currentMonthIndex, showAlert} from "../../../utils/utils";
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

export function useCalendar (id: string, initializationParameter?: any): CalendarController {
    /**
     * Сколько месяцев вперед отображаем
     */
    const opacity = 12 - currentMonthIndex
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
     * По дефолту (у main календаря) тригером является didMount
     * У модального окна тригер - open=true
     */
    function IsNotInitByInitializationParameter() {
        console.log(initializationParameter)
        return initializationParameter !== undefined && !initializationParameter
    }
    /**
     * При инициализации scrollController.currentMonthIndex = 0 (сегодняшний месяц)
     * При прокрутке будем расширять mapState, если в нем еще нет рассматриваемого месяца (+ opacity)
     */
    useEffect(() => {
        if (IsNotInitByInitializationParameter()) return
        // isActive оставить в зависимости от требований
        if (selectionController.isStart || selectionController.isActive) {
            setCheckInCalendar()
        } else {
            setCommonCalendar()
        }
    }, [scrollController.currentMonthIndex, initializationParameter])

    useEffect(() => {
        if (selectionController.isStart) {
            setCheckInCalendar(true)
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