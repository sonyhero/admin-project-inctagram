import React from 'react'

import { useGetProfileQuery } from '@/entities/profile/api/profileApi.generated'
import { PRODUCTION_PATH, getNumericDayMonthTime } from '@/shared'
import { AvatarOwner } from '@/widgets'
import { Typography } from '@belozerov-egor/ui-libs'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './ProfileInfo.module.scss'

export const ProfileInfo = () => {
  const { locale, query } = useRouter()
  const userId = Number(query.id)

  const { data } = useGetProfileQuery({
    variables: {
      userId,
    },
  })

  const firstName = data?.getUser.profile.firstName
  const lastName = data?.getUser.profile.lastName
  const userName = data?.getUser.profile.userName
  const createdAt = data?.getUser.profile.createdAt
  const avatar = data?.getUser.profile.avatars?.[0]?.url
  const userID = data?.getUser.profile.id

  return (
    <div className={s.mainInfo}>
      <div className={s.avaAndName}>
        <AvatarOwner avatarOwner={avatar} height={60} width={60} />
        <div>
          <Typography variant={'h1'}>
            {firstName} {lastName}
          </Typography>
          <Link href={`${PRODUCTION_PATH.USER}/${userID}`}>{userName}</Link>
        </div>
      </div>

      <div className={s.userIdWrapper}>
        <div className={s.item}>
          <Typography color={'secondary'} variant={'regular14'}>
            UserID
          </Typography>
          <Typography variant={'regular16'}>{userID}</Typography>
        </div>
        <div className={s.item}>
          <Typography color={'secondary'} variant={'regular14'}>
            Profile Creation Date
          </Typography>
          <Typography variant={'regular16'}>
            {getNumericDayMonthTime(createdAt, locale as string, true)}
          </Typography>
        </div>
      </div>
    </div>
  )
}
