'use client'
import { Picture } from '@/entity/House'
import React, { ChangeEvent, LegacyRef, useEffect, useRef, useState } from 'react'
import styles from './Carousel.module.scss'
import Image from 'next/image'
import arrowDown from '../../../../public/images/arrow-down.svg'
import arrowUp from '../../../../public/images/arrow-up.svg'
/**
 * Если будет беда - заменить img на Image; добавить fill
 */
const Carousel = ({imgs}: {imgs: Picture[]}) => {
  const [current, setCurrent] = useState<number>(0)
  const columnRef = useRef<HTMLUListElement>(null)
  const topSmoothRef = useRef<HTMLDivElement>(null)
  const bottomSmoothRef = useRef<HTMLDivElement>(null)
  const topArrowRef = useRef<HTMLButtonElement>(null)
  const bottomArrowRef = useRef<HTMLButtonElement>(null)
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrent(+event.currentTarget.value)
  }
  const handleScroll = () => {
    if (columnRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = columnRef.current
      if (scrollTop < 10) {
        topSmoothRef.current!.style.opacity = '0'
        topArrowRef.current!.classList.remove(styles['arrow_top_show'])
        topArrowRef.current!.classList.add(styles['arrow_top_hide'])
      } else {
        topSmoothRef.current!.style.opacity = '1'
        topArrowRef.current!.classList.remove(styles['arrow_top_hide'])
        topArrowRef.current!.classList.add(styles['arrow_top_show'])
      }
      if (scrollTop + clientHeight + 10 >= scrollHeight) {
        bottomSmoothRef.current!.style.opacity = '0'
        bottomArrowRef.current!.classList.remove(styles['arrow_bottom_show'])
        bottomArrowRef.current!.classList.add(styles['arrow_bottom_hide'])
      } else {
        bottomSmoothRef.current!.style.opacity = '1'
        bottomArrowRef.current!.classList.remove(styles['arrow_bottom_hide'])
        bottomArrowRef.current!.classList.add(styles['arrow_bottom_show'])
      }
    }
  }
  useEffect(() => {
    const columnElement = columnRef.current;
    if (columnElement) {
      columnElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (columnElement) {
        columnElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [])
  
  const handleNext = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrent(prev => (prev + 1) % imgs.length)
  }

  const handlePrev = (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      setCurrent(prev => (prev - 1 + imgs.length) % imgs.length)
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.img_current}>
        <img 
          key={imgs[current].picture_path}
          src={`http://127.0.0.1:8002${imgs[current].picture_path}`} 
          alt=''
          // fill
          // priority
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        </div>
        <ul className={styles.img_group} ref={columnRef}>
          {imgs.map((img, i) => (<div key={img.picture_path}>
            <input
              value={i}
              type="radio" 
              id={`img-${i}`} 
              name="carousel" 
              className={styles.customcheckbox}
              checked={i === current}
              onChange={handleImageChange}
            />
            <label htmlFor={`img-${i}`} className={styles.group_element}>
              <div className={styles.imgholder}>
                <img
                  src={`http://127.0.0.1:8002${img.picture_path}`} 
                  alt=''
                  // fill
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
            </label>
          </div>))}
        </ul>
        <div className={styles.fade_overlay_top} ref={topSmoothRef}/>
        <div className={styles.fade_overlay_bottom} ref={bottomSmoothRef}/>
        <button onClick={handlePrev} className={styles.arrow_top_hide} ref={topArrowRef}>
          <Image width={36} height={36} alt='' src={arrowUp}/>
        </button>
        <button onClick={handleNext} className={styles.arrow_bottom_show} ref={bottomArrowRef}>
          <Image width={36} height={36} alt='' src={arrowDown}/>
        </button>
      </div>
    </div>
  )
}

export default Carousel