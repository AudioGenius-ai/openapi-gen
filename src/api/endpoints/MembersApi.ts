import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class MembersApi extends ApiClient {
  getOrganizationsMembers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/organizations/${id}/members`,
      z.object({
        members: z.array(
          z.object({
            id: z.string(),
            organizationId: z.string(),
            userId: z.string(),
            role: z.string(),
            createdAt: z.union([z.string(), z.string()]),
            teamId: z.string().optional(),
            user: z
              .object({
                email: z.string(),
                name: z.string(),
                image: z.string().optional(),
              })
              .optional(),
          })
        ),
      })
    );
  }
}
