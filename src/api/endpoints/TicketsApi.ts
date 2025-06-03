import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetSupportResponseTicketsItemCreatedByType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'admin';
  user;
  support;
  isAnonymous: boolean;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  paymentsCustomerId: string;
  locale: string;
}

export const GetSupportResponseTicketsItemCreatedByTypeSchema = z.object({
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
});

export interface GetSupportResponseTicketsItemAssignedToType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'admin';
  user;
  support;
  isAnonymous: boolean;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  paymentsCustomerId: string;
  locale: string;
}

export const GetSupportResponseTicketsItemAssignedToTypeSchema = z.object({
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
});

export interface GetSupportResponseTicketsItemType {
  id: string;
  subject: string;
  description: string;
  status: 'open';
  in_progress;
  resolved;
  closed;
  priority: 'low';
  medium;
  high;
  urgent;
  createdById: string;
  assignedToId: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string;
  createdBy: GetSupportResponseTicketsItemCreatedByType;
  assignedTo: GetSupportResponseTicketsItemAssignedToType;
}

export const GetSupportResponseTicketsItemTypeSchema = z.object({
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
  createdBy: GetSupportResponseTicketsItemCreatedByTypeSchema,
  assignedTo: GetSupportResponseTicketsItemAssignedToTypeSchema,
});

export interface PostSupportRequestType {
  subject: string;
  description: string;
  priority: 'low';
  medium;
  high;
  urgent;
  organizationId?: string;
}

export const PostSupportRequestTypeSchema = z.object({
  subject: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  organizationId: z.string().uuid().optional(),
});

export interface PostSupportResponseTicketCreatedByType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'admin';
  user;
  support;
  isAnonymous: boolean;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  paymentsCustomerId: string;
  locale: string;
}

export const PostSupportResponseTicketCreatedByTypeSchema = z.object({
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
});

export interface PostSupportResponseTicketType {
  id: string;
  subject: string;
  description: string;
  status: 'open';
  in_progress;
  resolved;
  closed;
  priority: 'low';
  medium;
  high;
  urgent;
  createdById: string;
  assignedToId: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string;
  createdBy: PostSupportResponseTicketCreatedByType;
}

export const PostSupportResponseTicketTypeSchema = z.object({
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
  createdBy: PostSupportResponseTicketCreatedByTypeSchema,
});

export interface GetSupportResponseTicketCreatedByType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'admin';
  user;
  support;
  isAnonymous: boolean;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  paymentsCustomerId: string;
  locale: string;
}

export const GetSupportResponseTicketCreatedByTypeSchema = z.object({
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
});

export interface GetSupportResponseTicketAssignedToType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'admin';
  user;
  support;
  isAnonymous: boolean;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  paymentsCustomerId: string;
  locale: string;
}

export const GetSupportResponseTicketAssignedToTypeSchema = z.object({
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
});

export interface GetSupportResponseTicketMessagesItemUserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'admin';
  user;
  support;
  isAnonymous: boolean;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  paymentsCustomerId: string;
  locale: string;
}

export const GetSupportResponseTicketMessagesItemUserTypeSchema = z.object({
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
});

export interface GetSupportResponseTicketMessagesItemType {
  id: string;
  content: string;
  userId: string;
  ticketId: string;
  createdAt: string;
  updatedAt: string;
  user: GetSupportResponseTicketMessagesItemUserType;
}

export const GetSupportResponseTicketMessagesItemTypeSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  userId: z.string().uuid(),
  ticketId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: GetSupportResponseTicketMessagesItemUserTypeSchema,
});

export interface GetSupportResponseTicketType {
  id: string;
  subject: string;
  description: string;
  status: 'open';
  in_progress;
  resolved;
  closed;
  priority: 'low';
  medium;
  high;
  urgent;
  createdById: string;
  assignedToId: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string;
  createdBy: GetSupportResponseTicketCreatedByType;
  assignedTo: GetSupportResponseTicketAssignedToType;
  messages: GetSupportResponseTicketMessagesItemType[];
}

export const GetSupportResponseTicketTypeSchema = z.object({
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
  createdBy: GetSupportResponseTicketCreatedByTypeSchema,
  assignedTo: GetSupportResponseTicketAssignedToTypeSchema,
  messages: z.array(GetSupportResponseTicketMessagesItemTypeSchema),
});

export interface PutSupportRequestType {
  id?: string;
  subject?: string;
  description?: string;
  status?: 'open';
  in_progress;
  resolved;
  closed;
  priority?: 'low';
  medium;
  high;
  urgent;
  createdById?: string;
  assignedToId?: string;
  createdAt?: string;
  updatedAt?: string;
  resolvedAt?: string;
}

export const PutSupportRequestTypeSchema = z.object({
  id: z.string().uuid().optional(),
  subject: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  createdById: z.string().uuid().optional(),
  assignedToId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  resolvedAt: z.string().optional(),
});

export interface PutSupportResponseTicketType {
  id: string;
  subject: string;
  description: string;
  status: 'open';
  in_progress;
  resolved;
  closed;
  priority: 'low';
  medium;
  high;
  urgent;
  createdById: string;
  assignedToId: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string;
}

export const PutSupportResponseTicketTypeSchema = z.object({
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
});

export interface GetSupportTicketsResponseTicketCreatedByType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'admin';
  user;
  support;
  isAnonymous: boolean;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  paymentsCustomerId: string;
  locale: string;
}

export const GetSupportTicketsResponseTicketCreatedByTypeSchema = z.object({
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
});

export interface GetSupportTicketsResponseTicketAssignedToType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'admin';
  user;
  support;
  isAnonymous: boolean;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  paymentsCustomerId: string;
  locale: string;
}

export const GetSupportTicketsResponseTicketAssignedToTypeSchema = z.object({
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
});

export interface GetSupportTicketsResponseTicketMessagesItemUserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'admin';
  user;
  support;
  isAnonymous: boolean;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  paymentsCustomerId: string;
  locale: string;
}

export const GetSupportTicketsResponseTicketMessagesItemUserTypeSchema =
  z.object({
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
  });

export interface GetSupportTicketsResponseTicketMessagesItemType {
  id: string;
  content: string;
  userId: string;
  ticketId: string;
  createdAt: string;
  updatedAt: string;
  user: GetSupportTicketsResponseTicketMessagesItemUserType;
}

export const GetSupportTicketsResponseTicketMessagesItemTypeSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  userId: z.string().uuid(),
  ticketId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: GetSupportTicketsResponseTicketMessagesItemUserTypeSchema,
});

export interface GetSupportTicketsResponseTicketType {
  id: string;
  subject: string;
  description: string;
  status: 'open';
  in_progress;
  resolved;
  closed;
  priority: 'low';
  medium;
  high;
  urgent;
  createdById: string;
  assignedToId: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string;
  createdBy: GetSupportTicketsResponseTicketCreatedByType;
  assignedTo: GetSupportTicketsResponseTicketAssignedToType;
  messages: GetSupportTicketsResponseTicketMessagesItemType[];
}

export const GetSupportTicketsResponseTicketTypeSchema = z.object({
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
  createdBy: GetSupportTicketsResponseTicketCreatedByTypeSchema,
  assignedTo: GetSupportTicketsResponseTicketAssignedToTypeSchema,
  messages: z.array(GetSupportTicketsResponseTicketMessagesItemTypeSchema),
});

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
        tickets: z.array(GetSupportResponseTicketsItemTypeSchema),
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

  postSupport(data: PostSupportRequestType): Promise<Record<string, any>> {
    return this.post(
      `/support`,
      z.object({
        ticket: PostSupportResponseTicketTypeSchema,
      }),
      { body: data, bodySchema: PostSupportRequestTypeSchema }
    );
  }

  getSupport(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/support/${id}`,
      z.object({
        ticket: GetSupportResponseTicketTypeSchema,
      })
    );
  }

  putSupport(
    id: string | number,
    data: PutSupportRequestType
  ): Promise<Record<string, any>> {
    return this.put(
      `/support/${id}`,
      z.object({
        ticket: PutSupportResponseTicketTypeSchema,
      }),
      { body: data, bodySchema: PutSupportRequestTypeSchema }
    );
  }

  getSupportTickets(ticketId: string | number): Promise<Record<string, any>> {
    return this.get(
      `/support/tickets/${ticketId}`,
      z.object({
        ticket: GetSupportTicketsResponseTicketTypeSchema,
      })
    );
  }
}
