import { z } from 'zod';

export const InvitationSchema = z.object({
  id: z.string().optional(),
  organizationId: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
  teamId: z.string().optional(),
  status: z.string().optional(),
  expiresAt: z.string().optional(),
  inviterId: z.string().optional(),
});

export type Invitation = z.infer<typeof InvitationSchema>;
