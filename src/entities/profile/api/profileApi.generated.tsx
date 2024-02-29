import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../../../shared/api/generated/types.generated'
const defaultOptions = {} as const

export type GetProfileQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
}>

export type GetProfileQuery = {
  __typename?: 'Query'
  getUser: {
    __typename?: 'User'
    profile: {
      __typename?: 'Profile'
      avatars?: Array<{
        __typename?: 'Avatar'
        height?: null | number
        url?: null | string
        width?: null | number
      }> | null
      createdAt: any
      firstName?: null | string
      id: number
      lastName?: null | string
      userName?: null | string
    }
  }
}

export type GetListPaymentsByIdQueryVariables = Types.Exact<{
  pageNumber: Types.Scalars['Int']['input']
  pageSize: Types.Scalars['Int']['input']
  sortBy: Types.Scalars['String']['input']
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  userId: Types.Scalars['Int']['input']
}>

export type GetListPaymentsByIdQuery = {
  __typename?: 'Query'
  getPaymentsByUser: {
    __typename?: 'PaymentPaginationModel'
    items: Array<{
      __typename?: 'Subscription'
      businessAccountId: number
      dateOfPayment?: any | null
      endDate?: any | null
      id: string
      paymentType?: Types.PaymentMethod | null
      payments: Array<{
        __typename?: 'Payment'
        amount?: null | number
        createdAt?: any | null
        currency?: Types.CurrencyType | null
        id?: null | number
        userId?: null | number
      }>
      price: number
      startDate?: any | null
      status: Types.StatusSubscriptionType
      type: Types.SubscriptionType
    }>
    page: number
    pageSize: number
    pagesCount: number
    totalCount: number
  }
}

export const GetProfileDocument = gql`
  query getProfile($userId: Int!) {
    getUser(userId: $userId) {
      profile {
        createdAt
        id
        firstName
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
 *      userId: // value for 'userId'
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
export const GetListPaymentsByIdDocument = gql`
  query getListPaymentsById(
    $userId: Int!
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: String!
    $sortDirection: SortDirection
  ) {
    getPaymentsByUser(
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      page
      pagesCount
      pageSize
      totalCount
      items {
        businessAccountId
        dateOfPayment
        endDate
        id
        paymentType
        payments {
          amount
          createdAt
          currency
          id
          userId
        }
        price
        startDate
        status
        type
      }
    }
  }
`

/**
 * __useGetListPaymentsByIdQuery__
 *
 * To run a query within a React component, call `useGetListPaymentsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListPaymentsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListPaymentsByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetListPaymentsByIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetListPaymentsByIdQuery, GetListPaymentsByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetListPaymentsByIdQuery, GetListPaymentsByIdQueryVariables>(
    GetListPaymentsByIdDocument,
    options
  )
}
export function useGetListPaymentsByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetListPaymentsByIdQuery,
    GetListPaymentsByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetListPaymentsByIdQuery, GetListPaymentsByIdQueryVariables>(
    GetListPaymentsByIdDocument,
    options
  )
}
export function useGetListPaymentsByIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetListPaymentsByIdQuery,
    GetListPaymentsByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetListPaymentsByIdQuery, GetListPaymentsByIdQueryVariables>(
    GetListPaymentsByIdDocument,
    options
  )
}
export type GetListPaymentsByIdQueryHookResult = ReturnType<typeof useGetListPaymentsByIdQuery>
export type GetListPaymentsByIdLazyQueryHookResult = ReturnType<
  typeof useGetListPaymentsByIdLazyQuery
>
export type GetListPaymentsByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetListPaymentsByIdSuspenseQuery
>
export type GetListPaymentsByIdQueryResult = Apollo.QueryResult<
  GetListPaymentsByIdQuery,
  GetListPaymentsByIdQueryVariables
>
