import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function usePostAdminPaymentsAppstoreSync(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAdminPaymentsAppstoreSyncResponseType,
      Error,
      { data: PostAdminPaymentsAppstoreSyncRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      data: PostAdminPaymentsAppstoreSyncRequestType;
    }) => {
      return apiSDK.syncApi.postAdminPaymentsAppstoreSync(variables.data);
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
      return apiSDK.syncApi.postAdminPaymentsProductsSync(variables.data);
    },
    ...mutationOptions,
  });
}
