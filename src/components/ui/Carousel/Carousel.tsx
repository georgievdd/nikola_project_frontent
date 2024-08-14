'use client'
import React, {ChangeEvent, LegacyRef, useEffect, useRef, useState} from 'react'

import Image from 'next/image'

import PictureWithBlur from 'components/ui/PictureWithBlur/PictureWithBlur'
import {Picture} from 'entity/House'
import arrowDown from 'images/arrow-down.svg'
import arrowUp from 'images/arrow-up.svg'
import {scrollToCenter} from 'src/helpers'

const css = require('src/helpers').importStyles(
  require('./Carousel.module.scss'),
)
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
      const {scrollTop, scrollHeight, clientHeight} = columnRef.current
      if (scrollTop < 10) {
        topSmoothRef.current!.style.opacity = '0'
        topArrowRef.current!.classList.remove(css`arrow_top_show`)
        topArrowRef.current!.classList.add(css`arrow_top_hide`)
      } else {
        topSmoothRef.current!.style.opacity = '1'
        topArrowRef.current!.classList.remove(css`arrow_top_hide`)
        topArrowRef.current!.classList.add(css`arrow_top_show`)
      }
      if (scrollTop + clientHeight + 10 >= scrollHeight) {
        bottomSmoothRef.current!.style.opacity = '0'
        bottomArrowRef.current!.classList.remove(css`arrow_bottom_show`)
        bottomArrowRef.current!.classList.add(css`arrow_bottom_hide`)
      } else {
        bottomSmoothRef.current!.style.opacity = '1'
        bottomArrowRef.current!.classList.remove(css`arrow_bottom_hide`)
        bottomArrowRef.current!.classList.add(css`arrow_bottom_show`)
      }
    }
  }

  const handleNext = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrent((prev) => (prev + 1) % imgs.length)
  }

  const handlePrev = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrent((prev) => (prev - 1 + imgs.length) % imgs.length)
  }

  useEffect(() => {
    const columnElement = columnRef.current
    columnElement?.addEventListener('scroll', handleScroll)
    return () => {
      columnElement?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (columnRef.current) {
      const selectedElement = columnRef.current.children[
        current
      ] as HTMLLIElement
      scrollToCenter(selectedElement, columnRef.current)
    }
  }, [current])

  return (
    <div>
      <div className={css`container`}>
        <div className={css`img_current`}>
          <PictureWithBlur img={imgs[current]} />
        </div>
        <ul className={css`img_group`} ref={columnRef}>
          {imgs.map((img, i) => (
            <li key={img.picture}>
              <input
                value={i}
                type="radio"
                id={`img-${i}`}
                name="carousel"
                className={css`customcheckbox`}
                checked={i === current}
                onChange={handleImageChange}
              />
              <label htmlFor={`img-${i}`} className={css`group_element`}>
                <div className={css`imgholder`}>
                  <PictureWithBlur img={img} />
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div className={css`fade_overlay_top`} ref={topSmoothRef} />
        <div className={css`fade_overlay_bottom`} ref={bottomSmoothRef} />
        <button
          onClick={handlePrev}
          className={css`arrow_top_hide`}
          ref={topArrowRef}
        >
          <Image quality={100} width={36} height={36} alt="" src={arrowUp} />
        </button>
        <button
          onClick={handleNext}
          className={css`arrow_bottom_show`}
          ref={bottomArrowRef}
        >
          <Image quality={100} width={36} height={36} alt="" src={arrowDown} />
        </button>
      </div>
    </div>
  )
}

export default Carousel
