import React from 'react'

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

import s from './UserPaymentsTable.module.scss'

const paginationOptions = [{ value: 5 }, { value: 10 }, { value: 20 }]

export const UserPaymentsTable = () => {
  return (
    <div>
      <Root>
        <Head>
          <Row>
            <HeadCell>
              <Typography variant={'bold14'}>Date of Payment</Typography>
            </HeadCell>
            <HeadCell>
              <Typography variant={'bold14'}>End date of subscription</Typography>
            </HeadCell>
            <HeadCell>
              <Typography variant={'bold14'}>Amount, $</Typography>
            </HeadCell>
            <HeadCell>
              <Typography variant={'bold14'}>Subscription Type</Typography>
            </HeadCell>
            <HeadCell>
              <Typography variant={'bold14'}>Payment Type</Typography>
            </HeadCell>
          </Row>
        </Head>
        <Body>
          <Row>
            <Cell>
              <Typography variant={'bold14'}>12.12.2022</Typography>
            </Cell>
            <Cell>
              <Typography variant={'bold14'}>12.12.2022</Typography>
            </Cell>
            <Cell>
              <Typography variant={'bold14'}>$10</Typography>
            </Cell>
            <Cell>
              <Typography variant={'bold14'}>1 day</Typography>
            </Cell>
            <Cell>
              <Typography variant={'bold14'}>Stripe</Typography>
            </Cell>
          </Row>
        </Body>
      </Root>
      <div className={s.pagination}>
        <Pagination count={100} onChange={() => {}} page={1} />
        <Typography variant={'regular14'}>Show</Typography>
        <SelectBox
          className={s.selectPagination}
          defaultValue={10}
          onValueChange={() => {}}
          options={paginationOptions}
        />
        <Typography variant={'regular14'}>on Page</Typography>
      </div>
    </div>
  )
}
