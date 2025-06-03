import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class PlatformsApi extends ApiClient {
  getAdminPaymentsProductsPlatforms(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/${productId}/platforms`,
      z.object({
        productId: z.string(),
        platforms: z.object({
          paymentProvider: z
            .object({
              id: z.string(),
              status: z.enum(['active', 'inactive']),
            })
            .optional(),
          apple: z
            .object({
              id: z.string(),
              appId: z.string(),
              status: z.enum(['active', 'inactive']),
            })
            .optional(),
          google: z
            .object({
              sku: z.string(),
              packageName: z.string(),
              status: z.enum(['active', 'inactive']),
            })
            .optional(),
        }),
      })
    );
  }
}
