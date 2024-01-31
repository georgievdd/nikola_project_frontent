import {format} from "date-fns";

export function formatKey(date: Date) {
    return format(date, 'yyy-MM-dd')
}