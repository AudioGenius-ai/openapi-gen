import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetProducts(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getProducts'],
    queryFn: () => apiSDK.productsApi.getProducts(),
    ...queryOptions,
  });
}

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
      apiSDK.productsApi.getAdminPaymentsProducts(
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
      return apiSDK.productsApi.postAdminPaymentsProducts(variables.data);
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
    queryFn: () => apiSDK.productsApi.getAdminPaymentsProducts(productId),
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
      return apiSDK.productsApi.putAdminPaymentsProducts(
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
      return apiSDK.productsApi.deleteAdminPaymentsProducts(
        variables.productId
      );
    },
    ...mutationOptions,
  });
}

export function usePostAdminPaymentsProductsSync(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAdminPaymentsProductsSyncResponseType,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.productsApi.postAdminPaymentsProductsSync(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAdminPaymentsProductsPlatforms(
  productId: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsProductsPlatforms', productId],
    queryFn: () =>
      apiSDK.productsApi.getAdminPaymentsProductsPlatforms(productId),
    enabled: productId != null,
    ...queryOptions,
  });
}

export function useGetAdminPaymentsProductsStats(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsProductsStats'],
    queryFn: () => apiSDK.productsApi.getAdminPaymentsProductsStats(),
    ...queryOptions,
  });
}
