import {addDays, addMonths, format, startOfWeek} from "date-fns";
import {ru} from "date-fns/locale";
import React, {RefObject, useEffect, useState} from "react";
import moment from 'moment'


export const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
export const weekArray = Array.from({length: 7})

export const getMonthName = (month: number) =>
    [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь',
    ][month]

export function useOnScreen(ref: RefObject<HTMLDivElement>) {
    const [isIntersecting, setIntersecting] = useState(false);
    const observer = new IntersectionObserver(
        ([entry]) => {
            setIntersecting(entry.isIntersecting);
        },
        // { threshold: 0.5 }
    );
    useEffect(() => {
        if (ref.current) {
            console.log(ref)
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    return isIntersecting;
}