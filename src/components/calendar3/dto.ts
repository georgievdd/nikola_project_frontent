
export interface CommonCalendar {
    calendar: Record<string, CalendarDayResponse>
}

export interface CheckInCalendar {
    calendar: Record<string, CalendarCheckInDayResponse>
}


interface CalendarDayResponse {
    weekday: number
    is_holiday: boolean
    check_in_is_available: boolean
    reason?: string
}

interface CalendarCheckInDayResponse {
    weekday: number,
    is_holiday: boolean,
    price?: number,
    check_out_is_available: false,
}

export interface CommonCalendarRequest {
    month: string
    year: string
    chosen_check_in_date?: string
}