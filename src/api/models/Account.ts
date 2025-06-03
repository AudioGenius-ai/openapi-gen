import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.string().optional(),
  accountId: z.string().optional(),
  providerId: z.string().optional(),
  userId: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  idToken: z.string().optional(),
  accessTokenExpiresAt: z.string().optional(),
  refreshTokenExpiresAt: z.string().optional(),
  scope: z.string().optional(),
  password: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Account = z.infer<typeof AccountSchema>;
