import { z } from 'zod';

export const AppleProductInputSchema = z.object({
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
});

export type AppleProductInput = z.infer<typeof AppleProductInputSchema>;
