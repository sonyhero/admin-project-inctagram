import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../../../shared/api/generated/types.generated'
const defaultOptions = {} as const

export type GetListPaymentsQueryVariables = Types.Exact<{
  pageNumber: Types.Scalars['Int']['input']
  pagesize: Types.Scalars['Int']['input']
  sortBy: Types.Scalars['String']['input']
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  userID: Types.Scalars['Int']['input']
}>

export type GetListPaymentsQuery = {
  __typename?: 'Query'
  getListPayments: {
    __typename?: 'PaymentsPaginationModel'
    items: Array<{
      __typename?: 'Subscription'
      dateOfPayment?: any | null
      endDate?: any | null
      id: string
      paymentType?: Types.PaymentMethod | null
      payments: Array<{
        __typename?: 'Payment'
        amount: number
        currency: Types.CurrencyType
        id: number
        userId: number
      }>
      price: number
      startDate?: any | null
      status: Types.StatusSubscriptionType
      type: Types.SubscriptionType
    }>
  }
}

export const GetListPaymentsDocument = gql`
  query getListPayments(
    $userID: Int!
    $pagesize: Int!
    $pageNumber: Int!
    $sortBy: String!
    $sortDirection: SortDirection
  ) {
    getListPayments(
      userId: $userID
      pageSize: $pagesize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      items {
        paymentType
        price
        dateOfPayment
        endDate
        status
        type
        startDate
        payments {
          userId
          id
          currency
          amount
        }
        id
      }
    }
  }
`

/**
 * __useGetListPaymentsQuery__
 *
 * To run a query within a React component, call `useGetListPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListPaymentsQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *      pagesize: // value for 'pagesize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetListPaymentsQuery(
  baseOptions: Apollo.QueryHookOptions<GetListPaymentsQuery, GetListPaymentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetListPaymentsQuery, GetListPaymentsQueryVariables>(
    GetListPaymentsDocument,
    options
  )
}
export function useGetListPaymentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetListPaymentsQuery, GetListPaymentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetListPaymentsQuery, GetListPaymentsQueryVariables>(
    GetListPaymentsDocument,
    options
  )
}
export function useGetListPaymentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetListPaymentsQuery, GetListPaymentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetListPaymentsQuery, GetListPaymentsQueryVariables>(
    GetListPaymentsDocument,
    options
  )
}
export type GetListPaymentsQueryHookResult = ReturnType<typeof useGetListPaymentsQuery>
export type GetListPaymentsLazyQueryHookResult = ReturnType<typeof useGetListPaymentsLazyQuery>
export type GetListPaymentsSuspenseQueryHookResult = ReturnType<
  typeof useGetListPaymentsSuspenseQuery
>
export type GetListPaymentsQueryResult = Apollo.QueryResult<
  GetListPaymentsQuery,
  GetListPaymentsQueryVariables
>
