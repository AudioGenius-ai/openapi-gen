import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface PostAuthOrganizationCreateRequestType {
  name: string;
  slug: string;
  userId?: string;
  logo?: string;
  metadata?: string;
  keepCurrentActiveOrganization?: string;
}

export const PostAuthOrganizationCreateRequestTypeSchema = z.object({
  name: z.string(),
  slug: z.string(),
  userId: z.string().optional(),
  logo: z.string().optional(),
  metadata: z.string().optional(),
  keepCurrentActiveOrganization: z.string().optional(),
});

export interface PostAuthOrganizationCreateResponseType {
  id?: string;
  name?: string;
  slug?: string;
  logo?: string;
  createdAt?: string;
  metadata?: string;
}

export const PostAuthOrganizationCreateResponseTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  logo: z.string().optional(),
  createdAt: z.string().optional(),
  metadata: z.string().optional(),
});

export interface PostAuthOrganizationUpdateResponseType {
  id?: string;
  name?: string;
  slug?: string;
  logo?: string;
  createdAt?: string;
  metadata?: string;
}

export const PostAuthOrganizationUpdateResponseTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  logo: z.string().optional(),
  createdAt: z.string().optional(),
  metadata: z.string().optional(),
});

export interface PostAuthOrganizationSetactiveResponseType {
  id?: string;
  name?: string;
  slug?: string;
  logo?: string;
  createdAt?: string;
  metadata?: string;
}

export const PostAuthOrganizationSetactiveResponseTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  logo: z.string().optional(),
  createdAt: z.string().optional(),
  metadata: z.string().optional(),
});

export interface GetAuthOrganizationGetfullorganizationResponseType {
  id?: string;
  name?: string;
  slug?: string;
  logo?: string;
  createdAt?: string;
  metadata?: string;
}

export const GetAuthOrganizationGetfullorganizationResponseTypeSchema =
  z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    slug: z.string().optional(),
    logo: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.string().optional(),
  });

export interface GetAuthOrganizationListResponseItemType {
  id?: string;
  name?: string;
  slug?: string;
  logo?: string;
  createdAt?: string;
  metadata?: string;
}

export const GetAuthOrganizationListResponseItemTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  logo: z.string().optional(),
  createdAt: z.string().optional(),
  metadata: z.string().optional(),
});

export interface PostAuthOrganizationInvitememberRequestType {
  email: string;
  role: string;
  organizationId?: string;
  resend?: string;
  teamId?: string;
}

export const PostAuthOrganizationInvitememberRequestTypeSchema = z.object({
  email: z.string(),
  role: z.string(),
  organizationId: z.string().optional(),
  resend: z.string().optional(),
  teamId: z.string().optional(),
});

export interface PostAuthOrganizationInvitememberResponseType {
  id: string;
  email: string;
  role: string;
  organizationId: string;
  inviterId: string;
  status: string;
  expiresAt: string;
}

export const PostAuthOrganizationInvitememberResponseTypeSchema = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string(),
  organizationId: z.string(),
  inviterId: z.string(),
  status: z.string(),
  expiresAt: z.string(),
});

export interface GetAuthOrganizationGetinvitationResponseType {
  id: string;
  email: string;
  role: string;
  organizationId: string;
  inviterId: string;
  status: string;
  expiresAt: string;
  organizationName: string;
  organizationSlug: string;
  inviterEmail: string;
}

export const GetAuthOrganizationGetinvitationResponseTypeSchema = z.object({
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
});

export interface PostAuthOrganizationRemovememberResponseMemberType {
  id: string;
  userId: string;
  organizationId: string;
  role: string;
}

export const PostAuthOrganizationRemovememberResponseMemberTypeSchema =
  z.object({
    id: z.string(),
    userId: z.string(),
    organizationId: z.string(),
    role: z.string(),
  });

export interface PostAuthOrganizationUpdatememberroleRequestType {
  role: string;
  memberId: string;
  organizationId?: string;
}

export const PostAuthOrganizationUpdatememberroleRequestTypeSchema = z.object({
  role: z.string(),
  memberId: z.string(),
  organizationId: z.string().optional(),
});

export interface PostAuthOrganizationUpdatememberroleResponseMemberType {
  id: string;
  userId: string;
  organizationId: string;
  role: string;
}

export const PostAuthOrganizationUpdatememberroleResponseMemberTypeSchema =
  z.object({
    id: z.string(),
    userId: z.string(),
    organizationId: z.string(),
    role: z.string(),
  });

export interface GetAuthOrganizationGetactivememberResponseType {
  id: string;
  userId: string;
  organizationId: string;
  role: string;
}

export const GetAuthOrganizationGetactivememberResponseTypeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  organizationId: z.string(),
  role: z.string(),
});

export interface PostAuthOrganizationCreateteamResponseType {
  id: string;
  name: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export const PostAuthOrganizationCreateteamResponseTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  organizationId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export interface GetAuthOrganizationListteamsResponseItemType {
  id: string;
  name: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export const GetAuthOrganizationListteamsResponseItemTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  organizationId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export interface PostAuthOrganizationUpdateteamResponseType {
  id: string;
  name: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export const PostAuthOrganizationUpdateteamResponseTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  organizationId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export class OrganizationApi extends ApiClient {
  postAuthOrganizationCreate(
    data: PostAuthOrganizationCreateRequestType
  ): Promise<PostAuthOrganizationCreateResponseType> {
    return this.post(
      `/auth/organization/create`,
      PostAuthOrganizationCreateResponseTypeSchema,
      { body: data, bodySchema: PostAuthOrganizationCreateRequestTypeSchema }
    );
  }

  postAuthOrganizationUpdate(
    data: Record<string, any>
  ): Promise<PostAuthOrganizationUpdateResponseType> {
    return this.post(
      `/auth/organization/update`,
      PostAuthOrganizationUpdateResponseTypeSchema,
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
  ): Promise<PostAuthOrganizationSetactiveResponseType> {
    return this.post(
      `/auth/organization/set-active`,
      PostAuthOrganizationSetactiveResponseTypeSchema,
      {
        body: data,
        bodySchema: z.object({
          organizationId: z.string().optional(),
          organizationSlug: z.string().optional(),
        }),
      }
    );
  }

  getAuthOrganizationGetfullorganization(): Promise<GetAuthOrganizationGetfullorganizationResponseType> {
    return this.get(
      `/auth/organization/get-full-organization`,
      GetAuthOrganizationGetfullorganizationResponseTypeSchema
    );
  }

  getAuthOrganizationList(): Promise<
    GetAuthOrganizationListResponseItemType[]
  > {
    return this.get(
      `/auth/organization/list`,
      z.array(GetAuthOrganizationListResponseItemTypeSchema)
    );
  }

  postAuthOrganizationInvitemember(
    data: PostAuthOrganizationInvitememberRequestType
  ): Promise<PostAuthOrganizationInvitememberResponseType> {
    return this.post(
      `/auth/organization/invite-member`,
      PostAuthOrganizationInvitememberResponseTypeSchema,
      {
        body: data,
        bodySchema: PostAuthOrganizationInvitememberRequestTypeSchema,
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

  getAuthOrganizationGetinvitation(
    id?: string
  ): Promise<GetAuthOrganizationGetinvitationResponseType> {
    return this.get(
      `/auth/organization/get-invitation`,
      GetAuthOrganizationGetinvitationResponseTypeSchema,
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
        member: PostAuthOrganizationRemovememberResponseMemberTypeSchema,
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
    data: PostAuthOrganizationUpdatememberroleRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/organization/update-member-role`,
      z.object({
        member: PostAuthOrganizationUpdatememberroleResponseMemberTypeSchema,
      }),
      {
        body: data,
        bodySchema: PostAuthOrganizationUpdatememberroleRequestTypeSchema,
      }
    );
  }

  getAuthOrganizationGetactivemember(): Promise<GetAuthOrganizationGetactivememberResponseType> {
    return this.get(
      `/auth/organization/get-active-member`,
      GetAuthOrganizationGetactivememberResponseTypeSchema
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
  ): Promise<PostAuthOrganizationCreateteamResponseType> {
    return this.post(
      `/auth/organization/create-team`,
      PostAuthOrganizationCreateteamResponseTypeSchema,
      {
        body: data,
        bodySchema: z.object({
          organizationId: z.string().optional(),
          name: z.string(),
        }),
      }
    );
  }

  getAuthOrganizationListteams(): Promise<
    GetAuthOrganizationListteamsResponseItemType[]
  > {
    return this.get(
      `/auth/organization/list-teams`,
      z.array(GetAuthOrganizationListteamsResponseItemTypeSchema)
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
  ): Promise<PostAuthOrganizationUpdateteamResponseType> {
    return this.post(
      `/auth/organization/update-team`,
      PostAuthOrganizationUpdateteamResponseTypeSchema,
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
