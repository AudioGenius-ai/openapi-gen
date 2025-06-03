import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

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
      apiSDK.reviewsApi.getAdminPaymentsAppstoreReviews(
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
      return apiSDK.reviewsApi.postAdminPaymentsAppstoreReviewsRespond(
        variables.data
      );
    },
    ...mutationOptions,
  });
}
