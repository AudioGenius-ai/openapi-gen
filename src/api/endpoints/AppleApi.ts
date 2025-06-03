import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class AppleApi extends ApiClient {
  getAdminPaymentsAppstoreAppleProducts(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/appstore/apple/products`,
      z.object({
        products: z.array(
          z.object({
            id: z.string(),
            appId: z.string(),
            productId: z.string(),
            name: z.string(),
            type: z.string(),
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

  postAdminPaymentsAppstoreAppleProducts(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/apple/products`,
      z.object({
        product: z.object({
          id: z.string(),
          appId: z.string(),
          productId: z.string(),
          name: z.string(),
          type: z.string(),
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
          appId: z.string().min(1),
          productId: z.string().min(1),
          name: z.string().min(1),
          type: z.enum([
            'consumable',
            'non_consumable',
            'auto_renewable_subscription',
            'non_renewable_subscription',
          ]),
          price: z.number().min(0),
          currency: z.string().min(3).max(3),
          familyId: z.string().optional(),
          reviewNotes: z.string().optional(),
        }),
      }
    );
  }

  putAdminPaymentsAppstoreAppleProducts(
    productId: string | number,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/appstore/apple/products/${productId}`,
      z.object({
        product: z.object({
          id: z.string(),
          appId: z.string(),
          productId: z.string(),
          name: z.string(),
          type: z.string(),
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
          productId: z.string().min(1).optional(),
          name: z.string().min(1).optional(),
          type: z
            .enum([
              'consumable',
              'non_consumable',
              'auto_renewable_subscription',
              'non_renewable_subscription',
            ])
            .optional(),
          price: z.number().min(0).optional(),
          currency: z.string().min(3).max(3).optional(),
          familyId: z.string().optional(),
          reviewNotes: z.string().optional(),
        }),
      }
    );
  }
}
