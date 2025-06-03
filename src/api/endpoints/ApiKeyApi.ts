import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface PostAuthApikeyCreateRequestType {
  name?: string;
  expiresIn: string;
  userId?: string;
  prefix?: string;
  remaining: string;
  metadata?: string;
  refillAmount?: string;
  refillInterval?: string;
  rateLimitTimeWindow?: string;
  rateLimitMax?: string;
  rateLimitEnabled?: string;
  permissions?: string;
}

export const PostAuthApikeyCreateRequestTypeSchema = z.object({
  name: z.string().optional(),
  expiresIn: z.string(),
  userId: z.string().optional(),
  prefix: z.string().optional(),
  remaining: z.string(),
  metadata: z.string().optional(),
  refillAmount: z.string().optional(),
  refillInterval: z.string().optional(),
  rateLimitTimeWindow: z.string().optional(),
  rateLimitMax: z.string().optional(),
  rateLimitEnabled: z.string().optional(),
  permissions: z.string().optional(),
});

export interface PostAuthApikeyCreateResponseType {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string;
  prefix?: string;
  start?: string;
  key: string;
  enabled: boolean;
  expiresAt?: string;
  userId: string;
  lastRefillAt?: string;
  lastRequest?: string;
  metadata?: Record<string, unknown>;
  rateLimitMax?: number;
  rateLimitTimeWindow?: number;
  remaining?: number;
  refillAmount?: number;
  refillInterval?: number;
  rateLimitEnabled: boolean;
  requestCount: number;
  permissions?: Record<string, string[]>;
}

export const PostAuthApikeyCreateResponseTypeSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string().optional(),
  prefix: z.string().optional(),
  start: z.string().optional(),
  key: z.string(),
  enabled: z.boolean(),
  expiresAt: z.string().datetime().optional(),
  userId: z.string(),
  lastRefillAt: z.string().datetime().optional(),
  lastRequest: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
  rateLimitMax: z.number().optional(),
  rateLimitTimeWindow: z.number().optional(),
  remaining: z.number().optional(),
  refillAmount: z.number().optional(),
  refillInterval: z.number().optional(),
  rateLimitEnabled: z.boolean(),
  requestCount: z.number(),
  permissions: z.record(z.array(z.string())).optional(),
});

export interface GetAuthApikeyGetResponseType {
  id: string;
  name?: string;
  start?: string;
  prefix?: string;
  userId: string;
  refillInterval?: number;
  refillAmount?: number;
  lastRefillAt?: string;
  enabled: boolean;
  rateLimitEnabled: boolean;
  rateLimitTimeWindow?: number;
  rateLimitMax?: number;
  requestCount: number;
  remaining?: number;
  lastRequest?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
  permissions?: string;
}

export const GetAuthApikeyGetResponseTypeSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  start: z.string().optional(),
  prefix: z.string().optional(),
  userId: z.string(),
  refillInterval: z.number().optional(),
  refillAmount: z.number().optional(),
  lastRefillAt: z.string().datetime().optional(),
  enabled: z.boolean(),
  rateLimitEnabled: z.boolean(),
  rateLimitTimeWindow: z.number().optional(),
  rateLimitMax: z.number().optional(),
  requestCount: z.number(),
  remaining: z.number().optional(),
  lastRequest: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
  permissions: z.string().optional(),
});

export interface PostAuthApikeyUpdateRequestType {
  keyId: string;
  userId?: string;
  name?: string;
  enabled?: string;
  remaining?: string;
  refillAmount?: string;
  refillInterval?: string;
  metadata?: string;
  expiresIn: string;
  rateLimitEnabled?: string;
  rateLimitTimeWindow?: string;
  rateLimitMax?: string;
  permissions: string;
}

export const PostAuthApikeyUpdateRequestTypeSchema = z.object({
  keyId: z.string(),
  userId: z.string().optional(),
  name: z.string().optional(),
  enabled: z.string().optional(),
  remaining: z.string().optional(),
  refillAmount: z.string().optional(),
  refillInterval: z.string().optional(),
  metadata: z.string().optional(),
  expiresIn: z.string(),
  rateLimitEnabled: z.string().optional(),
  rateLimitTimeWindow: z.string().optional(),
  rateLimitMax: z.string().optional(),
  permissions: z.string(),
});

export interface PostAuthApikeyUpdateResponseType {
  id: string;
  name?: string;
  start?: string;
  prefix?: string;
  userId: string;
  refillInterval?: number;
  refillAmount?: number;
  lastRefillAt?: string;
  enabled: boolean;
  rateLimitEnabled: boolean;
  rateLimitTimeWindow?: number;
  rateLimitMax?: number;
  requestCount: number;
  remaining?: number;
  lastRequest?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
  permissions?: string;
}

export const PostAuthApikeyUpdateResponseTypeSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  start: z.string().optional(),
  prefix: z.string().optional(),
  userId: z.string(),
  refillInterval: z.number().optional(),
  refillAmount: z.number().optional(),
  lastRefillAt: z.string().datetime().optional(),
  enabled: z.boolean(),
  rateLimitEnabled: z.boolean(),
  rateLimitTimeWindow: z.number().optional(),
  rateLimitMax: z.number().optional(),
  requestCount: z.number(),
  remaining: z.number().optional(),
  lastRequest: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
  permissions: z.string().optional(),
});

export interface GetAuthApikeyListResponseItemType {
  id: string;
  name?: string;
  start?: string;
  prefix?: string;
  userId: string;
  refillInterval?: number;
  refillAmount?: number;
  lastRefillAt?: string;
  enabled: boolean;
  rateLimitEnabled: boolean;
  rateLimitTimeWindow?: number;
  rateLimitMax?: number;
  requestCount: number;
  remaining?: number;
  lastRequest?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
  permissions?: string;
}

export const GetAuthApikeyListResponseItemTypeSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  start: z.string().optional(),
  prefix: z.string().optional(),
  userId: z.string(),
  refillInterval: z.number().optional(),
  refillAmount: z.number().optional(),
  lastRefillAt: z.string().datetime().optional(),
  enabled: z.boolean(),
  rateLimitEnabled: z.boolean(),
  rateLimitTimeWindow: z.number().optional(),
  rateLimitMax: z.number().optional(),
  requestCount: z.number(),
  remaining: z.number().optional(),
  lastRequest: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
  permissions: z.string().optional(),
});

export class ApiKeyApi extends ApiClient {
  postAuthApikeyCreate(
    data: PostAuthApikeyCreateRequestType
  ): Promise<PostAuthApikeyCreateResponseType> {
    return this.post(
      `/auth/api-key/create`,
      PostAuthApikeyCreateResponseTypeSchema,
      { body: data, bodySchema: PostAuthApikeyCreateRequestTypeSchema }
    );
  }

  getAuthApikeyGet(id?: string): Promise<GetAuthApikeyGetResponseType> {
    return this.get(`/auth/api-key/get`, GetAuthApikeyGetResponseTypeSchema, {
      queryParams: { id },
    });
  }

  postAuthApikeyUpdate(
    data: PostAuthApikeyUpdateRequestType
  ): Promise<PostAuthApikeyUpdateResponseType> {
    return this.post(
      `/auth/api-key/update`,
      PostAuthApikeyUpdateResponseTypeSchema,
      { body: data, bodySchema: PostAuthApikeyUpdateRequestTypeSchema }
    );
  }

  postAuthApikeyDelete(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/api-key/delete`,
      z.object({
        success: z.boolean(),
      }),
      {
        body: data,
        bodySchema: z.object({
          keyId: z.string(),
        }),
      }
    );
  }

  getAuthApikeyList(): Promise<GetAuthApikeyListResponseItemType[]> {
    return this.get(
      `/auth/api-key/list`,
      z.array(GetAuthApikeyListResponseItemTypeSchema)
    );
  }
}
