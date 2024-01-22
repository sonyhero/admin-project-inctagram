import React, { useEffect, useState } from 'react'

import { SettingsTable, UsersListTable } from '@/entities/users-list'
import { useGetUsersListQuery } from '@/entities/users-list/api/usersListApi.generated'
import { Nullable, useDebounce } from '@/shared'
import { BlockStatus, SortDirection } from '@/shared/api/generated/types.generated'
import NProgress from 'nprogress'

import s from './UsersList.module.scss'

export const UsersList = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<{ direction: SortDirection; key: string }>({
    direction: SortDirection.Asc,
    key: 'id',
  })
  const [blockStatus, setBlockStatus] =
    useState<Nullable<BlockStatus.Blocked | undefined>>(undefined)

  const { data, loading } = useGetUsersListQuery({
    variables: {
      blockStatus,
      pageNumber,
      pageSize,
      searchTerm,
      sortBy: sort.key,
      sortDirection: sort.direction,
    },
  })

  const debouncedValue = useDebounce<string>(search, 400)

  const handleSort = (key: string) => {
    if (sort.key !== key) {
      setSort({ direction: SortDirection.Asc, key })
    }

    setSort({
      direction: sort?.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc,
      key,
    })
  }

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
    <div className={s.usersList}>
      <SettingsTable
        onChangeText={setSearch}
        onSearchClear={handleClearSearch}
        setBlockStatus={setBlockStatus}
        textValue={search}
      />

      <UsersListTable
        data={data}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        setSort={handleSort}
      />
    </div>
  )
}
