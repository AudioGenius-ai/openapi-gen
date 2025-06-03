import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class SyncApi extends ApiClient {
  postAdminPaymentsAppstoreSync(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/sync`,
      z.object({
        platform: z.string(),
        appId: z.string(),
        synced: z.number(),
        created: z.number(),
        updated: z.number(),
        errors: z.array(z.string()),
        lastSyncAt: z.string().datetime(),
      }),
      {
        body: data,
        bodySchema: z.object({
          platform: z.enum(['apple', 'google']),
          appId: z.string().min(1),
          force: z.boolean().optional(),
        }),
      }
    );
  }

  postAdminPaymentsProductsSync(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/products/sync`,
      z.object({
        success: z.boolean(),
        synced: z.number(),
        errors: z.array(z.string()),
        message: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          platforms: z
            .object({
              enableAppStores: z.boolean(),
              enablePaymentProvider: z.boolean(),
              appleAppId: z.string().optional(),
              googlePackageName: z.string().optional(),
            })
            .and(z.unknown()),
        }),
      }
    );
  }
}
