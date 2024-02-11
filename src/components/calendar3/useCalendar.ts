import {Dispatch, RefObject, useEffect, useRef, useState} from "react";
import {deAT} from "date-fns/locale";
import {format, startOfToday} from "date-fns";
import {randomUUID} from "node:crypto";
import {getCheckInCalendar, getCommonCalendar} from "./api";
import {currentMonthIndex} from "../../utils/utils";
import debounce from "lodash/debounce";
import {useOnScreen} from "./utilsComponents";

export type DateOrNull = Date | null

export enum DayType {
    Holiday, Disabled
}
export interface SelectionController {
    dateBegin: DateOrNull
    dateEnd: DateOrNull
    isActive: Boolean
    isStart: Boolean
    setDateBegin: Dispatch<DateOrNull>
    setDateEnd: Dispatch<DateOrNull>
    clear: () => void
}
export interface CalendarController {
    id: string
    selectionController: SelectionController
    processDateClick: (day: Date) => void
    mapState: Record<string, DayType>
    setMapState: Dispatch<Record<string, DayType>>
    costs: Record<string, number>
    setCosts: Dispatch<Record<string, number>>
    opacity: number
    onLoad: boolean
    selectedMonthIndex: number
    handleScroll: () => void
    calendarCellsRef: RefObject<HTMLDivElement>
    calendarRef: RefObject<HTMLDivElement>
}

function useCalendar (id: string, firstMoveTrigger?: boolean): CalendarController {
    const opacity = 12 - currentMonthIndex
    const selectionController = useSelection()
    const [mapState, setMapState] = useState<Record<string, DayType>>({})
    const [costs, setCosts] = useState<Record<string, number>>({})
    const [onLoad, setLoad] = useState(true)
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0)
    const calendarCellsRef = useRef<HTMLDivElement>(null)
    const calendarRef = useRef<HTMLDivElement>(null)
    const handleScroll = debounce(() => {
        const visibilityCells = calendarCellsRef.current!.querySelectorAll('.month-name-title')
        let visibleBlocks: Element[] = []
        const containerRect = calendarCellsRef.current!.getBoundingClientRect()
        visibilityCells.forEach(cell => {
            const cellRect = cell.getBoundingClientRect()
            if (
                cellRect.top >= containerRect.top &&
                cellRect.bottom <= containerRect.bottom
            ) {
                visibleBlocks.push(cell)
            }
        })
        setSelectedMonthIndex(+visibleBlocks[0].id)
    }, 10)

    function validDate(date: Date): boolean {
        if (!mapState[date.getKey()]) return true
        return mapState[date.getKey()] !== DayType.Disabled
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

    useEffect(() => {
        /**
         * Инициализация календаря. Запрос нужно кидать только, тогда, когда выполнено trigger условие.
         * У main - didMount, у modal - open.
         */
        if (firstMoveTrigger !== undefined && !firstMoveTrigger) {
            return
        }
        setLoad(true)
        getCommonCalendar(opacity)
            .then(result => setMapState(result))
            .finally(() => setLoad(false))
    }, [firstMoveTrigger]);

    useEffect(() => {
        if (selectionController.isStart) {
            setLoad(true)
            getCheckInCalendar(selectionController.dateBegin!, opacity)
                .then(result => {
                    const [map, costs] = result
                    setMapState(map)
                    setCosts(costs)
                })
                .finally(() => setLoad(false))
        }
    }, [selectionController.isStart]);

    return {
        id,
        selectionController,
        processDateClick,
        mapState, setMapState,
        costs, setCosts,
        opacity,
        onLoad,
        handleScroll,
        selectedMonthIndex,
        calendarCellsRef,
        calendarRef,
    }
}

function useSelection(dateBeginInit?: Date, dateEndInit?: Date): SelectionController {
    const [dateBegin, setDateBegin] = useState(dateBeginInit || null)
    const [dateEnd, setDateEnd] = useState(dateEndInit || null)
    const clear = () => {
        setDateBegin(null)
        setDateEnd(null)
    }
    return {
        dateBegin, setDateBegin,
        dateEnd, setDateEnd,
        isActive: !!(dateBegin && dateEnd),
        isStart: !!(dateBegin && !dateEnd),
        clear,
    }
}

export default useCalendar

declare global {
    interface Date {
        getKey(): string
    }
}

Date.prototype.getKey = function getKeyFromDate() {
    return format(this, 'dd-MM-yyyy')
}