import React, { useEffect, useState } from 'react'

import { useGetAllPaymentsQuery } from '@/entities/payments-list/api/paymentsListApi.generated'
import { PaymentsListTable } from '@/entities/payments-list/ui/payments-list-table'
import { useDebounce, useTableSort, useTranslation } from '@/shared'
import { TextField } from '@belozerov-egor/ui-libs'

export const PaymentsList = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [search, setSearch] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { handleSort, sort } = useTableSort({ initialKey: 'createdAt' })
  const { t } = useTranslation()

  const { data } = useGetAllPaymentsQuery({
    variables: {
      pageNumber,
      pageSize,
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

  return (
    <>
      <TextField
        onChangeText={setSearch}
        onSearchClear={handleClearSearch}
        placeholder={t.usersList.search}
        type={'searchType'}
        value={search}
      />
      <PaymentsListTable
        data={data}
        handleSort={handleSort}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
      />
    </>
  )
}
