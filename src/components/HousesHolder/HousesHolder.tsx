'use client'
import {useEffect, useState} from 'react'

import {GET_HOUSES, GET_HOUSES_CALENDAR} from 'api/endpoints'
import {axiosInstance} from 'api/instance'
import Calendar from 'Calendar/Calendar'
import {useCalendar} from 'Calendar/CalendarBody/hooks/useCalendar'
import HouseCard from 'components/HouseCard/HouseCard'
import NumberInput from 'components/ui/Inputs/NumberInput/NumberInput'
import {useNumberInput} from 'components/ui/Inputs/NumberInput/useNumberInput'
import Reloader from 'components/ui/Reloader/Reloader'
import {House} from 'entity/House'

import styles from './HousesHolder.module.scss'

const HousesHolder = ({initHouses}: {initHouses: House[]}) => {
  const guestsController = useNumberInput('Гостей', 1)
  const [houses, setHouses] = useState(initHouses)
  const calendarController = useCalendar(
    'houses',
    false,
    GET_HOUSES_CALENDAR,
    guestsController,
  )
  const {selectionController} = calendarController

  function getDates() {
    const check_in_date = selectionController.dateBegin?.getKey()
    const check_out_date = selectionController.dateEnd?.getKey()
    return {
      check_in_date,
      check_out_date,
    }
  }

  useEffect(() => {
    axiosInstance
      .get<House[]>(GET_HOUSES, {
        params: {
          total_persons_amount: guestsController.value,
          ...getDates(),
        },
      })
      .then((r) => r.data)
      .then((res) => {
        setHouses(res)
        const newMaxValue = Math.max(
          ...res.map((house) => house.max_persons_amount),
        )
        guestsController.setMaxValue(newMaxValue)
      })
  }, [
    guestsController.value,
    selectionController.isActive,
    selectionController.isStart,
  ])

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <NumberInput className={styles.guests} {...guestsController} />
        <Calendar calendarController={calendarController} />
        <Reloader
          onClick={() => {
            calendarController.reset(),
              guestsController.reset(),
              sessionStorage.clear()
          }}
        />
      </div>
      <div className={styles.houses}>
        {houses.map((house) => (
          <HouseCard
            key={house.id}
            guestsController={guestsController}
            data={house}
            selectionController={calendarController.selectionController}
          />
        ))}
      </div>
    </div>
  )
}

export default HousesHolder
