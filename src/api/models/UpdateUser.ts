import { z } from 'zod';

export const UpdateUserSchema = z.object({
  name: z.string().max(100).optional(),
  username: z.string().max(100).optional(),
  onboardingComplete: z.boolean().optional(),
  locale: z.string().optional(),
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;
