import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetAdminPaymentsProductsStatsResponseStatsByPlatformType {
  paymentProvider: number;
  apple: number;
  google: number;
}

export const GetAdminPaymentsProductsStatsResponseStatsByPlatformTypeSchema =
  z.object({
    paymentProvider: z.number(),
    apple: z.number(),
    google: z.number(),
  });

export interface GetAdminPaymentsProductsStatsResponseStatsType {
  total: number;
  byType: Record<string, any>;
  byPlatform: GetAdminPaymentsProductsStatsResponseStatsByPlatformType;
  multiPlatform: number;
}

export const GetAdminPaymentsProductsStatsResponseStatsTypeSchema = z.object({
  total: z.number(),
  byType: z.object({
    oneTime: z.number(),
    subscription: z.number(),
  }),
  byPlatform: GetAdminPaymentsProductsStatsResponseStatsByPlatformTypeSchema,
  multiPlatform: z.number(),
});

export interface GetAdminPaymentsCustomersStatsResponseStatsPlatformBreakdownType {
  stripe: number;
  polarsh: number;
  apple: number;
  google: number;
}

export const GetAdminPaymentsCustomersStatsResponseStatsPlatformBreakdownTypeSchema =
  z.object({
    stripe: z.number(),
    polarsh: z.number(),
    apple: z.number(),
    google: z.number(),
  });

export interface GetAdminPaymentsCustomersStatsResponseStatsRevenueByPlatformType {
  stripe: number;
  polarsh: number;
  apple: number;
  google: number;
}

export const GetAdminPaymentsCustomersStatsResponseStatsRevenueByPlatformTypeSchema =
  z.object({
    stripe: z.number(),
    polarsh: z.number(),
    apple: z.number(),
    google: z.number(),
  });

export interface GetAdminPaymentsCustomersStatsResponseStatsType {
  totalCustomers: number;
  totalRevenue: number;
  averageRevenue: number;
  platformBreakdown: GetAdminPaymentsCustomersStatsResponseStatsPlatformBreakdownType;
  revenueByPlatform: GetAdminPaymentsCustomersStatsResponseStatsRevenueByPlatformType;
}

export const GetAdminPaymentsCustomersStatsResponseStatsTypeSchema = z.object({
  totalCustomers: z.number(),
  totalRevenue: z.number(),
  averageRevenue: z.number(),
  platformBreakdown:
    GetAdminPaymentsCustomersStatsResponseStatsPlatformBreakdownTypeSchema,
  revenueByPlatform:
    GetAdminPaymentsCustomersStatsResponseStatsRevenueByPlatformTypeSchema,
});

export class AnalyticsApi extends ApiClient {
  getAdminPaymentsProductsStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/stats`,
      z.object({
        stats: GetAdminPaymentsProductsStatsResponseStatsTypeSchema,
      })
    );
  }

  getAdminPaymentsCustomersStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/stats`,
      z.object({
        stats: GetAdminPaymentsCustomersStatsResponseStatsTypeSchema,
      })
    );
  }
}
