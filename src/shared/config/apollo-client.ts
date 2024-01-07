import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'https://inctagram.work/api/v1/graphql',
})

const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: httpLink,
})

export default client
