import React from 'react'

import { SettingsTable } from '@/entities/users-list'
import { GetUsersListQuery } from '@/entities/users-list/api/usersListApi.generated'
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
type PropsType = {
  data: GetUsersListQuery | undefined
}
export const UsersListTable = ({ data }: PropsType) => {
  const users = data?.getUsers.users
  const pagination = data?.getUsers.pagination
  const { locale } = useRouter()
  const { t } = useTranslation()
  const headOptions = [
    t.usersList.userId,
    t.usersList.userName,
    t.usersList.profileLink,
    t.usersList.dateAdded,
    '',
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
  const tableData = users?.map(user => {
    return (
      <Row key={user.id}>
        <Cell>
          {user.userBan && <BanIcon />}
          <Typography variant={'bold14'}>{user.id}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'bold14'}>{user.userName}</Typography>
        </Cell>
        <Cell>
          {/*тут нечего вставить кроме этого*/}
          <Typography variant={'bold14'}>${user.userName}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'bold14'}>
            {new Date(user.createdAt).toLocaleDateString('ru-RU')}
          </Typography>
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
      <Pagination count={pagination?.pagesCount ?? 1} onChange={() => {}} page={1} />
    </div>
  )
}
