import { z } from 'zod';

export const UpdateAppleProductInputSchema = z.object({
  productId: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  type: z
    .enum([
      'consumable',
      'non_consumable',
      'auto_renewable_subscription',
      'non_renewable_subscription',
    ])
    .optional(),
  price: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).optional(),
  familyId: z.string().optional(),
  reviewNotes: z.string().optional(),
});

export type UpdateAppleProductInput = z.infer<
  typeof UpdateAppleProductInputSchema
>;
