import { z } from 'zod';

export const OrganizationSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  logo: z.string().optional(),
  createdAt: z.string().optional(),
  metadata: z.string().optional(),
});

export type Organization = z.infer<typeof OrganizationSchema>;
