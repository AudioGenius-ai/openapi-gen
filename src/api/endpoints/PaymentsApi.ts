import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class PaymentsApi extends ApiClient {
  getAdminCustomers(
    limit?: string,
    offset?: string,
    provider?: string,
    userId?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/customers`,
      z.object({
        customers: z.array(
          z.object({
            id: z.string().uuid(),
            userId: z.string().uuid(),
            provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
            providerCustomerId: z.string(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
        ),
        pagination: z
          .object({
            total: z.number(),
            limit: z.number(),
            offset: z.number(),
          })
          .optional(),
      }),
      { queryParams: { limit, offset, provider, userId } }
    );
  }

  getAdminCustomers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/customers/${id}`,
      z.object({
        customer: z.object({
          id: z.string().uuid(),
          userId: z.string().uuid(),
          provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
          providerCustomerId: z.string(),
          createdAt: z.string(),
          updatedAt: z.string(),
        }),
      })
    );
  }

  patchAdminCustomers(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/customers/${id}`,
      z.object({
        customer: z.object({
          id: z.string().uuid(),
          userId: z.string().uuid(),
          provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
          providerCustomerId: z.string(),
          createdAt: z.string(),
          updatedAt: z.string(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          provider: z.enum(['stripe', 'polarsh', 'apple', 'google']).optional(),
          providerCustomerId: z.string().optional(),
        }),
      }
    );
  }

  getAdminCustomersProvider(
    providerCustomerId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/customers/provider/${providerCustomerId}`,
      z.object({
        customer: z.object({
          id: z.string().uuid(),
          userId: z.string().uuid(),
          provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
          providerCustomerId: z.string(),
          createdAt: z.string(),
          updatedAt: z.string(),
        }),
      })
    );
  }

  getAdminPaymentsCustomers(
    page?: number,
    limit?: number,
    search?: string,
    platform?: string,
    sortBy?: string,
    sortOrder?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            userId: z.string(),
            email: z.string(),
            name: z.string(),
            platforms: z.object({
              stripe: z
                .object({
                  customerId: z.string(),
                  status: z.string().optional(),
                  createdAt: z.string().optional(),
                  metadata: z.record(z.unknown()).optional(),
                })
                .optional(),
              polarsh: z
                .object({
                  customerId: z.string(),
                  status: z.string().optional(),
                  createdAt: z.string().optional(),
                  metadata: z.record(z.unknown()).optional(),
                })
                .optional(),
              apple: z
                .object({
                  customerId: z.string(),
                  status: z.string().optional(),
                  createdAt: z.string().optional(),
                  metadata: z.record(z.unknown()).optional(),
                })
                .optional(),
              google: z
                .object({
                  customerId: z.string(),
                  status: z.string().optional(),
                  createdAt: z.string().optional(),
                  metadata: z.record(z.unknown()).optional(),
                })
                .optional(),
            }),
            totalRevenue: z.number(),
            totalTransactions: z.number(),
            activeSubscriptions: z.number(),
            createdAt: z.string(),
            lastTransactionAt: z.string(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      { queryParams: { page, limit, search, platform, sortBy, sortOrder } }
    );
  }

  getAdminPaymentsCustomersStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/stats`,
      z.object({
        stats: z.object({
          totalCustomers: z.number(),
          totalRevenue: z.number(),
          averageRevenue: z.number(),
          platformBreakdown: z.object({
            stripe: z.number(),
            polarsh: z.number(),
            apple: z.number(),
            google: z.number(),
          }),
          revenueByPlatform: z.object({
            stripe: z.number(),
            polarsh: z.number(),
            apple: z.number(),
            google: z.number(),
          }),
        }),
      })
    );
  }

  getAdminPaymentsCustomers(
    customerId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/${customerId}`,
      z.object({
        customer: z.object({
          id: z.string(),
          userId: z.string(),
          email: z.string(),
          name: z.string(),
          platforms: z.object({
            stripe: z
              .object({
                customerId: z.string(),
                status: z.string().optional(),
                createdAt: z.string().optional(),
                metadata: z.record(z.unknown()).optional(),
              })
              .optional(),
            polarsh: z
              .object({
                customerId: z.string(),
                status: z.string().optional(),
                createdAt: z.string().optional(),
                metadata: z.record(z.unknown()).optional(),
              })
              .optional(),
            apple: z
              .object({
                customerId: z.string(),
                status: z.string().optional(),
                createdAt: z.string().optional(),
                metadata: z.record(z.unknown()).optional(),
              })
              .optional(),
            google: z
              .object({
                customerId: z.string(),
                status: z.string().optional(),
                createdAt: z.string().optional(),
                metadata: z.record(z.unknown()).optional(),
              })
              .optional(),
          }),
          totalRevenue: z.number(),
          totalTransactions: z.number(),
          activeSubscriptions: z.number(),
          createdAt: z.string(),
          lastTransactionAt: z.string(),
          recentTransactions: z.array(
            z.object({
              id: z.string(),
              platform: z.enum(['stripe', 'polarsh', 'apple', 'google']),
              amount: z.number(),
              currency: z.string(),
              status: z.string(),
              productName: z.string(),
              createdAt: z.string(),
            })
          ),
          subscriptions: z.array(
            z.object({
              id: z.string(),
              platform: z.enum(['stripe', 'polarsh', 'apple', 'google']),
              productName: z.string(),
              status: z.string(),
              amount: z.number(),
              currency: z.string(),
              interval: z.string(),
              currentPeriodEnd: z.string(),
            })
          ),
        }),
      })
    );
  }

  getAdminPaymentsCustomersTransactions(
    customerId: string | number,
    page?: number,
    limit?: number,
    platform?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/${customerId}/transactions`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            platform: z.string(),
            amount: z.number(),
            currency: z.string(),
            status: z.string(),
            productName: z.string(),
            createdAt: z.string(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      { queryParams: { page, limit, platform, status } }
    );
  }

  getAdminPaymentsCustomersSubscriptions(
    customerId: string | number,
    status?: string,
    platform?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/${customerId}/subscriptions`,
      z.object({
        subscriptions: z.array(
          z.object({
            id: z.string(),
            platform: z.string(),
            productName: z.string(),
            status: z.string(),
            amount: z.number(),
            currency: z.string(),
            interval: z.string(),
            currentPeriodEnd: z.string(),
          })
        ),
      }),
      { queryParams: { status, platform } }
    );
  }

  getAdminPaymentsTransactions(
    page?: number,
    limit?: number,
    platform?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/transactions`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            accountId: z.string(),
            subscriptionId: z.string(),
            provider: z.string(),
            providerTransactionId: z.string(),
            amount: z.number(),
            currency: z.string(),
            status: z.string(),
            createdAt: z.string(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      { queryParams: { page, limit, platform, status } }
    );
  }

  getAdminPaymentsTransactions(
    id: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/transactions/${id}`,
      z.object({
        transaction: z.object({
          id: z.string(),
          accountId: z.string(),
          subscriptionId: z.string(),
          provider: z.string(),
          providerTransactionId: z.string(),
          amount: z.number(),
          currency: z.string(),
          status: z.string(),
          createdAt: z.string(),
        }),
      })
    );
  }

  postAdminPaymentsTransactionsRefund(
    id: string | number
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/transactions/${id}/refund`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  getAdminProducts(): Promise<Record<string, any>> {
    return this.get(
      `/admin/products`,
      z.object({
        products: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
          })
        ),
      })
    );
  }

  getAdminProducts(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/products/${id}`,
      z.object({
        product: z.object({
          id: z.string().uuid(),
          name: z.string(),
          description: z.string(),
          prices: z
            .array(
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
            )
            .optional(),
        }),
      })
    );
  }

  getAdminSubscriptions(
    customerId?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/subscriptions`,
      z.object({
        subscriptions: z.array(
          z.object({
            id: z.string(),
            providerSubscriptionId: z.string(),
            accountId: z.string(),
            status: z.string(),
            periodStart: z.string(),
            periodEnd: z.string(),
          })
        ),
      }),
      { queryParams: { customerId, status } }
    );
  }

  getPaymentsCustomers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/payments/customers/${id}`,
      z.object({
        customer: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          address: z.string().optional(),
        }),
      })
    );
  }

  putPaymentsCustomers(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/payments/customers/${id}`,
      z.object({
        customer: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          address: z.string().optional(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          phone: z.string().optional(),
          address: z.string().optional(),
        }),
      }
    );
  }

  deletePaymentsCustomers(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/payments/customers/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  postPaymentsCustomers(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/payments/customers`,
      z.object({
        customer: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          address: z.string().optional(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          address: z.string().optional(),
        }),
      }
    );
  }

  postPaymentsCustomersPortal(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/payments/customers/${id}/portal`,
      z.object({
        url: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          returnUrl: z.string().url(),
        }),
      }
    );
  }

  postPaymentsCheckout(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/payments/checkout`,
      z.object({
        url: z.string().url(),
        externalId: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          customerId: z.string(),
          lineItems: z.array(
            z.object({
              priceId: z.string(),
              quantity: z.number().int().min(0),
            })
          ),
          successUrl: z.string().url(),
          cancelUrl: z.string().url(),
          metadata: z
            .record(z.union([z.string(), z.number(), z.unknown(), z.unknown()]))
            .optional(),
        }),
      }
    );
  }

  postPaymentsWebhook(): Promise<Record<string, any>> {
    return this.post(
      `/payments/webhook`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  postPaymentsSyncProducts(): Promise<Record<string, any>> {
    return this.post(
      `/payments/sync/products`,
      z.object({
        success: z.boolean(),
        message: z.string(),
      })
    );
  }

  postPaymentsSyncCustomers(): Promise<Record<string, any>> {
    return this.post(
      `/payments/sync/customers`,
      z.object({
        success: z.boolean(),
        message: z.string(),
      })
    );
  }
}
