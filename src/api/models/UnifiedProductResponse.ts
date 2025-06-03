import { z } from 'zod';

export const UnifiedProductResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(['one-time', 'subscription']),
  prices: z.array(
    z.object({
      unitAmount: z.number().int().min(0),
      currency: z.string().min(3).max(3),
      recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
      recurringIntervalCount: z.number().int().min(0).optional(),
      id: z.string().optional(),
      isDefault: z.boolean().optional(),
      trialPeriodDays: z.number().int().min(0).optional(),
    })
  ),
  features: z.array(z.string()).optional(),
  platforms: z.object({
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
  }),
  metadata: z.record(z.unknown()).optional(),
});

export type UnifiedProductResponse = z.infer<
  typeof UnifiedProductResponseSchema
>;
