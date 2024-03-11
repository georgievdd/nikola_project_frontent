'use client'
import { House } from '@/entity/House'
import React, { useEffect, useState } from 'react'
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
import { useCalendar } from '../Calendar/CalendarBody/hooks/useCalendar'
import { IReservationPrice, IReservationPriceRequest } from './dto/Reservations'
import { useSearchParams } from 'next/navigation'
import { getDate } from 'date-fns'
import { getDateFromKey } from '@/helpers'
import { axiosInstance } from '@/api/instance'


interface HouseHolderProps {
    data: House
}

const HouseHolder = ({data}: HouseHolderProps) => {

  const params = useSearchParams()
  const guestsController = useNumberInput('Гостей');
  const datePickerController = useDatePicker(dateData)
  const userInfoController = useLabelInputGroup(inputsConfig)
  const calendarController = useCalendar('house_id', false, `/houses/${data.id}/calendar/`)
  const priceList = usePriceList()

  function getPriceList() {
    const check_in_date = params.get('check_in_date')
    const check_out_date = params.get('check_out_date')
    const reservationPriceData: IReservationPriceRequest = {
      check_in_datetime: `${check_in_date} ${datePickerController.currentFirst}`,
      check_out_datetime: `${check_out_date} ${datePickerController.currentSecond}`,
      extra_persons_amount: guestsController.value,
    }
    axiosInstance.put<IReservationPrice>(`/houses/${data.id}/reservation_price/`, reservationPriceData)
    .then(res => res.data)
    .then(data => {
        console.log(data)
        priceList.set(data)
    })
  }
  useEffect(() => {
    const check_in_date = params.get('check_in_date')
    const check_out_date = params.get('check_out_date')
    if (check_in_date == null) {
      return
    }
    
    calendarController.selectionController.setDateBegin(getDateFromKey(check_in_date))
    calendarController.selectionController.setDateEnd(getDateFromKey(check_out_date!))
    getPriceList()
    

  }, [])

  return (
    <div className={styles.container}>
      <HouseDescriptionBlock data={data}/>
      <BookingParamsBlock 
        guestsController={guestsController}
        datePickerController={datePickerController}
        calendarController={calendarController}
      />
      <UserInfoBlock inputGroup={userInfoController}/>
      {priceList.data &&
      <BookingInvoiceBlock />}
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
    default: '16:00',
    other: [
      '16:00',
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



function usePriceList() {
  const [data, setData] = useState<IReservationPrice | null>(null)
  return {
    data,
    set: (v: IReservationPrice | null) => setData(v),
  }
}