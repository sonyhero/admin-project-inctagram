import React from 'react'

import { ArrowIosBack, ArrowIosForward } from '@belozerov-egor/ui-libs'

import s from './PhotoPagination.module.scss'

type Props = {
  activeIndex: number
  changePhotoIndex: (index: number) => void
  changePhotoNext: () => void
  changePhotoPrev: () => void
  photosArr?: any[]
}

export const PhotoPagination = (props: Props) => {
  const { activeIndex, changePhotoIndex, changePhotoNext, changePhotoPrev, photosArr } = props

  return photosArr ? (
    <>
      {activeIndex > 0 && (
        <div className={s.back} onClick={changePhotoPrev}>
          <ArrowIosBack />
        </div>
      )}
      {photosArr.length >= 2 && (
        <div className={s.carouselPagination}>
          {photosArr.map((_, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === activeIndex}
              className={`${s.paginationIndicator} ${index === activeIndex ? s.active : ''}`}
              key={index}
              onClick={() => changePhotoIndex(index)}
            ></button>
          ))}
        </div>
      )}
      {activeIndex < photosArr.length - 1 && (
        <div className={s.forvard} onClick={changePhotoNext}>
          <ArrowIosForward />
        </div>
      )}
    </>
  ) : null
}
