import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiSDK } from '../ApiSDK';

const apiSDK = new ApiSDK(process.env.REACT_APP_API_BASE_URL || '');

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
      return apiSDK.assetsApi.postAdminAssetsGenerateuploadurl(variables.data);
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
      return apiSDK.assetsApi.postAdminAssets(variables.data);
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
      apiSDK.assetsApi.getAdminAssetsList(
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
      return apiSDK.assetsApi.patchAdminAssets(variables.id, variables.data);
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
      return apiSDK.assetsApi.deleteAdminAssets(variables.id);
    },
    ...mutationOptions,
  });
}
