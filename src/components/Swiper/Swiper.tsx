'use client'

import { Swiper as LibSwiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectFade, Scrollbar } from 'swiper/modules';
import styles from './Swiper.module.scss'
import { Picture } from '@/entity/House';
import 'swiper/swiper-bundle.css'
import PictureWithBackground from '../ui/PictureWithBackground/PictureWithBackground';

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
        modules={[Navigation, Pagination/*Scrollbar, A11y*/]}
        className={[styles.swiper, props?.className].join(' ')}
      >
        {props.links.map(link => (
          <SwiperSlide key={link.picture} className={styles.slide}>
            <PictureWithBackground always img={link}/>
          </SwiperSlide>
        ))}
      </LibSwiper>
    </>
  );
}
