import { z } from 'zod';

export const ProductSyncResultSchema = z.object({
  success: z.boolean(),
  platforms: z.object({
    paymentProvider: z
      .object({
        success: z.boolean(),
        error: z.string().optional(),
        id: z.string().optional(),
      })
      .optional(),
    apple: z
      .object({
        success: z.boolean(),
        error: z.string().optional(),
        id: z.string().optional(),
      })
      .optional(),
    google: z
      .object({
        success: z.boolean(),
        error: z.string().optional(),
        id: z.string().optional(),
      })
      .optional(),
  }),
  errors: z.array(z.string()),
});

export type ProductSyncResult = z.infer<typeof ProductSyncResultSchema>;
