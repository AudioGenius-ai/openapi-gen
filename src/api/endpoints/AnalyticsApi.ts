import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class AnalyticsApi extends ApiClient {
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
}
