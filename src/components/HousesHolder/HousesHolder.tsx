'use client'
import { House } from "@/entity/House"
import styles from './HouseHolder.module.scss'
import HouseCard from "../HouseCard/HouseCard";
import NumberInput from "../ui/Inputs/number-input/NumberInput";
import Image from "next/image";
import RoundArrowImg from '../../../public/images/round-arrow.svg'
import CircleImg from '../../../public/images/black-circle.svg'
import { useNumberInput } from "../ui/Inputs/number-input/useNumberInput";
import Calendar from "../Calendar/Calendar";
import { useCalendar } from "../Calendar/CalendarBody/hooks/useCalendar";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/api/instance";

const HousesHolder = ({ initHouses }: {initHouses: House[]}) => {

  const guests = useNumberInput('Гостей')
  const calendar = useCalendar('houses', false)
  const ref = useRef<HTMLImageElement>(null)
  const [houses, setHouses] = useState<House[]>(initHouses)
  

  const click = () => {
    calendar.reset()
    ref.current!.classList.add(styles.rotate)
    setTimeout(() => ref.current!.classList.remove(styles.rotate), 250)
  }

  useEffect(() => {
    function getDates() {
      return calendar.selectionController.isActive ? {
        check_in_date: calendar.selectionController.dateBegin!.getKey(),
        check_out_date: calendar.selectionController.dateEnd!.getKey(),
      } : {}
    }
    axiosInstance.get('/houses/', {params: {
      extra_persons_amount: guests.value,
      ...getDates(),
    }}).then(res => setHouses(res.data))

  }, [guests.value, calendar.selectionController.isActive])

  // useEffect(() => {
  //   if (calendar.selectionController.isActive) {
  //     calendar.setShow(false)
  //   }
  // }, [calendar.selectionController.isActive])

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <NumberInput className={styles.guests} {...guests}/>
        <Calendar calendarController={calendar}/>
        <button onClick={click}>
          <Image src={RoundArrowImg} width={20} height={20} alt='' ref={ref}/>
          <Image className={styles.imgc} src={CircleImg} width={32} height={32} alt=''/>
        </button>
      </div>
      <div className={styles.houses}>
        {
          houses.map(house => (
            <HouseCard key={house.id} data={house}/>
          ))
        }
      </div>
    </div>
  );
};

export default HousesHolder;