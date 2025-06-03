import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useSetRole(
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
      return apiSDK.adminApi.setRole(variables.data);
    },
    ...mutationOptions,
  });
}

export function useCreateUser(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: CreateUserRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: CreateUserRequestType }) => {
      return apiSDK.adminApi.createUser(variables.data);
    },
    ...mutationOptions,
  });
}

export function useListUsers(
  options?: {
    searchValue?: string;
    searchField?: string;
    searchOperator?: string;
    limit?: string;
    offset?: string;
    sortBy?: string;
    sortDirection?: string;
    filterField?: string;
    filterValue?: string;
    filterOperator?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<ListUsersResponseType, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'listUsers',
      options?.searchValue,
      options?.searchField,
      options?.searchOperator,
      options?.limit,
      options?.offset,
      options?.sortBy,
      options?.sortDirection,
      options?.filterField,
      options?.filterValue,
      options?.filterOperator,
    ],
    queryFn: () =>
      apiSDK.adminApi.listUsers(
        options?.searchValue,
        options?.searchField,
        options?.searchOperator,
        options?.limit,
        options?.offset,
        options?.sortBy,
        options?.sortDirection,
        options?.filterField,
        options?.filterValue,
        options?.filterOperator
      ),
    ...queryOptions,
  });
}

export function useListUserSessions(
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
      return apiSDK.adminApi.listUserSessions(variables.data);
    },
    ...mutationOptions,
  });
}

export function useUnbanUser(
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
      return apiSDK.adminApi.unbanUser(variables.data);
    },
    ...mutationOptions,
  });
}

export function useBanUser(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: BanUserRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: BanUserRequestType }) => {
      return apiSDK.adminApi.banUser(variables.data);
    },
    ...mutationOptions,
  });
}

export function useImpersonateUser(
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
      return apiSDK.adminApi.impersonateUser(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthAdminStopimpersonating(
  mutationOptions?: Omit<UseMutationOptions<unknown, Error, void>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: () => apiSDK.adminApi.postAuthAdminStopimpersonating(),
    ...mutationOptions,
  });
}

export function useRevokeUserSession(
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
      return apiSDK.adminApi.revokeUserSession(variables.data);
    },
    ...mutationOptions,
  });
}

export function useRevokeUserSessions(
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
      return apiSDK.adminApi.revokeUserSessions(variables.data);
    },
    ...mutationOptions,
  });
}

export function useRemoveUser(
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
      return apiSDK.adminApi.removeUser(variables.data);
    },
    ...mutationOptions,
  });
}

export function useSetUserPassword(
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
      return apiSDK.adminApi.setUserPassword(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAuthAdminHaspermission(
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
      return apiSDK.adminApi.postAuthAdminHaspermission(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAdminAssetsGenerateuploadurl(
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
      return apiSDK.adminApi.postAdminAssetsGenerateuploadurl(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAdminAssets(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostAdminAssetsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostAdminAssetsRequestType }) => {
      return apiSDK.adminApi.postAdminAssets(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAdminAssetsList(
  options?: { page?: string; pageSize?: string; search?: string },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminAssetsList',
      options?.page,
      options?.pageSize,
      options?.search,
    ],
    queryFn: () =>
      apiSDK.adminApi.getAdminAssetsList(
        options?.page,
        options?.pageSize,
        options?.search
      ),
    ...queryOptions,
  });
}

export function usePatchAdminAssets(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data?: PatchAdminAssetsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data?: PatchAdminAssetsRequestType;
    }) => {
      return apiSDK.adminApi.patchAdminAssets(variables.id, variables.data);
    },
    ...mutationOptions,
  });
}

export function useDeleteAdminAssets(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.adminApi.deleteAdminAssets(variables.id);
    },
    ...mutationOptions,
  });
}

export function useGetAdminWaitlist(
  options?: {
    page?: string;
    pageSize?: string;
    search?: string;
    status?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminWaitlist',
      options?.page,
      options?.pageSize,
      options?.search,
      options?.status,
    ],
    queryFn: () =>
      apiSDK.adminApi.getAdminWaitlist(
        options?.page,
        options?.pageSize,
        options?.search,
        options?.status
      ),
    ...queryOptions,
  });
}

export function usePatchAdminWaitlist(
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
      return apiSDK.adminApi.patchAdminWaitlist(variables.id, variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAdminBlogPosts(
  options?: {
    search?: string;
    filter?: string;
    category?: string;
    sort?: string;
    page?: number;
  },
  queryOptions?: Omit<
    UseQueryOptions<GetAdminBlogPostsResponseType, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminBlogPosts',
      options?.search,
      options?.filter,
      options?.category,
      options?.sort,
      options?.page,
    ],
    queryFn: () =>
      apiSDK.adminApi.getAdminBlogPosts(
        options?.search,
        options?.filter,
        options?.category,
        options?.sort,
        options?.page
      ),
    ...queryOptions,
  });
}

export function usePostAdminBlogPosts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: PostAdminBlogPostsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: PostAdminBlogPostsRequestType }) => {
      return apiSDK.adminApi.postAdminBlogPosts(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAdminBlogPosts(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminBlogPosts', id],
    queryFn: () => apiSDK.adminApi.getAdminBlogPosts(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePatchAdminBlogPosts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data?: PatchAdminBlogPostsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data?: PatchAdminBlogPostsRequestType;
    }) => {
      return apiSDK.adminApi.patchAdminBlogPosts(variables.id, variables.data);
    },
    ...mutationOptions,
  });
}

export function useDeleteAdminBlogPosts(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.adminApi.deleteAdminBlogPosts(variables.id);
    },
    ...mutationOptions,
  });
}

export function usePostAdminBlogPostsAutosave(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAdminBlogPostsAutosaveResponseType,
      Error,
      { data?: PostAdminBlogPostsAutosaveRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      data?: PostAdminBlogPostsAutosaveRequestType;
    }) => {
      return apiSDK.adminApi.postAdminBlogPostsAutosave(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAdminBlogCategories(
  options?: { search?: string; page?: number },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminBlogCategories', options?.search, options?.page],
    queryFn: () =>
      apiSDK.adminApi.getAdminBlogCategories(options?.search, options?.page),
    ...queryOptions,
  });
}

export function usePostAdminBlogCategories(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data?: PostAdminBlogCategoriesRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: PostAdminBlogCategoriesRequestType }) => {
      return apiSDK.adminApi.postAdminBlogCategories(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePatchAdminBlogCategories(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data?: PatchAdminBlogCategoriesRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data?: PatchAdminBlogCategoriesRequestType;
    }) => {
      return apiSDK.adminApi.patchAdminBlogCategories(
        variables.id,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useDeleteAdminBlogCategories(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.adminApi.deleteAdminBlogCategories(variables.id);
    },
    ...mutationOptions,
  });
}

export function useGetAdminBlogTags(
  options?: { search?: string; page?: number },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminBlogTags', options?.search, options?.page],
    queryFn: () =>
      apiSDK.adminApi.getAdminBlogTags(options?.search, options?.page),
    ...queryOptions,
  });
}

export function usePostAdminBlogTags(
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
      return apiSDK.adminApi.postAdminBlogTags(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePatchAdminBlogTags(
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
      return apiSDK.adminApi.patchAdminBlogTags(variables.id, variables.data);
    },
    ...mutationOptions,
  });
}

export function useDeleteAdminBlogTags(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.adminApi.deleteAdminBlogTags(variables.id);
    },
    ...mutationOptions,
  });
}

export function useGetAdminCustomers(
  options?: {
    limit?: string;
    offset?: string;
    provider?: string;
    userId?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminCustomers',
      options?.limit,
      options?.offset,
      options?.provider,
      options?.userId,
    ],
    queryFn: () =>
      apiSDK.adminApi.getAdminCustomers(
        options?.limit,
        options?.offset,
        options?.provider,
        options?.userId
      ),
    ...queryOptions,
  });
}

export function useGetAdminCustomers(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminCustomers', id],
    queryFn: () => apiSDK.adminApi.getAdminCustomers(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePatchAdminCustomers(
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
      return apiSDK.adminApi.patchAdminCustomers(variables.id, variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAdminCustomersProvider(
  providerCustomerId: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminCustomersProvider', providerCustomerId],
    queryFn: () =>
      apiSDK.adminApi.getAdminCustomersProvider(providerCustomerId),
    enabled: providerCustomerId != null,
    ...queryOptions,
  });
}

export function useGetAdminPaymentsAppstoreAppleProducts(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsAppstoreAppleProducts'],
    queryFn: () => apiSDK.adminApi.getAdminPaymentsAppstoreAppleProducts(),
    ...queryOptions,
  });
}

export function usePostAdminPaymentsAppstoreAppleProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostAdminPaymentsAppstoreAppleProductsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      data: PostAdminPaymentsAppstoreAppleProductsRequestType;
    }) => {
      return apiSDK.adminApi.postAdminPaymentsAppstoreAppleProducts(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePutAdminPaymentsAppstoreAppleProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      {
        productId: string | number;
        data: PutAdminPaymentsAppstoreAppleProductsRequestType;
      }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      productId: string | number;
      data: PutAdminPaymentsAppstoreAppleProductsRequestType;
    }) => {
      return apiSDK.adminApi.putAdminPaymentsAppstoreAppleProducts(
        variables.productId,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useGetAdminPaymentsAppstoreGoogleProducts(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsAppstoreGoogleProducts'],
    queryFn: () => apiSDK.adminApi.getAdminPaymentsAppstoreGoogleProducts(),
    ...queryOptions,
  });
}

export function usePostAdminPaymentsAppstoreGoogleProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostAdminPaymentsAppstoreGoogleProductsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      data: PostAdminPaymentsAppstoreGoogleProductsRequestType;
    }) => {
      return apiSDK.adminApi.postAdminPaymentsAppstoreGoogleProducts(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePutAdminPaymentsAppstoreGoogleProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      {
        sku: string | number;
        data: PutAdminPaymentsAppstoreGoogleProductsRequestType;
      }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      sku: string | number;
      data: PutAdminPaymentsAppstoreGoogleProductsRequestType;
    }) => {
      return apiSDK.adminApi.putAdminPaymentsAppstoreGoogleProducts(
        variables.sku,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useGetAdminPaymentsAppstoreReviews(
  options?: {
    platform?: string;
    appId?: string;
    rating?: number;
    startDate?: string;
    endDate?: string;
    hasResponse?: boolean;
    page?: number;
    limit?: number;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminPaymentsAppstoreReviews',
      options?.platform,
      options?.appId,
      options?.rating,
      options?.startDate,
      options?.endDate,
      options?.hasResponse,
      options?.page,
      options?.limit,
    ],
    queryFn: () =>
      apiSDK.adminApi.getAdminPaymentsAppstoreReviews(
        options?.platform,
        options?.appId,
        options?.rating,
        options?.startDate,
        options?.endDate,
        options?.hasResponse,
        options?.page,
        options?.limit
      ),
    ...queryOptions,
  });
}

export function usePostAdminPaymentsAppstoreReviewsRespond(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAdminPaymentsAppstoreReviewsRespondResponseType,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.adminApi.postAdminPaymentsAppstoreReviewsRespond(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function usePostAdminPaymentsAppstoreSync(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAdminPaymentsAppstoreSyncResponseType,
      Error,
      { data: PostAdminPaymentsAppstoreSyncRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      data: PostAdminPaymentsAppstoreSyncRequestType;
    }) => {
      return apiSDK.adminApi.postAdminPaymentsAppstoreSync(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePostAdminPaymentsAppstoreWebhookValidate(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAdminPaymentsAppstoreWebhookValidateResponseType,
      Error,
      { data: PostAdminPaymentsAppstoreWebhookValidateRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      data: PostAdminPaymentsAppstoreWebhookValidateRequestType;
    }) => {
      return apiSDK.adminApi.postAdminPaymentsAppstoreWebhookValidate(
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useGetAdminPaymentsProducts(
  options?: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    platform?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminPaymentsProducts',
      options?.page,
      options?.limit,
      options?.search,
      options?.type,
      options?.platform,
    ],
    queryFn: () =>
      apiSDK.adminApi.getAdminPaymentsProducts(
        options?.page,
        options?.limit,
        options?.search,
        options?.type,
        options?.platform
      ),
    ...queryOptions,
  });
}

export function usePostAdminPaymentsProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { data: PostAdminPaymentsProductsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: PostAdminPaymentsProductsRequestType }) => {
      return apiSDK.adminApi.postAdminPaymentsProducts(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAdminPaymentsProducts(
  productId: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsProducts', productId],
    queryFn: () => apiSDK.adminApi.getAdminPaymentsProducts(productId),
    enabled: productId != null,
    ...queryOptions,
  });
}

export function usePutAdminPaymentsProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { productId: string | number; data: PutAdminPaymentsProductsRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      productId: string | number;
      data: PutAdminPaymentsProductsRequestType;
    }) => {
      return apiSDK.adminApi.putAdminPaymentsProducts(
        variables.productId,
        variables.data
      );
    },
    ...mutationOptions,
  });
}

export function useDeleteAdminPaymentsProducts(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { productId: string | number }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { productId: string | number }) => {
      return apiSDK.adminApi.deleteAdminPaymentsProducts(variables.productId);
    },
    ...mutationOptions,
  });
}

export function usePostAdminPaymentsProductsSync(
  mutationOptions?: Omit<
    UseMutationOptions<
      PostAdminPaymentsProductsSyncResponseType,
      Error,
      { data: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data: Record<string, any> }) => {
      return apiSDK.adminApi.postAdminPaymentsProductsSync(variables.data);
    },
    ...mutationOptions,
  });
}

export function useGetAdminPaymentsProductsPlatforms(
  productId: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsProductsPlatforms', productId],
    queryFn: () => apiSDK.adminApi.getAdminPaymentsProductsPlatforms(productId),
    enabled: productId != null,
    ...queryOptions,
  });
}

export function useGetAdminPaymentsProductsStats(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsProductsStats'],
    queryFn: () => apiSDK.adminApi.getAdminPaymentsProductsStats(),
    ...queryOptions,
  });
}

export function useGetAdminPaymentsCustomers(
  options?: {
    page?: number;
    limit?: number;
    search?: string;
    platform?: string;
    sortBy?: string;
    sortOrder?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminPaymentsCustomers',
      options?.page,
      options?.limit,
      options?.search,
      options?.platform,
      options?.sortBy,
      options?.sortOrder,
    ],
    queryFn: () =>
      apiSDK.adminApi.getAdminPaymentsCustomers(
        options?.page,
        options?.limit,
        options?.search,
        options?.platform,
        options?.sortBy,
        options?.sortOrder
      ),
    ...queryOptions,
  });
}

export function useGetAdminPaymentsCustomersStats(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsCustomersStats'],
    queryFn: () => apiSDK.adminApi.getAdminPaymentsCustomersStats(),
    ...queryOptions,
  });
}

export function useGetAdminPaymentsCustomers(
  customerId: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsCustomers', customerId],
    queryFn: () => apiSDK.adminApi.getAdminPaymentsCustomers(customerId),
    enabled: customerId != null,
    ...queryOptions,
  });
}

export function useGetAdminPaymentsCustomersTransactions(
  customerId: string | number,
  options?: {
    page?: number;
    limit?: number;
    platform?: string;
    status?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminPaymentsCustomersTransactions',
      customerId,
      options?.page,
      options?.limit,
      options?.platform,
      options?.status,
    ],
    queryFn: () =>
      apiSDK.adminApi.getAdminPaymentsCustomersTransactions(
        customerId,
        options?.page,
        options?.limit,
        options?.platform,
        options?.status
      ),
    enabled: customerId != null,
    ...queryOptions,
  });
}

export function useGetAdminPaymentsCustomersSubscriptions(
  customerId: string | number,
  options?: { status?: string; platform?: string },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminPaymentsCustomersSubscriptions',
      customerId,
      options?.status,
      options?.platform,
    ],
    queryFn: () =>
      apiSDK.adminApi.getAdminPaymentsCustomersSubscriptions(
        customerId,
        options?.status,
        options?.platform
      ),
    enabled: customerId != null,
    ...queryOptions,
  });
}

export function useGetAdminPaymentsTransactions(
  options?: {
    page?: number;
    limit?: number;
    platform?: string;
    status?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [
      'getAdminPaymentsTransactions',
      options?.page,
      options?.limit,
      options?.platform,
      options?.status,
    ],
    queryFn: () =>
      apiSDK.adminApi.getAdminPaymentsTransactions(
        options?.page,
        options?.limit,
        options?.platform,
        options?.status
      ),
    ...queryOptions,
  });
}

export function useGetAdminPaymentsTransactions(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminPaymentsTransactions', id],
    queryFn: () => apiSDK.adminApi.getAdminPaymentsTransactions(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePostAdminPaymentsTransactionsRefund(
  mutationOptions?: Omit<
    UseMutationOptions<Record<string, any>, Error, { id: string | number }>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { id: string | number }) => {
      return apiSDK.adminApi.postAdminPaymentsTransactionsRefund(variables.id);
    },
    ...mutationOptions,
  });
}

export function useGetAdminProducts(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminProducts'],
    queryFn: () => apiSDK.adminApi.getAdminProducts(),
    ...queryOptions,
  });
}

export function useGetAdminProducts(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminProducts', id],
    queryFn: () => apiSDK.adminApi.getAdminProducts(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function useGetAdminSubscriptions(
  options?: { customerId?: string; status?: string },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminSubscriptions', options?.customerId, options?.status],
    queryFn: () =>
      apiSDK.adminApi.getAdminSubscriptions(
        options?.customerId,
        options?.status
      ),
    ...queryOptions,
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
    queryFn: () => apiSDK.adminApi.getAdminUsers(),
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
    queryFn: () => apiSDK.adminApi.getAdminUsers(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePatchAdminUsers(
  mutationOptions?: Omit<
    UseMutationOptions<
      Record<string, any>,
      Error,
      { id: string | number; data: PatchAdminUsersRequestType }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: {
      id: string | number;
      data: PatchAdminUsersRequestType;
    }) => {
      return apiSDK.adminApi.patchAdminUsers(variables.id, variables.data);
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
      return apiSDK.adminApi.deleteAdminUsers(variables.id);
    },
    ...mutationOptions,
  });
}

export function useGetAdminStats(
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getAdminStats'],
    queryFn: () => apiSDK.adminApi.getAdminStats(),
    ...queryOptions,
  });
}
