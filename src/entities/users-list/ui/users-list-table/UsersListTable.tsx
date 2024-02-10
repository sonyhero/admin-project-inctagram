import React, { useState } from 'react'

import { GetUsersListQuery } from '@/entities/users-list/api/usersListApi.generated'
import { RemoveUserModal } from '@/features'
import { BanUserModal } from '@/features/ban-user'
import { useUnBanMutation } from '@/features/ban-user/api/banUserApi.generated'
import {
  BanIcon,
  DeleteUserIcon,
  FilterIcon,
  MoreHorizontal,
  Nullable,
  PATH,
  PRODUCTION_PATH,
  UnBanIcon,
  getNumericDayMonthTime,
  useTranslation,
} from '@/shared'
import { PaginationWidget } from '@/widgets'
import {
  Body,
  Cell,
  DropDownMenu,
  Head,
  HeadCell,
  Root,
  Row,
  Typography,
} from '@belozerov-egor/ui-libs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import s from './UsersListTable.module.scss'

type Props = {
  data?: GetUsersListQuery | undefined
  handleSort: (value: string) => void
  pageNumber: number
  pageSize: number
  pagesCount?: number
  refetchData: () => void
  setPageNumber: (value: number) => void
  setPageSize: (value: number) => void
  users?: {
    createdAt: any
    id: number
    userBan?: Nullable<{ createdAt: any; reason: string }>
    userName: string
  }[]
}

export const UsersListTable = (props: Props) => {
  const {
    handleSort,
    pageNumber,
    pageSize,
    pagesCount,
    refetchData,
    setPageNumber,
    setPageSize,
    users,
  } = props

  const { t } = useTranslation()
  const { locale, push } = useRouter()

  const [banModalOpen, setBanModalOpen] = useState<boolean>(false)
  const [removeModalOpen, setRemoveModalOpen] = useState<boolean>(false)

  const [currentUser, setCurrentUser] =
    useState<Nullable<{ userId: number; userName: string }>>(null)

  const [unBanMutation] = useUnBanMutation()

  const openBanModalHandler = () => {
    setBanModalOpen(true)
  }

  const openRemoveModalHandler = () => {
    setRemoveModalOpen(true)
  }

  const headOptions = [
    { headText: t.usersList.userId, sortByKey: 'id' },
    { headText: t.usersList.userName, sortByKey: 'userName' },
    { headText: t.usersList.profileLink, sortByKey: '' },
    { headText: t.usersList.dateAdded, sortByKey: 'createdAt' },
    { headText: '', sortByKey: '' },
  ]

  const headTable = headOptions.map((option, index) => {
    const onClickHandler = () => !!option.sortByKey && handleSort(option.sortByKey)

    return (
      <HeadCell key={index}>
        <div className={s.headItem} onClick={onClickHandler}>
          <Typography className={s.headItemText} variant={'bold14'}>
            {option.headText}
          </Typography>
          {!!option.sortByKey && <FilterIcon />}
        </div>
      </HeadCell>
    )
  })

  const tableData = users?.map(user => {
    const unBanUserHandler = () => {
      NProgress.start()
      unBanMutation({
        variables: {
          userId: user.id,
        },
      })
        .then(() => {
          refetchData()
          NProgress.done()
        })
        .catch(() => {
          console.log('error')
        })
    }
    const linkToProfileInformation = () => {
      push(`${PATH.USERS}/${user.id}`)
    }
    const dropDownMenuSize = [
      {
        component: (
          <div className={s.itemActivity} onClick={openRemoveModalHandler}>
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
          <div
            className={s.itemActivity}
            onClick={user.userBan ? unBanUserHandler : openBanModalHandler}
          >
            {user.userBan ? <UnBanIcon /> : <BanIcon />}
            <Typography color={'primary'} variant={'regular14'}>
              {user.userBan ? 'Unban' : 'Ban'} in the system
            </Typography>
          </div>
        ),
        id: 2,
      },
      {
        component: (
          <div className={s.itemActivity} onClick={linkToProfileInformation}>
            <MoreHorizontal />
            <Typography color={'primary'} variant={'regular14'}>
              More Information
            </Typography>
          </div>
        ),
        id: 3,
      },
    ]
    const onSetCurrentUserHandler = () =>
      setCurrentUser({ userId: user.id, userName: user.userName })

    const createAt = getNumericDayMonthTime(user.createdAt, locale as string)

    return (
      <Row key={user.id}>
        <Cell>
          <Typography className={s.userId} variant={'bold14'}>
            {user.id}
            {user.userBan && <BanIcon />}
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
          <Typography variant={'bold14'}>{createAt}</Typography>
        </Cell>
        <Cell>
          <DropDownMenu
            align={'end'}
            isOpenAfterItemClick={false}
            items={dropDownMenuSize}
            onItemClick={onSetCurrentUserHandler}
            side={'bottom'}
            trigger={<MoreHorizontal />}
          />
        </Cell>
      </Row>
    )
  })

  return (
    <>
      <Root className={s.table}>
        <Head>
          <Row>{headTable}</Row>
        </Head>
        <Body>{tableData}</Body>
      </Root>
      <PaginationWidget
        pageNumber={pageNumber}
        pageSize={pageSize}
        pagesCount={pagesCount}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
      />
      <BanUserModal
        currentUser={currentUser}
        onClose={setBanModalOpen}
        open={banModalOpen}
        refetchData={refetchData}
      />
      <RemoveUserModal
        currentUser={currentUser}
        onClose={setRemoveModalOpen}
        open={removeModalOpen}
        refetchData={refetchData}
      />
    </>
  )
}
