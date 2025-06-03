import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class ProductsApi extends ApiClient {
  getProducts(): Promise<Record<string, any>> {
    return this.get(
      `/products`,
      z.object({
        products: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
            type: z.string(),
            isActive: z.boolean(),
            features: z.array(z.string()).optional(),
            metadata: z
              .object({
                features: z.array(z.string()).optional(),
              })
              .optional(),
            createdAt: z.string(),
            updatedAt: z.string(),
            prices: z.array(
              z.object({
                id: z.string().uuid(),
                platformProductId: z.string().uuid(),
                platformPriceId: z.string(),
                unitAmount: z.number().int().min(-2147483648).max(2147483647),
                currency: z.string().max(3),
                billingPeriod: z.string(),
                recurringInterval: z.string(),
                recurringIntervalCount: z
                  .number()
                  .int()
                  .min(-2147483648)
                  .max(2147483647),
                trialPeriodDays: z
                  .number()
                  .int()
                  .min(-2147483648)
                  .max(2147483647),
                isDefault: z.boolean(),
                active: z.boolean(),
                metadata: z.record(z.unknown()).optional(),
                createdAt: z.string(),
                updatedAt: z.string(),
              })
            ),
          })
        ),
      })
    );
  }

  getAdminPaymentsProducts(
    page?: number,
    limit?: number,
    search?: string,
    type?: string,
    platform?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string().optional(),
            type: z.enum(['one-time', 'subscription']),
            prices: z.array(
              z.object({
                unitAmount: z.number().int().min(0),
                currency: z.string().min(3).max(3),
                recurringInterval: z
                  .enum(['day', 'week', 'month', 'year'])
                  .optional(),
                recurringIntervalCount: z.number().int().min(0).optional(),
                id: z.string().optional(),
                isDefault: z.boolean().optional(),
                trialPeriodDays: z.number().int().min(0).optional(),
              })
            ),
            features: z.array(z.string()).optional(),
            platforms: z.object({
              paymentProvider: z
                .object({
                  id: z.string(),
                  status: z.enum(['active', 'inactive']),
                })
                .and(z.object({}))
                .optional(),
              apple: z
                .object({
                  id: z.string(),
                  status: z.enum(['active', 'inactive']),
                })
                .and(
                  z.object({
                    appId: z.string(),
                  })
                )
                .optional(),
              google: z
                .object({
                  id: z.string(),
                  status: z.enum(['active', 'inactive']),
                })
                .and(
                  z.object({
                    sku: z.string(),
                    packageName: z.string(),
                  })
                )
                .optional(),
            }),
            metadata: z.record(z.unknown()).optional(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      { queryParams: { page, limit, search, type, platform } }
    );
  }

  postAdminPaymentsProducts(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/products`,
      z.object({
        result: z.object({
          success: z.boolean(),
          platforms: z.object({
            paymentProvider: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            apple: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            google: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
          }),
          errors: z.array(z.string()),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
          type: z.enum(['one-time', 'subscription']),
          prices: z
            .array(
              z.object({
                unitAmount: z.number().int().min(0),
                currency: z.string().min(3).max(3),
                recurringInterval: z
                  .enum(['day', 'week', 'month', 'year'])
                  .optional(),
                recurringIntervalCount: z.number().int().min(0).optional(),
                id: z.string().optional(),
                isDefault: z.boolean().optional(),
                trialPeriodDays: z.number().int().min(0).optional(),
              })
            )
            .min(1),
          features: z.array(z.string()).optional(),
          platforms: z.object({
            enableAppStores: z.boolean(),
            enablePaymentProvider: z.boolean(),
            appleAppId: z.string().optional(),
            googlePackageName: z.string().optional(),
          }),
        }),
      }
    );
  }

  getAdminPaymentsProducts(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/${productId}`,
      z.object({
        product: z.object({
          id: z.string(),
          name: z.string(),
          description: z.string().optional(),
          type: z.enum(['one-time', 'subscription']),
          prices: z.array(
            z.object({
              unitAmount: z.number().int().min(0),
              currency: z.string().min(3).max(3),
              recurringInterval: z
                .enum(['day', 'week', 'month', 'year'])
                .optional(),
              recurringIntervalCount: z.number().int().min(0).optional(),
              id: z.string().optional(),
              isDefault: z.boolean().optional(),
              trialPeriodDays: z.number().int().min(0).optional(),
            })
          ),
          features: z.array(z.string()).optional(),
          platforms: z.object({
            paymentProvider: z
              .object({
                id: z.string(),
                status: z.enum(['active', 'inactive']),
              })
              .and(z.object({}))
              .optional(),
            apple: z
              .object({
                id: z.string(),
                status: z.enum(['active', 'inactive']),
              })
              .and(
                z.object({
                  appId: z.string(),
                })
              )
              .optional(),
            google: z
              .object({
                id: z.string(),
                status: z.enum(['active', 'inactive']),
              })
              .and(
                z.object({
                  sku: z.string(),
                  packageName: z.string(),
                })
              )
              .optional(),
          }),
          metadata: z.record(z.unknown()).optional(),
        }),
      })
    );
  }

  putAdminPaymentsProducts(
    productId: string | number,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/products/${productId}`,
      z.object({
        result: z.object({
          success: z.boolean(),
          platforms: z.object({
            paymentProvider: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            apple: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            google: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
          }),
          errors: z.array(z.string()),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().min(1).optional(),
          description: z.string().optional(),
          type: z.enum(['one-time', 'subscription']).optional(),
          prices: z
            .array(
              z.object({
                unitAmount: z.number().int().min(0),
                currency: z.string().min(3).max(3),
                recurringInterval: z
                  .enum(['day', 'week', 'month', 'year'])
                  .optional(),
                recurringIntervalCount: z.number().int().min(0).optional(),
                id: z.string().optional(),
                isDefault: z.boolean().optional(),
                trialPeriodDays: z.number().int().min(0).optional(),
              })
            )
            .optional(),
          features: z.array(z.string()).optional(),
          platforms: z
            .object({
              enableAppStores: z.boolean(),
              enablePaymentProvider: z.boolean(),
              appleAppId: z.string().optional(),
              googlePackageName: z.string().optional(),
            })
            .optional(),
        }),
      }
    );
  }

  deleteAdminPaymentsProducts(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.delete(
      `/admin/payments/products/${productId}`,
      z.object({
        result: z.object({
          success: z.boolean(),
          platforms: z.object({
            paymentProvider: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            apple: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            google: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
          }),
          errors: z.array(z.string()),
        }),
      })
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

  getAdminPaymentsProductsStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/stats`,
      z.object({
        stats: z.object({
          total: z.number(),
          byType: z.object({
            oneTime: z.number(),
            subscription: z.number(),
          }),
          byPlatform: z.object({
            paymentProvider: z.number(),
            apple: z.number(),
            google: z.number(),
          }),
          multiPlatform: z.number(),
        }),
      })
    );
  }
}
