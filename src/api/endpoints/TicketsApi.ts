import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class TicketsApi extends ApiClient {
  getSupport(
    organizationId?: string,
    status?: string,
    priority?: string,
    assigneeId?: string,
    limit?: number,
    offset?: number,
    q?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/support`,
      z.object({
        tickets: z.array(
          z.object({
            id: z.string().uuid(),
            subject: z.string(),
            description: z.string(),
            status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
            priority: z.enum(['low', 'medium', 'high', 'urgent']),
            createdById: z.string().uuid(),
            assignedToId: z.string().uuid(),
            createdAt: z.string(),
            updatedAt: z.string(),
            resolvedAt: z.string(),
            createdBy: z.object({
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
            assignedTo: z.object({
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
          })
        ),
        total: z.number().int(),
      }),
      {
        queryParams: {
          organizationId,
          status,
          priority,
          assigneeId,
          limit,
          offset,
          q,
        },
      }
    );
  }

  postSupport(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/support`,
      z.object({
        ticket: z.object({
          id: z.string().uuid(),
          subject: z.string(),
          description: z.string(),
          status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
          priority: z.enum(['low', 'medium', 'high', 'urgent']),
          createdById: z.string().uuid(),
          assignedToId: z.string().uuid(),
          createdAt: z.string(),
          updatedAt: z.string(),
          resolvedAt: z.string(),
          createdBy: z.object({
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
          subject: z.string().min(1),
          description: z.string().min(1),
          priority: z.enum(['low', 'medium', 'high', 'urgent']),
          organizationId: z.string().uuid().optional(),
        }),
      }
    );
  }

  getSupport(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/support/${id}`,
      z.object({
        ticket: z.object({
          id: z.string().uuid(),
          subject: z.string(),
          description: z.string(),
          status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
          priority: z.enum(['low', 'medium', 'high', 'urgent']),
          createdById: z.string().uuid(),
          assignedToId: z.string().uuid(),
          createdAt: z.string(),
          updatedAt: z.string(),
          resolvedAt: z.string(),
          createdBy: z.object({
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
          assignedTo: z.object({
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
          messages: z.array(
            z.object({
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
            })
          ),
        }),
      })
    );
  }

  putSupport(
    id: string | number,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/support/${id}`,
      z.object({
        ticket: z.object({
          id: z.string().uuid(),
          subject: z.string(),
          description: z.string(),
          status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
          priority: z.enum(['low', 'medium', 'high', 'urgent']),
          createdById: z.string().uuid(),
          assignedToId: z.string().uuid(),
          createdAt: z.string(),
          updatedAt: z.string(),
          resolvedAt: z.string(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          id: z.string().uuid().optional(),
          subject: z.string().min(3).optional(),
          description: z.string().min(10).optional(),
          status: z
            .enum(['open', 'in_progress', 'resolved', 'closed'])
            .optional(),
          priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
          createdById: z.string().uuid().optional(),
          assignedToId: z.string().optional(),
          createdAt: z.string().optional(),
          updatedAt: z.string().optional(),
          resolvedAt: z.string().optional(),
        }),
      }
    );
  }

  getSupportTickets(ticketId: string | number): Promise<Record<string, any>> {
    return this.get(
      `/support/tickets/${ticketId}`,
      z.object({
        ticket: z.object({
          id: z.string().uuid(),
          subject: z.string(),
          description: z.string(),
          status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
          priority: z.enum(['low', 'medium', 'high', 'urgent']),
          createdById: z.string().uuid(),
          assignedToId: z.string().uuid(),
          createdAt: z.string(),
          updatedAt: z.string(),
          resolvedAt: z.string(),
          createdBy: z.object({
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
          assignedTo: z.object({
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
          messages: z.array(
            z.object({
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
            })
          ),
        }),
      })
    );
  }
}
