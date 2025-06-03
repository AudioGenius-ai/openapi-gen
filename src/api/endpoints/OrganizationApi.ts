import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class OrganizationApi extends ApiClient {
  postAuthOrganizationCreate(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/create`,
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        logo: z.string().optional(),
        createdAt: z.string().optional(),
        metadata: z.string().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string(),
          slug: z.string(),
          userId: z.string().optional(),
          logo: z.string().optional(),
          metadata: z.string().optional(),
          keepCurrentActiveOrganization: z.string().optional(),
        }),
      }
    );
  }

  postAuthOrganizationUpdate(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/update`,
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        logo: z.string().optional(),
        createdAt: z.string().optional(),
        metadata: z.string().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          data: z.object({}),
          organizationId: z.string().optional(),
        }),
      }
    );
  }

  postAuthOrganizationDelete(data: Record<string, any>): Promise<string> {
    return this.post(`/auth/organization/delete`, z.string(), {
      body: data,
      bodySchema: z.object({
        organizationId: z.string(),
      }),
    });
  }

  postAuthOrganizationSetactive(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/set-active`,
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        logo: z.string().optional(),
        createdAt: z.string().optional(),
        metadata: z.string().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          organizationId: z.string().optional(),
          organizationSlug: z.string().optional(),
        }),
      }
    );
  }

  getAuthOrganizationGetfullorganization(): Promise<Record<string, any>> {
    return this.get(
      `/auth/organization/get-full-organization`,
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        logo: z.string().optional(),
        createdAt: z.string().optional(),
        metadata: z.string().optional(),
      })
    );
  }

  getAuthOrganizationList(): Promise<unknown> {
    return this.get(
      `/auth/organization/list`,
      z.array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional(),
          slug: z.string().optional(),
          logo: z.string().optional(),
          createdAt: z.string().optional(),
          metadata: z.string().optional(),
        })
      )
    );
  }

  postAuthOrganizationInvitemember(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/invite-member`,
      z.object({
        id: z.string(),
        email: z.string(),
        role: z.string(),
        organizationId: z.string(),
        inviterId: z.string(),
        status: z.string(),
        expiresAt: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          email: z.string(),
          role: z.string(),
          organizationId: z.string().optional(),
          resend: z.string().optional(),
          teamId: z.string().optional(),
        }),
      }
    );
  }

  postAuthOrganizationCancelinvitation(
    data: Record<string, any>
  ): Promise<unknown> {
    return this.post(`/auth/organization/cancel-invitation`, z.unknown(), {
      body: data,
      bodySchema: z.object({
        invitationId: z.string(),
      }),
    });
  }

  postAuthOrganizationAcceptinvitation(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/accept-invitation`,
      z.object({
        invitation: z.object({}).optional(),
        member: z.object({}).optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          invitationId: z.string(),
        }),
      }
    );
  }

  getAuthOrganizationGetinvitation(id?: string): Promise<Record<string, any>> {
    return this.get(
      `/auth/organization/get-invitation`,
      z.object({
        id: z.string(),
        email: z.string(),
        role: z.string(),
        organizationId: z.string(),
        inviterId: z.string(),
        status: z.string(),
        expiresAt: z.string(),
        organizationName: z.string(),
        organizationSlug: z.string(),
        inviterEmail: z.string(),
      }),
      { queryParams: { id } }
    );
  }

  postAuthOrganizationRejectinvitation(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/reject-invitation`,
      z.object({
        invitation: z.object({}).optional(),
        member: z.unknown().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          invitationId: z.string(),
        }),
      }
    );
  }

  postAuthOrganizationCheckslug(data: Record<string, any>): Promise<unknown> {
    return this.post(`/auth/organization/check-slug`, z.unknown(), {
      body: data,
      bodySchema: z.object({
        slug: z.string(),
      }),
    });
  }

  postAuthOrganizationRemovemember(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/remove-member`,
      z.object({
        member: z.object({
          id: z.string(),
          userId: z.string(),
          organizationId: z.string(),
          role: z.string(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          memberIdOrEmail: z.string(),
          organizationId: z.string().optional(),
        }),
      }
    );
  }

  postAuthOrganizationUpdatememberrole(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/update-member-role`,
      z.object({
        member: z.object({
          id: z.string(),
          userId: z.string(),
          organizationId: z.string(),
          role: z.string(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          role: z.string(),
          memberId: z.string(),
          organizationId: z.string().optional(),
        }),
      }
    );
  }

  getAuthOrganizationGetactivemember(): Promise<Record<string, any>> {
    return this.get(
      `/auth/organization/get-active-member`,
      z.object({
        id: z.string(),
        userId: z.string(),
        organizationId: z.string(),
        role: z.string(),
      })
    );
  }

  postAuthOrganizationLeave(data: Record<string, any>): Promise<unknown> {
    return this.post(`/auth/organization/leave`, z.unknown(), {
      body: data,
      bodySchema: z.object({
        organizationId: z.string(),
      }),
    });
  }

  getAuthOrganizationListinvitations(): Promise<unknown> {
    return this.get(`/auth/organization/list-invitations`, z.unknown());
  }

  postAuthOrganizationCreateteam(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/create-team`,
      z.object({
        id: z.string(),
        name: z.string(),
        organizationId: z.string(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      }),
      {
        body: data,
        bodySchema: z.object({
          organizationId: z.string().optional(),
          name: z.string(),
        }),
      }
    );
  }

  getAuthOrganizationListteams(): Promise<unknown> {
    return this.get(
      `/auth/organization/list-teams`,
      z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          organizationId: z.string(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        })
      )
    );
  }

  postAuthOrganizationRemoveteam(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/remove-team`,
      z.object({
        message: z.enum(['Team removed successfully.']),
      }),
      {
        body: data,
        bodySchema: z.object({
          teamId: z.string(),
          organizationId: z.string().optional(),
        }),
      }
    );
  }

  postAuthOrganizationUpdateteam(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/update-team`,
      z.object({
        id: z.string(),
        name: z.string(),
        organizationId: z.string(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      }),
      {
        body: data,
        bodySchema: z.object({
          teamId: z.string(),
          data: z.object({}),
        }),
      }
    );
  }

  postAuthOrganizationHaspermission(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/has-permission`,
      z.object({
        error: z.string().optional(),
        success: z.boolean(),
      }),
      {
        body: data,
        bodySchema: z.object({
          permission: z.object({}).optional(),
          permissions: z.object({}),
        }),
      }
    );
  }
}
