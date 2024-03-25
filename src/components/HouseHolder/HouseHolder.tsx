'use client'
import { House, HouseOptions } from '@/entity/House'
import React, { useCallback, useEffect } from 'react'
import HouseDescriptionBlock from './Blocks/HouseDescriptionBlock/HouseDescriptionBlock'
import styles from './HouseHolder.module.scss'
import BookingParamsBlock from './Blocks/BookingParamsBlock/BookingParamsBlock'
import UserInfoBlock from './Blocks/UserInfoBlock/UserInfoBlock'
import BookingInvoiceBlock from './Blocks/BookingInvoiceBlock/BookingInvoiceBlock'
import { useDatePicker } from '../ui/Inputs/DatePicker/useDatePicker'
import { useLabelInputGroup } from '../ui/Inputs/LabelInput/useLabelInput'
import { useNumberInput } from '../ui/Inputs/number-input/useNumberInput'
import CircleImage from '../../../public/images/circle.svg'
import MoonImage from '../../../public/images/moon.svg'
import { useCalendar } from '../Calendar/CalendarBody/hooks/useCalendar'
import { IReservationPriceRequest, MakeReservationRequest } from './dto/Reservations'
import { getDateFromKey, showAlert } from '@/helpers'
import { getReservationPrice, postMakeReservation } from '@/api/reservation'
import { useBookingInvoice } from './Blocks/BookingInvoiceBlock/useBookingInvoice'


interface HouseHolderProps {
  house: House
  houseOptions: HouseOptions
}

const HouseHolder = ({house, houseOptions}: HouseHolderProps) => {
  const guestsController = useNumberInput('Гостей', 1, houseOptions.max_persons_amount);
  const datePickerController = useDatePicker(houseOptions)
  const userInfoController = useLabelInputGroup()
  const calendarController = useCalendar('house_id', false, `/houses/${house.id}/calendar/`)
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
    if (await postMakeReservation(house.id, reservatonData)) {
      showAlert("Успешно забронировано", 'alert-success')
    }
  }
  
  async function getPriceList() {
    const reservationPriceData: IReservationPriceRequest = {
      check_in_datetime: `${dateBegin!.getKey()} ${datePickerController.currentFirst}`,
      check_out_datetime: `${dateEnd!.getKey()} ${datePickerController.currentSecond}`,
      total_persons_amount: guestsController.value,
    }
    // console.log(reservationPriceData);
    priceList.set(await getReservationPrice(house.id, reservationPriceData));
  }
  /**
   * проверка на активное выделение сразу при переходе на страницу
   */
  useEffect(() => {
    const check_in_date = sessionStorage.getItem('check_in_date')
    const check_out_date = sessionStorage.getItem('check_out_date')
    const guests = sessionStorage.getItem('guests')
    if (check_in_date == null) {
      return
    }
    setDateBegin(getDateFromKey(check_in_date))
    setDateEnd(getDateFromKey(check_out_date!))
    guestsController.set(+guests!)
  }, [])

  useEffect(() => {
    if (isActive) {
      getPriceList();
    }
  }, [isActive, guestsController.value, datePickerController.currentFirst, datePickerController.currentSecond])

  const resetAction = useCallback(() => {
    priceList.set(null)
  }, [])

  return (
    <div className={styles.container}>
      <HouseDescriptionBlock
        data={house} 
        houseOptions={houseOptions}
      />
      <BookingParamsBlock 
        guestsController={guestsController}
        datePickerController={datePickerController}
        calendarController={calendarController}
        resetAction={resetAction}
      />
      <UserInfoBlock 
        inputGroup={userInfoController.controllers}
      />
      {priceList.data &&
      <BookingInvoiceBlock
        controller={priceList}
        makeReservation={makeReservation}
        canMakeReservation={userInfoController.isValid}
      />}
    </div>
  )
}

export default HouseHolder