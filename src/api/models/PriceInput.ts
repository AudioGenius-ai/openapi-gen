import { z } from 'zod';

export const PriceInputSchema = z.object({
  unitAmount: z.number().int().min(0),
  currency: z.string().min(3).max(3),
  recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
  recurringIntervalCount: z.number().int().min(0).optional(),
  id: z.string().optional(),
  isDefault: z.boolean().optional(),
  trialPeriodDays: z.number().int().min(0).optional(),
});

export type PriceInput = z.infer<typeof PriceInputSchema>;
