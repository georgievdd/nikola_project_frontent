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
import { useCalendar } from '../Calendar/CalendarBody/hooks/useCalendar'
import { getDateFromKey, showAlert } from '@/helpers'
import { getReservationPrice, postMakeReservation } from '@/api/reservation'
import { useBookingInvoice } from './Blocks/BookingInvoiceBlock/useBookingInvoice'
import { IReservationPriceRequest, MakeReservationRequest } from '@/entity/Reservation'
import { GET_HOUSE_CALENDAR } from '@/api/endpoints'
import { useRouter } from 'next/navigation'


interface HouseHolderProps {
  house: House
  houseOptions: HouseOptions
}

const HouseHolder = ({house, houseOptions}: HouseHolderProps) => {
  const guestsController = useNumberInput('Гостей', 1, houseOptions.max_persons_amount);
  const datePickerController = useDatePicker(houseOptions)
  const userInfoController = useLabelInputGroup()
  const calendarController = useCalendar('house_id', false, GET_HOUSE_CALENDAR(house.id))
  const priceList = useBookingInvoice()
  const router = useRouter()

  const {
    dateBegin,
    dateEnd,
    isActive,
    setDateBegin,
    setDateEnd
  } = calendarController.selectionController

  const reservationRequestDto = (): MakeReservationRequest => ({
    check_in_datetime: `${dateBegin!.getKey()} ${datePickerController.currentFirst}`,
    check_out_datetime: `${dateEnd!.getKey()} ${datePickerController.currentSecond}`,
    total_persons_amount: guestsController.value + 1,
    first_name: userInfoController.controllers[0].value,
    last_name: userInfoController.controllers[1].value,
    email: userInfoController.controllers[2].value,
    preferred_contact: userInfoController.controllers[3].value,
    promo_code: priceList.promoValue,
    comment: userInfoController.controllers[4].value || undefined,
  })
  const reservationPriceRequestDto = (withOutPromo: boolean): IReservationPriceRequest => ({
    check_in_datetime: `${dateBegin!.getKey()} ${datePickerController.currentFirst}`,
    check_out_datetime: `${dateEnd!.getKey()} ${datePickerController.currentSecond}`,
    total_persons_amount: guestsController.value,
    promo_code: withOutPromo ? undefined : priceList.promoValue,
  })
  
  async function makeReservation() {
    const reservatonData = reservationRequestDto()
    const reservation = await postMakeReservation(house.id, reservatonData)
    if (reservation) {
      router.push(`/reservation/${reservation.slug}`)
    }
    console.log(reservation);
  }
  async function getPriceList(withOutPromo: boolean = false) {
    const reservationPriceData = reservationPriceRequestDto(withOutPromo)
    getReservationPrice(house.id, reservationPriceData)
      .then(res => priceList.set(res.data))
      .catch(err => {
        showAlert(err.response?.data?.non_field_errors[0] || 'Ошибка')
        if (err.response.data.non_field_errors[0] === `Промокод "${priceList.promoValue}" не найден`) {
          getPriceList(true)
        } else {
          priceList.set(null)
        }
      })
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
  }, [
    isActive, 
    guestsController.value,
    datePickerController.currentFirst, 
    datePickerController.currentSecond,
    priceList.promoValue,
  ])

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