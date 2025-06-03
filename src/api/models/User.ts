import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isAnonymous: z.boolean().optional(),
  role: z.string().optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.string().optional(),
  twoFactorEnabled: z.boolean().optional(),
  onboardingComplete: z.boolean().optional(),
});

export type User = z.infer<typeof UserSchema>;
