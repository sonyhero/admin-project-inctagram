import React, { useState } from 'react'

import { GetUsersListQuery } from '@/entities/users-list/api/usersListApi.generated'
import { useBanUserMutation, useUnBanMutation } from '@/features/ban-user/api/banUserApi.generated'
import {
  BanIcon,
  DeleteUserIcon,
  FilterIcon,
  MoreHorizontal,
  Nullable,
  PATH,
  PRODUCTION_PATH,
  UnBanIcon,
  useTranslation,
} from '@/shared'
import {
  Body,
  Cell,
  DropDownMenu,
  Head,
  HeadCell,
  Modal,
  Pagination,
  Root,
  Row,
  SelectBox,
  Typography,
} from '@belozerov-egor/ui-libs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import s from './UsersListTable.module.scss'

type Props = {
  data: GetUsersListQuery | undefined
  handleSort: (value: string) => void
  pageNumber: number
  pageSize: number
  refetchData: () => void
  setPageNumber: (value: number) => void
  setPageSize: (value: number) => void
}

const paginationOptions = [{ value: 5 }, { value: 10 }, { value: 20 }]

export const UsersListTable = (props: Props) => {
  const { data, handleSort, pageNumber, pageSize, refetchData, setPageNumber, setPageSize } = props
  const users = data?.getUsers.users
  const pagination = data?.getUsers.pagination
  const { t } = useTranslation()
  const { push } = useRouter()

  const [modalOpen, setOpenModal] = useState<boolean>(false)
  const [currentUser, setCurrentUser] =
    useState<Nullable<{ userId: number; userName: string }>>(null)
  const [reasonToBan, setReasonToBan] = useState<string>('')
  const [banUserMutation] = useBanUserMutation()
  const [unBanMutation] = useUnBanMutation()

  const openModalHandler = () => {
    setOpenModal(true)
  }

  const closeModalHandler = () => {
    setOpenModal(false)
  }

  const banUserHandler = () => {
    if (currentUser) {
      NProgress.start()
      banUserMutation({
        variables: {
          banReason: reasonToBan,
          userId: currentUser.userId,
        },
      })
        .then(() => {
          NProgress.done()
          refetchData()
          closeModalHandler()
        })
        .catch(() => {
          console.log('error')
        })
    }
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

  const reasonsToBan = [
    { value: 'Bad behavior' },
    { value: 'Advertising placement' },
    { value: 'Another reason' },
  ]

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
          <div
            className={s.itemActivity}
            onClick={user.userBan ? unBanUserHandler : openModalHandler}
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

      <Modal
        buttonBlockClassName={s.buttonBlock}
        callBack={banUserHandler}
        onClose={closeModalHandler}
        open={modalOpen}
        showCloseButton
        title={'Ban user'}
        titleFirstButton={'Yes'}
        titleSecondButton={'No'}
      >
        <div className={s.modalContentBlock}>
          <Typography variant={'regular16'}>
            Are you sure to ban this user, {currentUser?.userName}?
          </Typography>
          <div className={s.selectBlock}>
            <SelectBox
              onValueChange={setReasonToBan}
              options={reasonsToBan}
              placeholder={'Reasons to ban'}
              selectContentClassName={s.selectContent}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
