import {Dispatch, SetStateAction, useEffect, useState} from 'react'

import {CalendarState, DayType} from 'entity/Calendar'

import {calendarSize} from '../config'

export interface CalendarDataController {
  mapState: CalendarState
  setMapState: Dispatch<SetStateAction<CalendarState>>
  costs: Record<string, DayType>
  setCosts: Dispatch<SetStateAction<Record<string, number>>>
  beenLoaded: boolean[]
  setBeenLoaded: Dispatch<SetStateAction<boolean[]>>
  clear: () => void
  wasCleared: boolean | null
}

export function useCalendarData(): CalendarDataController {
  const [mapState, setMapState] = useState<CalendarState>({})
  const [costs, setCosts] = useState<Record<string, number>>({})
  const [beenLoaded, setBeenLoaded] = useState<Array<boolean>>(
    Array(calendarSize).fill(false),
  )
  const [wasCleared, setWasCleared] = useState<boolean | null>(null)
  function clear() {
    setMapState({})
    setCosts({})
    setBeenLoaded(Array(calendarSize).fill(false))
  }
  useEffect(() => {
    if (Object.keys(mapState).length === 0) {
      if (wasCleared === null) {
        setWasCleared(false)
      } else {
        setWasCleared(true)
      }
    } else {
      setWasCleared(false)
    }
  }, [mapState])

  return {
    mapState,
    setMapState,
    costs,
    setCosts,
    beenLoaded,
    setBeenLoaded,
    clear,
    wasCleared,
  }
}
