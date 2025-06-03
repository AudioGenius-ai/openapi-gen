import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class WaitlistApi extends ApiClient {
  getAdminWaitlist(
    page?: string,
    pageSize?: string,
    search?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/waitlist`,
      z.object({
        entries: z.array(
          z.object({
            id: z.string().uuid(),
            email: z.string(),
            name: z.string().max(100),
            status: z.enum(['pending', 'approved', 'declined', 'invited']),
            createdAt: z.string(),
            updatedAt: z.string(),
            userId: z.string().uuid(),
            metadata: z.union([
              z.string(),
              z.number(),
              z.boolean(),
              z.unknown(),
              z.record(z.unknown()),
              z.array(z.unknown()),
              z.unknown(),
            ]),
            invitedAt: z.string(),
            responseAt: z.string(),
            referralCode: z.string().max(20),
            referredBy: z.string().uuid(),
            referralCount: z.number().int().min(-2147483648).max(2147483647),
          })
        ),
        pagination: z.object({
          currentPage: z.number(),
          totalPages: z.number(),
          pageSize: z.number(),
          totalEntries: z.number(),
        }),
      }),
      { queryParams: { page, pageSize, search, status } }
    );
  }

  patchAdminWaitlist(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/waitlist/${id}`,
      z.object({
        success: z.boolean(),
      }),
      {
        body: data,
        bodySchema: z.object({
          intent: z.enum(['approve', 'decline', 'delete']),
        }),
      }
    );
  }
}
