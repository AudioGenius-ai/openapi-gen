import { z } from 'zod';

export const TeamSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  organizationId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Team = z.infer<typeof TeamSchema>;
