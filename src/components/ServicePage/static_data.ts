


export interface Service {
    imgUrls: string[]
    tgLink: string
    title: string
    descpriptions: string[]
    cost: string
    measurement: string
}

const tgLinkSupboard: string = process.env.NEXT_PUBLIC_SERVICE_TG_LINK_SUPBOARD!
const tgLinkBathhouse: string = process.env.NEXT_PUBLIC_SERVICE_TG_LINK_BATHHOUSE!
const tgLinkGrill: string = process.env.NEXT_PUBLIC_SERVICE_TG_LINK_GRILL!

const genImgLinks = (prefix: string, length: number) => 
    Array.from({length}).map((_, i) => `${prefix}/${i + 1}.png`)

export const serviceData: Service[] = [
    {
        title: 'Русская баня',
        descpriptions: [
            'Отдых в русской бане - это великолепное путешествие в мир, где встречаются вековые традиции и естественные методы оздоровления.',
            'Это не просто место для процедур и расслабления, это истинное святилище, где каждый уголок наполнен атмосферой тепла, заботы и природной гармонии. В нашей русской бане вы ощутите, как древние традиции сливаются с современным комфортом.',
        ],
        tgLink: tgLinkBathhouse,
        cost: '5000',
        measurement: '₽/час',
        imgUrls: genImgLinks('bathhouse', 3),
    },
    {
        title: 'Аренда сапбордов',
        descpriptions: [
            'Аренда сапов - это увлекательное приключение на свежем воздухе, приносящее радость и вдохновение. Взять в аренду сапы - значит погрузиться в мир водных просторов и природной гармонии.',
            'Это не просто способ провести время, а возможность познакомиться с водными путешествиями в новом формате. Здесь каждый может почувствовать себя исследователем, преодолевая водные просторы на доске. ',
        ],
        tgLink: tgLinkSupboard,
        cost: '3000',
        measurement: '₽/час',
        imgUrls: genImgLinks('sapboard', 3),
    },
    {
        title: 'Аренда мангалов',
        descpriptions: [
            'Аренда мангалов - это возможность провести незабываемое время на природе в кругу семьи и друзей, наслаждаясь вкусом свежей пищи, ароматом дымка и теплом огня.',
            'Это не просто аренда оборудования для приготовления барбекю, это создание атмосферы уюта и веселья на пикнике или празднике. Здесь каждый может почувствовать себя шеф-поваром и гриль-мастером, готовя вкусные блюда под открытым небом.',
        ],
        tgLink: tgLinkGrill,
        cost: '5000',
        measurement: '₽/день',
        imgUrls: genImgLinks('grill', 3),
    },
]