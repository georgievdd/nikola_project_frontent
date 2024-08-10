import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {DayType} from "../helpers";

export interface CalendarDataController {
    mapState: Record<string, DayType>
    setMapState: Dispatch<SetStateAction<Record<string, DayType>>>
    costs: Record<string, DayType>
    setCosts:  Dispatch<SetStateAction<Record<string, number>>>
    beenLoaded: boolean[],
    setBeenLoaded: Dispatch<SetStateAction<boolean[]>>
    clear: () => void
    wasCleared: boolean | null
}

export function useCalendarData(opacity: number): CalendarDataController {
    const [mapState, setMapState] = useState<Record<string, DayType>>({})
    const [costs, setCosts] = useState<Record<string, number>>({})
    const [beenLoaded, setBeenLoaded] = useState<Array<boolean>>(Array(opacity).fill(false))
    const [wasCleared, setWasCleared] = useState<boolean | null>(null)
    function clear() {
        setMapState({})
        setCosts({})
        setBeenLoaded(Array(opacity).fill(false))
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