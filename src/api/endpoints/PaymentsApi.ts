import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetAdminCustomersResponseCustomersItemType {
  id: string;
  userId: string;
  provider: 'stripe';
  polarsh;
  apple;
  google;
  providerCustomerId: string;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminCustomersResponseCustomersItemTypeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
  providerCustomerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface GetAdminCustomersResponsePaginationType {
  total: number;
  limit: number;
  offset: number;
}

export const GetAdminCustomersResponsePaginationTypeSchema = z.object({
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
});

export interface GetAdminCustomersResponseCustomerType {
  id: string;
  userId: string;
  provider: 'stripe';
  polarsh;
  apple;
  google;
  providerCustomerId: string;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminCustomersResponseCustomerTypeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
  providerCustomerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface PatchAdminCustomersResponseCustomerType {
  id: string;
  userId: string;
  provider: 'stripe';
  polarsh;
  apple;
  google;
  providerCustomerId: string;
  createdAt: string;
  updatedAt: string;
}

export const PatchAdminCustomersResponseCustomerTypeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
  providerCustomerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface GetAdminCustomersProviderResponseCustomerType {
  id: string;
  userId: string;
  provider: 'stripe';
  polarsh;
  apple;
  google;
  providerCustomerId: string;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminCustomersProviderResponseCustomerTypeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
  providerCustomerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

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

export interface GetAdminPaymentsTransactionsResponseDataItemType {
  id: string;
  accountId: string;
  subscriptionId: string;
  provider: string;
  providerTransactionId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export const GetAdminPaymentsTransactionsResponseDataItemTypeSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  subscriptionId: z.string(),
  provider: z.string(),
  providerTransactionId: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  createdAt: z.string(),
});

export interface GetAdminPaymentsTransactionsResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminPaymentsTransactionsResponseMetaTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface GetAdminPaymentsTransactionsResponseTransactionType {
  id: string;
  accountId: string;
  subscriptionId: string;
  provider: string;
  providerTransactionId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export const GetAdminPaymentsTransactionsResponseTransactionTypeSchema =
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
  });

export interface GetAdminProductsResponseProductsItemType {
  id: string;
  name: string;
  description: string;
}

export const GetAdminProductsResponseProductsItemTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
});

export interface GetAdminProductsResponseProductPricesItemType {
  id: string;
  platformProductId: string;
  platformPriceId: string;
  unitAmount: number;
  currency: string;
  billingPeriod: string;
  recurringInterval: string;
  recurringIntervalCount: number;
  trialPeriodDays: number;
  isDefault: boolean;
  active: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminProductsResponseProductPricesItemTypeSchema = z.object({
  id: z.string().uuid(),
  platformProductId: z.string().uuid(),
  platformPriceId: z.string(),
  unitAmount: z.number().int().min(-2147483648).max(2147483647),
  currency: z.string().max(3),
  billingPeriod: z.string(),
  recurringInterval: z.string(),
  recurringIntervalCount: z.number().int().min(-2147483648).max(2147483647),
  trialPeriodDays: z.number().int().min(-2147483648).max(2147483647),
  isDefault: z.boolean(),
  active: z.boolean(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface GetAdminProductsResponseProductType {
  id: string;
  name: string;
  description: string;
  prices?: GetAdminProductsResponseProductPricesItemType[];
}

export const GetAdminProductsResponseProductTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  prices: z
    .array(GetAdminProductsResponseProductPricesItemTypeSchema)
    .optional(),
});

export interface GetAdminSubscriptionsResponseSubscriptionsItemType {
  id: string;
  providerSubscriptionId: string;
  accountId: string;
  status: string;
  periodStart: string;
  periodEnd: string;
}

export const GetAdminSubscriptionsResponseSubscriptionsItemTypeSchema =
  z.object({
    id: z.string(),
    providerSubscriptionId: z.string(),
    accountId: z.string(),
    status: z.string(),
    periodStart: z.string(),
    periodEnd: z.string(),
  });

export interface GetPaymentsCustomersResponseCustomerType {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export const GetPaymentsCustomersResponseCustomerTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export interface PutPaymentsCustomersRequestType {
  userId?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export const PutPaymentsCustomersRequestTypeSchema = z.object({
  userId: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export interface PutPaymentsCustomersResponseCustomerType {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export const PutPaymentsCustomersResponseCustomerTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export interface PostPaymentsCustomersRequestType {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export const PostPaymentsCustomersRequestTypeSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export interface PostPaymentsCustomersResponseCustomerType {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export const PostPaymentsCustomersResponseCustomerTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export interface PostPaymentsCheckoutRequestType {
  customerId: string;
  lineItems: unknown;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string | number | unknown | unknown>;
}

export const PostPaymentsCheckoutRequestTypeSchema = z.object({
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
});

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
        customers: z.array(GetAdminCustomersResponseCustomersItemTypeSchema),
        pagination: GetAdminCustomersResponsePaginationTypeSchema.optional(),
      }),
      { queryParams: { limit, offset, provider, userId } }
    );
  }

  getAdminCustomers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/customers/${id}`,
      z.object({
        customer: GetAdminCustomersResponseCustomerTypeSchema,
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
        customer: PatchAdminCustomersResponseCustomerTypeSchema,
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
        customer: GetAdminCustomersProviderResponseCustomerTypeSchema,
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

  getAdminPaymentsTransactions(
    page?: number,
    limit?: number,
    platform?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/transactions`,
      z.object({
        data: z.array(GetAdminPaymentsTransactionsResponseDataItemTypeSchema),
        meta: GetAdminPaymentsTransactionsResponseMetaTypeSchema,
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
        transaction: GetAdminPaymentsTransactionsResponseTransactionTypeSchema,
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
        products: z.array(GetAdminProductsResponseProductsItemTypeSchema),
      })
    );
  }

  getAdminProducts(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/products/${id}`,
      z.object({
        product: GetAdminProductsResponseProductTypeSchema,
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
          GetAdminSubscriptionsResponseSubscriptionsItemTypeSchema
        ),
      }),
      { queryParams: { customerId, status } }
    );
  }

  getPaymentsCustomers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/payments/customers/${id}`,
      z.object({
        customer: GetPaymentsCustomersResponseCustomerTypeSchema,
      })
    );
  }

  putPaymentsCustomers(
    id: string | number,
    data?: PutPaymentsCustomersRequestType
  ): Promise<Record<string, any>> {
    return this.put(
      `/payments/customers/${id}`,
      z.object({
        customer: PutPaymentsCustomersResponseCustomerTypeSchema,
      }),
      { body: data, bodySchema: PutPaymentsCustomersRequestTypeSchema }
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
    data?: PostPaymentsCustomersRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/payments/customers`,
      z.object({
        customer: PostPaymentsCustomersResponseCustomerTypeSchema,
      }),
      { body: data, bodySchema: PostPaymentsCustomersRequestTypeSchema }
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
    data?: PostPaymentsCheckoutRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/payments/checkout`,
      z.object({
        url: z.string().url(),
        externalId: z.string(),
      }),
      { body: data, bodySchema: PostPaymentsCheckoutRequestTypeSchema }
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
