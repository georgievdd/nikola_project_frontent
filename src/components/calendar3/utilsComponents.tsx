import {addDays, addMonths, format, startOfWeek} from "date-fns";
import {ru} from "date-fns/locale";
import React from "react";
import moment from 'moment'


export const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
export const weekArray = Array.from({length: 7})

export const getMonthName = (month: number) =>
    [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь',
    ][month]