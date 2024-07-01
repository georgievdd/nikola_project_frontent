import Image from 'next/image'
import styles from './HomePage.module.scss'
import Button from '../ui/Button/Button'
import Link from 'next/link'

const texts = [
  'Наши уютные домики расположены всего в нескольких шагах от знаменитого арт-парка Никола-Ленивец, предлагая идеальные условия для тех, кто ищет спокойствие или, наоборот, желает ярких впечатлений и активного общения.',
  'Никола-Ленивец — это не просто парк, это место, где каждый уголок наполнен творческим духом. Ежегодный фестиваль "Архстояние" оживляет пространство, превращая его в арену для самовыражения и новаторских идей.',
  'Фестиваль "Signal" открывает двери в мир современных ритмов, архитектурных новшеств и визуальных экспериментов. Здесь, в течение четырех дней, вы погрузитесь в атмосферу инноваций, вдохновения и созидательной энергии.',
  'Природные пейзажи здесь поражают своей красотой, а река, текущая у подножия наших домиков, предлагает прекрасные возможности для прогулок на SUP-бордах. Благодаря умеренному течению, вы можете наслаждаться плаванием в любом направлении, открывая для себя живописные виды и находя гармонию с окружающим миром.',
  'Помимо возможности исследовать реку на SUP-бордах, мы предлагаем вам и другие способы расслабиться и насладиться природой. В нашем комплексе вы можете посетить настоящую русскую баню, а также приготовить еду под открытым небом на наших мангалах.',
  'Если вы приедете вне сезона фестивалей, вы сможете в полной тишине наслаждаться уникальными арт-объектами, которые делают парк Никола-Ленивец таким особенным.',
  'Наши домики оборудованы качественной теплоизоляцией, что обеспечивает комфортное пребывание как в теплые летние месяцы, так и во время зимних пейзажей.',
  'Мы с нетерпением ждем возможности приветствовать вас в этом чудесном месте, где каждый найдет что-то для себя. Добро пожаловать в мир, где природа, искусство и комфорт гармонично сочетаются, создавая идеальные условия для незабываемого отдыха.',
]

const Block1 = (index: number) => {
  return (
    <div className={[styles['block-2'], styles['width-wrapper']].join(' ')}>
      <div className={styles['wrapper']}>
        <section>
          <h2>
            {texts[Math.floor(index / 2) - 1]}
          </h2>
          <Link href={'house'}>
            <Button
              round0
              variant='base'
              statical
            >
              Выбрать домик
            </Button>
          </Link>
        </section>
        <div className={styles['img-holder']}>
          <Image
            src={require(`../../../public/home/${index}.png`)}
            alt='Описание'
            layout='responsive'
          />
        </div>
      </div>
    </div>
  )
}
const Block2 = (index: number) => {
  return (
    <div className={styles['big-size-only']}>
      <Image
        src={require(`../../../public/home/${index}.png`)}
        alt='3'
        layout="responsive"
      />
    </div>
  )
}
const Block3 = (index: number) => {
  return (
    <div className={[styles['block-2'], styles['width-wrapper']].join(' ')}>
      <div className={styles['wrapper']}>
        <div className={styles['img-holder']}>
          <Image
            src={require(`../../../public/home/${index}.png`)}
            alt='Описание'
            layout='responsive'
          />
        </div>
        <section>
          <h2>
            {texts[Math.floor(index / 2) - 1]}
          </h2>
        </section>
      </div>
    </div>
  )
}

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles['block-1']}>
        <Image
          src={require('../../../public/home/1.png')}
          alt='1'
          layout="responsive"
        />
        <div className={styles['width-wrapper']}>
          <section>
            <h1>
            Исследуйте красоту спокойствия и творчества — ваш идеальный отдых в домиках парка Никола-Ленивец
            </h1>
            <Link href={'house'}>
              <Button 
                round0 
                variant='link'
                statical
                >
                Выбрать домик
              </Button>
            </Link>
          </section>
        </div>
      </div>
      {
        Array.from({length: 16}).map((_, index) => {
          if (index % 4 == 0) {
            return Block1(index + 2);
          }
          if (index % 2 == 1) {
            return Block2(index + 2);
          }
          return Block3(index + 2);
        })
      }
      <div className={[styles['footer'], styles['width-wrapper']].join(' ')}>
        <p>Источники фотоматериалов:</p>
        <p>Unsplash (Philipp Trubchenko)</p>
        <p>ВКонтакте (Никола-Ленивец)</p>
      </div>
    </div>
  )
}

export default HomePage