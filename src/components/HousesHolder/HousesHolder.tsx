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

const HousesHolder = ({ initHouses }: {initHouses: House[]}) => {

  const guestsController = useNumberInput('Гостей')
  const calendarController = useCalendar('houses', false, '/houses/calendar/')
  const [houses, setHouses] = useState<House[]>(initHouses)
  

  useEffect(() => {
    function getDates() {
      return calendarController.selectionController.isActive ? {
        check_in_date: calendarController.selectionController.dateBegin!.getKey(),
        check_out_date: calendarController.selectionController.dateEnd!.getKey(),
      } : {}
    }
    axiosInstance.get('/houses/', {params: {
      max_persons_amount: guestsController.value,
      ...getDates(),
    }}).then(res => setHouses(res.data))

  }, [guestsController.value, calendarController.selectionController.isActive])

  // useEffect(() => {
  //   if (calendar.selectionController.isActive) {
  //     calendar.setShow(false)
  //   }
  // }, [calendar.selectionController.isActive])

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <NumberInput className={styles.guests} {...guestsController}/>
        <Calendar calendarController={calendarController}/>
        <Reloader onClick={() => {calendarController.reset(), guestsController.reset()}}/>
      </div>
      <div className={styles.houses}>
        {
          houses.map(house => (
            <HouseCard key={house.id} data={house} selectionController={calendarController.selectionController}/>
          ))
        }
      </div>
    </div>
  );
};

export default HousesHolder;