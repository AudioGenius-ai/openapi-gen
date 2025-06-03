import { z } from 'zod';

export const UpdateUserPasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export type UpdateUserPassword = z.infer<typeof UpdateUserPasswordSchema>;
