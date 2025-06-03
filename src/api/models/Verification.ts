import { z } from 'zod';

export const VerificationSchema = z.object({
  id: z.string().optional(),
  identifier: z.string().optional(),
  value: z.string().optional(),
  expiresAt: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Verification = z.infer<typeof VerificationSchema>;
