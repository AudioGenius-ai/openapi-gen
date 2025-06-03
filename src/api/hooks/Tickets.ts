import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetSupport(
  options?: {
    organizationId?: string;
    status?: string;
    priority?: string;
    assigneeId?: string;
    limit?: number;
    offset?: number;
    q?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getSupport',
      options?.organizationId,
      options?.status,
      options?.priority,
      options?.assigneeId,
      options?.limit,
      options?.offset,
      options?.q,
    ],
    queryFn: () =>
      apiSDK.ticketsApi.getSupport(
        options?.organizationId,
        options?.status,
        options?.priority,
        options?.assigneeId,
        options?.limit,
        options?.offset,
        options?.q
      ),
    ...queryOptions,
  });
}

export function usePostSupport(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostSupportRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostSupportRequestType }) => {
      return apiSDK.ticketsApi.postSupport(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetSupport(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getSupport', id],
    queryFn: () => apiSDK.ticketsApi.getSupport(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePutSupport(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data: PutSupportRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data: PutSupportRequestType;
    }) => {
      return apiSDK.ticketsApi.putSupport(variables.id, variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetSupportTickets(
  ticketId: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getSupportTickets', ticketId],
    queryFn: () => apiSDK.ticketsApi.getSupportTickets(ticketId),
    enabled: ticketId != null,
    ...queryOptions,
  });
}
