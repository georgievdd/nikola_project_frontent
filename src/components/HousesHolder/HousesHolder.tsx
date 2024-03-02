'use client'
import { House } from "@/entity/House"
import styles from './HouseHolder.module.scss'
import HouseCard from "../HouseCard/HouseCard";
import NumberInput from "../ui/Inputs/number-input/NumberInput";
import Image from "next/image";
import RoundArrowImg from '../../../public/images/round-arrow.svg'
import { useNumberInput } from "../ui/Inputs/number-input/useNumberInput";
import { useRouter } from "next/navigation";

const HousesHolder = ({ houses }: {houses: House[]}) => {

  const router = useRouter()
  const guests = useNumberInput('Гостей')

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <NumberInput {...guests}/>
        <div>Calendar element</div>
        <button><Image src={RoundArrowImg} width={32} height={32} alt=''/></button>
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