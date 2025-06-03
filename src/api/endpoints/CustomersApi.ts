import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetAdminPaymentsCustomersResponseDataItemPlatformsStripeType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseDataItemPlatformsStripeTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseDataItemPlatformsPolarshType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseDataItemPlatformsPolarshTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseDataItemPlatformsAppleType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseDataItemPlatformsAppleTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseDataItemPlatformsGoogleType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseDataItemPlatformsGoogleTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseDataItemPlatformsType {
  stripe?: GetAdminPaymentsCustomersResponseDataItemPlatformsStripeType;
  polarsh?: GetAdminPaymentsCustomersResponseDataItemPlatformsPolarshType;
  apple?: GetAdminPaymentsCustomersResponseDataItemPlatformsAppleType;
  google?: GetAdminPaymentsCustomersResponseDataItemPlatformsGoogleType;
}

export const GetAdminPaymentsCustomersResponseDataItemPlatformsTypeSchema =
  z.object({
    stripe:
      GetAdminPaymentsCustomersResponseDataItemPlatformsStripeTypeSchema.optional(),
    polarsh:
      GetAdminPaymentsCustomersResponseDataItemPlatformsPolarshTypeSchema.optional(),
    apple:
      GetAdminPaymentsCustomersResponseDataItemPlatformsAppleTypeSchema.optional(),
    google:
      GetAdminPaymentsCustomersResponseDataItemPlatformsGoogleTypeSchema.optional(),
  });

export interface GetAdminPaymentsCustomersResponseDataItemType {
  id: string;
  userId: string;
  email: string;
  name: string;
  platforms: GetAdminPaymentsCustomersResponseDataItemPlatformsType;
  totalRevenue: number;
  totalTransactions: number;
  activeSubscriptions: number;
  createdAt: string;
  lastTransactionAt: string;
}

export const GetAdminPaymentsCustomersResponseDataItemTypeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string(),
  name: z.string(),
  platforms: GetAdminPaymentsCustomersResponseDataItemPlatformsTypeSchema,
  totalRevenue: z.number(),
  totalTransactions: z.number(),
  activeSubscriptions: z.number(),
  createdAt: z.string(),
  lastTransactionAt: z.string(),
});

export interface GetAdminPaymentsCustomersResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminPaymentsCustomersResponseMetaTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
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

export interface GetAdminPaymentsCustomersResponseCustomerPlatformsStripeType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseCustomerPlatformsStripeTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerPlatformsPolarshType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseCustomerPlatformsPolarshTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerPlatformsAppleType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseCustomerPlatformsAppleTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerPlatformsGoogleType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseCustomerPlatformsGoogleTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerPlatformsType {
  stripe?: GetAdminPaymentsCustomersResponseCustomerPlatformsStripeType;
  polarsh?: GetAdminPaymentsCustomersResponseCustomerPlatformsPolarshType;
  apple?: GetAdminPaymentsCustomersResponseCustomerPlatformsAppleType;
  google?: GetAdminPaymentsCustomersResponseCustomerPlatformsGoogleType;
}

export const GetAdminPaymentsCustomersResponseCustomerPlatformsTypeSchema =
  z.object({
    stripe:
      GetAdminPaymentsCustomersResponseCustomerPlatformsStripeTypeSchema.optional(),
    polarsh:
      GetAdminPaymentsCustomersResponseCustomerPlatformsPolarshTypeSchema.optional(),
    apple:
      GetAdminPaymentsCustomersResponseCustomerPlatformsAppleTypeSchema.optional(),
    google:
      GetAdminPaymentsCustomersResponseCustomerPlatformsGoogleTypeSchema.optional(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerRecentTransactionsItemType {
  id: string;
  platform: 'stripe';
  polarsh;
  apple;
  google;
  amount: number;
  currency: string;
  status: string;
  productName: string;
  createdAt: string;
}

export const GetAdminPaymentsCustomersResponseCustomerRecentTransactionsItemTypeSchema =
  z.object({
    id: z.string(),
    platform: z.enum(['stripe', 'polarsh', 'apple', 'google']),
    amount: z.number(),
    currency: z.string(),
    status: z.string(),
    productName: z.string(),
    createdAt: z.string(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerSubscriptionsItemType {
  id: string;
  platform: 'stripe';
  polarsh;
  apple;
  google;
  productName: string;
  status: string;
  amount: number;
  currency: string;
  interval: string;
  currentPeriodEnd: string;
}

export const GetAdminPaymentsCustomersResponseCustomerSubscriptionsItemTypeSchema =
  z.object({
    id: z.string(),
    platform: z.enum(['stripe', 'polarsh', 'apple', 'google']),
    productName: z.string(),
    status: z.string(),
    amount: z.number(),
    currency: z.string(),
    interval: z.string(),
    currentPeriodEnd: z.string(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerType {
  id: string;
  userId: string;
  email: string;
  name: string;
  platforms: GetAdminPaymentsCustomersResponseCustomerPlatformsType;
  totalRevenue: number;
  totalTransactions: number;
  activeSubscriptions: number;
  createdAt: string;
  lastTransactionAt: string;
  recentTransactions: GetAdminPaymentsCustomersResponseCustomerRecentTransactionsItemType[];
  subscriptions: GetAdminPaymentsCustomersResponseCustomerSubscriptionsItemType[];
}

export const GetAdminPaymentsCustomersResponseCustomerTypeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string(),
  name: z.string(),
  platforms: GetAdminPaymentsCustomersResponseCustomerPlatformsTypeSchema,
  totalRevenue: z.number(),
  totalTransactions: z.number(),
  activeSubscriptions: z.number(),
  createdAt: z.string(),
  lastTransactionAt: z.string(),
  recentTransactions: z.array(
    GetAdminPaymentsCustomersResponseCustomerRecentTransactionsItemTypeSchema
  ),
  subscriptions: z.array(
    GetAdminPaymentsCustomersResponseCustomerSubscriptionsItemTypeSchema
  ),
});

export interface GetAdminPaymentsCustomersTransactionsResponseDataItemType {
  id: string;
  platform: string;
  amount: number;
  currency: string;
  status: string;
  productName: string;
  createdAt: string;
}

export const GetAdminPaymentsCustomersTransactionsResponseDataItemTypeSchema =
  z.object({
    id: z.string(),
    platform: z.string(),
    amount: z.number(),
    currency: z.string(),
    status: z.string(),
    productName: z.string(),
    createdAt: z.string(),
  });

export interface GetAdminPaymentsCustomersTransactionsResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminPaymentsCustomersTransactionsResponseMetaTypeSchema =
  z.object({
    total: z.number(),
    pages: z.number(),
    page: z.number(),
    limit: z.number(),
  });

export interface GetAdminPaymentsCustomersSubscriptionsResponseSubscriptionsItemType {
  id: string;
  platform: string;
  productName: string;
  status: string;
  amount: number;
  currency: string;
  interval: string;
  currentPeriodEnd: string;
}

export const GetAdminPaymentsCustomersSubscriptionsResponseSubscriptionsItemTypeSchema =
  z.object({
    id: z.string(),
    platform: z.string(),
    productName: z.string(),
    status: z.string(),
    amount: z.number(),
    currency: z.string(),
    interval: z.string(),
    currentPeriodEnd: z.string(),
  });

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
        data: z.array(GetAdminPaymentsCustomersResponseDataItemTypeSchema),
        meta: GetAdminPaymentsCustomersResponseMetaTypeSchema,
      }),
      { queryParams: { page, limit, search, platform, sortBy, sortOrder } }
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

  getAdminPaymentsCustomers(
    customerId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/${customerId}`,
      z.object({
        customer: GetAdminPaymentsCustomersResponseCustomerTypeSchema,
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
          GetAdminPaymentsCustomersTransactionsResponseDataItemTypeSchema
        ),
        meta: GetAdminPaymentsCustomersTransactionsResponseMetaTypeSchema,
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
          GetAdminPaymentsCustomersSubscriptionsResponseSubscriptionsItemTypeSchema
        ),
      }),
      { queryParams: { status, platform } }
    );
  }
}
