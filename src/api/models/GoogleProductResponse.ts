import { z } from 'zod';

export const GoogleProductResponseSchema = z.object({
  id: z.string(),
  packageName: z.string(),
  sku: z.string(),
  name: z.string(),
  type: z.string(),
  status: z.string(),
  price: z.number(),
  currency: z.string(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type GoogleProductResponse = z.infer<typeof GoogleProductResponseSchema>;
