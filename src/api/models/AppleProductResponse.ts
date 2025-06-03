import { z } from 'zod';

export const AppleProductResponseSchema = z.object({
  id: z.string(),
  appId: z.string(),
  productId: z.string(),
  name: z.string(),
  type: z.string(),
  price: z.number(),
  currency: z.string(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type AppleProductResponse = z.infer<typeof AppleProductResponseSchema>;
