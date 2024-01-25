import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../../../shared/api/generated/types.generated'
const defaultOptions = {} as const

export type GetUsersListQueryVariables = Types.Exact<{
  blockStatus?: Types.InputMaybe<Types.BlockStatus>
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize: Types.Scalars['Int']['input']
  searchTerm: Types.Scalars['String']['input']
  sortBy: Types.Scalars['String']['input']
  sortDirection?: Types.InputMaybe<Types.SortDirection>
}>

export type GetUsersListQuery = {
  __typename?: 'Query'
  getUsers: {
    __typename?: 'UsersPaginationModel'
    pagination: { __typename?: 'PaginationModel'; pagesCount: number }
    users: Array<{
      __typename?: 'User'
      createdAt: any
      id: number
      userBan?: { __typename?: 'UserBan'; createdAt: any; reason: string } | null
      userName: string
    }>
  }
}

export const GetUsersListDocument = gql`
  query getUsersList(
    $pageSize: Int!
    $pageNumber: Int
    $sortBy: String!
    $sortDirection: SortDirection
    $searchTerm: String!
    $blockStatus: BlockStatus
  ) {
    getUsers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
      blockStatus: $blockStatus
    ) {
      users {
        createdAt
        userName
        userBan {
          createdAt
          reason
        }
        id
      }
      pagination {
        pagesCount
      }
    }
  }
`

/**
 * __useGetUsersListQuery__
 *
 * To run a query within a React component, call `useGetUsersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersListQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      searchTerm: // value for 'searchTerm'
 *      blockStatus: // value for 'blockStatus'
 *   },
 * });
 */
export function useGetUsersListQuery(
  baseOptions: Apollo.QueryHookOptions<GetUsersListQuery, GetUsersListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetUsersListQuery, GetUsersListQueryVariables>(
    GetUsersListDocument,
    options
  )
}
export function useGetUsersListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUsersListQuery, GetUsersListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetUsersListQuery, GetUsersListQueryVariables>(
    GetUsersListDocument,
    options
  )
}
export function useGetUsersListSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersListQuery, GetUsersListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetUsersListQuery, GetUsersListQueryVariables>(
    GetUsersListDocument,
    options
  )
}
export type GetUsersListQueryHookResult = ReturnType<typeof useGetUsersListQuery>
export type GetUsersListLazyQueryHookResult = ReturnType<typeof useGetUsersListLazyQuery>
export type GetUsersListSuspenseQueryHookResult = ReturnType<typeof useGetUsersListSuspenseQuery>
export type GetUsersListQueryResult = Apollo.QueryResult<
  GetUsersListQuery,
  GetUsersListQueryVariables
>
