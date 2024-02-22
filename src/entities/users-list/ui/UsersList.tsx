import React, { useEffect, useState } from 'react'

import { SettingsTable, UsersListTable } from '@/entities/users-list'
import { useGetUsersListQuery } from '@/entities/users-list/api/usersListApi.generated'
import { useDebounce, useTableSort } from '@/shared'
import { UserBlockStatus } from '@/shared/api/generated/types.generated'
import { Typography } from '@belozerov-egor/ui-libs'
import Image from 'next/image'
import NProgress from 'nprogress'

import loader from '../../../../public/loader.svg'

export const UsersList = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const { handleSort, sort } = useTableSort({ initialKey: 'id' })
  const [blockStatus, setBlockStatus] = useState<UserBlockStatus>(UserBlockStatus.All)

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

  useEffect(() => {
    refetch()
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

  const message =
    data?.getUsers.pagination.pagesCount === 0 &&
    blockStatus === UserBlockStatus.Blocked &&
    'No banned users'

  return (
    <>
      <SettingsTable
        onChangeText={setSearch}
        onSearchClear={handleClearSearch}
        setBlockStatus={setBlockStatus}
        textValue={search}
      />
      {!!data?.getUsers.users && (
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
      )}
      {!loading && !!data?.getUsers.users && <Typography variant={'bold16'}>{message}</Typography>}
      {loading && <Image alt={'loader'} src={loader} />}
    </>
  )
}
