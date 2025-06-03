import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class TicketMessagesApi extends ApiClient {
  postSupportMessages(
    id: string | number,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/support/${id}/messages`,
      z.object({
        message: z.object({
          id: z.string().uuid(),
          content: z.string(),
          userId: z.string().uuid(),
          ticketId: z.string().uuid(),
          createdAt: z.string(),
          updatedAt: z.string(),
          user: z.object({
            id: z.string().uuid(),
            name: z.string().max(100),
            email: z.string(),
            emailVerified: z.boolean(),
            image: z.string(),
            createdAt: z.string(),
            updatedAt: z.string(),
            username: z.string().max(100),
            role: z.enum(['admin', 'user', 'support']).optional(),
            isAnonymous: z.boolean(),
            banned: z.boolean(),
            banReason: z.string(),
            banExpires: z.string(),
            onboardingComplete: z.boolean(),
            paymentsCustomerId: z.string().uuid(),
            locale: z.string(),
          }),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          content: z.string().min(1),
        }),
      }
    );
  }
}
