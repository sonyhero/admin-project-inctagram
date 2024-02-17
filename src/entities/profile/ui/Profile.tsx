import React, { useCallback, useState } from 'react'

import { ProfileInfo } from '@/entities/profile/ui/profile-info'
import { UserPaymentsTable } from '@/entities/profile/ui/user-payments-table'
import { UserPhotoTable } from '@/entities/profile/ui/user-photo-table'
import { PATH } from '@/shared'
import { ArrowBack, TabSwitcher, Typography } from '@belozerov-egor/ui-libs'
import Link from 'next/link'

import s from './Profile.module.scss'

const optionsTab = [
  {
    description: 'Uploaded photos',
    disabled: false,
    id: 1,
    value: 'Uploaded photos',
  },
  { description: 'Payments', disabled: false, id: 2, value: 'Payments' },
  {
    description: 'Followers',
    disabled: false,
    id: 3,
    value: 'Followers',
  },
  {
    description: 'Following',
    disabled: false,
    id: 4,
    value: 'Following',
  },
]

export const Profile = () => {
  const [activeTab, setActiveTab] = useState(optionsTab[0].value)

  const getActivePage = useCallback(() => {
    if (activeTab === 'Uploaded photos') {
      return <UserPhotoTable />
    } else if (activeTab === 'Payments') {
      return <UserPaymentsTable />
    } else if (activeTab === 'Followers') {
      return <div>Followers</div>
    } else if (activeTab === 'Following') {
      return <div>Following</div>
    }
  }, [activeTab])

  return (
    <div>
      <Link className={s.back} href={PATH.USERS}>
        <ArrowBack />
        <Typography variant={'medium14'}>Back to Users List</Typography>
      </Link>
      <ProfileInfo />
      <div className={s.tabs}>
        <TabSwitcher activeTab={activeTab} onChangeCallback={setActiveTab} options={optionsTab} />
      </div>

      {getActivePage()}
    </div>
  )
}
