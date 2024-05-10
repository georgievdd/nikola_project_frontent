import { Picture } from '@/entity/House'
import styles from './PictureWithBackground.module.scss'

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
          src={img.picture}
          alt='background'
          className={styles.background}
        />
        <img 
          src={img.picture}
          alt='foreground'
          className={styles.foreground}
        />
      </> : 
      <img 
        src={img.picture} 
        alt='simple'
        className={styles.simple}
      />
  )
}


export default PictureWithBackground