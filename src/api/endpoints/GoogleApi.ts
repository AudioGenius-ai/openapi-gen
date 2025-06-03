import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class GoogleApi extends ApiClient {
  getAdminPaymentsAppstoreGoogleProducts(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/appstore/google/products`,
      z.object({
        products: z.array(
          z.object({
            id: z.string(),
            packageName: z.string(),
            sku: z.string(),
            name: z.string(),
            type: z.string(),
            status: z.string(),
            price: z.number(),
            currency: z.string(),
            isActive: z.boolean(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          })
        ),
      })
    );
  }

  postAdminPaymentsAppstoreGoogleProducts(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/google/products`,
      z.object({
        product: z.object({
          id: z.string(),
          packageName: z.string(),
          sku: z.string(),
          name: z.string(),
          type: z.string(),
          status: z.string(),
          price: z.number(),
          currency: z.string(),
          isActive: z.boolean(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          packageName: z.string().min(1),
          sku: z.string().min(1),
          name: z.string().min(1),
          type: z.enum(['inapp', 'subs']),
          status: z.enum(['active', 'inactive']),
          price: z.number().min(0),
          currency: z.string().min(3).max(3),
          subscriptionPeriod: z.string().optional(),
          trialPeriod: z.string().optional(),
        }),
      }
    );
  }

  putAdminPaymentsAppstoreGoogleProducts(
    sku: string | number,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/appstore/google/products/${sku}`,
      z.object({
        product: z.object({
          id: z.string(),
          packageName: z.string(),
          sku: z.string(),
          name: z.string(),
          type: z.string(),
          status: z.string(),
          price: z.number(),
          currency: z.string(),
          isActive: z.boolean(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          sku: z.string().min(1).optional(),
          name: z.string().min(1).optional(),
          type: z.enum(['inapp', 'subs']).optional(),
          status: z.enum(['active', 'inactive']).optional(),
          price: z.number().min(0).optional(),
          currency: z.string().min(3).max(3).optional(),
          subscriptionPeriod: z.string().optional(),
          trialPeriod: z.string().optional(),
        }),
      }
    );
  }
}
