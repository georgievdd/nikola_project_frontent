import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { PATH } from '../../consts'
import { api } from '../../api'
import NumberInput from '../../components/number-input'
import { Space } from '../../components/space'
import { IHouse } from '../../interfaces/houses'
import HouseCard from '../../components/house-card'
import Calendar from '../../components/calendar'
import Calendar2 from "../../components/calendar2";
import {DAY_STATE, useCalendar} from "../../components/calendar2/useCalendar";

const initialDayStates = {
  '2024-02-03': DAY_STATE.BOOKED,
  '2024-02-14': DAY_STATE.BOOKED,
  '2024-02-09': DAY_STATE.BOOKED,
  '2024-02-30': DAY_STATE.HOLIDAY,
  '2024-02-28': DAY_STATE.HOLIDAY,
  '2024-02-20': DAY_STATE.HOLIDAY,
  '2024-02-15': DAY_STATE.BOOKED,
}

const HousePage = () => {

  const [data, setData] = useState<IHouse[]>([]);
  const [max_persons_amount, setMPA] = useState<number>(0);

  // домики
  // useEffect(() => {
  //   api.house.getAll({max_persons_amount})
  //       .then(data => data.data)
  //       .then(data => {
  //         console.log(data)
  //         setData(data)
  //       })
  //       .catch((() => console.log('HOUSES AXIOS ERROR')));
  // }, [max_persons_amount]);

  const calendar = useCalendar(new Date(), initialDayStates);


  return (
      <div style={{marginTop: '100px'}}>
        <Grid container display='flex' spacing={2}>
          <Grid item xs={5}>
            <Paper sx={{backgroundColor: 'rgba(0,0,0, 0)', padding: '20px'}}>
              <Typography variant='h5'>Фильтры</Typography>
              <Space h='20px'/>
              <NumberInput value={max_persons_amount} setValue={setMPA}/>
              <Space h='20px'/>
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