import { useState } from 'react'

import { SortDirection } from '@/shared/api/generated/types.generated'

export const useTableSort = ({ initialKey }: { initialKey: string }) => {
  const [sort, setSort] = useState<{ direction: SortDirection; key: string }>({
    direction: SortDirection.Asc,
    key: initialKey,
  })

  const handleSort = (key: string) => {
    if (sort.key !== key) {
      setSort({ direction: SortDirection.Asc, key })
    }

    setSort({
      direction: sort?.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc,
      key,
    })
  }

  return { handleSort, sort }
}
