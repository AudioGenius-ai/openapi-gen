import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function usePostAuthTwofactorGettotpuri(
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
      return apiSDK.twoFactorApi.postAuthTwofactorGettotpuri(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthTwofactorVerifytotp(
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
      return apiSDK.twoFactorApi.postAuthTwofactorVerifytotp(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthTwofactorSendotp(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, void>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: () => apiSDK.twoFactorApi.postAuthTwofactorSendotp(),
    ...mutationOptions,
  });
}

export function usePostAuthTwofactorVerifyotp(
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
      return apiSDK.twoFactorApi.postAuthTwofactorVerifyotp(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthTwofactorVerifybackupcode(
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
      return apiSDK.twoFactorApi.postAuthTwofactorVerifybackupcode(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAuthTwofactorGeneratebackupcodes(
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
      return apiSDK.twoFactorApi.postAuthTwofactorGeneratebackupcodes(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAuthTwofactorEnable(
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
      return apiSDK.twoFactorApi.postAuthTwofactorEnable(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthTwofactorDisable(
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
      return apiSDK.twoFactorApi.postAuthTwofactorDisable(variables.data);
    },
    ...mutationOptions,
  });
}
