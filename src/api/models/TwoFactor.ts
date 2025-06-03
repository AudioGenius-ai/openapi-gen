import { z } from 'zod';

export const TwoFactorSchema = z.object({
  id: z.string().optional(),
  secret: z.string().optional(),
  backupCodes: z.string().optional(),
  userId: z.string().optional(),
});

export type TwoFactor = z.infer<typeof TwoFactorSchema>;
