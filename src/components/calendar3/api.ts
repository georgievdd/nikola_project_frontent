import {CheckInCalendar, CommonCalendar, CommonCalendarRequest} from "./dto";
import {mapFromCheckInDateCalendar, mapFromCommonCalendar} from "./mapper";
import {addDays, addMonths, startOfMonth} from "date-fns";
import {axiosInstance} from "../../api/instance";
import endpoints from "../../api/endpoints";

export async function getCommonCalendar(opacity: number) {
    const begin = startOfMonth(new Date())
    const response = await Promise.all(Array.from({length: opacity}).map((_, i) => {
        const month = addMonths(begin, i)
        const data = {
            month: month.getMonth() + 1,
            year: month.getFullYear()
        }
        return axiosInstance.get<CommonCalendar>(endpoints.HOUSE.CALENDAR, {params: data}).then(r => r.data)
    }))
    return mapFromCommonCalendar(response)
}

export async function getCheckInCalendar(checkInDate: Date, opacity: number) {
    const begin = startOfMonth(new Date())
    const response = await Promise.all(Array.from({length: opacity}).map((_, i) => {
        const month = addMonths(begin, i)
        const data = {
            month: month.getMonth() + 1,
            year: month.getFullYear(),
            chosen_check_in_date: checkInDate.getKey(),
        }
        return axiosInstance.get<CheckInCalendar>(endpoints.HOUSE.CALENDAR, {params: data}).then(r => r.data)
    }))
    console.log(response)
    return mapFromCheckInDateCalendar(checkInDate, response)
}