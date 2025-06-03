import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class CustomersApi extends ApiClient {
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
}
