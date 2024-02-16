import React from 'react'
import { IHouse } from '../../interfaces/houses'
import {Button, Container, Grid, Paper, Typography} from '@mui/material'
import {apiUrl, staticUrl} from "../../api/instance";
import Carousel from 'react-bootstrap/Carousel';
import './style.css'
const HouseCard = ({
                       data,
                       onClick
} : {
    data: IHouse,
    onClick: () => void
}) => {

  return (
    <Paper className={'house-card'}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Carousel>
            {data.pictures.map(({picture_path}) =>
              <Carousel.Item>
                <img src={`${staticUrl}${picture_path}`}/>
              </Carousel.Item>
            )}
          </Carousel>
        </Grid>
        <Grid item xs={8}>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <p>Максимальное количество жильцов: {data.max_persons_amount}</p>
          {data.features.map(e =>
          <div className='house-feature'>
            {e.name}
          </div>)}
          {data.total_price &&
          <div>
              <p>будет стоить: <span style={{color: 'red'}}>{data.total_price}</span></p>
              <Button onClick={onClick} variant='contained' color='success'>Забронировать</Button>
          </div>
          }
        </Grid>
      </Grid>
    </Paper>
  )
}

export default HouseCard