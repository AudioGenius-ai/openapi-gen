import { z } from 'zod';

export const SyncResultResponseSchema = z.object({
  platform: z.string(),
  appId: z.string(),
  synced: z.number(),
  created: z.number(),
  updated: z.number(),
  errors: z.array(z.string()),
  lastSyncAt: z.string().datetime(),
});

export type SyncResultResponse = z.infer<typeof SyncResultResponseSchema>;
