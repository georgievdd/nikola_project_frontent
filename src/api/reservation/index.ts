import { IReservationPrice, IReservationPriceRequest, MakeReservationResponse, Reservation } from "@/entity/Reservation"
import { post, put, get } from "../instance"
import { showAlert } from "@/helpers"
import { GET_HOUSE_RESERVATION, POST_MAKE_RESERVATION, PUT_RESERVATION_PRICE } from "../endpoints"

export function getReservationPrice(id: number, data: IReservationPriceRequest): Promise<IReservationPrice> {
    return put<IReservationPrice>(PUT_RESERVATION_PRICE(id), data)
}

export function postMakeReservation(id: number, data: IReservationPriceRequest): Promise<MakeReservationResponse | null> {
    return post<MakeReservationResponse>(POST_MAKE_RESERVATION(id), data)
        .catch(err => {
            showAlert(
                err?.response?.data?.email?.[0] || 
                err?.response?.data?.non_field_errors[0] ||
                'Неизвестная ошибка')
            return null
        })
}

export function getReservation(slug: string): Promise<Reservation> {
    return /*get<{reservation: Reservation}>(GET_HOUSE_RESERVATION(slug))*/ Promise.resolve(mockedAns)
        .then(response => response.reservation)
}


const mockedAns: {reservation: Reservation} = {
    "reservation": {
        "slug": "6JYWCB37JZVJ",
        "house": {
            "id": 1,
            "name": "Скандинавия 30",
            "description": "Скандинавия - это уютный домик в скандинавском стиле, расположенный в живописном парке. Домик имеет два этажа и четыре комнаты: кухню, ванную, спальню и гостиную. Кухня оборудована всем необходимым для приготовления и хранения пищи: холодильником, плитой, духовкой, микроволновкой, посудомоечной машиной, чайником, кофеваркой, тостером, посудой и столовыми приборами. Ванная комната имеет душевую кабину, унитаз, раковину, полотенца, фен, зубные щетки и пасту, мыло, шампунь и гель для душа. Спальня имеет двуспальную кровать с ортопедическим матрасом, подушками и одеялами, шкаф для одежды, тумбочку, будильник и лампу. Гостиная имеет диван, кресла, журнальный столик, камин, телевизор с плоским экраном и спутниковыми каналами, DVD-плеер, колонки, настольные игры и книги.\r\n\r\nДомик Скандинавия подходит для семейного отдыха или романтического уикенда. Вы сможете провести незабываемое время в уютной и теплой обстановке, насладиться красотой природы, заняться активными видами спорта или просто расслабиться у камина. Домик Скандинавия - это место, где вы почувствуете себя как дома!\r\n\r\n:)",
            "features": [
                {
                    "id": 2,
                    "name": "Обогреватель",
                    "picture": "/backend/media/house_features/pictures/%D0%9E%D0%B1%D0%BE%D0%B3%D1%80%D0%B5%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C.png",
                    "width": 36,
                    "height": 36
                },
                {
                    "id": 3,
                    "name": "Камин",
                    "picture": "/backend/media/house_features/pictures/%D0%9A%D0%B0%D0%BC%D0%B8%D0%BD.png",
                    "width": 22,
                    "height": 22
                },
                {
                    "id": 5,
                    "name": "Холодильник",
                    "picture": "/backend/media/house_features/pictures/%D0%A5%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA.png",
                    "width": 512,
                    "height": 512
                },
                {
                    "id": 7,
                    "name": "Чайник",
                    "picture": "/backend/media/house_features/pictures/%D0%A7%D0%B0%D0%B9%D0%BD%D0%B8%D0%BA.png",
                    "width": 512,
                    "height": 512
                }
            ],
            "pictures": [
                {
                    "picture": "/backend/media/houses/pictures/1/1.png",
                    "width": 1200,
                    "height": 900
                },
                {
                    "picture": "/backend/media/houses/pictures/1/2.jpg",
                    "width": 1280,
                    "height": 960
                },
                {
                    "picture": "/backend/media/houses/pictures/1/3.jpg",
                    "width": 1280,
                    "height": 960
                },
                {
                    "picture": "/backend/media/houses/pictures/1/4.jpg",
                    "width": 1280,
                    "height": 960
                },
                {
                    "picture": "/backend/media/houses/pictures/1/5.jpg",
                    "width": 1280,
                    "height": 960
                },
                {
                    "picture": "/backend/media/houses/pictures/1/6.jpg",
                    "width": 1280,
                    "height": 960
                },
                {
                    "picture": "/backend/media/houses/pictures/1/7.jpg",
                    "width": 1280,
                    "height": 960
                },
                {
                    "picture": "/backend/media/houses/pictures/1/8.jpg",
                    "width": 1280,
                    "height": 960
                }
            ],
            "base_price": 15000,
            "base_persons_amount": 2,
            "max_persons_amount": 6,
            "price_per_extra_person": 2000
        },
        "client": {
            "email": "23.gorjachev.i@gmail.com",
            "first_name": "olga",
            "last_name": "goryacheva"
        },
        "check_in_datetime": "2024-07-28T16:00:00+03:00",
        "check_out_datetime": "2024-08-04T12:00:00+03:00",
        "total_persons_amount": 1,
        "preferred_contact": "sdfkkasdf;lads;ljfa;ljsdf",
        "comment": "asdf;lsad;lf;ljsa;ljdfas",
        "bill": {
            "total": 116000,
            "chronological_positions": [
                {
                    "type": "night",
                    "price": 15000,
                    "end_date": "2024-07-29",
                    "start_date": "2024-07-28",
                    "description": "Ночь с 28-07 на 29-07"
                },
                {
                    "type": "night",
                    "price": 15000,
                    "end_date": "2024-07-30",
                    "start_date": "2024-07-29",
                    "description": "Ночь с 29-07 на 30-07"
                },
                {
                    "type": "night",
                    "price": 15000,
                    "end_date": "2024-07-31",
                    "start_date": "2024-07-30",
                    "description": "Ночь с 30-07 на 31-07"
                },
                {
                    "type": "night",
                    "price": 15000,
                    "end_date": "2024-08-01",
                    "start_date": "2024-07-31",
                    "description": "Ночь с 31-07 на 01-08"
                },
                {
                    "type": "night",
                    "price": 15000,
                    "end_date": "2024-08-02",
                    "start_date": "2024-08-01",
                    "description": "Ночь с 01-08 на 02-08"
                },
                {
                    "type": "night",
                    "price": 22500,
                    "end_date": "2024-08-03",
                    "start_date": "2024-08-02",
                    "description": "Ночь с 02-08 на 03-08"
                },
                {
                    "type": "night",
                    "price": 22500,
                    "end_date": "2024-08-04",
                    "start_date": "2024-08-03",
                    "description": "Ночь с 03-08 на 04-08"
                }
            ],
            "non_chronological_positions": [
                {
                    "type": "promo_code",
                    "price": -4000,
                    "promo_code": "ABOBA",
                    "description": "ABOBA: -4000 руб."
                }
            ],
            "promo_code": "ABOBA"
        }
    }
}