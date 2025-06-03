import { z } from 'zod';

export const MemberSchema = z.object({
  id: z.string().optional(),
  organizationId: z.string().optional(),
  userId: z.string().optional(),
  role: z.string().optional(),
  teamId: z.string().optional(),
  createdAt: z.string().optional(),
});

export type Member = z.infer<typeof MemberSchema>;
