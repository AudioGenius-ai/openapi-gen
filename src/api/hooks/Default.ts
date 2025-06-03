import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useSocialSignIn(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: SocialSignInRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: SocialSignInRequestType }) => {
      return apiSDK.defaultApi.socialSignIn(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAuthGetsession(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthGetsession'],
    queryFn: () => apiSDK.defaultApi.getAuthGetsession(),
    ...queryOptions,
  });
}

export function usePostAuthSignout(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: Record<string, any> }) => {
      return apiSDK.defaultApi.postAuthSignout(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthSignupEmail(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: PostAuthSignupEmailRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: PostAuthSignupEmailRequestType }) => {
      return apiSDK.defaultApi.postAuthSignupEmail(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthSigninEmail(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthSigninEmailResponseType,
      Error,
      { data: PostAuthSigninEmailRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostAuthSigninEmailRequestType }) => {
      return apiSDK.defaultApi.postAuthSigninEmail(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthForgetpassword(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.defaultApi.postAuthForgetpassword(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthResetpassword(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.defaultApi.postAuthResetpassword(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAuthVerifyemail(
  token: string,
  options?: { callbackURL?: string },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthVerifyemail', token, options?.callbackURL],
    queryFn: () =>
      apiSDK.defaultApi.getAuthVerifyemail(token, options?.callbackURL),
    enabled: token != null,
    ...queryOptions,
  });
}

export function usePostAuthSendverificationemail(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: Record<string, any> }) => {
      return apiSDK.defaultApi.postAuthSendverificationemail(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthChangeemail(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.defaultApi.postAuthChangeemail(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthChangepassword(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostAuthChangepasswordRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostAuthChangepasswordRequestType }) => {
      return apiSDK.defaultApi.postAuthChangepassword(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthUpdateuser(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: Record<string, any> }) => {
      return apiSDK.defaultApi.postAuthUpdateuser(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthDeleteuser(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostAuthDeleteuserRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostAuthDeleteuserRequestType }) => {
      return apiSDK.defaultApi.postAuthDeleteuser(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAuthResetpassword(
  token: string | number,
  options?: { callbackURL?: string },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthResetpassword', token, options?.callbackURL],
    queryFn: () =>
      apiSDK.defaultApi.getAuthResetpassword(token, options?.callbackURL),
    enabled: token != null,
    ...queryOptions,
  });
}

export function useGetAuthListsessions(
  queryOptions?: Omit<
    UseQueryOptions<GetAuthListsessionsResponseItemType[], Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthListsessions'],
    queryFn: () => apiSDK.defaultApi.getAuthListsessions(),
    ...queryOptions,
  });
}

export function usePostAuthRevokesession(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: Record<string, any> }) => {
      return apiSDK.defaultApi.postAuthRevokesession(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthRevokesessions(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: Record<string, any> }) => {
      return apiSDK.defaultApi.postAuthRevokesessions(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthRevokeothersessions(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: Record<string, any> }) => {
      return apiSDK.defaultApi.postAuthRevokeothersessions(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthLinksocial(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostAuthLinksocialRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostAuthLinksocialRequestType }) => {
      return apiSDK.defaultApi.postAuthLinksocial(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAuthListaccounts(
  queryOptions?: Omit<
    UseQueryOptions<GetAuthListaccountsResponseItemType[], Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthListaccounts'],
    queryFn: () => apiSDK.defaultApi.getAuthListaccounts(),
    ...queryOptions,
  });
}

export function useGetAuthDeleteuserCallback(
  options?: { token?: string; callbackURL?: string },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAuthDeleteuserCallback',
      options?.token,
      options?.callbackURL,
    ],
    queryFn: () =>
      apiSDK.defaultApi.getAuthDeleteuserCallback(
        options?.token,
        options?.callbackURL
      ),
    ...queryOptions,
  });
}

export function usePostAuthUnlinkaccount(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.defaultApi.postAuthUnlinkaccount(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthRefreshtoken(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthRefreshtokenResponseType,
      Error,
      { data: PostAuthRefreshtokenRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostAuthRefreshtokenRequestType }) => {
      return apiSDK.defaultApi.postAuthRefreshtoken(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthGetaccesstoken(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthGetaccesstokenResponseType,
      Error,
      { data: PostAuthGetaccesstokenRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostAuthGetaccesstokenRequestType }) => {
      return apiSDK.defaultApi.postAuthGetaccesstoken(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAuthOk(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthOk'],
    queryFn: () => apiSDK.defaultApi.getAuthOk(),
    ...queryOptions,
  });
}

export function useGetAuthError(
  queryOptions?: Omit<UseQueryOptions<unknown, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['getAuthError'],
    queryFn: () => apiSDK.defaultApi.getAuthError(),
    ...queryOptions,
  });
}
