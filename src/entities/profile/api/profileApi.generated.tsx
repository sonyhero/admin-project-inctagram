import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../../../shared/api/generated/types.generated'
const defaultOptions = {} as const

export type GetProfileQueryVariables = Types.Exact<{
  userID: Types.Scalars['Int']['input']
}>

export type GetProfileQuery = {
  __typename?: 'Query'
  getProfileInfo: {
    __typename?: 'ProfileInfoModel'
    profile: {
      __typename?: 'Profile'
      avatars?: Array<{ __typename?: 'Avatar'; height: number; url: string; width: number }> | null
      createdAt: any
      id: number
      lastName?: null | string
      userName?: null | string
    }
  }
}

export const GetProfileDocument = gql`
  query getProfile($userID: Int!) {
    getProfileInfo(userId: $userID) {
      profile {
        createdAt
        id
        lastName
        userName
        avatars {
          url
          height
          width
        }
      }
    }
  }
`

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useGetProfileQuery(
  baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options)
}
export function useGetProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options)
}
export function useGetProfileSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetProfileQuery, GetProfileQueryVariables>(
    GetProfileDocument,
    options
  )
}
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>
export type GetProfileSuspenseQueryHookResult = ReturnType<typeof useGetProfileSuspenseQuery>
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>
