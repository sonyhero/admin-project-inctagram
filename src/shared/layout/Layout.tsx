import { PropsWithChildren, ReactElement } from 'react'

import { HeadMeta, useIsLoggedIn } from '@/shared'
import { SideBar } from '@/widgets'
import { Header } from '@/widgets/header'
import { NextPage } from 'next'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const {} = useIsLoggedIn()

  return (
    <>
      <HeadMeta title={'InctagramAdmin'} />
      <Header />

      <div className={s.container}>
        <SideBar />
        <main className={s.main}>{children}</main>
      </div>
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
