'use client'
import { House } from '@/entity/House'
import React, { useEffect } from 'react'
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
import { IReservationPriceRequest, MakeReservationRequest } from './dto/Reservations'
import { useSearchParams } from 'next/navigation'
import { getDateFromKey, showAlert } from '@/helpers'
import { getReservationPrice, postMakeReservation } from '@/api/reservation'
import { useBookingInvoice } from './Blocks/BookingInvoiceBlock/useBookingInvoice'


interface HouseHolderProps {
    data: House
}

const HouseHolder = ({data}: HouseHolderProps) => {
  const params = useSearchParams()
  const guestsController = useNumberInput('Гостей');
  const datePickerController = useDatePicker(dateData)
  const userInfoController = useLabelInputGroup(inputsConfig)
  const calendarController = useCalendar('house_id', false, `/houses/${data.id}/calendar/`)
  const priceList = useBookingInvoice()

  const {
    dateBegin,
    dateEnd,
    isActive,
    setDateBegin,
    setDateEnd
  } = calendarController.selectionController
  
  async function makeReservation() {
    const reservatonData: MakeReservationRequest = {
      check_in_datetime: `${dateBegin!.getKey()} ${datePickerController.currentFirst}`,
      check_out_datetime: `${dateEnd!.getKey()} ${datePickerController.currentSecond}`,
      total_persons_amount: guestsController.value + 1,
      first_name: userInfoController.controllers[0].value,
      last_name: userInfoController.controllers[1].value,
      email: userInfoController.controllers[2].value,
      preferred_contact: userInfoController.controllers[3].value,
    }
    if (userInfoController.controllers[4].value) {
      reservatonData.comment = userInfoController.controllers[4].value
    }
    if (await postMakeReservation(data.id, reservatonData)) {
      showAlert("Успешно забронировано", 'alert-success')
    }
  }
  
  async function getPriceList() {
    const reservationPriceData: IReservationPriceRequest = {
      check_in_datetime: `${dateBegin!.getKey()} ${datePickerController.currentFirst}`,
      check_out_datetime: `${dateEnd!.getKey()} ${datePickerController.currentSecond}`,
      total_persons_amount: guestsController.value + 1,
    }
    priceList.set(await getReservationPrice(data.id, reservationPriceData));
  }
  /**
   * проверка на активное выделение сразу при переходе на страницу
   */
  useEffect(() => {
    const check_in_date = params.get('check_in_date')
    const check_out_date = params.get('check_out_date')
    if (check_in_date == null) {
      return
    }
    setDateBegin(getDateFromKey(check_in_date))
    setDateEnd(getDateFromKey(check_out_date!))
  }, [])

  useEffect(() => {
    if (isActive) {
      getPriceList();
    }
  }, [isActive, guestsController.value])



  return (
    <div className={styles.container}>
      <HouseDescriptionBlock data={data}/>
      <BookingParamsBlock 
        guestsController={guestsController}
        datePickerController={datePickerController}
        calendarController={calendarController}
      />
      <UserInfoBlock inputGroup={userInfoController.controllers}/>
      {priceList.data &&
      <BookingInvoiceBlock
        controller={priceList}
        makeReservation={makeReservation}
        canMakeReservation={userInfoController.isValid()}
      />}
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
    default: '12:00',
    other: [
      '12:00',
    ],
    label: 'Время выезда',
    labelImage: MoonImage,
  },
}


const inputsConfig = [
  {
    label: 'Фамилия',
    placeholder: 'Иванов',
    required: true,
  },
  {
    label: 'Имя',
    placeholder: 'Иван',
    required: true,
  },
  {
    label: 'E-mail',
    placeholder: 'example@gmail.com',
    required: true,
  },
  {
    label: 'Контакт для связи',
    placeholder: 'Фамилия',
    required: true,
  },
  {
    label: 'Комментарий',
    placeholder: 'Например, здесь можно написать, что вам не удобно отвечать на звонки в рабочее время',
    className: styles.comment,
  },
]