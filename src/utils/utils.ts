import {format} from "date-fns";
import {CalendarDayResponse, CalendarDayResponseSelect} from "../interfaces/houses";
import {DAY_STATE} from "../components/calendar2/useCalendar";
import {IReservationOptionsTimes} from "../interfaces/houses/reservation";

export function formatKey(date: Date) {
    return format(date, 'yyyy-MM-dd')
}

export function formatFromDDMMYYYY(date: string) {
    return date.split('-').reverse().join('-')
}

export function formatToDDMMYYYY(date: string) {
    return date.split('-').reverse().join('-')
}

export function mapFromUnselectToCalender(from: Record<string, CalendarDayResponse>): Record<string, DAY_STATE> {
    const state: Record<string, DAY_STATE> = {}

    Object.keys(from).forEach(key => {
        if (!from[key].check_in_is_available) {
            state[formatFromDDMMYYYY(key)] = DAY_STATE.BOOKED
            return
        }
        if (from[key].is_holiday) {
            state[formatFromDDMMYYYY(key)] = DAY_STATE.HOLIDAY
            return
        }
    })
    return state
}

export function addCosts(from: Record<string, CalendarDayResponseSelect>): Record<string, number> {
    const state: Record<string, number> = {}
    Object.keys(from).forEach(key => {
        if (from[key].price != null) {
            state[formatFromDDMMYYYY(key)] = from[key].price!
        }
    })
    return state
}


export function mapFromSelectToCalender(
    prevMask: Record<string, DAY_STATE>,
    withCosts: Record<string, CalendarDayResponseSelect>
): Record<string, DAY_STATE> {

    const newMask: Record<string, DAY_STATE> = {}

    Object.keys(withCosts).forEach(cKey => {
        const key = formatFromDDMMYYYY(cKey)
        if (!withCosts[cKey].price) {
            newMask[key] = prevMask[key] === DAY_STATE.BOOKED ? DAY_STATE.BOOKED : DAY_STATE.CLOSED
        } else {
            if (withCosts[cKey].is_holiday) {
                newMask[key] = DAY_STATE.HOLIDAY
            }
        }
    })

    Object.keys(prevMask).forEach(key => {
        if (isSelectedType(prevMask[key])) {
            newMask[key] = prevMask[key]
        }
    })

    return newMask
}

export function isSelectedType(type: DAY_STATE) {
    return type === DAY_STATE.SELECTED || type === DAY_STATE.LEFT_SELECTED ||type === DAY_STATE.RIGHT_SELECTED ||type === DAY_STATE.POINT_SELECTED
}


export function removedClosedDaysCalendar(prevMask: Record<string, DAY_STATE>, firstMask: Record<string, DAY_STATE>): Record<string, DAY_STATE> {
    const state: Record<string, DAY_STATE> = {}
    Object.keys(firstMask).forEach(key => {
        state[key] = firstMask[key]
    })
    Object.keys(prevMask).forEach(key => {
        if (isSelectedType(prevMask[key])) {
            state[key] = prevMask[key]
        }
    })
    return state
}

export const showAlert = (message: string, variant?: 'alert-danger' | 'alert-success' | 'alert-warning') => {
    // Create a div element
    const alertDiv = document.createElement('div');

    // Apply class and message
    alertDiv.className = variant || 'alert-danger';
    alertDiv.innerText = message;

    // Append to body
    document.body.appendChild(alertDiv);

    // Remove after 3 seconds
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, 2000);
}

const blackList = ["default", "earliest", "latest"]
export function createTimesList(list: IReservationOptionsTimes): string[] {
    const result: string[] = [list.default]
    Object.keys(list).forEach(key => {
        if (blackList.includes(key) || key === list.default) return
        result.push(key)
    })
    return result
}



 export const currentMonthIndex = new Date().getMonth()