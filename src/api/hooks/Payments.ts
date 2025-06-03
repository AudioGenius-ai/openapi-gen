import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetAdminCustomers(
  options?: {
    limit?: string;
    offset?: string;
    provider?: string;
    userId?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminCustomers',
      options?.limit,
      options?.offset,
      options?.provider,
      options?.userId,
    ],
    queryFn: () =>
      apiSDK.paymentsApi.getAdminCustomers(
        options?.limit,
        options?.offset,
        options?.provider,
        options?.userId
      ),
    ...queryOptions,
  });
}

export function useGetAdminCustomers(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminCustomers', id],
    queryFn: () => apiSDK.paymentsApi.getAdminCustomers(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePatchAdminCustomers(
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
      return apiSDK.paymentsApi.patchAdminCustomers(
        variables.id,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useGetAdminCustomersProvider(
  providerCustomerId: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminCustomersProvider', providerCustomerId],
    queryFn: () =>
      apiSDK.paymentsApi.getAdminCustomersProvider(providerCustomerId),
    enabled: providerCustomerId != null,
    ...queryOptions,
  });
}

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
      apiSDK.paymentsApi.getAdminPaymentsCustomers(
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
    queryFn: () => apiSDK.paymentsApi.getAdminPaymentsCustomersStats(),
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
    queryFn: () => apiSDK.paymentsApi.getAdminPaymentsCustomers(customerId),
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
      apiSDK.paymentsApi.getAdminPaymentsCustomersTransactions(
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
      apiSDK.paymentsApi.getAdminPaymentsCustomersSubscriptions(
        customerId,
        options?.status,
        options?.platform
      ),
    enabled: customerId != null,
    ...queryOptions,
  });
}

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
      apiSDK.paymentsApi.getAdminPaymentsTransactions(
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
    queryFn: () => apiSDK.paymentsApi.getAdminPaymentsTransactions(id),
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
      return apiSDK.paymentsApi.postAdminPaymentsTransactionsRefund(
        variables.id
      );
    },
    ...mutationOptions,
  });
}

export function useGetAdminProducts(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminProducts'],
    queryFn: () => apiSDK.paymentsApi.getAdminProducts(),
    ...queryOptions,
  });
}

export function useGetAdminProducts(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminProducts', id],
    queryFn: () => apiSDK.paymentsApi.getAdminProducts(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function useGetAdminSubscriptions(
  options?: { customerId?: string; status?: string },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminSubscriptions', options?.customerId, options?.status],
    queryFn: () =>
      apiSDK.paymentsApi.getAdminSubscriptions(
        options?.customerId,
        options?.status
      ),
    ...queryOptions,
  });
}

export function useGetPaymentsCustomers(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getPaymentsCustomers', id],
    queryFn: () => apiSDK.paymentsApi.getPaymentsCustomers(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePutPaymentsCustomers(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data?: PutPaymentsCustomersRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data?: PutPaymentsCustomersRequestType;
    }) => {
      return apiSDK.paymentsApi.putPaymentsCustomers(
        variables.id,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useDeletePaymentsCustomers(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.paymentsApi.deletePaymentsCustomers(variables.id);
    },
    ...mutationOptions,
  });
}

export function usePostPaymentsCustomers(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: PostPaymentsCustomersRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: PostPaymentsCustomersRequestType }) => {
      return apiSDK.paymentsApi.postPaymentsCustomers(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostPaymentsCustomersPortal(
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
      return apiSDK.paymentsApi.postPaymentsCustomersPortal(
        variables.id,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostPaymentsCheckout(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: PostPaymentsCheckoutRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: PostPaymentsCheckoutRequestType }) => {
      return apiSDK.paymentsApi.postPaymentsCheckout(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostPaymentsWebhook(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, void>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: () => apiSDK.paymentsApi.postPaymentsWebhook(),
    ...mutationOptions,
  });
}

export function usePostPaymentsSyncProducts(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, void>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: () => apiSDK.paymentsApi.postPaymentsSyncProducts(),
    ...mutationOptions,
  });
}

export function usePostPaymentsSyncCustomers(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, void>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: () => apiSDK.paymentsApi.postPaymentsSyncCustomers(),
    ...mutationOptions,
  });
}
