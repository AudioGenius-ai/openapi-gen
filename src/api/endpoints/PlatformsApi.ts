import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetAdminPaymentsProductsPlatformsResponsePlatformsAppleType {
  id: string;
  appId: string;
  status: 'active';
  inactive;
}

export const GetAdminPaymentsProductsPlatformsResponsePlatformsAppleTypeSchema =
  z.object({
    id: z.string(),
    appId: z.string(),
    status: z.enum(['active', 'inactive']),
  });

export interface GetAdminPaymentsProductsPlatformsResponsePlatformsGoogleType {
  sku: string;
  packageName: string;
  status: 'active';
  inactive;
}

export const GetAdminPaymentsProductsPlatformsResponsePlatformsGoogleTypeSchema =
  z.object({
    sku: z.string(),
    packageName: z.string(),
    status: z.enum(['active', 'inactive']),
  });

export interface GetAdminPaymentsProductsPlatformsResponsePlatformsType {
  paymentProvider?: Record<string, any>;
  apple?: GetAdminPaymentsProductsPlatformsResponsePlatformsAppleType;
  google?: GetAdminPaymentsProductsPlatformsResponsePlatformsGoogleType;
}

export const GetAdminPaymentsProductsPlatformsResponsePlatformsTypeSchema =
  z.object({
    paymentProvider: z
      .object({
        id: z.string(),
        status: z.enum(['active', 'inactive']),
      })
      .optional(),
    apple:
      GetAdminPaymentsProductsPlatformsResponsePlatformsAppleTypeSchema.optional(),
    google:
      GetAdminPaymentsProductsPlatformsResponsePlatformsGoogleTypeSchema.optional(),
  });

export class PlatformsApi extends ApiClient {
  getAdminPaymentsProductsPlatforms(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/${productId}/platforms`,
      z.object({
        productId: z.string(),
        platforms: GetAdminPaymentsProductsPlatformsResponsePlatformsTypeSchema,
      })
    );
  }
}
