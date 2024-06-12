import {CheckInCalendar, CommonCalendar} from "./dto";
import {DayType} from "./helpers";


/**
 * список на насколько месяцев сразу
 */
export function mapFromCommonCalendar(data: CommonCalendar[]): Record<string, DayType> {
    const result: Record<string, DayType> = {}
    data.forEach(({calendar}) => {
        Object.keys(calendar).forEach(key => {
            if (!calendar[key].check_in_is_available) {
                result[key] = DayType.Disabled
                return
            }
            if (calendar[key].is_holiday) {
                result[key] = DayType.Holiday
                return
            }
        })
    })
    return result
}

export function mapFromCheckInDateCalendar(checkInDate: Date, data: CheckInCalendar[]):
    [Record<string, DayType>, Record<string, number>] {
    const result: Record<string, DayType> = {}
    const costs: Record<string, number> = {}
    data.forEach(({calendar}) => {
        Object.keys(calendar).forEach(key => {
            if (calendar[key].price) {
                costs[key] = calendar[key].price!
            }
            if (checkInDate.getKey() === key) {
                if (calendar[key].is_holiday) {
                    result[key] = DayType.Holiday
                }
                return
            }
            if (!calendar[key].check_out_is_available) {
                result[key] = DayType.Disabled
                return
            }
            if (calendar[key].is_holiday) {
                result[key] = DayType.Holiday
                return
            }
        })
    })
    return [result, costs]
}

