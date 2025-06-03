import { z } from 'zod';

export const SyncProductsInputSchema = z.object({
  platform: z.enum(['apple', 'google']),
  appId: z.string().min(1),
  force: z.boolean().optional(),
});

export type SyncProductsInput = z.infer<typeof SyncProductsInputSchema>;
