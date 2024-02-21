import { Nullable } from '@/shared'
import imageIcon from 'public/imageIcon.svg'

import { useChangePhotoDirection } from './useModalImagePagination'

type Props = {
  images?: Nullable<
    {
      height?: Nullable<number>
      url?: Nullable<string>
      width?: Nullable<number>
    }[]
  >
  isFilter?: boolean
}

export const usePostImagePagination = ({ images, isFilter = true }: Props) => {
  const filterImages = isFilter ? images?.filter(img => img.width === 1440) : images

  const { activeIndex, nextImage, prevImage, setActiveIndex } = useChangePhotoDirection({
    array: filterImages,
  })

  const activeImage = (filterImages && filterImages[activeIndex]?.url) ?? imageIcon

  return { activeImage, activeIndex, filterImages, nextImage, prevImage, setActiveIndex }
}
