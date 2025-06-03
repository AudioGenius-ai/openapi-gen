import { ApiClient } from '../ApiClient';
import { z } from 'zod';

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

export class GoogleApi extends ApiClient {
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
}
