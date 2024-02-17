import React, { useEffect, useState } from 'react'

import { SettingsTable, UsersListTable } from '@/entities/users-list'
import { useGetUsersListQuery } from '@/entities/users-list/api/usersListApi.generated'
import { Nullable, useDebounce, useTableSort } from '@/shared'
import { UserBlockStatus } from '@/shared/api/generated/types.generated'
import NProgress from 'nprogress'

export const UsersList = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const { handleSort, sort } = useTableSort({ initialKey: 'id' })
  const [blockStatus, setBlockStatus] = useState<Nullable<UserBlockStatus>>(null)

  const { data, loading, refetch } = useGetUsersListQuery({
    variables: {
      pageNumber,
      pageSize,
      searchTerm,
      sortBy: sort.key,
      sortDirection: sort.direction,
      statusFilter: blockStatus,
    },
  })

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
        pagesCount={data?.getUsers.pagination.pagesCount}
        refetchData={refetch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        users={data?.getUsers.users}
      />
    </>
  )
}
