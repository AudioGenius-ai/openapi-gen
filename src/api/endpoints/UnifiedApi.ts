import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetAdminPaymentsProductsResponseDataItemPricesItemType {
  unitAmount: number;
  currency: string;
  recurringInterval?: 'day';
  week;
  month;
  year;
  recurringIntervalCount?: number;
  id?: string;
  isDefault?: boolean;
  trialPeriodDays?: number;
}

export const GetAdminPaymentsProductsResponseDataItemPricesItemTypeSchema =
  z.object({
    unitAmount: z.number().int().min(0),
    currency: z.string().min(3).max(3),
    recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
    recurringIntervalCount: z.number().int().min(0).optional(),
    id: z.string().optional(),
    isDefault: z.boolean().optional(),
    trialPeriodDays: z.number().int().min(0).optional(),
  });

export interface GetAdminPaymentsProductsResponseDataItemPlatformsType {
  paymentProvider?: Record<string, any>;
  apple?: Record<string, any>;
  google?: Record<string, any>;
}

export const GetAdminPaymentsProductsResponseDataItemPlatformsTypeSchema =
  z.object({
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
  });

export interface GetAdminPaymentsProductsResponseDataItemType {
  id: string;
  name: string;
  description?: string;
  type: 'one-time';
  subscription;
  prices: GetAdminPaymentsProductsResponseDataItemPricesItemType[];
  features?: string[];
  platforms: GetAdminPaymentsProductsResponseDataItemPlatformsType;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsProductsResponseDataItemTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(['one-time', 'subscription']),
  prices: z.array(GetAdminPaymentsProductsResponseDataItemPricesItemTypeSchema),
  features: z.array(z.string()).optional(),
  platforms: GetAdminPaymentsProductsResponseDataItemPlatformsTypeSchema,
  metadata: z.record(z.unknown()).optional(),
});

export interface GetAdminPaymentsProductsResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminPaymentsProductsResponseMetaTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface PostAdminPaymentsProductsRequestPricesItemType {
  unitAmount: number;
  currency: string;
  recurringInterval?: 'day';
  week;
  month;
  year;
  recurringIntervalCount?: number;
  id?: string;
  isDefault?: boolean;
  trialPeriodDays?: number;
}

export const PostAdminPaymentsProductsRequestPricesItemTypeSchema = z.object({
  unitAmount: z.number().int().min(0),
  currency: z.string().min(3).max(3),
  recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
  recurringIntervalCount: z.number().int().min(0).optional(),
  id: z.string().optional(),
  isDefault: z.boolean().optional(),
  trialPeriodDays: z.number().int().min(0).optional(),
});

export interface PostAdminPaymentsProductsRequestPlatformsType {
  enableAppStores: boolean;
  enablePaymentProvider: boolean;
  appleAppId?: string;
  googlePackageName?: string;
}

export const PostAdminPaymentsProductsRequestPlatformsTypeSchema = z.object({
  enableAppStores: z.boolean(),
  enablePaymentProvider: z.boolean(),
  appleAppId: z.string().optional(),
  googlePackageName: z.string().optional(),
});

export interface PostAdminPaymentsProductsRequestType {
  name: string;
  description?: string;
  type: 'one-time';
  subscription;
  prices: unknown[];
  features?: string[];
  platforms: PostAdminPaymentsProductsRequestPlatformsType;
}

export const PostAdminPaymentsProductsRequestTypeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['one-time', 'subscription']),
  prices: z.array(PostAdminPaymentsProductsRequestPricesItemTypeSchema).min(1),
  features: z.array(z.string()).optional(),
  platforms: PostAdminPaymentsProductsRequestPlatformsTypeSchema,
});

export interface PostAdminPaymentsProductsResponseResultPlatformsPaymentProviderType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PostAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PostAdminPaymentsProductsResponseResultPlatformsAppleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PostAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PostAdminPaymentsProductsResponseResultPlatformsGoogleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PostAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PostAdminPaymentsProductsResponseResultPlatformsType {
  paymentProvider?: PostAdminPaymentsProductsResponseResultPlatformsPaymentProviderType;
  apple?: PostAdminPaymentsProductsResponseResultPlatformsAppleType;
  google?: PostAdminPaymentsProductsResponseResultPlatformsGoogleType;
}

export const PostAdminPaymentsProductsResponseResultPlatformsTypeSchema =
  z.object({
    paymentProvider:
      PostAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema.optional(),
    apple:
      PostAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema.optional(),
    google:
      PostAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema.optional(),
  });

export interface PostAdminPaymentsProductsResponseResultType {
  success: boolean;
  platforms: PostAdminPaymentsProductsResponseResultPlatformsType;
  errors: string[];
}

export const PostAdminPaymentsProductsResponseResultTypeSchema = z.object({
  success: z.boolean(),
  platforms: PostAdminPaymentsProductsResponseResultPlatformsTypeSchema,
  errors: z.array(z.string()),
});

export interface GetAdminPaymentsProductsResponseProductPricesItemType {
  unitAmount: number;
  currency: string;
  recurringInterval?: 'day';
  week;
  month;
  year;
  recurringIntervalCount?: number;
  id?: string;
  isDefault?: boolean;
  trialPeriodDays?: number;
}

export const GetAdminPaymentsProductsResponseProductPricesItemTypeSchema =
  z.object({
    unitAmount: z.number().int().min(0),
    currency: z.string().min(3).max(3),
    recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
    recurringIntervalCount: z.number().int().min(0).optional(),
    id: z.string().optional(),
    isDefault: z.boolean().optional(),
    trialPeriodDays: z.number().int().min(0).optional(),
  });

export interface GetAdminPaymentsProductsResponseProductPlatformsType {
  paymentProvider?: Record<string, any>;
  apple?: Record<string, any>;
  google?: Record<string, any>;
}

export const GetAdminPaymentsProductsResponseProductPlatformsTypeSchema =
  z.object({
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
  });

export interface GetAdminPaymentsProductsResponseProductType {
  id: string;
  name: string;
  description?: string;
  type: 'one-time';
  subscription;
  prices: GetAdminPaymentsProductsResponseProductPricesItemType[];
  features?: string[];
  platforms: GetAdminPaymentsProductsResponseProductPlatformsType;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsProductsResponseProductTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(['one-time', 'subscription']),
  prices: z.array(GetAdminPaymentsProductsResponseProductPricesItemTypeSchema),
  features: z.array(z.string()).optional(),
  platforms: GetAdminPaymentsProductsResponseProductPlatformsTypeSchema,
  metadata: z.record(z.unknown()).optional(),
});

export interface PutAdminPaymentsProductsRequestPricesItemType {
  unitAmount: number;
  currency: string;
  recurringInterval?: 'day';
  week;
  month;
  year;
  recurringIntervalCount?: number;
  id?: string;
  isDefault?: boolean;
  trialPeriodDays?: number;
}

export const PutAdminPaymentsProductsRequestPricesItemTypeSchema = z.object({
  unitAmount: z.number().int().min(0),
  currency: z.string().min(3).max(3),
  recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
  recurringIntervalCount: z.number().int().min(0).optional(),
  id: z.string().optional(),
  isDefault: z.boolean().optional(),
  trialPeriodDays: z.number().int().min(0).optional(),
});

export interface PutAdminPaymentsProductsRequestPlatformsType {
  enableAppStores: boolean;
  enablePaymentProvider: boolean;
  appleAppId?: string;
  googlePackageName?: string;
}

export const PutAdminPaymentsProductsRequestPlatformsTypeSchema = z.object({
  enableAppStores: z.boolean(),
  enablePaymentProvider: z.boolean(),
  appleAppId: z.string().optional(),
  googlePackageName: z.string().optional(),
});

export interface PutAdminPaymentsProductsRequestType {
  name?: string;
  description?: string;
  type?: 'one-time';
  subscription;
  prices?: PutAdminPaymentsProductsRequestPricesItemType[];
  features?: string[];
  platforms?: PutAdminPaymentsProductsRequestPlatformsType;
}

export const PutAdminPaymentsProductsRequestTypeSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(['one-time', 'subscription']).optional(),
  prices: z
    .array(PutAdminPaymentsProductsRequestPricesItemTypeSchema)
    .optional(),
  features: z.array(z.string()).optional(),
  platforms: PutAdminPaymentsProductsRequestPlatformsTypeSchema.optional(),
});

export interface PutAdminPaymentsProductsResponseResultPlatformsPaymentProviderType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PutAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PutAdminPaymentsProductsResponseResultPlatformsAppleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PutAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PutAdminPaymentsProductsResponseResultPlatformsGoogleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PutAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PutAdminPaymentsProductsResponseResultPlatformsType {
  paymentProvider?: PutAdminPaymentsProductsResponseResultPlatformsPaymentProviderType;
  apple?: PutAdminPaymentsProductsResponseResultPlatformsAppleType;
  google?: PutAdminPaymentsProductsResponseResultPlatformsGoogleType;
}

export const PutAdminPaymentsProductsResponseResultPlatformsTypeSchema =
  z.object({
    paymentProvider:
      PutAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema.optional(),
    apple:
      PutAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema.optional(),
    google:
      PutAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema.optional(),
  });

export interface PutAdminPaymentsProductsResponseResultType {
  success: boolean;
  platforms: PutAdminPaymentsProductsResponseResultPlatformsType;
  errors: string[];
}

export const PutAdminPaymentsProductsResponseResultTypeSchema = z.object({
  success: z.boolean(),
  platforms: PutAdminPaymentsProductsResponseResultPlatformsTypeSchema,
  errors: z.array(z.string()),
});

export interface DeleteAdminPaymentsProductsResponseResultPlatformsPaymentProviderType {
  success: boolean;
  error?: string;
  id?: string;
}

export const DeleteAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface DeleteAdminPaymentsProductsResponseResultPlatformsAppleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const DeleteAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface DeleteAdminPaymentsProductsResponseResultPlatformsGoogleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const DeleteAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface DeleteAdminPaymentsProductsResponseResultPlatformsType {
  paymentProvider?: DeleteAdminPaymentsProductsResponseResultPlatformsPaymentProviderType;
  apple?: DeleteAdminPaymentsProductsResponseResultPlatformsAppleType;
  google?: DeleteAdminPaymentsProductsResponseResultPlatformsGoogleType;
}

export const DeleteAdminPaymentsProductsResponseResultPlatformsTypeSchema =
  z.object({
    paymentProvider:
      DeleteAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema.optional(),
    apple:
      DeleteAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema.optional(),
    google:
      DeleteAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema.optional(),
  });

export interface DeleteAdminPaymentsProductsResponseResultType {
  success: boolean;
  platforms: DeleteAdminPaymentsProductsResponseResultPlatformsType;
  errors: string[];
}

export const DeleteAdminPaymentsProductsResponseResultTypeSchema = z.object({
  success: z.boolean(),
  platforms: DeleteAdminPaymentsProductsResponseResultPlatformsTypeSchema,
  errors: z.array(z.string()),
});

export class UnifiedApi extends ApiClient {
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
        data: z.array(GetAdminPaymentsProductsResponseDataItemTypeSchema),
        meta: GetAdminPaymentsProductsResponseMetaTypeSchema,
      }),
      { queryParams: { page, limit, search, type, platform } }
    );
  }

  postAdminPaymentsProducts(
    data: PostAdminPaymentsProductsRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/products`,
      z.object({
        result: PostAdminPaymentsProductsResponseResultTypeSchema,
      }),
      { body: data, bodySchema: PostAdminPaymentsProductsRequestTypeSchema }
    );
  }

  getAdminPaymentsProducts(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/${productId}`,
      z.object({
        product: GetAdminPaymentsProductsResponseProductTypeSchema,
      })
    );
  }

  putAdminPaymentsProducts(
    productId: string | number,
    data: PutAdminPaymentsProductsRequestType
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/products/${productId}`,
      z.object({
        result: PutAdminPaymentsProductsResponseResultTypeSchema,
      }),
      { body: data, bodySchema: PutAdminPaymentsProductsRequestTypeSchema }
    );
  }

  deleteAdminPaymentsProducts(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.delete(
      `/admin/payments/products/${productId}`,
      z.object({
        result: DeleteAdminPaymentsProductsResponseResultTypeSchema,
      })
    );
  }
}
