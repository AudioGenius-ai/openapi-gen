import { z } from 'zod';

export const UpdateGoogleProductInputSchema = z.object({
  sku: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  type: z.enum(['inapp', 'subs']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  price: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).optional(),
  subscriptionPeriod: z.string().optional(),
  trialPeriod: z.string().optional(),
});

export type UpdateGoogleProductInput = z.infer<
  typeof UpdateGoogleProductInputSchema
>;
