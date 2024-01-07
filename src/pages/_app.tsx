import type { AppProps } from 'next/app'

import client from '@/shared/config/apollo-client'
import { ApolloProvider } from '@apollo/client'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
