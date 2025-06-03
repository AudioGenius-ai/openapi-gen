import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function usePostAiChat(
  mutationOptions?: Omit<
    UseMutationOptions<unknown, Error, { data?: Record<string, any> }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: Record<string, any> }) => {
      return apiSDK.aiApi.postAiChat(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAiCompletion(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: PostAiCompletionRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: PostAiCompletionRequestType }) => {
      return apiSDK.aiApi.postAiCompletion(variables.data);
    },
    ...mutationOptions,
  });
}
