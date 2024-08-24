'use client'
import React, {useEffect} from 'react'

import {useRouter} from 'next/navigation'

import {GET_HOUSE_CALENDAR} from 'api/endpoints'
import {
  getReservation,
  getReservationPrice,
  postMakeReservation,
} from 'api/reservation'
import {useCalendar} from 'Calendar/CalendarBody/hooks/useCalendar'
import {useDatePicker} from 'components/ui/Inputs/DatePicker/useDatePicker'
import {useLabelInputGroup} from 'components/ui/Inputs/LabelInput/useLabelInput'
import {useNumberInput} from 'components/ui/Inputs/NumberInput/useNumberInput'
import {House, HouseOptions} from 'entity/House'
import {
  IReservationPriceRequest,
  MakeReservationRequest,
} from 'entity/Reservation'
import {getDateFromKey, handleApiError} from 'src/helpers'

import BookingInvoiceBlock from './Blocks/BookingInvoiceBlock/BookingInvoiceBlock'
import {useBookingInvoice} from './Blocks/BookingInvoiceBlock/useBookingInvoice'
import BookingParamsBlock from './Blocks/BookingParamsBlock/BookingParamsBlock'
import HouseDescriptionBlock from './Blocks/HouseDescriptionBlock/HouseDescriptionBlock'
import UserInfoBlock from './Blocks/UserInfoBlock/UserInfoBlock'
import styles from './HouseHolder.module.scss'

interface HouseHolderProps {
  house: House
  houseOptions: HouseOptions
}

const HouseHolder = ({house, houseOptions}: HouseHolderProps) => {
  const guestsController = useNumberInput(
    'Гостей',
    1,
    houseOptions.max_persons_amount,
  )
  const datePickerController = useDatePicker(houseOptions)
  const userInfoController = useLabelInputGroup()
  const calendarController = useCalendar(
    'house_id',
    false,
    GET_HOUSE_CALENDAR(house.id),
    guestsController,
  )
  const priceList = useBookingInvoice()
  const router = useRouter()

  const {dateBegin, dateEnd, isActive, setDateBegin, setDateEnd} =
    calendarController.selectionController

  const firstDate = datePickerController.currentFirst
  const secondDate = datePickerController.currentSecond

  const reservationRequestDto = (): MakeReservationRequest => ({
    check_in_datetime: `${dateBegin!.getKey()} ${firstDate}`,
    check_out_datetime: `${dateEnd!.getKey()} ${secondDate}`,
    total_persons_amount: guestsController.value,
    first_name: userInfoController.controllers[0].value,
    last_name: userInfoController.controllers[1].value,
    email: userInfoController.controllers[2].value,
    preferred_contact: userInfoController.controllers[3].value,
    promo_code: priceList.promoValue,
    comment: userInfoController.controllers[4].value || undefined,
  })
  const reservationPriceRequestDto = (
    withOutPromo: boolean,
  ): IReservationPriceRequest => ({
    check_in_datetime: `${dateBegin!.getKey()} ${firstDate}`,
    check_out_datetime: `${dateEnd!.getKey()} ${secondDate}`,
    total_persons_amount: guestsController.value,
    promo_code: withOutPromo ? undefined : priceList.promoValue,
  })

  async function makeReservation() {
    const reservatonData = reservationRequestDto()
    const reservation = await postMakeReservation(
      house.id,
      reservatonData,
    ).catch(handleApiError)
    if (reservation) {
      await getReservation(reservation.slug).catch(handleApiError)
      router.push(`/reservation/${reservation.slug}`)
    }
  }
  async function getPriceList(withoutPromo: boolean = false) {
    const reservationPriceData = reservationPriceRequestDto(withoutPromo)
    getReservationPrice(house.id, reservationPriceData)
      .then(priceList.set)
      .catch(handleApiError)
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
    guestsController.setValue(+guests!)
  }, [])

  useEffect(() => {
    if (isActive) {
      getPriceList()
    }
  }, [
    isActive,
    guestsController.value,
    datePickerController.currentFirst,
    datePickerController.currentSecond,
    priceList.promoValue,
  ])

  return (
    <div className={styles.container}>
      <HouseDescriptionBlock data={house} houseOptions={houseOptions} />
      <BookingParamsBlock
        guestsController={guestsController}
        datePickerController={datePickerController}
        calendarController={calendarController}
      />
      <UserInfoBlock inputGroup={userInfoController.controllers} />
      {priceList.data && (
        <BookingInvoiceBlock
          controller={priceList}
          makeReservation={makeReservation}
          canMakeReservation={userInfoController.isValid}
        />
      )}
    </div>
  )
}

export default HouseHolder
