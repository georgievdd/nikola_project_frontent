import React from 'react'
import { Link } from 'react-router-dom'
import { PATH } from '../../consts'
import './style.css'

const HomePage = () => {
  return (
    <div>
      {/*<Link to={PATH.HOUSE}>к списку домиков</Link>*/}
      <h1 className='content'>контент</h1>
    </div>
  )
}

export default HomePage