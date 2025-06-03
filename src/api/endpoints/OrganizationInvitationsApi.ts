import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetOrganizationsInvitationsResponseInvitationsItemType {
  id: string;
  email: string;
  status: 'pending';
  accepted;
  rejected;
  canceled;
  declined;
  expired;
  role: string;
  organizationId: string;
  inviterId: string;
  createdAt?: string;
  expiresAt?: string;
  teamId?: string;
}

export const GetOrganizationsInvitationsResponseInvitationsItemTypeSchema =
  z.object({
    id: z.string(),
    email: z.string().email(),
    status: z.enum([
      'pending',
      'accepted',
      'rejected',
      'canceled',
      'declined',
      'expired',
    ]),
    role: z.string(),
    organizationId: z.string(),
    inviterId: z.string(),
    createdAt: z.string().optional(),
    expiresAt: z.string().optional(),
    teamId: z.string().optional(),
  });

export interface PostOrganizationsInvitationsResponseInvitationType {
  id: string;
  email: string;
  status: 'pending';
  accepted;
  rejected;
  canceled;
  declined;
  expired;
  role: string;
  organizationId: string;
  inviterId: string;
  createdAt?: string;
  expiresAt?: string;
  teamId?: string;
}

export const PostOrganizationsInvitationsResponseInvitationTypeSchema =
  z.object({
    id: z.string(),
    email: z.string().email(),
    status: z.enum([
      'pending',
      'accepted',
      'rejected',
      'canceled',
      'declined',
      'expired',
    ]),
    role: z.string(),
    organizationId: z.string(),
    inviterId: z.string(),
    createdAt: z.string().optional(),
    expiresAt: z.string().optional(),
    teamId: z.string().optional(),
  });

export interface PostOrganizationsInvitationsAcceptResponseInvitationType {
  id: string;
  email: string;
  status: 'pending';
  accepted;
  rejected;
  canceled;
  declined;
  expired;
  role: string;
  organizationId: string;
  inviterId: string;
  createdAt?: string;
  expiresAt?: string;
  teamId?: string;
}

export const PostOrganizationsInvitationsAcceptResponseInvitationTypeSchema =
  z.object({
    id: z.string(),
    email: z.string().email(),
    status: z.enum([
      'pending',
      'accepted',
      'rejected',
      'canceled',
      'declined',
      'expired',
    ]),
    role: z.string(),
    organizationId: z.string(),
    inviterId: z.string(),
    createdAt: z.string().optional(),
    expiresAt: z.string().optional(),
    teamId: z.string().optional(),
  });

export interface PutOrganizationsInvitationsResponseInvitationType {
  id: string;
  email: string;
  status: 'pending';
  accepted;
  rejected;
  canceled;
  declined;
  expired;
  role: string;
  organizationId: string;
  inviterId: string;
  createdAt?: string;
  expiresAt?: string;
  teamId?: string;
}

export const PutOrganizationsInvitationsResponseInvitationTypeSchema = z.object(
  {
    id: z.string(),
    email: z.string().email(),
    status: z.enum([
      'pending',
      'accepted',
      'rejected',
      'canceled',
      'declined',
      'expired',
    ]),
    role: z.string(),
    organizationId: z.string(),
    inviterId: z.string(),
    createdAt: z.string().optional(),
    expiresAt: z.string().optional(),
    teamId: z.string().optional(),
  }
);

export class OrganizationInvitationsApi extends ApiClient {
  getOrganizationsInvitations(
    id: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/organizations/${id}/invitations`,
      z.object({
        invitations: z.array(
          GetOrganizationsInvitationsResponseInvitationsItemTypeSchema
        ),
      })
    );
  }

  postOrganizationsInvitations(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/organizations/${id}/invitations`,
      z.object({
        invitation: PostOrganizationsInvitationsResponseInvitationTypeSchema,
      }),
      {
        body: data,
        bodySchema: z.object({
          email: z.string().email(),
          role: z.enum(['admin', 'member', 'owner']),
        }),
      }
    );
  }

  postOrganizationsInvitationsAccept(
    id: string | number,
    invitationId: string | number
  ): Promise<Record<string, any>> {
    return this.post(
      `/organizations/${id}/invitations/${invitationId}/accept`,
      z.object({
        invitation:
          PostOrganizationsInvitationsAcceptResponseInvitationTypeSchema,
      })
    );
  }

  putOrganizationsInvitations(
    id: string | number,
    invitationId: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/organizations/${id}/invitations/${invitationId}`,
      z.object({
        invitation: PutOrganizationsInvitationsResponseInvitationTypeSchema,
      }),
      {
        body: data,
        bodySchema: z.object({
          status: z.enum(['accepted', 'declined', 'rejected']),
        }),
      }
    );
  }

  deleteOrganizationsInvitations(
    id: string | number,
    invitationId: string | number
  ): Promise<Record<string, any>> {
    return this.delete(
      `/organizations/${id}/invitations/${invitationId}`,
      z.object({
        success: z.boolean(),
      })
    );
  }
}
