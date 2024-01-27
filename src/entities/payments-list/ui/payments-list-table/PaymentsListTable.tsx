import React from 'react'

import { GetAllPaymentsQuery } from '@/entities/payments-list/api/paymentsListApi.generated'
import { FilterIcon, useTranslation } from '@/shared'
import { AvatarOwner, PaginationWidget } from '@/widgets'
import { Body, Cell, Head, HeadCell, Root, Row, Typography } from '@belozerov-egor/ui-libs'
import { useRouter } from 'next/router'

import s from './PaymentsListTable.module.scss'

type Props = {
  data: GetAllPaymentsQuery | undefined
  handleSort: (value: string) => void
  pageNumber: number
  pageSize: number
  setPageNumber: (value: number) => void
  setPageSize: (value: number) => void
}

export const PaymentsListTable = (props: Props) => {
  const { data, handleSort, pageNumber, pageSize, setPageNumber, setPageSize } = props
  const { t } = useTranslation()
  const { locale } = useRouter()

  const payments = data?.getAllPayments.items
  const pagesCount = data?.getAllPayments.pagesCount

  const headOptions = [
    { headText: t.usersList.userName, sortByKey: 'userName' },
    { headText: t.usersList.dateAdded, sortByKey: 'createdAt' },
    { headText: t.user.paymentsTable.price, sortByKey: 'price' },
    { headText: t.user.paymentsTable.subscriptionType, sortByKey: 'subscriptionType' },
    { headText: t.user.paymentsTable.paymentType, sortByKey: 'paymentType' },
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

  const tableData = payments?.map(payment => {
    return (
      <Row key={payment.id}>
        <Cell className={s.user}>
          <AvatarOwner avatarOwner={payment.avatars?.[0]?.url} />
          <Typography variant={'bold14'}>{payment.userName}</Typography>
        </Cell>
        <Cell>{/*<Typography variant={'bold14'}>{date}</Typography>*/}</Cell>
        <Cell>
          <Typography variant={'bold14'}>${payment.amount}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'bold14'}>{payment.type}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'bold14'}>{payment.paymentMethod}</Typography>
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
    </>
  )
}
