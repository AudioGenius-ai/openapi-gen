import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class AppstoreApi extends ApiClient {
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

  getAdminPaymentsAppstoreReviews(
    platform?: string,
    appId?: string,
    rating?: number,
    startDate?: string,
    endDate?: string,
    hasResponse?: boolean,
    page?: number,
    limit?: number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/appstore/reviews`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            platform: z.enum(['apple', 'google']),
            appId: z.string(),
            rating: z.number().min(1).max(5),
            title: z.string().optional(),
            content: z.string(),
            reviewerName: z.string().optional(),
            reviewDate: z.string().datetime(),
            version: z.string().optional(),
            language: z.string().optional(),
            territory: z.string().optional(),
            helpful: z.number().optional(),
            developerResponse: z.string().optional(),
            responseDate: z.string().datetime().optional(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      {
        queryParams: {
          platform,
          appId,
          rating,
          startDate,
          endDate,
          hasResponse,
          page,
          limit,
        },
      }
    );
  }

  postAdminPaymentsAppstoreReviewsRespond(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/reviews/respond`,
      z.object({
        success: z.boolean(),
        reviewId: z.string(),
        response: z.string(),
        responseDate: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          reviewId: z.string(),
          response: z.string().min(1).max(1000),
        }),
      }
    );
  }

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

  postAdminPaymentsAppstoreWebhookValidate(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/webhook/validate`,
      z.object({
        valid: z.boolean(),
        platform: z.string(),
        processedData: z.unknown().optional(),
        timestamp: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          platform: z.enum(['apple', 'google']),
          payload: z.record(z.unknown()),
          signature: z.string().optional(),
        }),
      }
    );
  }
}
