import { Box, Container, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import { Space } from '../components/space'
import Footer from '../components/footer'

const PublicWrapper = () => {
  const navbarHeight = '64px';
  return (
    <div>
      <Container sx={{margin: '0 auto', width: '100%'}}>
        <Navbar />
        <Space h={navbarHeight} />
        <Box sx={{minHeight: '70vh'}}>
          <Outlet />
        </Box>
        <Footer />
      </Container>
    </div>
  )
}

export default PublicWrapper