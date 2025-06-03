import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetAdminPaymentsTransactions(
  options?: {
    page?: number;
    limit?: number;
    platform?: string;
    status?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminPaymentsTransactions',
      options?.page,
      options?.limit,
      options?.platform,
      options?.status,
    ],
    queryFn: () =>
      apiSDK.transactionsApi.getAdminPaymentsTransactions(
        options?.page,
        options?.limit,
        options?.platform,
        options?.status
      ),
    ...queryOptions,
  });
}

export function useGetAdminPaymentsTransactions(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsTransactions', id],
    queryFn: () => apiSDK.transactionsApi.getAdminPaymentsTransactions(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePostAdminPaymentsTransactionsRefund(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.transactionsApi.postAdminPaymentsTransactionsRefund(
        variables.id
      );
    },
    ...mutationOptions,
  });
}
