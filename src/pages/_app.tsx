import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'

import { client } from '@/shared'
import { ApolloProvider } from '@apollo/client'
import { NextPage } from 'next'

import '@/shared/styles/index.scss'
import '@belozerov-egor/ui-libs/dist/style.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
