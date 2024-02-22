import React, { useEffect, useState } from 'react'

import { useGetAllPaymentsQuery } from '@/entities/payments-list/api/paymentsListApi.generated'
import { PaymentsListTable } from '@/entities/payments-list/ui/payments-list-table'
import { useDebounce, useTableSort, useTranslation } from '@/shared'
import { TextField, Typography } from '@belozerov-egor/ui-libs'
import Image from 'next/image'
import NProgress from 'nprogress'

import loader from '../../../../public/loader.svg'

export const PaymentsList = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [search, setSearch] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { handleSort, sort } = useTableSort({ initialKey: 'createdAt' })
  const { t } = useTranslation()

  const { data, loading } = useGetAllPaymentsQuery({
    variables: {
      pageNumber,
      pageSize,
      searchTerm,
      sortBy: sort.key,
      sortDirection: sort.direction,
    },
  })

  const handleClearSearch = () => {
    setSearch('')
  }

  const debouncedValue = useDebounce<string>(search, 400)

  useEffect(() => {
    setSearchTerm(debouncedValue)
  }, [debouncedValue])

  if (typeof document !== 'undefined') {
    loading && NProgress.start()
    !loading && NProgress.done()
  }

  return (
    <>
      <TextField
        onChangeText={setSearch}
        onSearchClear={handleClearSearch}
        placeholder={t.usersList.search}
        type={'searchType'}
        value={search}
      />
      {!!data?.getPayments.items && (
        <PaymentsListTable
          data={data}
          handleSort={handleSort}
          pageNumber={pageNumber}
          pageSize={pageSize}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
        />
      )}
      {!loading && !data?.getPayments.items && (
        <Typography variant={'bold16'}>No Payments</Typography>
      )}
      {loading && <Image alt={'loader'} src={loader} />}

      {/*{false && (*/}
      {/*  <PaymentsListTable*/}
      {/*    data={data}*/}
      {/*    handleSort={handleSort}*/}
      {/*    pageNumber={pageNumber}*/}
      {/*    pageSize={pageSize}*/}
      {/*    setPageNumber={setPageNumber}*/}
      {/*    setPageSize={setPageSize}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{!true && !data?.getPayments.items && <Typography variant={'bold16'}>No Payments</Typography>}*/}
      {/*{true && <Image alt={'loader'} src={loader} />}*/}
    </>
  )
}
