'use client'
import { House } from "@/entity/House"
import styles from './HouseHolder.module.scss'
import HouseCard from "../HouseCard/HouseCard";
import NumberInput from "../ui/Inputs/number-input/NumberInput";
import { useNumberInput } from "../ui/Inputs/number-input/useNumberInput";
import Calendar from "../Calendar/Calendar";
import { useCalendar } from "../Calendar/CalendarBody/hooks/useCalendar";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/api/instance";
import Reloader from "../ui/Reloader/Reloader";
import { GET_HOUSES, GET_HOUSES_CALENDAR } from "@/api/endpoints";

const HousesHolder = ({ initHouses }: {initHouses: House[]}) => {

  const guestsController = useNumberInput('Гостей', 1)
  const calendarController = useCalendar('houses', false, GET_HOUSES_CALENDAR)
  const [houses, setHouses] = useState<House[]>(initHouses)
  

  function getDates() {
    return calendarController.selectionController.isActive ? {
      check_in_date: calendarController.selectionController.dateBegin!.getKey(),
      check_out_date: calendarController.selectionController.dateEnd!.getKey(),
    } : {}
  }

  useEffect(() => {
    axiosInstance.get(GET_HOUSES, {params: {
      max_persons_amount: guestsController.value,
      ...getDates(),
    }}).then(res => {
      setHouses(res.data)
    })
  }, [guestsController.value, calendarController.selectionController.isActive])

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <NumberInput className={styles.guests} {...guestsController}/>
        <Calendar calendarController={calendarController}/>
        <Reloader onClick={() => {calendarController.reset(), guestsController.reset(), sessionStorage.clear()}}/>
      </div>
      <div className={styles.houses}>
        {
          houses.map(house => (
            <HouseCard key={house.id} guestsController={guestsController} data={house} selectionController={calendarController.selectionController}/>
          ))
        }
      </div>
    </div>
  );
};

export default HousesHolder;