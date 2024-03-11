import {RefObject, useState} from "react";
import debounce from "lodash/debounce";

export interface ScrollController {
    currentMonthIndex: number,
    handleScroll: () => void,
    scrollToMonth: (v: number) => void
}
export function useScroll(calendarCellsRef: RefObject<HTMLDivElement>): ScrollController {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
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
        setCurrentMonthIndex(+visibleBlocks[0].id)
    }, 7)
    const scrollToMonth = (monthIndex: number) => {
        const visibilityCells = calendarCellsRef.current!.querySelectorAll('.month-name-title');
        const monthElement = visibilityCells[monthIndex]
        monthElement.scrollIntoView({
            behavior: 'smooth',
        });
    }
    return {
        currentMonthIndex,
        handleScroll,
        scrollToMonth,
    }
}