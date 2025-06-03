import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function usePostAuthSigninAnonymous(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, void>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: () => apiSDK.anonymousApi.postAuthSigninAnonymous(),
    ...mutationOptions,
  });
}
