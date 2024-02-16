import React, {useEffect, useState} from 'react'
import {Box, Grid, Paper, Typography} from '@mui/material'
import NumberInput from '../../components/input-number'
import {Space} from '../../components/space'
import {IHouse} from '../../interfaces/houses'
import HouseCard from '../../components/house-card'
import HouseModal, {useHouseModal} from "./modal";
import {useCalendar} from "../../components/calendar3/hooks/useCalendar";
import Calendar3 from "../../components/calendar3";
import {api} from "../../api";
import {showAlert} from "../../utils/utils";
import CaledarInput from "../../components/date-input";

const HousePage = () => {
    const [data, setData] = useState<IHouse[]>([])
    const [max_persons_amount, setMPA] = useState<number>(0)
    const [mainCalendarShow, setMainCalendarShow] = useState(0)
    const calendar = useCalendar('main', mainCalendarShow)
    const modalController = useHouseModal(calendar)
    // домики
    useEffect(() => {
        if (calendar.selectionController.isActive) {
            api.house.getAll({
                check_in_date: calendar.selectionController.dateBegin!.getKey(),
                check_out_date: calendar.selectionController.dateEnd!.getKey(),
            })
                .then(res => setData(res.data))
                .catch(e => showAlert(e.response?.data?.message || 'Ошибка', 'alert-danger'))
        } else {
            api.house.getAll({})
                .then(res => setData(res.data))
        }
    }, [calendar.selectionController.isActive]);

    return (
        <div style={{marginTop: '100px'}}>
            <HouseModal controller={modalController} max_persons_amount_init={max_persons_amount}/>
            <Grid container display='flex' spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{backgroundColor: 'rgba(0,0,0, 0)', padding: '20px'}}>
                        <Grid display='flex' justifyContent='space-around'>
                            <Box>
                                <p>Количество людей</p>
                                <NumberInput value={max_persons_amount} setValue={setMPA}/>
                            </Box>
                            <CaledarInput controller={calendar} show={mainCalendarShow} setShow={setMainCalendarShow}/>
                        </Grid>
                        {/*<Typography variant='h5'>Фильтры</Typography>*/}
                        {/*<Space h='20px'/>*/}
                        {/*<NumberInput value={max_persons_amount} setValue={setMPA}/>*/}
                        {/*<Space h='20px'/>*/}
                        {/*<Calendar3 controller={calendar}/>*/}
                    </Paper>
                </Grid>
            </Grid>
            <Box>
                {
                    data.map((e, i) => (
                      <article style={{marginTop: '20px'}}>
                        <HouseCard key={e.name} data={e} onClick={() => {
                            // TODO create Factory Copy Function
                            modalController.setOpen(true)
                            modalController.setState(e)
                            modalController.calendarController.selectionController.setDateBegin(
                                modalController.mainCalendarController.selectionController.dateBegin)
                            modalController.calendarController.selectionController.setDateEnd(
                                modalController.mainCalendarController.selectionController.dateEnd)
                            modalController.calendarController.dataController.setCosts(
                                modalController.mainCalendarController.dataController.costs)
                            modalController.calendarController.dataController.setMapState(
                                modalController.mainCalendarController.dataController.mapState)
                        }}/>
                      </article>
                    ))
                }
            </Box>
        </div>
    )
}

export default HousePage