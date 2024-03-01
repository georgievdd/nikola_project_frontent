'use client'

import { Swiper as LibSwiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectFade } from 'swiper/modules';
import styles from './Swiper.module.scss'
import { Picture } from '@/entity/House';
import Image from 'next/image';
import { STATIC_URL } from '@/api/instance';

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
        effect={'fade'}
        pagination={{clickable: true}}
        modules={[Navigation, Pagination, A11y, EffectFade]}
        className={[styles.swiper, props?.className].join(' ')}
      >
        {props.links.map(link => (
          <SwiperSlide className={styles.slide}>
            <img 
              src={`${STATIC_URL}${link.picture_path}`} 
              // fill 
              alt=''/>
          </SwiperSlide>
        ))}
      </LibSwiper>
    </>
  );
}
