import React from 'react'

import { useTranslation } from '@/shared'
import { Pagination, SelectBox, Typography } from '@belozerov-egor/ui-libs'

import s from './PaginationWidget.module.scss'

type Props = {
  pageNumber: number
  pageSize: number
  pagesCount?: number
  paginationOptions?: { value: number }[]
  setPageNumber: (value: number) => void
  setPageSize: (value: number) => void
}

export const PaginationWidget = (props: Props) => {
  const { pageNumber, pageSize, pagesCount, paginationOptions, setPageNumber, setPageSize } = props
  const { t } = useTranslation()
  const options = paginationOptions ?? [{ value: 5 }, { value: 10 }, { value: 20 }]

  return (
    <div className={s.pagination}>
      <Pagination count={pagesCount ?? 1} onChange={setPageNumber} page={pageNumber} />
      <Typography variant={'regular14'}>{t.usersList.paginationSelect.show}</Typography>
      <SelectBox
        className={s.selectPagination}
        defaultValue={pageSize}
        onValueChange={setPageSize}
        options={options}
      />
      <Typography variant={'regular14'}>{t.usersList.paginationSelect.onPage}</Typography>
    </div>
  )
}
