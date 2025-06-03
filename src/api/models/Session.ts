import { z } from 'zod';

export const SessionSchema = z.object({
  id: z.string().optional(),
  expiresAt: z.string().optional(),
  token: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  userId: z.string().optional(),
  activeOrganizationId: z.string().optional(),
  impersonatedBy: z.string().optional(),
});

export type Session = z.infer<typeof SessionSchema>;
