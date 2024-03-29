import React, { useState } from 'react'

import { useGetProfileQuery } from '@/entities/profile/api/profileApi.generated'
import { BanUserModal } from '@/features/ban-user'
import { BanIcon, Nullable, PRODUCTION_PATH, getNumericDayMonthTime } from '@/shared'
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
  id: number
  images?: Nullable<
    {
      height?: Nullable<number>
      url?: Nullable<string>
      width?: Nullable<number>
    }[]
  >

  ownerId: number
}

export const Post = (props: Props) => {
  const { createdAt, description, id, images, ownerId } = props
  const { locale } = useRouter()
  const [showMore, setShowMore] = useState<boolean>(false)
  const [banModalOpen, setBanModalOpen] = useState<boolean>(false)

  const { data: profile } = useGetProfileQuery({
    variables: {
      userId: ownerId,
    },
  })

  const userName = profile?.getUser.profile.userName ?? 'URLProfile'

  const createAtDate = getNumericDayMonthTime(createdAt, locale as string)

  const { activeImage, activeIndex, filterImages, nextImage, prevImage, setActiveIndex } =
    usePostImagePagination({ images })

  const openBanModalHandler = () => {
    setBanModalOpen(true)
  }

  const collapseHandler = () => {
    setShowMore(!showMore)
  }

  return (
    <div className={s.postWrapper}>
      <div className={`${s.photoBlock} ${showMore && s.collapsePhotoBlock}`}>
        <Link href={`${PRODUCTION_PATH.USER}/${ownerId}/${id}`}>
          <Image
            alt={'post picture'}
            className={`${s.postImage} ${showMore && s.collapsePostImage}`}
            height={200}
            priority
            src={activeImage}
            width={200}
          />{' '}
        </Link>
        <PhotoPagination
          activeIndex={activeIndex}
          changePhotoIndex={setActiveIndex}
          changePhotoNext={nextImage}
          changePhotoPrev={prevImage}
          photosArr={filterImages}
        />
      </div>
      <div className={s.postOwnerBlock}>
        <div className={s.urlAndAvatar}>
          <AvatarOwner avatarOwner={profile?.getUser?.profile?.avatars?.[0]?.url} />
          <Link className={s.link} href={`${PRODUCTION_PATH.USER}/${ownerId}`}>
            <Typography color={'primary'} variant={'h3'}>
              {userName}
            </Typography>
          </Link>
        </div>
        <BanIcon className={s.banIcon} onClick={openBanModalHandler} />
      </div>
      <Typography color={'secondary'} variant={'small'}>
        {createAtDate}
      </Typography>
      <Typography className={s.description} color={'primary'} variant={'regular14'}>
        {showMore ? description.trim().substring(0, 240) : description.trim().substring(0, 90)}
      </Typography>
      {description.trim().length > 90 && (
        <Typography onClick={collapseHandler} variant={'link'}>
          ...{showMore ? 'Hide' : 'Show more'}
        </Typography>
      )}
      <BanUserModal
        currentUser={{ userId: ownerId, userName }}
        isBanModal
        onClose={setBanModalOpen}
        open={banModalOpen}
      />
    </div>
  )
}
