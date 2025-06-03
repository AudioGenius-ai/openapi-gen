import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class OrganizationInvitationsApi extends ApiClient {
  getOrganizationsInvitations(
    id: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/organizations/${id}/invitations`,
      z.object({
        invitations: z.array(
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
          })
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
        invitation: z.object({
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
        }),
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
        invitation: z.object({
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
        }),
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
        invitation: z.object({
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
        }),
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
