import Image from 'next/image'
import Link from 'next/link'

import Button from 'components/ui/Button/Button'

import styles from './HomePage.module.scss'
import {texts} from './static'

const Block1 = (index: number) => {
  return (
    <div className={[styles['block-2'], styles['width-wrapper']].join(' ')}>
      <div className={styles['wrapper']}>
        <section>
          <h2>{texts[Math.floor(index / 2) - 1]}</h2>
          <Link href={'house'}>
            <Button round0 variant="base" statical>
              Выбрать домик
            </Button>
          </Link>
        </section>
        <div className={styles['img-holder']}>
          <Image
            quality={100}
            src={require(`../../../public/home/${index}.png`)}
            alt="Описание"
            layout="responsive"
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
        quality={100}
        src={require(`../../../public/home/${index}.png`)}
        alt="3"
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
            quality={100}
            src={require(`../../../public/home/${index}.png`)}
            alt="Описание"
            layout="responsive"
          />
        </div>
        <section>
          <h2>{texts[Math.floor(index / 2) - 1]}</h2>
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
          quality={100}
          src={require('../../../public/home/1.png')}
          alt="1"
          layout="responsive"
        />
        <div className={styles['width-wrapper']}>
          <section>
            <h1>
              Исследуйте красоту спокойствия и творчества — ваш идеальный отдых
              в домиках парка Никола-Ленивец
            </h1>
            <Link href={'house'}>
              <Button round0 variant="link" statical>
                Выбрать домик
              </Button>
            </Link>
          </section>
        </div>
      </div>
      {Array.from({length: 16}).map((_, index) => {
        if (index % 4 == 0) {
          return Block1(index + 2)
        }
        if (index % 2 == 1) {
          return Block2(index + 2)
        }
        return Block3(index + 2)
      })}
      <div className={[styles['footer'], styles['width-wrapper']].join(' ')}>
        <p>Источники фотоматериалов:</p>
        <p>Unsplash (Philipp Trubchenko)</p>
        <p>ВКонтакте (Никола-Ленивец)</p>
      </div>
    </div>
  )
}

export default HomePage
