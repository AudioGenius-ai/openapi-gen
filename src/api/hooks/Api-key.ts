import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function usePostAuthApikeyCreate(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthApikeyCreateResponseType,
      Error,
      { data: PostAuthApikeyCreateRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostAuthApikeyCreateRequestType }) => {
      return apiSDK.keyApiApi.postAuthApikeyCreate(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAuthApikeyGet(
  options?: { id?: string },
  queryOptions?: Omit<
    UseQueryOptions<GetAuthApikeyGetResponseType, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthApikeyGet', options?.id],
    queryFn: () => apiSDK.keyApiApi.getAuthApikeyGet(options?.id),
    ...queryOptions,
  });
}

export function usePostAuthApikeyUpdate(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthApikeyUpdateResponseType,
      Error,
      { data: PostAuthApikeyUpdateRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostAuthApikeyUpdateRequestType }) => {
      return apiSDK.keyApiApi.postAuthApikeyUpdate(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthApikeyDelete(
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
      return apiSDK.keyApiApi.postAuthApikeyDelete(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAuthApikeyList(
  queryOptions?: Omit<
    UseQueryOptions<GetAuthApikeyListResponseItemType[], Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthApikeyList'],
    queryFn: () => apiSDK.keyApiApi.getAuthApikeyList(),
    ...queryOptions,
  });
}
