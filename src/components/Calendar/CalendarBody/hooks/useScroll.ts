import {RefObject, useCallback, useState} from "react";
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
                cellRect.top+10 >= containerRect.top &&
                cellRect.bottom <= containerRect.bottom+10
            ) {
                visibleBlocks.push(cell)
            }
        })
        setCurrentMonthIndex(+visibleBlocks[0].id)
    }, 7)
    const scrollToMonth = useCallback((monthIndex: number) => {

        const scrollContainer = calendarCellsRef.current!;
        scrollContainer.scrollTo({
            top: monthIndex * 362.42,
            behavior: 'smooth'
        });

        // const visibilityCells = calendarCellsRef.current!.querySelectorAll('.month-name-title');
        // const monthElement = visibilityCells[monthIndex];
        // monthElement.scrollIntoView({
        //     behavior: 'smooth',
        //     inline: 'nearest'
        // })
        
        
        // const visibilityCells = calendarCellsRef.current!.querySelectorAll('.month-name-title');
        // if (visibilityCells.length > monthIndex) {
        //     const monthElement = visibilityCells[monthIndex];
        //     const scrollContainer = calendarCellsRef.current;
            
        //     if (scrollContainer && monthElement) {
                
        //         // Рассчитываем необходимый отступ для scrollTop.
        //         // Вычисляем позицию элемента относительно верхней границы родительского контейнера
        //         const elementTopRelativeToContainer = calendarCellsRef.current.offsetTop - scrollContainer.offsetTop;
                
        //         // Устанавливаем scrollTop родительского контейнера, чтобы прокрутить к элементу
        //         scrollContainer.scrollTo({
        //             top: elementTopRelativeToContainer,
        //             behavior: 'smooth'
        //         });
        //     }
        // }
    }, []);
    return {
        currentMonthIndex,
        handleScroll,
        scrollToMonth,
    }
}