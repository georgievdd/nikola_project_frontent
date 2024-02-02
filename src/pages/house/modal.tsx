import * as React from 'react';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/base/Button';
import {useEffect, useState} from "react";
import {CalendarDayResponse, CalendarDayResponseSelect, IHouse, INewReservationRequest} from "../../interfaces/houses";
import {Grid, Paper} from "@mui/material";
import {Block, Label} from "@mui/icons-material";
import {CalendarController, DAY_STATE, useCalendar} from "../../components/calendar2/useCalendar";
import Calendar from "../../components/calendar";
import Calendar2 from "../../components/calendar2";
import {addMonths, format, isSameDay} from "date-fns";
import {api} from "../../api";
import {
    addCosts, createTimesList, formatKey, formatToDDMMYYYY,
    mapFromSelectToCalender,
    mapFromUnselectToCalender,
    removedClosedDaysCalendar,
    showAlert
} from "../../utils/utils";
import {useTrigger} from "./index";
import {FormControl, Input} from "@mui/base";
import {Space} from "../../components/space";
import NumberInput from "../../components/number-input";
import {IReservationPrice, IReservationPriceRequest} from "../../interfaces/houses/reservation";
import AutocompleteDateInput, {useAutocompleteDateInputController} from "../../components/autocomlete_date_input";


export interface HouseModalController {
    open: boolean, setOpen: (v: boolean) => void,
    state: IHouse | null, setState: (v: IHouse | null) => void,
    begin: Date | null, setBegin: (v: Date | null) => void,
    end: Date | null, setEnd: (v: Date | null) => void,
    calendarController: CalendarController,
    mainCalendarController: CalendarController
}
export function useHouseModal(mainCalendarController: CalendarController): HouseModalController {
    const [open, setOpen] = useState(false)
    const [state, setState] = useState<IHouse | null>(null)
    const [begin, setBegin] = useState<Date | null>(null)
    const [end, setEnd] = useState<Date | null>(null)
    const calendarController = useCalendar(new Date())
    return {
        open, setOpen,
        state, setState,
        begin, setBegin,
        end, setEnd,
        calendarController,
        mainCalendarController
    }
}


export default function HouseModal({
                                       controller,
                                       max_persons_amount_init,
}: {
    controller: HouseModalController,
    max_persons_amount_init: number
}) {

    const {
        open,
        setOpen,
        state,
        calendarController,
    } = controller
    const {
        month
    } = calendarController
    const id = state?.id
    const [max_persons_amount, setMPA] = useState<number>(0);

    const modalInput = useModalInput()
    const reservationOptions = useReservationOptions()
    const priceList = usePriceList()

    /**
     * календарь
     */
    const trigger = useTrigger()
    useEffect(() => {
        if (!open) return
        [month, addMonths(month, 1)]
            .forEach(month => {
                api.house.getHouseCalendar(id!, {
                    month: month.getMonth() + 1,
                    year: month.getFullYear(),
                })
                    .then(res => res.data.calendar)
                    .then(data => {
                        const newPage = mapFromUnselectToCalender(data as Record<string, CalendarDayResponse>)
                        calendarController.setRawMask((prev: Record<string, DAY_STATE>) => ({...newPage, ...prev}))
                        calendarController.setMonthMask((prev: Record<string, DAY_STATE>) => ({...newPage, ...prev}))
                        trigger.call()
                    })
                    .catch(err => {
                        showAlert(err?.response?.data?.error, 'alert-warning')
                    })
            })
    }, [controller.calendarController.month]);
    useEffect(() => {
        calendarController.setFirstState((prev: any) => calendarController.monthMask)
    }, [trigger.val]);
    useEffect(() => {
        if (!calendarController.select.begin || !calendarController.select.end) return
        if (isSameDay(calendarController.select.begin, calendarController.select.end)) return
        api.house.getHouseCalendar(id!, {
            month: calendarController.month.getMonth() + 1,
            year: calendarController.month.getFullYear(),
            chosen_check_in_date: format(calendarController.select.minDate!, 'dd-MM-yyyy')
        })
            .then(res => res.data.calendar)
            .then(data => {
                const newCosts = addCosts(data as Record<string, CalendarDayResponseSelect>)
                calendarController.setCosts((prev: Record<string, number>) => newCosts)
                calendarController.setMonthMask(
                    (prev: Record<string, DAY_STATE>) =>
                        mapFromSelectToCalender(prev, data as Record<string, CalendarDayResponseSelect>))
                calendarController.setRawMask(
                    (prev: Record<string, DAY_STATE>) =>
                        mapFromSelectToCalender(prev, data as Record<string, CalendarDayResponseSelect>))
            })

    }, [calendarController.select.begin, calendarController.select.end]);
    useEffect(() => {
        if (calendarController.select.isActive && isSameDay(calendarController.select.begin!, calendarController.select.end!)) {
            calendarController.setCosts({})
            calendarController.setMonthMask((prev: Record<string, DAY_STATE>) => removedClosedDaysCalendar(prev, calendarController.firstState))
            calendarController.setRawMask((prev: Record<string, DAY_STATE>) => removedClosedDaysCalendar(prev, calendarController.firstState))
        }
    }, [calendarController.select.isActive]);

    /**
     * для информации о заявке
     */

    // каждое выделение
    useEffect(() => {
        if (!controller.calendarController.select.isActive ||
            controller.calendarController.select.pointSelect()) return
        if (!modalInput.checkinInput.value) return

        const reservationPriceData: IReservationPriceRequest = {
            check_in_datetime: `${format(calendarController.select.minDate!, 'dd-MM-yyyy')} ${modalInput.checkinInput.value}`,
            check_out_datetime: `${format(calendarController.select.maxDate!, 'dd-MM-yyyy')} ${modalInput.checkoutInput.value}`,
            extra_persons_amount: max_persons_amount,
        }

        api.house.getReservationPrice(id!, reservationPriceData)
            .then(res => res.data)
            .then(data => {
                console.log(data)
                priceList.set(data)
            })

    }, [calendarController.select.isActive, max_persons_amount, modalInput.checkinInput.value, modalInput.checkinInput.value])

    // только при инициализации
    useEffect(() => {
        if (!open) return
        setMPA(max_persons_amount_init)
        api.house.getReservationOptions(id!)
            .then(res => res.data)
            .then(data => {
                reservationOptions.set(data)
                console.log(data)
                modalInput.setInOutTimes(
                    createTimesList(data.check_in_times),
                    createTimesList(data.check_out_times),
                )
            })
    }, [open]);
    const bookHouse = () => {
        const bookData: INewReservationRequest = {
            check_in_datetime: `${format(controller.calendarController.select.minDate!, 'dd-MM-yyyy')} 16:00`,
            check_out_datetime: `${format(controller.calendarController.select.maxDate!, 'dd-MM-yyyy')} 12:00`,
            extra_persons_amount: max_persons_amount,
            ...modalInput.dto,
        }
        api.house.newReservation(id!, bookData)
            .then(res => res.data)
            .then(data => {
                showAlert('Успешно забронировано!', 'alert-success')
                setTimeout(() => window.location.reload(), 2000)
            })
            .catch(err => {
                showAlert(err?.response?.data?.error || 'Какая то ошибка', 'alert-danger')
            })
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        priceList.set(null)
    };
    const checkMPA = (value: number) => value < reservationOptions.max_persons_amount.value!

    if (!state) return <div></div>
    return (
        <div>
            <TriggerButton onClick={handleOpen}>Open modal</TriggerButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
            >
                <Fade in={open}>
                    <ModalContent sx={style}>
                       <Grid container display='flex'>
                           <Grid item xs={6} display='flex'>
                                <div>
                                    <h2>{state.name}</h2>
                                    <p>{state.description}</p>
                                </div>
                           </Grid>
                           <Grid item xs={6}>
                               <NumberInput value={max_persons_amount} setValue={setMPA} check={checkMPA}/>
                               <Space h='20px'/>
                               <h1>{format(controller.calendarController.month, 'MMMM')}
                                   {controller.calendarController.month.getFullYear()}</h1>
                               <button onClick={controller.calendarController.nextMonth}>next</button>
                               <button onClick={controller.calendarController.prevMonth}>prev</button>
                               <Calendar2 controller={controller.calendarController}/>
                           </Grid>
                       </Grid>
                        <Grid display='flex' justifyContent='center'>
                            <Paper sx={{width: '100%', padding: 2}}>
                                <h1>Заявка</h1>
                                <Grid display='flex' justifyContent='space-between'>
                                    <div>
                                        <div>
                                            <label>first_name</label>
                                            <Input {...modalInput.first_name} style={inputStyle}></Input>
                                        </div>
                                        <div>
                                            <label>last_name</label>
                                            <Input {...modalInput.last_name} style={inputStyle}></Input>
                                        </div>
                                        <div>
                                            <label>email</label>
                                            <Input {...modalInput.email} style={inputStyle}></Input>
                                        </div>
                                        <div>
                                            <label>email</label>
                                            <Input {...modalInput.preferred_contact} style={inputStyle}></Input>
                                        </div>
                                    </div>
                                    <div>
                                        <p>максимальное количество
                                            жителей {reservationOptions.max_persons_amount.value}</p>
                                        <p>стандартное количество
                                            жителей {reservationOptions.base_persons_amount.value}</p>
                                        <p>цена за каждого компаньона {reservationOptions.price_per_extra_person.value}</p>
                                    </div>
                                </Grid>
                                {priceList.data &&
                                    <>
                                        <Grid display='flex' gap={2}>
                                            <h3>Заезд: {format(new Date(priceList.data.check_in_datetime), 'dd-MM-yyyy')}</h3>
                                            <label>
                                                <AutocompleteDateInput controller={modalInput.checkinInput}/>
                                            </label>
                                        </Grid>
                                        <Grid display='flex' gap={2}>
                                            <h3>Выезд: {format(new Date(priceList.data.check_out_datetime), 'dd-MM-yyyy')}</h3>
                                            <label>
                                                <AutocompleteDateInput controller={modalInput.checkoutInput}/>
                                            </label>
                                        </Grid>
                                        <h3>едет со мной: {priceList.data.extra_persons_amount}</h3>
                                        <h3>Дополнительные услуги:</h3>
                                        <ul>
                                            {priceList.data.receipt.extra_services.map(service => <li>
                                                <p>{`${service.name} - ${service.price} дублей`}</p>
                                            </li>)}
                                        </ul>
                                        <h3>Описание каждой ночи:</h3>
                                        <ul>
                                            {priceList.data.receipt.nights.map(day => <li>
                                                <p>{`${day.name} - ${day.price} дублей`}</p>
                                            </li>)}
                                        </ul>
                                        <h3>Итоговая стоимость: {priceList.data.total}</h3>
                                    </>
                                }
                                <Button onClick={bookHouse}>Забронировать</Button>
                            </Paper>
                        </Grid>
                    </ModalContent>
                </Fade>
            </Modal>
        </div>
    );
}


/**
 * mui modal config
 */
const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean }>(
    (props, ref) => {
        const {open, ...other} = props;
        return (
            <Fade in={open}>
                <div ref={ref} {...other} />
            </Fade>
        );
    },
);
const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};
const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};
const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
`;
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
};
const ModalContent = styled('div')(
    ({ theme }) => css`
        height: 90vh;
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 500;
        text-align: start;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow-y: auto; // Включаем скролл для элемента
        background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border-radius: 8px;
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0 4px 12px ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
        padding: 24px;
        color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

        // Кастомизация скроллбара для WebKit/Blink браузеров
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        // Базовая кастомизация скроллбара для Firefox
        scrollbar-width: thin;
        scrollbar-color: #888 #f1f1f1;

        & .modal-title {
            margin: 0;
            line-height: 1.5rem;
            margin-bottom: 8px;
        }
        & .modal-description {
            margin: 0;
            line-height: 1.5rem;
            font-weight: 400;
            color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
            margin-bottom: 4px;
        }
    `,
);
const TriggerButton = styled(Button)(
    ({ theme }) => css`
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.5;
        padding: 8px 16px;
        border-radius: 8px;
        transition: all 150ms ease;
        cursor: pointer;
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

        &:hover {
            background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
            border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
        }

        &:active {
            background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
        }

        &:focus-visible {
            box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
            outline: none;
        }
    `,
);
const inputStyle = {display: 'inline-block', marginLeft: '10px'}

const useModalInput = () => {
    const email = useInput('email@mail.ru')
    const first_name = useInput('first_name')
    const last_name = useInput('last_name')
    const preferred_contact = useInput('preferred_contact')
    const [checkinTimes, setCheckinTimes] = useState<string[]>([])
    const [checkoutTimes, setCheckoutTimes] = useState<string[]>([])
    const checkinInput = useAutocompleteDateInputController(checkinTimes)
    const checkoutInput = useAutocompleteDateInputController(checkoutTimes)
    const setInOutTimes = (inTimes: string[], outTimes: string[]) => {
        setCheckinTimes(inTimes)
        setCheckoutTimes(outTimes)
    }

    const dto = {
        email: email.value,
        first_name: first_name.value,
        last_name: last_name.value,
        preferred_contact: preferred_contact.value,
    }
    return {
        email,
        first_name,
        last_name,
        preferred_contact,
        dto,
        checkinInput,
        checkoutInput,
        setInOutTimes
    }
}

function useReservationOptions() {
    const base_persons_amount = useInput<number | null>(null)
    const price_per_extra_person = useInput<number | null>(null)
    const max_persons_amount = useInput<number | null>(null)
    const set = (resource: any) => {
        base_persons_amount.setValue(resource.base_persons_amount)
        price_per_extra_person.setValue(resource.price_per_extra_person)
        max_persons_amount.setValue(resource.max_persons_amount)
    }
    return {
        base_persons_amount,
        price_per_extra_person,
        max_persons_amount,
        set,
    }
}

function usePriceList() {
    const [data, setData] = useState<IReservationPrice | null>(null)
    return {
        data,
        set: (v: IReservationPrice | null) => setData(v),
    }
}

function useInput<T>(initState: T) {
    const [value, setValue] = useState<T>(initState)
    return {
        value,
        setValue,
        onChange: (v: any) => setValue(v.target.value),
    }
}
