import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetAdminPaymentsProductsStats(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsProductsStats'],
    queryFn: () => apiSDK.analyticsApi.getAdminPaymentsProductsStats(),
    ...queryOptions,
  });
}

export function useGetAdminPaymentsCustomersStats(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsCustomersStats'],
    queryFn: () => apiSDK.analyticsApi.getAdminPaymentsCustomersStats(),
    ...queryOptions,
  });
}
