import { Picture } from '@/entity/House'
import styles from './PictureWithBackground.module.scss'
import { getImageUrl } from '@/helpers'

export function needToShowBackground({width, height}: Picture) {
    if (!width || !height) return false
    if (width > height) {
        return width / height >= 1.4
    } else {
        return height / width >= 1.33
    }
}

interface Props {
  img: Picture
  always?: boolean
}

const PictureWithBackground = ({
  img,
  always,
}: Props) => {
  
  return (
      always || needToShowBackground(img) ?
      <>
        <img 
          src={getImageUrl(img.picture)}
          alt='background'
          className={styles.background}
        />
        <img 
          src={getImageUrl(img.picture)}
          alt='foreground'
          className={styles.foreground}
        />
      </> : 
      <img 
        src={getImageUrl(img.picture)}
        alt='simple'
        className={styles.simple}
      />
  )
}


export default PictureWithBackground