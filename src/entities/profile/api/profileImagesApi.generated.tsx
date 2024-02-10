import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../../../shared/api/generated/types.generated'
const defaultOptions = {} as const

export type GetProfilePostImagesQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
}>

export type GetProfilePostImagesQuery = {
  __typename?: 'Query'
  getProfileInfo: {
    __typename?: 'ProfileInfoModel'
    posts?: Array<{
      __typename?: 'ImagePost'
      createdAt?: any | null
      fileSize?: null | number
      height?: null | number
      id?: null | number
      url?: null | string
      width?: null | number
    }> | null
  }
}

export const GetProfilePostImagesDocument = gql`
  query getProfilePostImages($userId: Int!) {
    getProfileInfo(userId: $userId) {
      posts {
        height
        width
        fileSize
        url
        id
        createdAt
      }
    }
  }
`

/**
 * __useGetProfilePostImagesQuery__
 *
 * To run a query within a React component, call `useGetProfilePostImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilePostImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfilePostImagesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetProfilePostImagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProfilePostImagesQuery,
    GetProfilePostImagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetProfilePostImagesQuery, GetProfilePostImagesQueryVariables>(
    GetProfilePostImagesDocument,
    options
  )
}
export function useGetProfilePostImagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProfilePostImagesQuery,
    GetProfilePostImagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetProfilePostImagesQuery, GetProfilePostImagesQueryVariables>(
    GetProfilePostImagesDocument,
    options
  )
}
export function useGetProfilePostImagesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetProfilePostImagesQuery,
    GetProfilePostImagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetProfilePostImagesQuery, GetProfilePostImagesQueryVariables>(
    GetProfilePostImagesDocument,
    options
  )
}
export type GetProfilePostImagesQueryHookResult = ReturnType<typeof useGetProfilePostImagesQuery>
export type GetProfilePostImagesLazyQueryHookResult = ReturnType<
  typeof useGetProfilePostImagesLazyQuery
>
export type GetProfilePostImagesSuspenseQueryHookResult = ReturnType<
  typeof useGetProfilePostImagesSuspenseQuery
>
export type GetProfilePostImagesQueryResult = Apollo.QueryResult<
  GetProfilePostImagesQuery,
  GetProfilePostImagesQueryVariables
>
