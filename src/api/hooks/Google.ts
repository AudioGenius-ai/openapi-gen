import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetAdminPaymentsAppstoreGoogleProducts(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsAppstoreGoogleProducts'],
    queryFn: () => apiSDK.googleApi.getAdminPaymentsAppstoreGoogleProducts(),
    ...queryOptions,
  });
}

export function usePostAdminPaymentsAppstoreGoogleProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostAdminPaymentsAppstoreGoogleProductsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      data: PostAdminPaymentsAppstoreGoogleProductsRequestType;
    }) => {
      return apiSDK.googleApi.postAdminPaymentsAppstoreGoogleProducts(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePutAdminPaymentsAppstoreGoogleProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      {
        sku: string | number;
        data: PutAdminPaymentsAppstoreGoogleProductsRequestType;
      }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      sku: string | number;
      data: PutAdminPaymentsAppstoreGoogleProductsRequestType;
    }) => {
      return apiSDK.googleApi.putAdminPaymentsAppstoreGoogleProducts(
        variables.sku,
        variables.data
      );
    },
    ...mutationOptions,
  });
}
