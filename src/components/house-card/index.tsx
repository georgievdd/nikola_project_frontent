import React from 'react'
import { IHouse } from '../../interfaces/houses'
import {Button, Container, Paper, Typography} from '@mui/material'

const HouseCard = ({
                       data,
                       onClick
} : {
    data: IHouse,
    onClick: () => void
}) => {


  return (
    <Paper sx={{padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.1)', marginBottom: '20px'}}>
      <Typography variant='h6'>"id": {data.id}</Typography>
      <Typography variant='h6'>"name": {data.name}</Typography>
      <Typography variant='h6'>"description": {data.description}</Typography>
      <Typography variant='h6'>"base_price": {data.base_price}</Typography>
      <Typography variant='h6'>"total_price": {data.total_price}</Typography>
      <Typography variant='h6'>"base_persons_amount": {data.base_persons_amount}</Typography>
      <Typography variant='h6'>"max_persons_amount": {data.max_persons_amount}</Typography>
      <Typography variant='h6'>"price_per_extra_person": {data.price_per_extra_person}</Typography>
      <Typography variant='h6'>"pictures.length": {data.pictures.length}</Typography>
      <Typography variant='h6'>"features.length": {data.features.length}</Typography>
        <Button variant='contained' color='success' onClick={onClick}>забронировать</Button>
    </Paper>
  )
}

export default HouseCard