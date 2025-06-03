import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetOrganizationsResponseOrganizationsItemType {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  website?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const GetOrganizationsResponseOrganizationsItemTypeSchema = z.object({
  id: z.string(),
  name: z.string().max(100),
  slug: z.string().max(100),
  logo: z.string().optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export interface PostOrganizationsRequestType {
  name: string;
  slug: string;
  logo?: string;
  website?: string;
  description?: string;
}

export const PostOrganizationsRequestTypeSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  logo: z.string().optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
});

export interface PostOrganizationsResponseOrganizationType {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  website?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const PostOrganizationsResponseOrganizationTypeSchema = z.object({
  id: z.string(),
  name: z.string().max(100),
  slug: z.string().max(100),
  logo: z.string().optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export interface GetOrganizationsResponseOrganizationMembersItemUserType {
  email: string;
  name: string;
  image?: string;
}

export const GetOrganizationsResponseOrganizationMembersItemUserTypeSchema =
  z.object({
    email: z.string(),
    name: z.string(),
    image: z.string().optional(),
  });

export interface GetOrganizationsResponseOrganizationMembersItemType {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  createdAt: string | string;
  teamId?: string;
  user?: GetOrganizationsResponseOrganizationMembersItemUserType;
}

export const GetOrganizationsResponseOrganizationMembersItemTypeSchema =
  z.object({
    id: z.string(),
    organizationId: z.string(),
    userId: z.string(),
    role: z.string(),
    createdAt: z.union([z.string(), z.string()]),
    teamId: z.string().optional(),
    user: GetOrganizationsResponseOrganizationMembersItemUserTypeSchema.optional(),
  });

export interface GetOrganizationsResponseOrganizationType {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  website?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  members?: GetOrganizationsResponseOrganizationMembersItemType[];
}

export const GetOrganizationsResponseOrganizationTypeSchema = z.object({
  id: z.string(),
  name: z.string().max(100),
  slug: z.string().max(100),
  logo: z.string().optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  members: z
    .array(GetOrganizationsResponseOrganizationMembersItemTypeSchema)
    .optional(),
});

export interface PutOrganizationsRequestType {
  name?: string;
  slug?: string;
  logo?: string;
  website?: string;
  description?: string;
}

export const PutOrganizationsRequestTypeSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(100).optional(),
  logo: z.string().optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
});

export interface PutOrganizationsResponseOrganizationType {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  website?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const PutOrganizationsResponseOrganizationTypeSchema = z.object({
  id: z.string(),
  name: z.string().max(100),
  slug: z.string().max(100),
  logo: z.string().optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export interface PostOrganizationsMembersResponseMemberUserType {
  email: string;
  name: string;
  image?: string;
}

export const PostOrganizationsMembersResponseMemberUserTypeSchema = z.object({
  email: z.string(),
  name: z.string(),
  image: z.string().optional(),
});

export interface PostOrganizationsMembersResponseMemberType {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  createdAt: string | string;
  teamId?: string;
  user?: PostOrganizationsMembersResponseMemberUserType;
}

export const PostOrganizationsMembersResponseMemberTypeSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.union([z.string(), z.string()]),
  teamId: z.string().optional(),
  user: PostOrganizationsMembersResponseMemberUserTypeSchema.optional(),
});

export interface PutOrganizationsMembersResponseMemberUserType {
  email: string;
  name: string;
  image?: string;
}

export const PutOrganizationsMembersResponseMemberUserTypeSchema = z.object({
  email: z.string(),
  name: z.string(),
  image: z.string().optional(),
});

export interface PutOrganizationsMembersResponseMemberType {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  createdAt: string | string;
  teamId?: string;
  user?: PutOrganizationsMembersResponseMemberUserType;
}

export const PutOrganizationsMembersResponseMemberTypeSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.union([z.string(), z.string()]),
  teamId: z.string().optional(),
  user: PutOrganizationsMembersResponseMemberUserTypeSchema.optional(),
});

export class OrganizationsApi extends ApiClient {
  getOrganizations(): Promise<Record<string, any>> {
    return this.get(
      `/organizations`,
      z.object({
        organizations: z.array(
          GetOrganizationsResponseOrganizationsItemTypeSchema
        ),
      })
    );
  }

  postOrganizations(
    data?: PostOrganizationsRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/organizations`,
      z.object({
        organization: PostOrganizationsResponseOrganizationTypeSchema,
      }),
      { body: data, bodySchema: PostOrganizationsRequestTypeSchema }
    );
  }

  getOrganizations(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/organizations/${id}`,
      z.object({
        organization: GetOrganizationsResponseOrganizationTypeSchema,
      })
    );
  }

  putOrganizations(
    id: string | number,
    data?: PutOrganizationsRequestType
  ): Promise<Record<string, any>> {
    return this.put(
      `/organizations/${id}`,
      z.object({
        organization: PutOrganizationsResponseOrganizationTypeSchema,
      }),
      { body: data, bodySchema: PutOrganizationsRequestTypeSchema }
    );
  }

  deleteOrganizations(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/organizations/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  postOrganizationsSetactive(
    id: string | number
  ): Promise<Record<string, any>> {
    return this.post(
      `/organizations/${id}/set-active`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  postOrganizationsMembers(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/organizations/${id}/members`,
      z.object({
        member: PostOrganizationsMembersResponseMemberTypeSchema,
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
          role: z.enum(['admin', 'member', 'owner']),
        }),
      }
    );
  }

  putOrganizationsMembers(
    id: string | number,
    memberId: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/organizations/${id}/members/${memberId}`,
      z.object({
        member: PutOrganizationsMembersResponseMemberTypeSchema,
      }),
      {
        body: data,
        bodySchema: z.object({
          role: z.enum(['admin', 'member', 'owner']),
        }),
      }
    );
  }

  deleteOrganizationsMembers(
    id: string | number,
    memberId: string | number
  ): Promise<Record<string, any>> {
    return this.delete(
      `/organizations/${id}/members/${memberId}`,
      z.object({
        success: z.boolean(),
      })
    );
  }
}
