import React, {useEffect, useState} from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import NumberInput from '../../components/number-input'
import {Space} from '../../components/space'
import {IHouse} from '../../interfaces/houses'
import HouseCard from '../../components/house-card'
import {format} from "date-fns";
import HouseModal, {useHouseModal} from "./modal";
import useCalendar from "../../components/calendar3/useCalendar";
import Calendar3 from "../../components/calendar3";
import {api} from "../../api";

const HousePage = () => {
    const [data, setData] = useState<IHouse[]>([]);
    const [max_persons_amount, setMPA] = useState<number>(0);
    const calendar = useCalendar();
    const modalController = useHouseModal(calendar)
    // const modalController = useHouseModal(calendar)
    // домики
    useEffect(() => {
        if (calendar.selectionController.isActive) {
            api.house.getAll({
                check_in_date: calendar.selectionController.dateBegin!.getKey(),
                check_out_date: calendar.selectionController.dateEnd!.getKey(),
            })
                .then(res => setData(res.data))
        } else {
            api.house.getAll({})
                .then(res => setData(res.data))
        }
    }, [calendar.selectionController.isActive]);




    return (
        <div style={{marginTop: '100px'}}>
            <HouseModal controller={modalController} max_persons_amount_init={max_persons_amount}/>
            <Grid container display='flex' spacing={2}>
                <Grid item xs={6}>
                    <Paper sx={{backgroundColor: 'rgba(0,0,0, 0)', padding: '20px'}}>
                        <Typography variant='h5'>Фильтры</Typography>
                        <Space h='20px'/>
                        <NumberInput value={max_persons_amount} setValue={setMPA}/>
                        <Space h='20px'/>
                        <Calendar3 controller={calendar}/>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    {
                        data.map((e, i) => (
                            <HouseCard key={e.name} data={e} onClick={() => {

                                modalController.setOpen(true)
                                modalController.setState(e)
                                modalController.calendarController.selectionController.setDateBegin(
                                    modalController.mainCalendarController.selectionController.dateBegin)
                                modalController.calendarController.selectionController.setDateEnd(
                                    modalController.mainCalendarController.selectionController.dateEnd)
                                modalController.calendarController.setCosts(
                                    modalController.mainCalendarController.costs)
                                modalController.calendarController.setMapState(
                                    modalController.mainCalendarController.mapState)
                            }}/>
                        ))
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default HousePage