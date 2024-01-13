import React from 'react'

import { SettingsTable } from '@/entities/users-list'
import { BanIcon, DeleteUserIcon, FilterIcon, MoreHorizontal, useTranslation } from '@/shared'
import {
  Body,
  Cell,
  DropDownMenu,
  Head,
  HeadCell,
  Pagination,
  Root,
  Row,
  Typography,
} from '@belozerov-egor/ui-libs'
import { useRouter } from 'next/router'

import s from './UsersListTable.module.scss'

export const UsersListTable = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const headOptions = [
    t.usersList.userId,
    t.usersList.userName,
    t.usersList.profileLink,
    t.usersList.dateAdded,
    '',
  ]
  const data = [
    { dateAdded: 'test', id: 1, profileLink: 'test', userId: '21331QErQe21', userName: 'test' },
    { dateAdded: 'test', id: 2, profileLink: 'test', userId: '21331QErQe21', userName: 'test' },
  ]
  const headTable = headOptions.map((option, index) => (
    <HeadCell key={index}>
      <div className={s.headItem}>
        <Typography className={s.headItemText} variant={'bold14'}>
          {option}
        </Typography>
        {option !== '' && <FilterIcon />}
      </div>
      {/*<ArrowUp />*/}
      {/*<ArrowDown />*/}
    </HeadCell>
  ))
  const dropDownMenuSize = [
    {
      component: (
        <div className={s.itemActivity}>
          <DeleteUserIcon />
          <Typography color={'primary'} variant={'regular14'}>
            Delete User
          </Typography>
        </div>
      ),
      id: 1,
    },
    {
      component: (
        <div className={s.itemActivity}>
          <BanIcon />
          <Typography color={'primary'} variant={'regular14'}>
            Ban in the system
          </Typography>
        </div>
      ),
      id: 2,
    },
    {
      component: (
        <div className={s.itemActivity}>
          <MoreHorizontal />
          <Typography color={'primary'} variant={'regular14'}>
            More Information
          </Typography>
        </div>
      ),
      id: 3,
    },
  ]
  const tableData = data.map((item, index) => {
    return (
      <Row key={index}>
        <Cell>
          <Typography variant={'bold14'}>{item.userId}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'bold14'}>{item.userName}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'bold14'}>${item.profileLink}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'bold14'}>{item.dateAdded}</Typography>
        </Cell>
        <Cell>
          <DropDownMenu
            align={'end'}
            items={dropDownMenuSize}
            side={'bottom'}
            trigger={<MoreHorizontal />}
          />
        </Cell>
      </Row>
    )
  })

  return (
    <div className={s.usersList}>
      <SettingsTable />
      <Root className={s.table}>
        <Head>
          <Row>{headTable}</Row>
        </Head>
        <Body>{tableData}</Body>
      </Root>
      <Pagination count={1} onChange={() => {}} page={10} />
    </div>
  )
}
