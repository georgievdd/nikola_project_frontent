import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { PATH } from '../../consts'
import { api } from '../../api'
import NumberInput from '../../components/number-input'
import { Space } from '../../components/space'
import {CalendarDayResponse, CalendarDayResponseSelect, IHouse, IHousesQueryRequest} from '../../interfaces/houses'
import HouseCard from '../../components/house-card'
import Calendar from '../../components/calendar'
import Calendar2 from "../../components/calendar2";
import {DAY_STATE, useCalendar} from "../../components/calendar2/useCalendar";
import {addMonths, format, isSameDay} from "date-fns";
import {ru} from "date-fns/locale";
import {
    addCosts,
    mapFromSelectToCalender,
    mapFromUnselectToCalender,
    removedClosedDaysCalendar,
    showAlert
} from "../../utils/utils";

// const initialDayStates = {
//   '2024-02-03': DAY_STATE.BOOKED,
//   '2024-02-14': DAY_STATE.BOOKED,
//   '2024-02-09': DAY_STATE.BOOKED,
//   '2024-02-30': DAY_STATE.HOLIDAY,
//   '2024-02-28': DAY_STATE.HOLIDAY,
//   '2024-02-20': DAY_STATE.HOLIDAY,
//   '2024-02-15': DAY_STATE.BOOKED,
// }

const HousePage = () => {

    const [data, setData] = useState<IHouse[]>([]);
    const [max_persons_amount, setMPA] = useState<number>(0);
    const calendar = useCalendar(new Date());
    // домики
    function initHomes(data: IHousesQueryRequest) {
        api.house.getAll(data)
            .then(data => data.data)
            .then(data => {
                setData(data)
            })
            .catch((() => showAlert('HOUSES AXIOS ERROR')));
    }
    useEffect(() => {
        initHomes({max_persons_amount})
    }, []);
    useEffect(() => {
        if (!calendar.select.isActive) return
        if (isSameDay(calendar.select.begin!, calendar.select.end!)) return
        const housesData: IHousesQueryRequest = {max_persons_amount};
        housesData.check_in_date = format(calendar.select.minDate!, 'dd-MM-yyyy')
        housesData.check_out_date = format(calendar.select.maxDate!, 'dd-MM-yyyy')
        initHomes(housesData)
    }, [max_persons_amount, calendar.select.isActive]);

    // календарь
    const trigger = useTrigger()
    useEffect(() => {
        if (!calendar.month) return
        [calendar.month, addMonths(calendar.month, 1)]
            .forEach(month => {
                // const k = format(month, 'MM-yyyy')
                // if (calendar.alreadyLoad[k]) {
                //     return
                // }
                // calendar.setAlreadyLoad((prev: Record<string, any>) => ({...prev, [k]: true}))
                api.house.getCalendar({
                    month: month.getMonth() + 1,
                    year: month.getFullYear(),
                })
                    .then(res => res.data.calendar)
                    .then(data => {
                        const newPage = mapFromUnselectToCalender(data as Record<string, CalendarDayResponse>)
                        calendar.setRawMask((prev: Record<string, DAY_STATE>) => ({...newPage, ...prev}))
                        calendar.setMonthMask((prev: Record<string, DAY_STATE>) => ({...newPage, ...prev}))
                        trigger.call()
                    })
                    .catch(err => {
                        showAlert(err?.response?.data?.error, 'alert-warning')
                    })
            })
    }, [calendar.month]);

    useEffect(() => {
        calendar.setFirstState((prev: any) => calendar.monthMask)
    }, [trigger.val]);

    useEffect(() => {
        if (!calendar.select.begin || !calendar.select.end) return
        if (isSameDay(calendar.select.begin, calendar.select.end)) return
        api.house.getCalendar({
            month: calendar.month.getMonth() + 1,
            year: calendar.month.getFullYear(),
            chosen_check_in_date: format(calendar.select.minDate!, 'dd-MM-yyyy')
        })
            .then(res => res.data.calendar)
            .then(data => {
                const newCosts = addCosts(data as Record<string, CalendarDayResponseSelect>)
                calendar.setCosts((prev: Record<string, number>) => newCosts)
                calendar.setMonthMask(
                    (prev: Record<string, DAY_STATE>) =>
                        mapFromSelectToCalender(prev, data as Record<string, CalendarDayResponseSelect>))
                calendar.setRawMask(
                    (prev: Record<string, DAY_STATE>) =>
                        mapFromSelectToCalender(prev, data as Record<string, CalendarDayResponseSelect>))
            })

    }, [calendar.select.begin, calendar.select.end]);

    useEffect(() => {
        if (calendar.select.isActive && isSameDay(calendar.select.begin!, calendar.select.end!)) {
            calendar.setCosts({})
            calendar.setMonthMask((prev: Record<string, DAY_STATE>) => removedClosedDaysCalendar(prev, calendar.firstState))
            calendar.setRawMask((prev: Record<string, DAY_STATE>) => removedClosedDaysCalendar(prev, calendar.firstState))
        }
    }, [calendar.select.isActive]);

    return (
        <div style={{marginTop: '100px'}}>
            <Grid container display='flex' spacing={2}>
                <Grid item xs={5}>
                    <Paper sx={{backgroundColor: 'rgba(0,0,0, 0)', padding: '20px'}}>
                        <Typography variant='h5'>Фильтры</Typography>
                        <Space h='20px'/>
                        <NumberInput value={max_persons_amount} setValue={setMPA}/>
                        <Space h='20px'/>
                        <h1>{format(calendar.month, 'MMMM')} {calendar.month.getFullYear()}</h1>
                        <button onClick={calendar.nextMonth}>next</button>
                        <button onClick={calendar.prevMonth}>prev</button>
                        <Calendar2 controller={calendar}/>
                    </Paper>
                </Grid>
                <Grid item xs={7}>
                    {
                        data.map((e, i) => (
                            <HouseCard key={e.name} data={e}/>
                        ))
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default HousePage


const useTrigger = () => {
    const [val, setVal] = useState(false)
    return {
        call: () => setVal(prev => !prev),
        val,
    }
}