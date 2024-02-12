import {Dispatch, SetStateAction, useState} from "react";
import {DayType} from "../helpers";

export interface CalendarDataController {
    mapState: Record<string, DayType>
    setMapState: Dispatch<SetStateAction<Record<string, DayType>>>
    costs: Record<string, DayType>
    setCosts:  Dispatch<SetStateAction<Record<string, number>>>
    beenLoaded: Array<boolean>
    setBeenLoaded: Dispatch<SetStateAction<Array<boolean>>>
}

export function useCalendarData(opacity: number): CalendarDataController {
    const [mapState, setMapState] = useState<Record<string, DayType>>({})
    const [costs, setCosts] = useState<Record<string, number>>({})
    const [beenLoaded, setBeenLoaded] = useState<Array<boolean>>(Array(opacity).fill(false))
    return {
        mapState,
        setMapState,
        costs,
        setCosts,
        beenLoaded,
        setBeenLoaded,
    }
}