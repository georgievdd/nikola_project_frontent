import Link from 'next/link'
import Button from '../ui/Button/Button'
import styles from './ServicePage.module.scss'
import { Service, serviceData } from './static_data'
import Image from 'next/image'
import TGImage from '../../../public/images/tg.svg'
import { fontSize } from '@mui/system'
import Swiper from '../ui/Swiper/Swiper'
import { Picture } from '@/entity/House'
const ServicePage = () => {
  return (
    <div className={styles.container}>
      {serviceData.map((service: Service) => 
        <Block {...service}/>
      )}
    </div>
  )
}
const getServicePictures = (pictures: string[]): Picture[] => 
  pictures.map(url => ({width: 0, height: 0, picture: `/service/${url}`}))

const Block = ({
  title,
  descpriptions,
  cost,
  measurement,
  tgLink,
  imgUrls
}: Service) => (
  <div className={styles['item-wrapper']}>
    <section>
      <h1 className={styles.title}>
        {title}
      </h1>
      <div className={styles['description']}>
        {descpriptions.map((text: string) => 
        <p>
          {text}
        </p>
        )}
      </div>
      <div className={styles['bottom-group']}>
        <Link href={tgLink} target="_blank">
          <Button variant='base' statical round0>
            Забронировать <Image 
              alt=''
              src={TGImage}
              width={30}
              height={30}
              style={{marginLeft: '10px'}}
            />
          </Button>
        </Link>
        <h2 className={styles.cost}>
          {`${cost} ${measurement}`}
        </h2>
      </div>
    </section>
    <div className={styles['img-wrapper']}>
      <Swiper
        links={getServicePictures(imgUrls)}
      />
    </div>
  </div>
)


export default ServicePage