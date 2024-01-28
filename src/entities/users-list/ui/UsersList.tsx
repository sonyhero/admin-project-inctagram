import React, { useEffect, useState } from 'react'

import { SettingsTable, UsersListTable } from '@/entities/users-list'
import { useGetUsersListQuery } from '@/entities/users-list/api/usersListApi.generated'
import { Nullable, useDebounce, useTableSort } from '@/shared'
import { BlockStatus } from '@/shared/api/generated/types.generated'
import NProgress from 'nprogress'

export const UsersList = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const { handleSort, sort } = useTableSort({ initialKey: 'id' })
  const [blockStatus, setBlockStatus] = useState<Nullable<BlockStatus.Blocked | undefined>>(null)

  const { data, loading, refetch } = useGetUsersListQuery({
    variables: {
      blockStatus,
      pageNumber,
      pageSize,
      searchTerm,
      sortBy: sort.key,
      sortDirection: sort.direction,
    },
  })

  useEffect(() => {
    refetch().then(() => {
      setBlockStatus(blockStatus)
    })
  }, [blockStatus, refetch])

  const debouncedValue = useDebounce<string>(search, 400)

  const handleClearSearch = () => {
    setSearch('')
  }

  useEffect(() => {
    setSearchTerm(debouncedValue)
  }, [debouncedValue])

  if (typeof document !== 'undefined') {
    loading && NProgress.start()
    !loading && NProgress.done()
  }

  return (
    <>
      <SettingsTable
        onChangeText={setSearch}
        onSearchClear={handleClearSearch}
        setBlockStatus={setBlockStatus}
        textValue={search}
      />

      <UsersListTable
        data={data}
        handleSort={handleSort}
        pageNumber={pageNumber}
        pageSize={pageSize}
        refetchData={refetch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
      />
    </>
  )
}
