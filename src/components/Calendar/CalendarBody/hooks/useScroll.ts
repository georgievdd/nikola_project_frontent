import {
  RefObject,
  UIEventHandler,
  UIEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import {debounce} from 'lodash'

import {getVisibleElements, scrollToCenter} from 'src/helpers'

import {getMonthNameElementByIndex} from '../helpers'

export interface ScrollController {
  currentMonthIndex: number
  monthsContainerRef: RefObject<HTMLDivElement>
  daysContainerRef: RefObject<HTMLDivElement>
  highlighterRef: RefObject<HTMLDivElement>
  handleScroll: UIEventHandler<HTMLDivElement>
  scrollToMonth: (index: number) => void
}

export const useScroll = (): ScrollController => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const monthsContainerRef = useRef<HTMLDivElement>(null)
  const daysContainerRef = useRef<HTMLDivElement>(null)
  const highlighterRef = useRef<HTMLDivElement>(null)

  const scrollToMonthName = (id: number) => {
    const container = monthsContainerRef.current
    if (container) {
      const month = container.querySelector(`#month-${id}`) as HTMLDivElement
      if (month) {
        scrollToCenter(month as HTMLDivElement, container)
        const highlighter = highlighterRef.current
        if (highlighter) {
          const monthText = month.querySelector('p')!
          highlighter.style.width = `${monthText.offsetWidth + 20}px`
          highlighter.style.height = `${monthText.offsetHeight}px`
          highlighter.style.left = `${monthText.offsetLeft - 10}px`
          highlighter.style.top = `${monthText.offsetTop - 5}px`
        }
      }
    }
  }

  const debouncedHandleScroll = debounce((event: UIEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.preventDefault()
    const container = daysContainerRef.current
    if (container) {
      const monthNameElement = getVisibleElements(
        container,
        container.querySelectorAll('.month-name-title'),
      )[0]
      const index = +monthNameElement.id.split('-').at(-1)!
      if (index === currentMonthIndex) {
        scrollToMonthName(index)
      } else {
        setCurrentMonthIndex(index)
      }
    }
  }, 40)

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    debouncedHandleScroll(event)
  }

  const scrollToMonth = (index: number) => {
    const container = daysContainerRef.current
    if (container) {
      const monthName = getMonthNameElementByIndex(container, index)

      container.scrollTo({
        top: monthName.offsetTop - 60,
        behavior: 'smooth',
      })
      debouncedHandleScroll(
        new Event('scroll') as unknown as UIEvent<HTMLDivElement>,
      )
    }
  }

  useEffect(() => {
    scrollToMonthName(currentMonthIndex)
  }, [currentMonthIndex])

  return {
    currentMonthIndex,
    monthsContainerRef,
    daysContainerRef,
    handleScroll,
    scrollToMonth,
    highlighterRef,
  }
}
