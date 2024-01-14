import { useSessionStorage } from '@/shared'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://inctagram.work/api/v1/graphql',
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
