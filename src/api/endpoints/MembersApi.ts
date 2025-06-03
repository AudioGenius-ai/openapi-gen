import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetOrganizationsMembersResponseMembersItemUserType {
  email: string;
  name: string;
  image?: string;
}

export const GetOrganizationsMembersResponseMembersItemUserTypeSchema =
  z.object({
    email: z.string(),
    name: z.string(),
    image: z.string().optional(),
  });

export interface GetOrganizationsMembersResponseMembersItemType {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  createdAt: string | string;
  teamId?: string;
  user?: GetOrganizationsMembersResponseMembersItemUserType;
}

export const GetOrganizationsMembersResponseMembersItemTypeSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.union([z.string(), z.string()]),
  teamId: z.string().optional(),
  user: GetOrganizationsMembersResponseMembersItemUserTypeSchema.optional(),
});

export class MembersApi extends ApiClient {
  getOrganizationsMembers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/organizations/${id}/members`,
      z.object({
        members: z.array(GetOrganizationsMembersResponseMembersItemTypeSchema),
      })
    );
  }
}
