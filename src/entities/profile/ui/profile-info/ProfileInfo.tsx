import React from 'react'

import { GetProfileQuery } from '@/entities/profile/api/profileApi.generated'
import { getNumericDayMonthTime } from '@/shared'
import { Typography } from '@belozerov-egor/ui-libs'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './ProfileInfo.module.scss'

type Props = {
  data: GetProfileQuery
}

export const ProfileInfo = (props: Props) => {
  const { data } = props
  const { locale } = useRouter()

  const firstName = data?.getProfileInfo.profile.firstName
  const lastName = data?.getProfileInfo.profile.lastName
  const userName = data?.getProfileInfo.profile.userName
  const createdAt = data?.getProfileInfo.profile.createdAt
  const avatar = data?.getProfileInfo.profile.avatars?.[0]?.url ?? ''
  const userID = data?.getProfileInfo.profile.id

  return (
    <div className={s.mainInfo}>
      <div className={s.avaAndName}>
        <Image alt={'avatar'} className={s.avatar} height={60} src={avatar} width={60} />
        <div>
          <Typography variant={'h1'}>
            {firstName} {lastName}
          </Typography>
          <Typography className={s.userName} variant={'regular14'}>
            {userName}
          </Typography>
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
