import { z } from 'zod';

export const UpdateUserEmailSchema = z.object({
  email: z.string().email(),
});

export type UpdateUserEmail = z.infer<typeof UpdateUserEmailSchema>;
