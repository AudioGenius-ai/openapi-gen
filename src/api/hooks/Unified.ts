import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetAdminPaymentsProducts(
  options?: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    platform?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminPaymentsProducts',
      options?.page,
      options?.limit,
      options?.search,
      options?.type,
      options?.platform,
    ],
    queryFn: () =>
      apiSDK.unifiedApi.getAdminPaymentsProducts(
        options?.page,
        options?.limit,
        options?.search,
        options?.type,
        options?.platform
      ),
    ...queryOptions,
  });
}

export function usePostAdminPaymentsProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostAdminPaymentsProductsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostAdminPaymentsProductsRequestType }) => {
      return apiSDK.unifiedApi.postAdminPaymentsProducts(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAdminPaymentsProducts(
  productId: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsProducts', productId],
    queryFn: () => apiSDK.unifiedApi.getAdminPaymentsProducts(productId),
    enabled: productId != null,
    ...queryOptions,
  });
}

export function usePutAdminPaymentsProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { productId: string | number; data: PutAdminPaymentsProductsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      productId: string | number;
      data: PutAdminPaymentsProductsRequestType;
    }) => {
      return apiSDK.unifiedApi.putAdminPaymentsProducts(
        variables.productId,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useDeleteAdminPaymentsProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { productId: string | number }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { productId: string | number }) => {
      return apiSDK.unifiedApi.deleteAdminPaymentsProducts(variables.productId);
    },
    ...mutationOptions,
  });
}
