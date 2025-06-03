import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

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
      apiSDK.platformsApi.getAdminPaymentsProductsPlatforms(productId),
    enabled: productId != null,
    ...queryOptions,
  });
}
