'use client'
import img1 from '../../../public/home/1.png'
import img2 from '../../../public/home/2.png'
import img3 from '../../../public/home/3.png'
import img4 from '../../../public/home/4.png'
import img5 from '../../../public/home/5.png'
import img6 from '../../../public/home/6.png'
import img7 from '../../../public/home/7.png'
import img8 from '../../../public/home/8.png'
import img9 from '../../../public/home/9.png'
import img10 from '../../../public/home/10.png'
import img11 from '../../../public/home/11.png'
import img12 from '../../../public/home/12.png'
import img13 from '../../../public/home/13.png'
import img14 from '../../../public/home/14.png'
import img15 from '../../../public/home/15.png'
import img16 from '../../../public/home/16.png'
import img17 from '../../../public/home/17.png'
import Image from 'next/image'
import styles from './HomePage.module.scss'
import Button from '../ui/Button/Button'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles['block-1']}>
        <Image
          src={img1}
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
                onClick={() => {}}
                >
                Выбрать домик
              </Button>
            </Link>
          </section>
        </div>
      </div>
      <div className={styles['block-2']}>
        <div className={styles['wrapper']}>
          <section>
            <h2>
              Наши уютные домики расположены всего в нескольких шагах от знаменитого арт-парка Никола-Ленивец, предлагая идеальные условия для тех, кто ищет спокойствие или, наоборот, желает ярких впечатлений и активного общения.
            </h2>
            <Link href={'house'}>
              <Button 
                round0 
                variant='base'
                onClick={() => {}}
                >
                Выбрать домик
              </Button>
            </Link>
          </section>
          <Image
            src={img2}
            alt='2'
          />
        </div>
      </div>
      <div className={styles['block-3']}>
        <Image
          src={img3}
          alt='3'
          layout="responsive"
        />
      </div>
      <div className={styles['block-4']}>
        <div className={styles['wrapper']}>
          <Image
            src={img4}
            alt='4'
          />
          <section>
            <h2>
              Никола-Ленивец — это не просто парк, это место, где каждый уголок наполнен творческим духом. Ежегодный фестиваль "Архстояние" оживляет пространство, превращая его в арену для самовыражения и новаторских идей.
            </h2>
          </section>
        </div>
      </div>
      <div className={styles['block-5']}>
        <Image
          src={img5}
          alt='5'
          layout="responsive"
        />
      </div>
      <div className={styles['block-6']}>
        <div className={styles['wrapper']}>
          <section>
            <h2>
              Фестиваль "Signal" открывает двери в мир современных ритмов, архитектурных новшеств и визуальных экспериментов. Здесь, в течение четырех дней, вы погрузитесь в атмосферу инноваций, вдохновения и созидательной энергии.
            </h2>
            <Link href={'house'}>
              <Button 
                round0 
                variant='base' 
                onClick={() => {}}
                >
                Выбрать домик
              </Button>
            </Link>
          </section>
          <Image
            src={img6}
            alt='6'
          />
        </div>
      </div>
      <div className={styles['block-7']}>
        <Image
          src={img7}
          alt='7'
          layout="responsive"
        />
      </div>
      <div className={styles['block-8']}>
        <div className={styles['wrapper']}>
          <Image
            src={img8}
            alt='8'
          />
          <section>
            <h2>
            Природные пейзажи здесь поражают своей красотой, а река, текучая у подножия наших домиков, предлагает прекрасные возможности для хождения на досках. Благодаря умеренному течению, вы можете наслаждаться плаванием в любом направлении, открывая для себя живописные виды и находя гармонию с окружающим миром.
            </h2>
          </section>
        </div>
      </div>
      <div className={styles['block-9']}>
        <Image
          src={img9}
          alt='9'
          layout="responsive"
        />
      </div>
      <div className={styles['block-10']}>
        <div className={styles['wrapper']}>
          <section>
            <h2>
            Помимо возможности исследовать реку на SUP-досках, мы предлагаем вам и другие способы расслабиться и насладиться природой. В нашем комплексе вы можете посетить настоящую русскую баню, а также приготовить еду под открытым небом на наших мангалах.
            </h2>
            <Link href={'house'}>
              <Button 
                round0 
                variant='base'
                onClick={() => {}}
                >
                Выбрать домик
              </Button>
            </Link>
          </section>
          <Image
            src={img10}
            alt='10'
          />
        </div>
      </div>
      <div className={styles['block-11']}>
        <Image
          src={img11}
          alt='11'
          layout="responsive"
        />
      </div>
      <div className={styles['block-12']}>
        <div className={styles['wrapper']}>
          <Image
            src={img12}
            alt='12'
          />
          <section>
            <h2>
            Если вы приедете вне сезона фестивалей, вы сможете в полной тишине наслаждаться уникальными арт-объектами, которые делают парк Никола-Ленивец таким особенным.
            </h2>
          </section>
        </div>
      </div>
      <div className={styles['block-13']}>
        <Image
          src={img13}
          alt='13'
          layout="responsive"
        />
      </div>
      <div className={styles['block-14']}>
        <div className={styles['wrapper']}>
          <section>
            <h2>
            Наши домики оборудованы качественной теплоизоляцией, что обеспечивает комфортное пребывание как в теплые летние месяцы, так и во время зимних пейзажей.
            </h2>
            <Link href={'house'}>
              <Button 
                round0 
                variant='base' 
                onClick={() => {}}
                >
                Выбрать домик
              </Button>
            </Link>
          </section>
          <Image
            src={img14}
            alt='14'
          />
        </div>
      </div>
      <div className={styles['block-15']}>
        <Image
          src={img15}
          alt='15'
          layout="responsive"
        />
      </div>
      <div className={styles['block-16']}>
        <div className={styles['wrapper']}>
          <Image
            src={img16}
            alt='16'
          />
          <section>
            <h2>
            Мы с нетерпением ждем возможности приветствовать вас в этом чудесном месте, где каждый найдет что-то для себя. Добро пожаловать в мир, где природа, искусство и комфорт гармонично сочетаются, создавая идеальные условия для незабываемого отдыха.
            </h2>
          </section>
        </div>
      </div>
      <div className={styles['block-17']}>
        <Image
          src={img17}
          alt='15'
          layout="responsive"
        />
      </div>
      <div className={styles['footer']}>
        <p>Источники фотоматериалов:</p>
        <p>Unsplash (Philipp Trubchenko)</p>
        <p>ВКонтакте (Никола-Ленивец)</p>
      </div>
    </div>
  )
}

export default HomePage