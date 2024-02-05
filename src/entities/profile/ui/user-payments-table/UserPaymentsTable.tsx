import React, { useState } from 'react'

import { useGetListPaymentsByIdQuery } from '@/entities/profile/api/profileApi.generated'
import { FilterIcon, getNumericDayMonthTime, useTableSort, useTranslation } from '@/shared'
import {
  Body,
  Cell,
  Head,
  HeadCell,
  Pagination,
  Root,
  Row,
  SelectBox,
  Typography,
} from '@belozerov-egor/ui-libs'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import s from './UserPaymentsTable.module.scss'

const paginationOptions = [{ value: 5 }, { value: 10 }, { value: 20 }]

export const UserPaymentsTable = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)

  const { handleSort, sort } = useTableSort({ initialKey: 'dateOfPayment' })
  const { t } = useTranslation()
  const { locale, query } = useRouter()
  const userId = Number(query.id)

  const { data, loading } = useGetListPaymentsByIdQuery({
    variables: {
      pageNumber,
      pageSize,
      sortBy: sort.key,
      sortDirection: sort.direction,
      userId,
    },
  })

  const pagesCount = data?.getListPaymentsById.pagesCount
  const pageData = data?.getListPaymentsById.items

  const headOptions = [
    { headText: t.user.paymentsTable.dateOfPayment, sortByKey: 'dateOfPayment' },
    { headText: t.user.paymentsTable.endOfSubscriptions, sortByKey: 'endOfSubscriptions' },
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

  const paymentsTableData = pageData?.map((payment, index) => {
    const dateOfPaymentCell = getNumericDayMonthTime(payment.dateOfPayment, locale as string)

    const endDateOfSubscriptionCell = getNumericDayMonthTime(payment.endDate, locale as string)

    return (
      <Row key={index}>
        <Cell>
          <Typography variant={'regular14'}>{dateOfPaymentCell}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'regular14'}>{endDateOfSubscriptionCell}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'regular14'}>${payment.price}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'regular14'}>{payment.type}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'regular14'}>{payment.paymentType}</Typography>
        </Cell>
      </Row>
    )
  })

  if (typeof document !== 'undefined') {
    loading && NProgress.start()
    !loading && NProgress.done()
  }

  return (
    <div>
      <Root>
        <Head>
          <Row>{headTable}</Row>
        </Head>
        <Body>{paymentsTableData}</Body>
      </Root>
      <div className={s.pagination}>
        <Pagination count={pagesCount ?? 1} onChange={setPageNumber} page={pageNumber} />
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
