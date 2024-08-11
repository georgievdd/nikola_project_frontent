import {RefObject, useCallback, useState} from 'react'

import debounce from 'lodash/debounce'

export interface ScrollController {
  currentMonthIndex: number
  handleScroll: () => void
  scrollToMonth: (v: number) => void
}
export function useScroll(
  calendarCellsRef: RefObject<HTMLDivElement>,
): ScrollController {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const handleScroll = debounce(() => {
    const visibilityCells =
      calendarCellsRef.current!.querySelectorAll('.month-name-title')
    let visibleBlocks: Element[] = []
    const containerRect = calendarCellsRef.current!.getBoundingClientRect()
    visibilityCells.forEach((cell) => {
      const cellRect = cell.getBoundingClientRect()
      if (
        cellRect.top + 10 >= containerRect.top &&
        cellRect.bottom <= containerRect.bottom + 10
      ) {
        visibleBlocks.push(cell)
      }
    })
    if (visibleBlocks[0]) {
      setCurrentMonthIndex(+visibleBlocks[0].id)
    }
  }, 7)

  const scrollToMonth = useCallback((monthIndex: number) => {
    const scrollContainer = calendarCellsRef.current!
    scrollContainer.scrollTo({
      top: monthIndex * 362.42,
      behavior: 'smooth',
    })
  }, [])

  return {
    currentMonthIndex,
    handleScroll,
    scrollToMonth,
  }
}
