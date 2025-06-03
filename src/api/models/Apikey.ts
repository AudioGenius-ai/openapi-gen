import { z } from 'zod';

export const ApikeySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  start: z.string().optional(),
  prefix: z.string().optional(),
  key: z.string().optional(),
  userId: z.string().optional(),
  refillInterval: z.number().optional(),
  refillAmount: z.number().optional(),
  lastRefillAt: z.string().optional(),
  enabled: z.boolean().optional(),
  rateLimitEnabled: z.boolean().optional(),
  rateLimitTimeWindow: z.number().optional(),
  rateLimitMax: z.number().optional(),
  requestCount: z.number().optional(),
  remaining: z.number().optional(),
  lastRequest: z.string().optional(),
  expiresAt: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  permissions: z.string().optional(),
  metadata: z.string().optional(),
});

export type Apikey = z.infer<typeof ApikeySchema>;
