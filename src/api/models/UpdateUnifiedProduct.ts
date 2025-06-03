import { z } from 'zod';

export const UpdateUnifiedProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(['one-time', 'subscription']).optional(),
  prices: z
    .array(
      z.object({
        unitAmount: z.number().int().min(0),
        currency: z.string().min(3).max(3),
        recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
        recurringIntervalCount: z.number().int().min(0).optional(),
        id: z.string().optional(),
        isDefault: z.boolean().optional(),
        trialPeriodDays: z.number().int().min(0).optional(),
      })
    )
    .optional(),
  features: z.array(z.string()).optional(),
  platforms: z
    .object({
      enableAppStores: z.boolean(),
      enablePaymentProvider: z.boolean(),
      appleAppId: z.string().optional(),
      googlePackageName: z.string().optional(),
    })
    .optional(),
});

export type UpdateUnifiedProduct = z.infer<typeof UpdateUnifiedProductSchema>;
