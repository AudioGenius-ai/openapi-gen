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

export class AppleApi extends ApiClient {
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
}
