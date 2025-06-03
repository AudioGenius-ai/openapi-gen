import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface PostAdminPaymentsAppstoreSyncRequestType {
  platform: 'apple';
  google;
  appId: string;
  force?: boolean;
}

export const PostAdminPaymentsAppstoreSyncRequestTypeSchema = z.object({
  platform: z.enum(['apple', 'google']),
  appId: z.string().min(1),
  force: z.boolean().optional(),
});

export interface PostAdminPaymentsAppstoreSyncResponseType {
  platform: string;
  appId: string;
  synced: number;
  created: number;
  updated: number;
  errors: string[];
  lastSyncAt: string;
}

export const PostAdminPaymentsAppstoreSyncResponseTypeSchema = z.object({
  platform: z.string(),
  appId: z.string(),
  synced: z.number(),
  created: z.number(),
  updated: z.number(),
  errors: z.array(z.string()),
  lastSyncAt: z.string().datetime(),
});

export interface PostAdminPaymentsProductsSyncRequestPlatformsIntersection1Type {
  enableAppStores: boolean;
  enablePaymentProvider: boolean;
  appleAppId?: string;
  googlePackageName?: string;
}

export const PostAdminPaymentsProductsSyncRequestPlatformsIntersection1TypeSchema =
  z.object({
    enableAppStores: z.boolean(),
    enablePaymentProvider: z.boolean(),
    appleAppId: z.string().optional(),
    googlePackageName: z.string().optional(),
  });

export interface PostAdminPaymentsProductsSyncResponseType {
  success: boolean;
  synced: number;
  errors: string[];
  message: string;
}

export const PostAdminPaymentsProductsSyncResponseTypeSchema = z.object({
  success: z.boolean(),
  synced: z.number(),
  errors: z.array(z.string()),
  message: z.string(),
});

export class SyncApi extends ApiClient {
  postAdminPaymentsAppstoreSync(
    data: PostAdminPaymentsAppstoreSyncRequestType
  ): Promise<PostAdminPaymentsAppstoreSyncResponseType> {
    return this.post(
      `/admin/payments/appstore/sync`,
      PostAdminPaymentsAppstoreSyncResponseTypeSchema,
      { body: data, bodySchema: PostAdminPaymentsAppstoreSyncRequestTypeSchema }
    );
  }

  postAdminPaymentsProductsSync(
    data: Record<string, any>
  ): Promise<PostAdminPaymentsProductsSyncResponseType> {
    return this.post(
      `/admin/payments/products/sync`,
      PostAdminPaymentsProductsSyncResponseTypeSchema,
      {
        body: data,
        bodySchema: z.object({
          platforms:
            PostAdminPaymentsProductsSyncRequestPlatformsIntersection1TypeSchema.and(
              z.unknown()
            ),
        }),
      }
    );
  }
}
