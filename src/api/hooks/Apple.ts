import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetAdminPaymentsAppstoreAppleProducts(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsAppstoreAppleProducts'],
    queryFn: () => apiSDK.appleApi.getAdminPaymentsAppstoreAppleProducts(),
    ...queryOptions,
  });
}

export function usePostAdminPaymentsAppstoreAppleProducts(
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
      return apiSDK.appleApi.postAdminPaymentsAppstoreAppleProducts(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePutAdminPaymentsAppstoreAppleProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { productId: string | number; data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      productId: string | number;
      data: Record<string, any>;
    }) => {
      return apiSDK.appleApi.putAdminPaymentsAppstoreAppleProducts(
        variables.productId,
        variables.data
      );
    },
    ...mutationOptions,
  });
}
