import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetOrganizations(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getOrganizations'],
    queryFn: () => apiSDK.organizationsApi.getOrganizations(),
    ...queryOptions,
  });
}

export function usePostOrganizations(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: PostOrganizationsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: PostOrganizationsRequestType }) => {
      return apiSDK.organizationsApi.postOrganizations(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetOrganizations(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getOrganizations', id],
    queryFn: () => apiSDK.organizationsApi.getOrganizations(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePutOrganizations(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data?: PutOrganizationsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data?: PutOrganizationsRequestType;
    }) => {
      return apiSDK.organizationsApi.putOrganizations(
        variables.id,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useDeleteOrganizations(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.organizationsApi.deleteOrganizations(variables.id);
    },
    ...mutationOptions,
  });
}

export function usePostOrganizationsSetactive(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.organizationsApi.postOrganizationsSetactive(variables.id);
    },
    ...mutationOptions,
  });
}

export function usePostOrganizationsMembers(
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
      return apiSDK.organizationsApi.postOrganizationsMembers(
        variables.id,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePutOrganizationsMembers(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      {
        id: string | number;
        memberId: string | number;
        data?: Record<string, any>;
      }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      memberId: string | number;
      data?: Record<string, any>;
    }) => {
      return apiSDK.organizationsApi.putOrganizationsMembers(
        variables.id,
        variables.memberId,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useDeleteOrganizationsMembers(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; memberId: string | number }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      memberId: string | number;
    }) => {
      return apiSDK.organizationsApi.deleteOrganizationsMembers(
        variables.id,
        variables.memberId
      );
    },
    ...mutationOptions,
  });
}
