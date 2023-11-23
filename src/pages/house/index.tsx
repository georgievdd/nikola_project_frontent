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

const initialData = {
  "11.02.2024": "Свободно",
  "12.02.2024": "Занято",
  "15.02.2024": "Свободно",
  "20.02.2024": "Встреча",
  "25.02.2024": "День рождения",
  // и так далее для других дат
};


const HousePage = () => {
  
  const [data, setData] = useState<IHouse[]>([]);
  const [max_persons_amount, setMPA] = useState<number>(0);

  useEffect(() => {
    api.house.getAll({max_persons_amount})
    .then(data => data.data)
    .then(data => setData(data))
    .catch((() => console.log('HOUSES AXIOS ERROR')));
  }, [max_persons_amount]);
  
  return (
    <div style={{marginTop: '100px'}}>
      <Grid container display='flex' spacing={2}>
        <Grid item xs={5}>
          <Paper sx={{backgroundColor: 'rgba(0,0,0, 0.1)', padding: '20px'}}>
            <Typography variant='h5'>Фильтры</Typography>
            <Space h='20px'/>
            <NumberInput value={max_persons_amount} setValue={setMPA}/>
            <Space h='20px'/>
            <Calendar initialData={initialData}/>
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