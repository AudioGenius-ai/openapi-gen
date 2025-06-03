import { z } from 'zod';

export const SyncFromPlatformsSchema = z.object({
  platforms: z
    .object({
      enableAppStores: z.boolean(),
      enablePaymentProvider: z.boolean(),
      appleAppId: z.string().optional(),
      googlePackageName: z.string().optional(),
    })
    .and(z.unknown()),
});

export type SyncFromPlatforms = z.infer<typeof SyncFromPlatformsSchema>;
