import { z } from 'zod';

export const PlatformStatusSchema = z.object({
  id: z.string(),
  status: z.enum(['active', 'inactive']),
});

export type PlatformStatus = z.infer<typeof PlatformStatusSchema>;
