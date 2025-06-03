import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class ApiKeyApi extends ApiClient {
  postAuthApikeyCreate(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/api-key/create`,
      z.object({
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
      }),
      {
        body: data,
        bodySchema: z.object({
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
        }),
      }
    );
  }

  getAuthApikeyGet(id?: string): Promise<Record<string, any>> {
    return this.get(
      `/auth/api-key/get`,
      z.object({
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
      }),
      { queryParams: { id } }
    );
  }

  postAuthApikeyUpdate(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/api-key/update`,
      z.object({
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
      }),
      {
        body: data,
        bodySchema: z.object({
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
        }),
      }
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

  getAuthApikeyList(): Promise<unknown> {
    return this.get(
      `/auth/api-key/list`,
      z.array(
        z.object({
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
        })
      )
    );
  }
}
