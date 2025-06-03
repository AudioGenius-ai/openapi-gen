import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetAdminWaitlist(
  options?: {
    page?: string;
    pageSize?: string;
    search?: string;
    status?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminWaitlist',
      options?.page,
      options?.pageSize,
      options?.search,
      options?.status,
    ],
    queryFn: () =>
      apiSDK.waitlistApi.getAdminWaitlist(
        options?.page,
        options?.pageSize,
        options?.search,
        options?.status
      ),
    ...queryOptions,
  });
}

export function usePatchAdminWaitlist(
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
      return apiSDK.waitlistApi.patchAdminWaitlist(
        variables.id,
        variables.data
      );
    },
    ...mutationOptions,
  });
}
