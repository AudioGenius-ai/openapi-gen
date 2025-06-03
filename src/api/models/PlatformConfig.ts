import { z } from 'zod';

export const PlatformConfigSchema = z.object({
  enableAppStores: z.boolean(),
  enablePaymentProvider: z.boolean(),
  appleAppId: z.string().optional(),
  googlePackageName: z.string().optional(),
});

export type PlatformConfig = z.infer<typeof PlatformConfigSchema>;
