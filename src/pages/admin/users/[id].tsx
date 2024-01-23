import React, { useCallback, useState } from 'react'

import { useGetProfileQuery } from '@/entities/profile/api/profileApi.generated'
import { PATH, getAuthLayout, getNumericDayMonthTime } from '@/shared'
import {
  ArrowIosBack,
  Body,
  Cell,
  Head,
  HeadCell,
  Pagination,
  Root,
  Row,
  SelectBox,
  TabSwitcher,
  Typography,
} from '@belozerov-egor/ui-libs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './User.module.scss'

const OptionsTab = [
  {
    description: 'Uploaded photos',
    disabled: false,
    id: 1,
    value: 'Uploaded photos',
  },
  { description: 'Devices', disabled: false, id: 2, value: 'Devices' },
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

const paginationOptions = [{ value: 5 }, { value: 10 }, { value: 20 }]

function UserPage() {
  const { locale, query } = useRouter()
  const userID = Number(query.id)
  const { data } = useGetProfileQuery({
    variables: {
      userID,
    },
  })
  const [activeTab, setActiveTab] = useState(OptionsTab[0].value)

  const firstName = data?.getProfileInfo.profile.firstName
  const lastName = data?.getProfileInfo.profile.lastName
  const userName = data?.getProfileInfo.profile.userName
  const createdAt = data?.getProfileInfo.profile.createdAt
  const avatar = data?.getProfileInfo.profile.avatars?.[0].url ?? ''

  console.log(avatar)

  const getActivePage = useCallback(() => {
    if (activeTab === 'Uploaded photos') {
      return <div>Uploaded photos</div>
    } else if (activeTab === 'Devices') {
      return (
        <div>
          <Root className={s.table}>
            <Head>
              <Row>
                <HeadCell>
                  <Typography variant={'bold14'}>Date of Payment</Typography>
                </HeadCell>
                <HeadCell>
                  <Typography variant={'bold14'}>End date of subscription</Typography>
                </HeadCell>
                <HeadCell>
                  <Typography variant={'bold14'}>Amount, $</Typography>
                </HeadCell>
                <HeadCell>
                  <Typography variant={'bold14'}>Subscription Type</Typography>
                </HeadCell>
                <HeadCell>
                  <Typography variant={'bold14'}>Payment Type</Typography>
                </HeadCell>
              </Row>
            </Head>
            <Body>
              <Row>
                <Cell>
                  <Typography variant={'bold14'}>12.12.2022</Typography>
                </Cell>
                <Cell>
                  <Typography variant={'bold14'}>12.12.2022</Typography>
                </Cell>
                <Cell>
                  <Typography variant={'bold14'}>$10</Typography>
                </Cell>
                <Cell>
                  <Typography variant={'bold14'}>1 day</Typography>
                </Cell>
                <Cell>
                  <Typography variant={'bold14'}>Stripe</Typography>
                </Cell>
              </Row>
            </Body>
          </Root>
          <div className={s.pagination}>
            <Pagination count={100} onChange={() => {}} page={1} />
            <Typography variant={'regular14'}>Show</Typography>
            <SelectBox
              className={s.selectPagination}
              defaultValue={10}
              onValueChange={() => {}}
              options={paginationOptions}
            />
            <Typography variant={'regular14'}>on Page</Typography>
          </div>
        </div>
      )
    } else if (activeTab === 'Followers') {
      return <div>Followers</div>
    } else if (activeTab === 'Following') {
      return <div>Following</div>
    }
  }, [activeTab])

  return (
    <div>
      <Link className={s.back} href={PATH.USERS}>
        <ArrowIosBack />
        <Typography variant={'medium14'}>Back to Users List</Typography>
      </Link>
      <div className={s.mainInfo}>
        <div className={s.avaAndName}>
          <Image alt={'avatar'} height={60} src={avatar} width={60} />
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
      <div style={{ marginBottom: '36px' }}>
        <TabSwitcher activeTab={activeTab} onChangeCallback={setActiveTab} options={OptionsTab} />
      </div>

      {getActivePage()}
    </div>
  )
}

export default UserPage
UserPage.getLayout = getAuthLayout
