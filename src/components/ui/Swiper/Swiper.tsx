'use client'

import {Navigation, Pagination} from 'swiper/modules'
import {Swiper as LibSwiper, SwiperSlide} from 'swiper/react'

import PictureWithBlur from 'components/ui/PictureWithBlur/PictureWithBlur'
import {Picture} from 'entity/House'

import styles from './Swiper.module.scss'

import 'swiper/swiper-bundle.css'

interface SwiperProps {
  className?: any
  links: Picture[]
}

export default function Swiper(props: SwiperProps) {
  return (
    <>
      <LibSwiper
        rewind={true}
        navigation
        slidesPerView={1}
        effect={'fade'}
        pagination={{clickable: true}}
        modules={[Navigation, Pagination /*Scrollbar, A11y*/]}
        className={[styles.swiper, props?.className].join(' ')}
      >
        {props.links.map((link) => (
          <SwiperSlide key={link.picture} className={styles.slide}>
            <PictureWithBlur img={link} />
          </SwiperSlide>
        ))}
      </LibSwiper>
    </>
  )
}
