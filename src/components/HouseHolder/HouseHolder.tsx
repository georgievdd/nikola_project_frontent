'use client'
import { House } from '@/entity/House'
import React from 'react'
import HouseDescriptionBlock from './Blocks/HouseDescriptionBlock/HouseDescriptionBlock'
import styles from './HouseHolder.module.scss'
import BookingParamsBlock from './Blocks/BookingParamsBlock/BookingParamsBlock'
import UserInfoBlock from './Blocks/UserInfoBlock/UserInfoBlock'
import BookingInvoiceBlock from './Blocks/BookingInvoiceBlock/BookingInvoiceBlock'
import { useDatePicker } from '../ui/Inputs/DatePicker/useDatePicker'
import useLabelInputGroup from '../ui/Inputs/LabelInput/useLabelInputGroup'
import { useNumberInput } from '../ui/Inputs/number-input/useNumberInput'
import CircleImage from '../../../public/images/circle.svg'
import MoonImage from '../../../public/images/moon.svg'


interface HouseHolderProps {
    data: House
}

const HouseHolder = ({data}: HouseHolderProps) => {

  const guestsController = useNumberInput('Гостей');
  const datePickerController = useDatePicker(dateData)
  const userInfoController = useLabelInputGroup(inputsConfig)

  return (
    <div className={styles.container}>
      <HouseDescriptionBlock data={data}/>
      <BookingParamsBlock 
        guestsController={guestsController}
        datePickerController={datePickerController}
      />
      <UserInfoBlock inputGroup={userInfoController}/>
      <BookingInvoiceBlock />
    </div>
  )
}

export default HouseHolder



const dateData = {
  first_group: {
    default: '13:00',
    other: [
      '13:00', '17:00', '19:00',
    ],
    label: 'Время заезда',
    labelImage: CircleImage,
  },
  second_group: {
    default: '14:00',
    other: [
      '13:00', '14:00', '21:00',
    ],
    label: 'Время выезда',
    labelImage: MoonImage,
  },
}


const inputsConfig = [
  {
    label: 'Фамилия',
    placeholder: 'Иванов'
  },
  {
    label: 'Имя',
    placeholder: 'Иван'
  },
  {
    label: 'E-mail',
    placeholder: 'example@gmail.com'
  },
  {
    label: 'Контакт для связи',
    placeholder: 'Фамилия'
  },
  {
    label: 'Комментарий',
    placeholder: 'Например, здесь можно написать, что вам не удобно отвечать на звонки в рабочее время',
    className: styles.comment,
  },
]