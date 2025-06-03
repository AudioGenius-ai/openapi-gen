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
    queryFn: () => apiSDK.appstoreApi.getAdminPaymentsAppstoreAppleProducts(),
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
      return apiSDK.appstoreApi.postAdminPaymentsAppstoreAppleProducts(
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
      return apiSDK.appstoreApi.putAdminPaymentsAppstoreAppleProducts(
        variables.productId,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useGetAdminPaymentsAppstoreGoogleProducts(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsAppstoreGoogleProducts'],
    queryFn: () => apiSDK.appstoreApi.getAdminPaymentsAppstoreGoogleProducts(),
    ...queryOptions,
  });
}

export function usePostAdminPaymentsAppstoreGoogleProducts(
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
      return apiSDK.appstoreApi.postAdminPaymentsAppstoreGoogleProducts(
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
      { sku: string | number; data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      sku: string | number;
      data: Record<string, any>;
    }) => {
      return apiSDK.appstoreApi.putAdminPaymentsAppstoreGoogleProducts(
        variables.sku,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useGetAdminPaymentsAppstoreReviews(
  options?: {
    platform?: string;
    appId?: string;
    rating?: number;
    startDate?: string;
    endDate?: string;
    hasResponse?: boolean;
    page?: number;
    limit?: number;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminPaymentsAppstoreReviews',
      options?.platform,
      options?.appId,
      options?.rating,
      options?.startDate,
      options?.endDate,
      options?.hasResponse,
      options?.page,
      options?.limit,
    ],
    queryFn: () =>
      apiSDK.appstoreApi.getAdminPaymentsAppstoreReviews(
        options?.platform,
        options?.appId,
        options?.rating,
        options?.startDate,
        options?.endDate,
        options?.hasResponse,
        options?.page,
        options?.limit
      ),
    ...queryOptions,
  });
}

export function usePostAdminPaymentsAppstoreReviewsRespond(
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
      return apiSDK.appstoreApi.postAdminPaymentsAppstoreReviewsRespond(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAdminPaymentsAppstoreSync(
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
      return apiSDK.appstoreApi.postAdminPaymentsAppstoreSync(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAdminPaymentsAppstoreWebhookValidate(
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
      return apiSDK.appstoreApi.postAdminPaymentsAppstoreWebhookValidate(
        variables.data
      );
    },
    ...mutationOptions,
  });
}
