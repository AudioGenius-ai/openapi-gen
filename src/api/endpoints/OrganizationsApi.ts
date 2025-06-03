import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class OrganizationsApi extends ApiClient {
  getOrganizations(): Promise<Record<string, any>> {
    return this.get(
      `/organizations`,
      z.object({
        organizations: z.array(
          z.object({
            id: z.string(),
            name: z.string().max(100),
            slug: z.string().max(100),
            logo: z.string().optional(),
            website: z.string().url().optional(),
            description: z.string().optional(),
            createdAt: z.string().optional(),
            updatedAt: z.string().optional(),
          })
        ),
      })
    );
  }

  postOrganizations(data?: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/organizations`,
      z.object({
        organization: z.object({
          id: z.string(),
          name: z.string().max(100),
          slug: z.string().max(100),
          logo: z.string().optional(),
          website: z.string().url().optional(),
          description: z.string().optional(),
          createdAt: z.string().optional(),
          updatedAt: z.string().optional(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().min(1).max(100),
          slug: z.string().min(1).max(100),
          logo: z.string().optional(),
          website: z.string().url().optional(),
          description: z.string().optional(),
        }),
      }
    );
  }

  getOrganizations(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/organizations/${id}`,
      z.object({
        organization: z.object({
          id: z.string(),
          name: z.string().max(100),
          slug: z.string().max(100),
          logo: z.string().optional(),
          website: z.string().url().optional(),
          description: z.string().optional(),
          createdAt: z.string().optional(),
          updatedAt: z.string().optional(),
          members: z
            .array(
              z.object({
                id: z.string(),
                organizationId: z.string(),
                userId: z.string(),
                role: z.string(),
                createdAt: z.union([z.string(), z.string()]),
                teamId: z.string().optional(),
                user: z
                  .object({
                    email: z.string(),
                    name: z.string(),
                    image: z.string().optional(),
                  })
                  .optional(),
              })
            )
            .optional(),
        }),
      })
    );
  }

  putOrganizations(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/organizations/${id}`,
      z.object({
        organization: z.object({
          id: z.string(),
          name: z.string().max(100),
          slug: z.string().max(100),
          logo: z.string().optional(),
          website: z.string().url().optional(),
          description: z.string().optional(),
          createdAt: z.string().optional(),
          updatedAt: z.string().optional(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().min(1).max(100).optional(),
          slug: z.string().min(1).max(100).optional(),
          logo: z.string().optional(),
          website: z.string().url().optional(),
          description: z.string().optional(),
        }),
      }
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
        member: z.object({
          id: z.string(),
          organizationId: z.string(),
          userId: z.string(),
          role: z.string(),
          createdAt: z.union([z.string(), z.string()]),
          teamId: z.string().optional(),
          user: z
            .object({
              email: z.string(),
              name: z.string(),
              image: z.string().optional(),
            })
            .optional(),
        }),
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
        member: z.object({
          id: z.string(),
          organizationId: z.string(),
          userId: z.string(),
          role: z.string(),
          createdAt: z.union([z.string(), z.string()]),
          teamId: z.string().optional(),
          user: z
            .object({
              email: z.string(),
              name: z.string(),
              image: z.string().optional(),
            })
            .optional(),
        }),
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
