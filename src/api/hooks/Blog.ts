import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

export function useGetBlogPosts(
  options?: { page?: number; limit?: number },
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getBlogPosts', options?.page, options?.limit],
    queryFn: () => apiSDK.blogApi.getBlogPosts(options?.page, options?.limit),
    ...queryOptions,
  });
}

export function useGetBlogPosts(
  id: string | number,
  queryOptions?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['getBlogPosts', id],
    queryFn: () => apiSDK.blogApi.getBlogPosts(id),
    enabled: id != null,
    ...queryOptions,
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
    UseQueryOptions<Record<string, any>, Error>,
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
      apiSDK.blogApi.getAdminBlogPosts(
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
      { data?: Record<string, any> }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: (variables: { data?: Record<string, any> }) => {
      return apiSDK.blogApi.postAdminBlogPosts(variables.data);
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
    queryFn: () => apiSDK.blogApi.getAdminBlogPosts(id),
    enabled: id != null,
    ...queryOptions,
  });
}

export function usePatchAdminBlogPosts(
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
      return apiSDK.blogApi.patchAdminBlogPosts(variables.id, variables.data);
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
      return apiSDK.blogApi.deleteAdminBlogPosts(variables.id);
    },
    ...mutationOptions,
  });
}

export function usePostAdminBlogPostsAutosave(
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
      return apiSDK.blogApi.postAdminBlogPostsAutosave(variables.data);
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
      apiSDK.blogApi.getAdminBlogCategories(options?.search, options?.page),
    ...queryOptions,
  });
}

export function usePostAdminBlogCategories(
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
      return apiSDK.blogApi.postAdminBlogCategories(variables.data);
    },
    ...mutationOptions,
  });
}

export function usePatchAdminBlogCategories(
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
      return apiSDK.blogApi.patchAdminBlogCategories(
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
      return apiSDK.blogApi.deleteAdminBlogCategories(variables.id);
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
      apiSDK.blogApi.getAdminBlogTags(options?.search, options?.page),
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
      return apiSDK.blogApi.postAdminBlogTags(variables.data);
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
      return apiSDK.blogApi.patchAdminBlogTags(variables.id, variables.data);
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
      return apiSDK.blogApi.deleteAdminBlogTags(variables.id);
    },
    ...mutationOptions,
  });
}
