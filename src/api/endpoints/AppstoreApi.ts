import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetAdminPaymentsAppstoreAppleProductsResponseProductsItemType {
  id: string;
  appId: string;
  productId: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminPaymentsAppstoreAppleProductsResponseProductsItemTypeSchema =
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
  });

export interface PostAdminPaymentsAppstoreAppleProductsRequestType {
  appId: string;
  productId: string;
  name: string;
  type: 'consumable';
  non_consumable;
  auto_renewable_subscription;
  non_renewable_subscription;
  price: number;
  currency: string;
  familyId?: string;
  reviewNotes?: string;
}

export const PostAdminPaymentsAppstoreAppleProductsRequestTypeSchema = z.object(
  {
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
  }
);

export interface PostAdminPaymentsAppstoreAppleProductsResponseProductType {
  id: string;
  appId: string;
  productId: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PostAdminPaymentsAppstoreAppleProductsResponseProductTypeSchema =
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
  });

export interface PutAdminPaymentsAppstoreAppleProductsRequestType {
  productId?: string;
  name?: string;
  type?: 'consumable';
  non_consumable;
  auto_renewable_subscription;
  non_renewable_subscription;
  price?: number;
  currency?: string;
  familyId?: string;
  reviewNotes?: string;
}

export const PutAdminPaymentsAppstoreAppleProductsRequestTypeSchema = z.object({
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
});

export interface PutAdminPaymentsAppstoreAppleProductsResponseProductType {
  id: string;
  appId: string;
  productId: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PutAdminPaymentsAppstoreAppleProductsResponseProductTypeSchema =
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
  });

export interface GetAdminPaymentsAppstoreGoogleProductsResponseProductsItemType {
  id: string;
  packageName: string;
  sku: string;
  name: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminPaymentsAppstoreGoogleProductsResponseProductsItemTypeSchema =
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
  });

export interface PostAdminPaymentsAppstoreGoogleProductsRequestType {
  packageName: string;
  sku: string;
  name: string;
  type: 'inapp';
  subs;
  status: 'active';
  inactive;
  price: number;
  currency: string;
  subscriptionPeriod?: string;
  trialPeriod?: string;
}

export const PostAdminPaymentsAppstoreGoogleProductsRequestTypeSchema =
  z.object({
    packageName: z.string().min(1),
    sku: z.string().min(1),
    name: z.string().min(1),
    type: z.enum(['inapp', 'subs']),
    status: z.enum(['active', 'inactive']),
    price: z.number().min(0),
    currency: z.string().min(3).max(3),
    subscriptionPeriod: z.string().optional(),
    trialPeriod: z.string().optional(),
  });

export interface PostAdminPaymentsAppstoreGoogleProductsResponseProductType {
  id: string;
  packageName: string;
  sku: string;
  name: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PostAdminPaymentsAppstoreGoogleProductsResponseProductTypeSchema =
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
  });

export interface PutAdminPaymentsAppstoreGoogleProductsRequestType {
  sku?: string;
  name?: string;
  type?: 'inapp';
  subs;
  status?: 'active';
  inactive;
  price?: number;
  currency?: string;
  subscriptionPeriod?: string;
  trialPeriod?: string;
}

export const PutAdminPaymentsAppstoreGoogleProductsRequestTypeSchema = z.object(
  {
    sku: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    type: z.enum(['inapp', 'subs']).optional(),
    status: z.enum(['active', 'inactive']).optional(),
    price: z.number().min(0).optional(),
    currency: z.string().min(3).max(3).optional(),
    subscriptionPeriod: z.string().optional(),
    trialPeriod: z.string().optional(),
  }
);

export interface PutAdminPaymentsAppstoreGoogleProductsResponseProductType {
  id: string;
  packageName: string;
  sku: string;
  name: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PutAdminPaymentsAppstoreGoogleProductsResponseProductTypeSchema =
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
  });

export interface GetAdminPaymentsAppstoreReviewsResponseDataItemType {
  id: string;
  platform: 'apple';
  google;
  appId: string;
  rating: number;
  title?: string;
  content: string;
  reviewerName?: string;
  reviewDate: string;
  version?: string;
  language?: string;
  territory?: string;
  helpful?: number;
  developerResponse?: string;
  responseDate?: string;
}

export const GetAdminPaymentsAppstoreReviewsResponseDataItemTypeSchema =
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
  });

export interface GetAdminPaymentsAppstoreReviewsResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminPaymentsAppstoreReviewsResponseMetaTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface PostAdminPaymentsAppstoreReviewsRespondResponseType {
  success: boolean;
  reviewId: string;
  response: string;
  responseDate: string;
}

export const PostAdminPaymentsAppstoreReviewsRespondResponseTypeSchema =
  z.object({
    success: z.boolean(),
    reviewId: z.string(),
    response: z.string(),
    responseDate: z.string(),
  });

export interface PostAdminPaymentsAppstoreSyncRequestType {
  platform: 'apple';
  google;
  appId: string;
  force?: boolean;
}

export const PostAdminPaymentsAppstoreSyncRequestTypeSchema = z.object({
  platform: z.enum(['apple', 'google']),
  appId: z.string().min(1),
  force: z.boolean().optional(),
});

export interface PostAdminPaymentsAppstoreSyncResponseType {
  platform: string;
  appId: string;
  synced: number;
  created: number;
  updated: number;
  errors: string[];
  lastSyncAt: string;
}

export const PostAdminPaymentsAppstoreSyncResponseTypeSchema = z.object({
  platform: z.string(),
  appId: z.string(),
  synced: z.number(),
  created: z.number(),
  updated: z.number(),
  errors: z.array(z.string()),
  lastSyncAt: z.string().datetime(),
});

export interface PostAdminPaymentsAppstoreWebhookValidateRequestType {
  platform: 'apple';
  google;
  payload: Record<string, unknown>;
  signature?: string;
}

export const PostAdminPaymentsAppstoreWebhookValidateRequestTypeSchema =
  z.object({
    platform: z.enum(['apple', 'google']),
    payload: z.record(z.unknown()),
    signature: z.string().optional(),
  });

export interface PostAdminPaymentsAppstoreWebhookValidateResponseType {
  valid: boolean;
  platform: string;
  processedData?: unknown;
  timestamp: string;
}

export const PostAdminPaymentsAppstoreWebhookValidateResponseTypeSchema =
  z.object({
    valid: z.boolean(),
    platform: z.string(),
    processedData: z.unknown().optional(),
    timestamp: z.string(),
  });

export class AppstoreApi extends ApiClient {
  getAdminPaymentsAppstoreAppleProducts(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/appstore/apple/products`,
      z.object({
        products: z.array(
          GetAdminPaymentsAppstoreAppleProductsResponseProductsItemTypeSchema
        ),
      })
    );
  }

  postAdminPaymentsAppstoreAppleProducts(
    data: PostAdminPaymentsAppstoreAppleProductsRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/apple/products`,
      z.object({
        product:
          PostAdminPaymentsAppstoreAppleProductsResponseProductTypeSchema,
      }),
      {
        body: data,
        bodySchema: PostAdminPaymentsAppstoreAppleProductsRequestTypeSchema,
      }
    );
  }

  putAdminPaymentsAppstoreAppleProducts(
    productId: string | number,
    data: PutAdminPaymentsAppstoreAppleProductsRequestType
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/appstore/apple/products/${productId}`,
      z.object({
        product: PutAdminPaymentsAppstoreAppleProductsResponseProductTypeSchema,
      }),
      {
        body: data,
        bodySchema: PutAdminPaymentsAppstoreAppleProductsRequestTypeSchema,
      }
    );
  }

  getAdminPaymentsAppstoreGoogleProducts(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/appstore/google/products`,
      z.object({
        products: z.array(
          GetAdminPaymentsAppstoreGoogleProductsResponseProductsItemTypeSchema
        ),
      })
    );
  }

  postAdminPaymentsAppstoreGoogleProducts(
    data: PostAdminPaymentsAppstoreGoogleProductsRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/google/products`,
      z.object({
        product:
          PostAdminPaymentsAppstoreGoogleProductsResponseProductTypeSchema,
      }),
      {
        body: data,
        bodySchema: PostAdminPaymentsAppstoreGoogleProductsRequestTypeSchema,
      }
    );
  }

  putAdminPaymentsAppstoreGoogleProducts(
    sku: string | number,
    data: PutAdminPaymentsAppstoreGoogleProductsRequestType
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/appstore/google/products/${sku}`,
      z.object({
        product:
          PutAdminPaymentsAppstoreGoogleProductsResponseProductTypeSchema,
      }),
      {
        body: data,
        bodySchema: PutAdminPaymentsAppstoreGoogleProductsRequestTypeSchema,
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
          GetAdminPaymentsAppstoreReviewsResponseDataItemTypeSchema
        ),
        meta: GetAdminPaymentsAppstoreReviewsResponseMetaTypeSchema,
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
  ): Promise<PostAdminPaymentsAppstoreReviewsRespondResponseType> {
    return this.post(
      `/admin/payments/appstore/reviews/respond`,
      PostAdminPaymentsAppstoreReviewsRespondResponseTypeSchema,
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
    data: PostAdminPaymentsAppstoreSyncRequestType
  ): Promise<PostAdminPaymentsAppstoreSyncResponseType> {
    return this.post(
      `/admin/payments/appstore/sync`,
      PostAdminPaymentsAppstoreSyncResponseTypeSchema,
      { body: data, bodySchema: PostAdminPaymentsAppstoreSyncRequestTypeSchema }
    );
  }

  postAdminPaymentsAppstoreWebhookValidate(
    data: PostAdminPaymentsAppstoreWebhookValidateRequestType
  ): Promise<PostAdminPaymentsAppstoreWebhookValidateResponseType> {
    return this.post(
      `/admin/payments/appstore/webhook/validate`,
      PostAdminPaymentsAppstoreWebhookValidateResponseTypeSchema,
      {
        body: data,
        bodySchema: PostAdminPaymentsAppstoreWebhookValidateRequestTypeSchema,
      }
    );
  }
}
