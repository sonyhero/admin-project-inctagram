import { useState } from 'react'

import imageIcon from 'public/imageIcon.svg'

type PostType = {
  filter: string
  height: number
  id: string
  imageUrl: string
  name: string
  size: number
  type: string
  // sizeScale: SizeType
  width: number
  zoom: number[]
}

type Props = {
  images: PostType[]
}

export const useModalImagePagination = ({ images }: Props) => {
  const { activeIndex, nextImage, prevImage, setActiveIndex } = useChangePhotoDirection({
    array: images,
  })

  const imageSrc = (images && images[activeIndex]?.imageUrl) ?? imageIcon

  const currentImage = images && images[activeIndex]

  return { activeIndex, currentImage, imageSrc, nextImage, prevImage, setActiveIndex }
}

type PropsType = {
  array?: any[]
}

export const useChangePhotoDirection = ({ array }: PropsType) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextImage = () => {
    if (array && array.length > 0 && activeIndex < array.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }

  const prevImage = () => {
    if (array && array.length > 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  return {
    activeIndex,
    nextImage,
    prevImage,
    setActiveIndex,
  }
}
