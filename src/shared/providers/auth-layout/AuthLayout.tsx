import { PropsWithChildren, ReactElement } from 'react'

import { HeadMeta } from '@/shared'
import { Header } from '@/widgets/header'
import { NextPage } from 'next'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeadMeta title={'Inctagram'} />
      <Header />
      <main>{children}</main>
    </>
  )
}

export const getAuthLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
