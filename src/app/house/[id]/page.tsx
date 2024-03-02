import HouseHolder from "@/components/HouseHolder/HouseHolder";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { House } from "@/entity/House";
import { Metadata } from "next";

interface Props {
    params: {
        id: string
    }
}

export const metadata: Metadata = {
  title: "Nikola | {Вставить домик}",
  description: "{Вставить description}",
  keywords: "{Вставить features}",
}

export default function HouseId({params}: Props) {

  /**
   * Будет готовый домик 
   */

  return (
    <DefaultLayout>
      <HouseHolder data={houseExample}/>
    </DefaultLayout>
  );
}


const houseExample: House =  {
  "id": 1,
  "name": "Скандинавия 1",
  "description": "Эстетичный дизайн, удобная планировка и качество — все об этой серии модульных домов. Выполнен в лучших традициях Скандинавского стиля — использование натурального дерева в наружной и внутренней отделке, минимум лишних деталей.",
  "features": [
      {
          "id": 1,
          "name": "Кондиционер",
          "icon": "http://localhost:8002/media/houses_features/icons/%D0%9A%D0%BE%D0%BD%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%B5%D1%80_90EHe4l.png"
      },
      {
        "id": 1,
        "name": "Кондиционер",
        "icon": "http://localhost:8002/media/houses_features/icons/%D0%9A%D0%BE%D0%BD%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%B5%D1%80_90EHe4l.png"
        },
        {
            "id": 1,
            "name": "Кондиционер",
            "icon": "http://localhost:8002/media/houses_features/icons/%D0%9A%D0%BE%D0%BD%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%B5%D1%80_90EHe4l.png"
        },
        {
            "id": 1,
            "name": "Кондиционер",
            "icon": "http://localhost:8002/media/houses_features/icons/%D0%9A%D0%BE%D0%BD%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%B5%D1%80_90EHe4l.png"
        },
        {
            "id": 1,
            "name": "Кондиционер",
            "icon": "http://localhost:8002/media/houses_features/icons/%D0%9A%D0%BE%D0%BD%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%B5%D1%80_90EHe4l.png"
        },
        {
          "id": 1,
          "name": "Кондиционер",
          "icon": "http://localhost:8002/media/houses_features/icons/%D0%9A%D0%BE%D0%BD%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%B5%D1%80_90EHe4l.png"
          },
          {
              "id": 1,
              "name": "Кондиционер",
              "icon": "http://localhost:8002/media/houses_features/icons/%D0%9A%D0%BE%D0%BD%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%B5%D1%80_90EHe4l.png"
          },
          {
              "id": 1,
              "name": "Кондиционер",
              "icon": "http://localhost:8002/media/houses_features/icons/%D0%9A%D0%BE%D0%BD%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%B5%D1%80_90EHe4l.png"
          }
  ],
  "pictures": [
      {
          "picture_path": "/media/houses/pictures/1/1.jpg"
      },
      {
          "picture_path": "/media/houses/pictures/1/2.jpg"
      },
      {
          "picture_path": "/media/houses/pictures/1/3.jpg"
      },
      {
          "picture_path": "/media/houses/pictures/1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-01-12_025030.png"
      },
      {
          "picture_path": "/media/houses/pictures/1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-01-12_171556.png"
      },
      {
          "picture_path": "/media/houses/pictures/1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-01-13_155646.png"
      }
  ],
  "base_price": 10000,
  "total_price": null,
  "base_persons_amount": 2,
  "max_persons_amount": 6,
  "price_per_extra_person": 2000
}