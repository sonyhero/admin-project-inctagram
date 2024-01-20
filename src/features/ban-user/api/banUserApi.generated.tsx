import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../../../shared/api/generated/types.generated'
const defaultOptions = {} as const

export type BanUserMutationVariables = Types.Exact<{
  banReason: Types.Scalars['String']['input']
  userId: Types.Scalars['Int']['input']
}>

export type BanUserMutation = { __typename?: 'Mutation'; banUser: boolean }

export type UnBanMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
}>

export type UnBanMutation = { __typename?: 'Mutation'; unbanUser: boolean }

export const BanUserDocument = gql`
  mutation banUser($banReason: String!, $userId: Int!) {
    banUser(banReason: $banReason, userId: $userId)
  }
`
export type BanUserMutationFn = Apollo.MutationFunction<BanUserMutation, BanUserMutationVariables>

/**
 * __useBanUserMutation__
 *
 * To run a mutation, you first call `useBanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banUserMutation, { data, loading, error }] = useBanUserMutation({
 *   variables: {
 *      banReason: // value for 'banReason'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useBanUserMutation(
  baseOptions?: Apollo.MutationHookOptions<BanUserMutation, BanUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument, options)
}
export type BanUserMutationHookResult = ReturnType<typeof useBanUserMutation>
export type BanUserMutationResult = Apollo.MutationResult<BanUserMutation>
export type BanUserMutationOptions = Apollo.BaseMutationOptions<
  BanUserMutation,
  BanUserMutationVariables
>
export const UnBanDocument = gql`
  mutation unBan($userId: Int!) {
    unbanUser(userId: $userId)
  }
`
export type UnBanMutationFn = Apollo.MutationFunction<UnBanMutation, UnBanMutationVariables>

/**
 * __useUnBanMutation__
 *
 * To run a mutation, you first call `useUnBanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnBanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unBanMutation, { data, loading, error }] = useUnBanMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnBanMutation(
  baseOptions?: Apollo.MutationHookOptions<UnBanMutation, UnBanMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<UnBanMutation, UnBanMutationVariables>(UnBanDocument, options)
}
export type UnBanMutationHookResult = ReturnType<typeof useUnBanMutation>
export type UnBanMutationResult = Apollo.MutationResult<UnBanMutation>
export type UnBanMutationOptions = Apollo.BaseMutationOptions<UnBanMutation, UnBanMutationVariables>
