import { z } from 'zod';

export const GoogleProductInputSchema = z.object({
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

export type GoogleProductInput = z.infer<typeof GoogleProductInputSchema>;
