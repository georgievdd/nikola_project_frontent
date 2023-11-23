import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const HouseIdPage = () => {

  const { id } = useParams();

  return (
    <div>Конкретный домик {id}</div>
  )
}

export default HouseIdPage