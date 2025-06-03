import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function usePostAuthOrganizationCreate(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthOrganizationCreateResponseType,
      Error,
      { data: PostAuthOrganizationCreateRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      data: PostAuthOrganizationCreateRequestType;
    }) => {
      return apiSDK.organizationApi.postAuthOrganizationCreate(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthOrganizationUpdate(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthOrganizationUpdateResponseType,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.organizationApi.postAuthOrganizationUpdate(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthOrganizationDelete(
  mutationOptions?: Omit<
    UseMutationOptions<string, Error, { data: Record<string, any> }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.organizationApi.postAuthOrganizationDelete(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthOrganizationSetactive(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthOrganizationSetactiveResponseType,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.organizationApi.postAuthOrganizationSetactive(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useGetAuthOrganizationGetfullorganization(
  queryOptions?: Omit<
    UseQueryOptions<GetAuthOrganizationGetfullorganizationResponseType, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthOrganizationGetfullorganization'],
    queryFn: () =>
      apiSDK.organizationApi.getAuthOrganizationGetfullorganization(),
    ...queryOptions,
  });
}

export function useGetAuthOrganizationList(
  queryOptions?: Omit<
    UseQueryOptions<GetAuthOrganizationListResponseItemType[], Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthOrganizationList'],
    queryFn: () => apiSDK.organizationApi.getAuthOrganizationList(),
    ...queryOptions,
  });
}

export function usePostAuthOrganizationInvitemember(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthOrganizationInvitememberResponseType,
      Error,
      { data: PostAuthOrganizationInvitememberRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      data: PostAuthOrganizationInvitememberRequestType;
    }) => {
      return apiSDK.organizationApi.postAuthOrganizationInvitemember(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAuthOrganizationCancelinvitation(
  mutationOptions?: Omit<
    UseMutationOptions<unknown, Error, { data: Record<string, any> }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.organizationApi.postAuthOrganizationCancelinvitation(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAuthOrganizationAcceptinvitation(
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
      return apiSDK.organizationApi.postAuthOrganizationAcceptinvitation(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useGetAuthOrganizationGetinvitation(
  options?: { id?: string },
  queryOptions?: Omit<
    UseQueryOptions<GetAuthOrganizationGetinvitationResponseType, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthOrganizationGetinvitation', options?.id],
    queryFn: () =>
      apiSDK.organizationApi.getAuthOrganizationGetinvitation(options?.id),
    ...queryOptions,
  });
}

export function usePostAuthOrganizationRejectinvitation(
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
      return apiSDK.organizationApi.postAuthOrganizationRejectinvitation(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAuthOrganizationCheckslug(
  mutationOptions?: Omit<
    UseMutationOptions<unknown, Error, { data: Record<string, any> }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.organizationApi.postAuthOrganizationCheckslug(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAuthOrganizationRemovemember(
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
      return apiSDK.organizationApi.postAuthOrganizationRemovemember(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAuthOrganizationUpdatememberrole(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostAuthOrganizationUpdatememberroleRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      data: PostAuthOrganizationUpdatememberroleRequestType;
    }) => {
      return apiSDK.organizationApi.postAuthOrganizationUpdatememberrole(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useGetAuthOrganizationGetactivemember(
  queryOptions?: Omit<
    UseQueryOptions<GetAuthOrganizationGetactivememberResponseType, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthOrganizationGetactivemember'],
    queryFn: () => apiSDK.organizationApi.getAuthOrganizationGetactivemember(),
    ...queryOptions,
  });
}

export function usePostAuthOrganizationLeave(
  mutationOptions?: Omit<
    UseMutationOptions<unknown, Error, { data: Record<string, any> }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.organizationApi.postAuthOrganizationLeave(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAuthOrganizationListinvitations(
  queryOptions?: Omit<UseQueryOptions<unknown, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['getAuthOrganizationListinvitations'],
    queryFn: () => apiSDK.organizationApi.getAuthOrganizationListinvitations(),
    ...queryOptions,
  });
}

export function usePostAuthOrganizationCreateteam(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthOrganizationCreateteamResponseType,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.organizationApi.postAuthOrganizationCreateteam(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useGetAuthOrganizationListteams(
  queryOptions?: Omit<
    UseQueryOptions<GetAuthOrganizationListteamsResponseItemType[], Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAuthOrganizationListteams'],
    queryFn: () => apiSDK.organizationApi.getAuthOrganizationListteams(),
    ...queryOptions,
  });
}

export function usePostAuthOrganizationRemoveteam(
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
      return apiSDK.organizationApi.postAuthOrganizationRemoveteam(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAuthOrganizationUpdateteam(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAuthOrganizationUpdateteamResponseType,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.organizationApi.postAuthOrganizationUpdateteam(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAuthOrganizationHaspermission(
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
      return apiSDK.organizationApi.postAuthOrganizationHaspermission(
        variables.data
      );
    },
    ...mutationOptions,
  });
}
