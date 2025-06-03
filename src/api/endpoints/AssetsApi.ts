import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface PostAdminAssetsRequestType {
  key: string;
  filename: string;
  contentType: string;
  fileSize: number;
  assetType: 'image';
  video;
  document;
  audio;
  altText?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  duration?: number;
}

export const PostAdminAssetsRequestTypeSchema = z.object({
  key: z.string().min(1),
  filename: z.string().min(1),
  contentType: z.string().min(1),
  fileSize: z.number().int().min(0),
  assetType: z.enum(['image', 'video', 'document', 'audio']),
  altText: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  width: z.number().int().min(0).optional(),
  height: z.number().int().min(0).optional(),
  duration: z.number().int().min(0).optional(),
});

export interface PostAdminAssetsResponseAssetType {
  id: string;
  url: string;
  filename: string;
  alt: string;
  assetType: 'image';
  video;
  document;
  audio;
  mimeType: string;
}

export const PostAdminAssetsResponseAssetTypeSchema = z.object({
  id: z.string().uuid(),
  url: z.string(),
  filename: z.string(),
  alt: z.string(),
  assetType: z.enum(['image', 'video', 'document', 'audio']),
  mimeType: z.string(),
});

export interface GetAdminAssetsListResponseAssetsItemType {
  id: string;
  url: string;
  filename: string;
  alt: string;
  assetType: 'image';
  video;
  document;
  audio;
  mimeType: string;
}

export const GetAdminAssetsListResponseAssetsItemTypeSchema = z.object({
  id: z.string().uuid(),
  url: z.string(),
  filename: z.string(),
  alt: z.string(),
  assetType: z.enum(['image', 'video', 'document', 'audio']),
  mimeType: z.string(),
});

export interface GetAdminAssetsListResponsePaginationType {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalEntries: number;
}

export const GetAdminAssetsListResponsePaginationTypeSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  pageSize: z.number(),
  totalEntries: z.number(),
});

export interface PatchAdminAssetsRequestType {
  alt?: string;
  title?: string;
  description?: string;
}

export const PatchAdminAssetsRequestTypeSchema = z.object({
  alt: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export class AssetsApi extends ApiClient {
  postAdminAssetsGenerateuploadurl(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/assets/generate-upload-url`,
      z.object({
        signedUrl: z.string().url(),
        key: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          filename: z.string().min(1),
          contentType: z.string().min(1),
        }),
      }
    );
  }

  postAdminAssets(
    data: PostAdminAssetsRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/assets`,
      z.object({
        asset: PostAdminAssetsResponseAssetTypeSchema,
      }),
      { body: data, bodySchema: PostAdminAssetsRequestTypeSchema }
    );
  }

  getAdminAssetsList(
    page?: string,
    pageSize?: string,
    search?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/assets/list`,
      z.object({
        assets: z.array(GetAdminAssetsListResponseAssetsItemTypeSchema),
        pagination: GetAdminAssetsListResponsePaginationTypeSchema,
      }),
      { queryParams: { page, pageSize, search } }
    );
  }

  patchAdminAssets(
    id: string | number,
    data?: PatchAdminAssetsRequestType
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/assets/${id}`,
      z.object({
        assetId: z.string(),
      }),
      { body: data, bodySchema: PatchAdminAssetsRequestTypeSchema }
    );
  }

  deleteAdminAssets(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/assets/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }
}
