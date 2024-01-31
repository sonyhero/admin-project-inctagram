import React from 'react'

import { useGetProfileQuery } from '@/entities/profile/api/profileApi.generated'
import { PRODUCTION_PATH, getNumericDayMonthTime } from '@/shared'
import { usePostImagePagination } from '@/shared/hooks'
import { PhotoPagination } from '@/shared/ui'
import { AvatarOwner } from '@/widgets'
import { Typography } from '@belozerov-egor/ui-libs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Post.module.scss'

type Props = {
  createdAt: string
  description: string
  images: { height: number; url: string; width: number }[]
  ownerId: number
}

export const Post = (props: Props) => {
  const { createdAt, description, images, ownerId } = props
  const { locale } = useRouter()

  const { data: profile } = useGetProfileQuery({
    variables: {
      userId: ownerId,
    },
  })

  const createAtDate = getNumericDayMonthTime(Number(createdAt), locale as string)

  const { activeImage, activeIndex, filterImages, nextImage, prevImage, setActiveIndex } =
    usePostImagePagination({ images })

  return (
    <div className={s.postWrapper}>
      <div className={s.photoBlock}>
        {/*<Link href={`${PATH.USER}/${ownerId}/${id}`}>*/}
        <Image alt={'post picture'} height={240} priority src={activeImage} width={240} />{' '}
        {/*</Link>*/}
        <PhotoPagination
          activeIndex={activeIndex}
          changePhotoIndex={setActiveIndex}
          changePhotoNext={nextImage}
          changePhotoPrev={prevImage}
          photosArr={filterImages}
        />
      </div>
      <div className={s.urlAndAvatar}>
        <AvatarOwner avatarOwner={profile?.getProfileInfo?.profile?.avatars?.[0]?.url} />
        <Link className={s.link} href={`${PRODUCTION_PATH.USER}/${ownerId}`}>
          <Typography color={'primary'} variant={'h3'}>
            URL-Profile
          </Typography>
        </Link>
      </div>
      <Typography color={'secondary'} variant={'small'}>
        {createAtDate}
      </Typography>
      <Typography className={s.description} color={'primary'} variant={'regular14'}>
        {description}
      </Typography>
    </div>
  )
}
