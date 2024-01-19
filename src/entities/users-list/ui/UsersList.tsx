import { useEffect, useState } from 'react'

import { UsersListTable } from '@/entities/users-list'
import { useGetUsersListQuery } from '@/entities/users-list/api/usersListApi.generated'
import { Nullable, useDebounce } from '@/shared'
import { BlockStatus, SortDirection } from '@/shared/api/generated/types.generated'

export const UsersList = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [search, setSearch] = useState('')
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

  const handleSearchTerm = (value: string) => {
    setSearch(value)
  }
  const handleClearSearch = () => {
    setSearch('')
  }

  useEffect(() => {
    setSearchTerm(debouncedValue)
  }, [debouncedValue])

  if (loading) {
    return <span>...loading</span>
  }

  return (
    <UsersListTable
      data={data}
      pageNumber={pageNumber}
      pageSize={pageSize}
      setBlockStatus={setBlockStatus}
      setPageNumber={setPageNumber}
      setPageSize={setPageSize}
      setSort={handleSort}
    />
  )
}
