import { ApiClient } from '../ApiClient';
import { z } from 'zod';

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

  postAdminAssets(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/admin/assets`,
      z.object({
        asset: z.object({
          id: z.string().uuid(),
          url: z.string(),
          filename: z.string(),
          alt: z.string(),
          assetType: z.enum(['image', 'video', 'document', 'audio']),
          mimeType: z.string(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
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
        }),
      }
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
        assets: z.array(
          z.object({
            id: z.string().uuid(),
            url: z.string(),
            filename: z.string(),
            alt: z.string(),
            assetType: z.enum(['image', 'video', 'document', 'audio']),
            mimeType: z.string(),
          })
        ),
        pagination: z.object({
          currentPage: z.number(),
          totalPages: z.number(),
          pageSize: z.number(),
          totalEntries: z.number(),
        }),
      }),
      { queryParams: { page, pageSize, search } }
    );
  }

  patchAdminAssets(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/assets/${id}`,
      z.object({
        assetId: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          alt: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
        }),
      }
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
