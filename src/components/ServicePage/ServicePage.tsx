import Image from 'next/image'
import Link from 'next/link'

import Button from 'components/ui/Button/Button'
import Swiper from 'components/ui/Swiper/Swiper'
import {Service} from 'entity/Service'
import TGImage from 'images/tg.svg'

import styles from './ServicePage.module.scss'

const ServicePage = ({services}: {services: Service[]}) => {
  return (
    <div className={styles.container}>
      {services.map((service: Service) => (
        <Block {...service} key={service.name} />
      ))}
    </div>
  )
}

const Block = ({
  name,
  description,
  pictures,
  price_string,
  telegram_contact_link,
}: Service) => (
  <div className={styles['item-wrapper']}>
    <section>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles['description']}>
        <p>{description}</p>
      </div>
      <div className={styles['bottom-group']}>
        <Link href={telegram_contact_link} target="_blank">
          <Button variant="base" statical round0>
            Забронировать{' '}
            <Image
              alt=""
              src={TGImage}
              width={30}
              height={30}
              style={{marginLeft: '10px'}}
            />
          </Button>
        </Link>
        <h2 className={styles.cost}>{price_string}</h2>
      </div>
    </section>
    <div className={styles['img-wrapper']}>
      <div className={styles['img-holder']}>
        <Swiper links={pictures} />
      </div>
    </div>
  </div>
)

export default ServicePage
