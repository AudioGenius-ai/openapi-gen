import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetUsersMeSubscription(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getUsersMeSubscription'],
    queryFn: () => apiSDK.subscriptionsApi.getUsersMeSubscription(),
    ...queryOptions,
  });
}
