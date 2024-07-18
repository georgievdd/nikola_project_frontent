import { Picture } from '@/entity/House'
import styles from './PictureWithBlur.module.scss'
import { getImageUrl, normalize } from '@/helpers'
import { useEffect, useRef, useState } from 'react'

interface Dimensions {
  width: number
  height: number
}

const kBlur = 0.85

export function needToShowBlur(picture: Picture, dimensions: Dimensions) {
    if (!picture.width || !picture.height) return false
    const ks = [picture, dimensions]
      .map(({width, height}) => width / height)
    return normalize(ks[0] / ks[1]) < kBlur
}

interface Props {
  img: Picture
}

const PictureWithBlur = ({
  img,
}: Props) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })
  useEffect(() => {
    if (!imgRef.current) return;
    const updateDimensions = () => {
      if (imgRef.current) {
        const { width, height } = imgRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    }
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () =>
      window.removeEventListener('resize', updateDimensions);
  }, [imgRef])
  return (
      needToShowBlur(img, dimensions) ?
      <>
        <img
          ref={imgRef}
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
        ref={imgRef}
        src={getImageUrl(img.picture)}
        alt='simple'
        className={styles.simple}
      />
  )
}


export default PictureWithBlur