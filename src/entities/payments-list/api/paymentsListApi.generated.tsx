import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../../../shared/api/generated/types.generated'
const defaultOptions = {} as const

export type GetAllPaymentsQueryVariables = Types.Exact<{
  pageNumber: Types.Scalars['Int']['input']
  pageSize: Types.Scalars['Int']['input']
  sortBy: Types.Scalars['String']['input']
  sortDirection?: Types.InputMaybe<Types.SortDirection>
}>

export type GetAllPaymentsQuery = {
  __typename?: 'Query'
  getPayments: {
    __typename?: 'PaymentsPaginationModel'
    items: Array<{
      __typename?: 'SubscriptionPaymentsModel'
      amount?: null | number
      avatars?: Array<{
        __typename?: 'Avatar'
        fileSize?: null | number
        height?: null | number
        url?: null | string
        width?: null | number
      }> | null
      createdAt?: any | null
      currency?: Types.CurrencyType | null
      id?: null | number
      paymentMethod: Types.PaymentMethod
      type: Types.SubscriptionType
      userId?: null | number
      userName: string
    }>
    pagesCount: number
  }
}

export const GetAllPaymentsDocument = gql`
  query getAllPayments(
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: String!
    $sortDirection: SortDirection
  ) {
    getPayments(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      pagesCount
      items {
        amount
        avatars {
          fileSize
          height
          url
          width
        }
        createdAt
        currency
        id
        paymentMethod
        type
        userId
        userName
      }
    }
  }
`

/**
 * __useGetAllPaymentsQuery__
 *
 * To run a query within a React component, call `useGetAllPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPaymentsQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetAllPaymentsQuery(
  baseOptions: Apollo.QueryHookOptions<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>(
    GetAllPaymentsDocument,
    options
  )
}
export function useGetAllPaymentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>(
    GetAllPaymentsDocument,
    options
  )
}
export function useGetAllPaymentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>(
    GetAllPaymentsDocument,
    options
  )
}
export type GetAllPaymentsQueryHookResult = ReturnType<typeof useGetAllPaymentsQuery>
export type GetAllPaymentsLazyQueryHookResult = ReturnType<typeof useGetAllPaymentsLazyQuery>
export type GetAllPaymentsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllPaymentsSuspenseQuery
>
export type GetAllPaymentsQueryResult = Apollo.QueryResult<
  GetAllPaymentsQuery,
  GetAllPaymentsQueryVariables
>
