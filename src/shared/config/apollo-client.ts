import { useSessionStorage } from '@/shared'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { URL_SCHEMA } from '../../../codegen'

const httpLink = createHttpLink({
  uri: URL_SCHEMA,
})
const authLink = setContext((_, { headers }) => {
  const [getItem] = useSessionStorage('authToken')
  const token = getItem()

  return {
    headers: {
      ...headers,
      authorization: token ? `Basic ${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: authLink.concat(httpLink),
})
