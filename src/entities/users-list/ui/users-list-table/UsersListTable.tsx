import React from 'react'

import { SettingsTable } from '@/entities/users-list'
import { GetUsersListQuery } from '@/entities/users-list/api/usersListApi.generated'
import {
  BanIcon,
  DeleteUserIcon,
  FilterIcon,
  MoreHorizontal,
  Nullable,
  PRODUCTION_PATH,
  useTranslation,
} from '@/shared'
import { BlockStatus } from '@/shared/api/generated/types.generated'
import {
  Body,
  Cell,
  DropDownMenu,
  Head,
  HeadCell,
  Pagination,
  Root,
  Row,
  SelectBox,
  Typography,
} from '@belozerov-egor/ui-libs'
import Link from 'next/link'

import s from './UsersListTable.module.scss'

type Props = {
  data: GetUsersListQuery | undefined
  pageNumber: number
  pageSize: number
  setBlockStatus: (value: Nullable<BlockStatus.Blocked>) => void
  setPageNumber: (value: number) => void
  setPageSize: (value: number) => void
}

const paginationOptions = [{ value: 5 }, { value: 10 }, { value: 20 }]

export const UsersListTable = (props: Props) => {
  const { data, pageNumber, pageSize, setBlockStatus, setPageNumber, setPageSize } = props
  const users = data?.getUsers.users
  const pagination = data?.getUsers.pagination
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
          <Typography className={s.userId} variant={'bold14'}>
            {user.userBan && <BanIcon />}
            {user.id}
          </Typography>
        </Cell>
        <Cell>
          <Typography variant={'bold14'}>{user.userName}</Typography>
        </Cell>
        <Cell>
          <Link className={s.link} href={`${PRODUCTION_PATH.USER}/${user.id}`}>
            <Typography variant={'bold14'}>{user.userName}</Typography>{' '}
          </Link>
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
      <SettingsTable setBlockStatus={setBlockStatus} />
      <Root className={s.table}>
        <Head>
          <Row>{headTable}</Row>
        </Head>
        <Body>{tableData}</Body>
      </Root>
      <div className={s.pagination}>
        <Pagination
          count={pagination?.pagesCount ?? 1}
          onChange={setPageNumber}
          page={pageNumber}
        />
        <Typography variant={'regular14'}>{t.usersList.paginationSelect.show}</Typography>
        <SelectBox
          className={s.selectPagination}
          defaultValue={pageSize}
          onValueChange={setPageSize}
          options={paginationOptions}
        />
        <Typography variant={'regular14'}>{t.usersList.paginationSelect.onPage}</Typography>
      </div>
    </div>
  )
}
