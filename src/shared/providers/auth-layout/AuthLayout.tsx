import { PropsWithChildren, ReactElement } from 'react'

import { HeadMeta } from '@/shared'
import { Header } from '@/widgets/header'
import { NextPage } from 'next'

import s from './AuthLayout.module.scss'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeadMeta title={'Inctagram'} />
      <Header />
      <main className={s.container}>{children}</main>
    </>
  )
}

export const getAuthLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
