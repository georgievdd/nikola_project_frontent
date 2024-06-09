import {CheckInCalendar, CommonCalendar, CommonCalendarRequest} from "./dto";
import {mapFromCheckInDateCalendar, mapFromCommonCalendar} from "./mapper";
import {addDays, addMonths, startOfMonth} from "date-fns";
import {CalendarDataController} from "./hooks/useCalendarData";
import {getMonthFromIndexInCalendar} from "./helpers";
import axios from "axios";
import { API_URL, axiosInstance } from "@/api/instance";


export async function getCommonCalendar(
    opacity: number,
    dataController: CalendarDataController,
    dateIndex: number,
    endpoint: string,
    total_persons_amount: number,
) {
    try {
        const begin = startOfMonth(getMonthFromIndexInCalendar(dateIndex))
        const dataCashMask = dataController.beenLoaded.slice()

        const response = await Promise.all(Array.from({length: opacity + 1}).map((_, i) => {
            if (dataCashMask[dateIndex + i]) {
                return Promise.resolve({calendar: {}})
            }
            dataCashMask[dateIndex + i] = true
            const month = addMonths(begin, i)
            const data = {
                month: month.getMonth() + 1,
                year: month.getFullYear(),
                total_persons_amount,
            }
            return axiosInstance.get<CommonCalendar>(endpoint, {params: data}).then(r => r.data)
        }))
        dataController.setBeenLoaded(prev => dataCashMask)
        return mapFromCommonCalendar(response)
    } catch (e) {
        throw e
    }
}

export async function getCheckInCalendar(
    opacity: number,
    dataController: CalendarDataController,
    dateIndex: number,
    checkInDate: Date,
    withClear: boolean,
    endpoint: string,
    total_persons_amount: number,
) {
    try {
        const begin = startOfMonth(getMonthFromIndexInCalendar(dateIndex))
        const dataCashMask = withClear ?
            dataController.beenLoaded.map(() => false) :
            dataController.beenLoaded.slice()

        const response = await Promise.all(Array.from({length: opacity + 1}).map((_, i) => {
            if (dataCashMask[dateIndex + i]) {
                return Promise.resolve({calendar: {}})
            }
            dataCashMask[dateIndex + i] = true
            const month = addMonths(begin, i)
            const data = {
                month: month.getMonth() + 1,
                year: month.getFullYear(),
                chosen_check_in_date: checkInDate.getKey(),
                total_persons_amount,
            }
            return axiosInstance.get<CheckInCalendar>(endpoint, {params: data}).then(r => r.data)
        }));
        dataController.setBeenLoaded(prev => dataCashMask)
        return mapFromCheckInDateCalendar(checkInDate, response)
    } catch (e) {
        throw e
    }
}