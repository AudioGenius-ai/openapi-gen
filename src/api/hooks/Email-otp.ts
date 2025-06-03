import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function usePostAuthEmailotpSendverificationotp(
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
      return apiSDK.emailOtpApi.postAuthEmailotpSendverificationotp(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAuthEmailotpVerifyemail(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthEmailotpVerifyemailResponseType,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.emailOtpApi.postAuthEmailotpVerifyemail(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthSigninEmailotp(
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
      return apiSDK.emailOtpApi.postAuthSigninEmailotp(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthForgetpasswordEmailotp(
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
      return apiSDK.emailOtpApi.postAuthForgetpasswordEmailotp(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthEmailotpResetpassword(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostAuthEmailotpResetpasswordRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      data: PostAuthEmailotpResetpasswordRequestType;
    }) => {
      return apiSDK.emailOtpApi.postAuthEmailotpResetpassword(variables.data);
    },
    ...mutationOptions,
  });
}
