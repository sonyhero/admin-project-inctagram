import { PropsWithChildren, ReactElement } from 'react'

import { HeadMeta, useIsLoggedIn } from '@/shared'
import { Header } from '@/widgets/header'
import { NextPage } from 'next'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const {} = useIsLoggedIn()

  return (
    <>
      <HeadMeta title={'Inctagram'} />
      <Header />
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
