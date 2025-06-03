import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetUsers(
  options?: { page?: string; limit?: string; q?: string },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getUsers', options?.page, options?.limit, options?.q],
    queryFn: () =>
      apiSDK.usersApi.getUsers(options?.page, options?.limit, options?.q),
    ...queryOptions,
  });
}

export function useGetUsers(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getUsers', id],
    queryFn: () => apiSDK.usersApi.getUsers(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePutUsers(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data?: Record<string, any>;
    }) => {
      return apiSDK.usersApi.putUsers(variables.id, variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostUsersAvatar(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data?: Record<string, any>;
    }) => {
      return apiSDK.usersApi.postUsersAvatar(variables.id, variables.data);
    },
    ...mutationOptions,
  });
}

export function useDeleteUsersAvatar(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.usersApi.deleteUsersAvatar(variables.id);
    },
    ...mutationOptions,
  });
}

export function usePostUsersAvatarVerify(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data?: Record<string, any>;
    }) => {
      return apiSDK.usersApi.postUsersAvatarVerify(
        variables.id,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostUsersEmail(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data?: Record<string, any>;
    }) => {
      return apiSDK.usersApi.postUsersEmail(variables.id, variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostUsersPassword(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data?: Record<string, any>;
    }) => {
      return apiSDK.usersApi.postUsersPassword(variables.id, variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAdminUsers(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminUsers'],
    queryFn: () => apiSDK.usersApi.getAdminUsers(),
    ...queryOptions,
  });
}

export function useGetAdminUsers(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminUsers', id],
    queryFn: () => apiSDK.usersApi.getAdminUsers(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePatchAdminUsers(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data: Record<string, any>;
    }) => {
      return apiSDK.usersApi.patchAdminUsers(variables.id, variables.data);
    },
    ...mutationOptions,
  });
}

export function useDeleteAdminUsers(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.usersApi.deleteAdminUsers(variables.id);
    },
    ...mutationOptions,
  });
}
