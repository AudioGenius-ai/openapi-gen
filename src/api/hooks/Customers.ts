import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetAdminPaymentsCustomers(
  options?: {
    page?: number;
    limit?: number;
    search?: string;
    platform?: string;
    sortBy?: string;
    sortOrder?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminPaymentsCustomers',
      options?.page,
      options?.limit,
      options?.search,
      options?.platform,
      options?.sortBy,
      options?.sortOrder,
    ],
    queryFn: () =>
      apiSDK.customersApi.getAdminPaymentsCustomers(
        options?.page,
        options?.limit,
        options?.search,
        options?.platform,
        options?.sortBy,
        options?.sortOrder
      ),
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
    queryFn: () => apiSDK.customersApi.getAdminPaymentsCustomersStats(),
    ...queryOptions,
  });
}

export function useGetAdminPaymentsCustomers(
  customerId: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsCustomers', customerId],
    queryFn: () => apiSDK.customersApi.getAdminPaymentsCustomers(customerId),
    enabled: customerId != null,
    ...queryOptions,
  });
}

export function useGetAdminPaymentsCustomersTransactions(
  customerId: string | number,
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
      'getAdminPaymentsCustomersTransactions',
      customerId,
      options?.page,
      options?.limit,
      options?.platform,
      options?.status,
    ],
    queryFn: () =>
      apiSDK.customersApi.getAdminPaymentsCustomersTransactions(
        customerId,
        options?.page,
        options?.limit,
        options?.platform,
        options?.status
      ),
    enabled: customerId != null,
    ...queryOptions,
  });
}

export function useGetAdminPaymentsCustomersSubscriptions(
  customerId: string | number,
  options?: { status?: string; platform?: string },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminPaymentsCustomersSubscriptions',
      customerId,
      options?.status,
      options?.platform,
    ],
    queryFn: () =>
      apiSDK.customersApi.getAdminPaymentsCustomersSubscriptions(
        customerId,
        options?.status,
        options?.platform
      ),
    enabled: customerId != null,
    ...queryOptions,
  });
}
