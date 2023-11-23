import React from 'react'
import { Link } from 'react-router-dom'
import { PATH } from '../../consts'

const HomePage = () => {
  return (
    <div>
      <Link to={PATH.HOUSE}>к списку домиков</Link>
    </div>
  )
}

export default HomePage