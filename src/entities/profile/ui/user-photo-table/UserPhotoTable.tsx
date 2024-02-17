import React from 'react'

import { useGetProfilePostImagesQuery } from '@/entities/profile/api/profileImagesApi.generated'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './UserPhotoTable.module.scss'

import imageIcon from '/public/imageIcon.svg'

export const UserPhotoTable = () => {
  const { query } = useRouter()
  const userId = Number(query.id)

  const { data } = useGetProfilePostImagesQuery({
    variables: {
      userId,
    },
  })

  const mappedPosts = data?.getPostsByUser.items
    ?.filter(img => img.width === 1440)
    .slice(0, 4)
    .map(post => {
      return (
        <div key={post.id}>
          <Image
            alt={'post picture'}
            className={s.post}
            height={200}
            priority
            src={post.url ?? imageIcon}
            width={200}
          />
        </div>
      )
    })

  return <div className={s.postsBlock}>{mappedPosts}</div>
}
