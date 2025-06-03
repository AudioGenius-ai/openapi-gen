import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function usePostNotificationsTokenRegister(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: Record<string, any> }) => {
      return apiSDK.notificationsApi.postNotificationsTokenRegister(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useDeleteNotificationsToken(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { token: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { token: string | number }) => {
      return apiSDK.notificationsApi.deleteNotificationsToken(variables.token);
    },
    ...mutationOptions,
  });
}

export function useGetNotifications(
  options?: { limit?: string; offset?: string; status?: string },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getNotifications',
      options?.limit,
      options?.offset,
      options?.status,
    ],
    queryFn: () =>
      apiSDK.notificationsApi.getNotifications(
        options?.limit,
        options?.offset,
        options?.status
      ),
    ...queryOptions,
  });
}

export function usePostNotificationsRead(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.notificationsApi.postNotificationsRead(variables.id);
    },
    ...mutationOptions,
  });
}

export function usePostNotificationsDelivered(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.notificationsApi.postNotificationsDelivered(variables.id);
    },
    ...mutationOptions,
  });
}

export function usePostNotificationsSend(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: Record<string, any> }) => {
      return apiSDK.notificationsApi.postNotificationsSend(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetUsersMeNotificationsettings(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getUsersMeNotificationsettings'],
    queryFn: () => apiSDK.notificationsApi.getUsersMeNotificationsettings(),
    ...queryOptions,
  });
}

export function usePutUsersMeNotificationsettings(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: Record<string, any> }) => {
      return apiSDK.notificationsApi.putUsersMeNotificationsettings(
        variables.data
      );
    },
    ...mutationOptions,
  });
}
