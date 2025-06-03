import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetAttachments(
  options?: { page?: string; limit?: string },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAttachments', options?.page, options?.limit],
    queryFn: () =>
      apiSDK.attachmentsApi.getAttachments(options?.page, options?.limit),
    ...queryOptions,
  });
}

export function usePostAttachments(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, void>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: () => apiSDK.attachmentsApi.postAttachments(),
    ...mutationOptions,
  });
}

export function useGetAttachments(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAttachments', id],
    queryFn: () => apiSDK.attachmentsApi.getAttachments(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePatchAttachments(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data?: Record<string, any>;
    }) => {
      return apiSDK.attachmentsApi.patchAttachments(
        variables.id,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useDeleteAttachments(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.attachmentsApi.deleteAttachments(variables.id);
    },
    ...mutationOptions,
  });
}
