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
        <div style={{width: '80%', margin: "100px auto"}}>
          <Calendar2 /*initialDayStates={{'2024-01-05': 'cell-selected'}}*//>
        </div>
      </div>
  )
}

export default HousePage