import { Grid, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Grid display='flex' justifyContent='space-between' style={{minHeight: '200px'}}>
      {/*<img */}
      {/*  src={require('../../res/img/logo.png')}*/}
      {/*  style={{*/}
      {/*    width: '200px',*/}
      {/*    height: 'auto',*/}
      {/*    borderRadius: '10px'*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<List>*/}
      {/*  <ListItem><Typography variant='h5'><Link to='#'>О нас About</Link></Typography></ListItem>*/}
      {/*  <ListItem><Typography variant='h5'><Link to='#'>Какие мы крутые cool</Link></Typography></ListItem>*/}
      {/*  <ListItem><Typography variant='h5'><Link to='#'>Почему он, а не я why where wrong title</Link></Typography></ListItem>*/}
      {/*</List>*/}
    </Grid>
  )
}

export default Footer