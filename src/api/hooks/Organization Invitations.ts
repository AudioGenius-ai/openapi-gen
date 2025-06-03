import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetOrganizationsInvitations(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getOrganizationsInvitations', id],
    queryFn: () =>
      apiSDK.organizationInvitationsApi.getOrganizationsInvitations(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePostOrganizationsInvitations(
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
      return apiSDK.organizationInvitationsApi.postOrganizationsInvitations(
        variables.id,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostOrganizationsInvitationsAccept(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; invitationId: string | number }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      invitationId: string | number;
    }) => {
      return apiSDK.organizationInvitationsApi.postOrganizationsInvitationsAccept(
        variables.id,
        variables.invitationId
      );
    },
    ...mutationOptions,
  });
}

export function usePutOrganizationsInvitations(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      {
        id: string | number;
        invitationId: string | number;
        data?: Record<string, any>;
      }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      invitationId: string | number;
      data?: Record<string, any>;
    }) => {
      return apiSDK.organizationInvitationsApi.putOrganizationsInvitations(
        variables.id,
        variables.invitationId,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useDeleteOrganizationsInvitations(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; invitationId: string | number }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      invitationId: string | number;
    }) => {
      return apiSDK.organizationInvitationsApi.deleteOrganizationsInvitations(
        variables.id,
        variables.invitationId
      );
    },
    ...mutationOptions,
  });
}
