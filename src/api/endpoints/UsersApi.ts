import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class UsersApi extends ApiClient {
  getUsers(
    page?: string,
    limit?: string,
    q?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/users`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            name: z.string().max(100),
            email: z.string().email(),
            emailVerified: z.boolean(),
            image: z.string(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
            username: z.string().max(100),
            role: z.enum(['user', 'admin']).optional(),
            isAnonymous: z.boolean().optional(),
            banned: z.boolean().optional(),
            banReason: z.string(),
            banExpires: z.string().datetime(),
            onboardingComplete: z.boolean().optional(),
            paymentsCustomerId: z.string(),
            locale: z.string().optional(),
          })
        ),
        meta: z.object({
          total: z.number(),
          limit: z.number(),
          offset: z.number(),
        }),
      }),
      { queryParams: { page, limit, q } }
    );
  }

  getUsers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/users/${id}`,
      z.object({
        user: z.object({
          id: z.string(),
          name: z.string().max(100),
          email: z.string().email(),
          emailVerified: z.boolean(),
          image: z.string(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
          username: z.string().max(100),
          role: z.enum(['user', 'admin']).optional(),
          isAnonymous: z.boolean().optional(),
          banned: z.boolean().optional(),
          banReason: z.string(),
          banExpires: z.string().datetime(),
          onboardingComplete: z.boolean().optional(),
          paymentsCustomerId: z.string(),
          locale: z.string().optional(),
        }),
      })
    );
  }

  putUsers(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/users/${id}`,
      z.object({
        user: z.object({
          id: z.string(),
          name: z.string().max(100),
          email: z.string().email(),
          emailVerified: z.boolean(),
          image: z.string(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
          username: z.string().max(100),
          role: z.enum(['user', 'admin']).optional(),
          isAnonymous: z.boolean().optional(),
          banned: z.boolean().optional(),
          banReason: z.string(),
          banExpires: z.string().datetime(),
          onboardingComplete: z.boolean().optional(),
          paymentsCustomerId: z.string(),
          locale: z.string().optional(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().max(100).optional(),
          username: z.string().max(100).optional(),
          onboardingComplete: z.boolean().optional(),
          locale: z.string().optional(),
        }),
      }
    );
  }

  postUsersAvatar(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/users/${id}/avatar`,
      z.object({
        uploadUrl: z.string(),
        key: z.string(),
        verifyEndpoint: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          contentType: z.string(),
        }),
      }
    );
  }

  deleteUsersAvatar(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/users/${id}/avatar`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  postUsersAvatarVerify(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/users/${id}/avatar/verify`,
      z.object({
        success: z.boolean(),
        avatarUrl: z.string(),
        key: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          key: z.string(),
        }),
      }
    );
  }

  postUsersEmail(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/users/${id}/email`,
      z.object({
        status: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          email: z.string().email(),
        }),
      }
    );
  }

  postUsersPassword(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/users/${id}/password`,
      z.object({
        success: z.boolean(),
        message: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          currentPassword: z.string().min(1),
          newPassword: z.string().min(8),
        }),
      }
    );
  }

  getAdminUsers(): Promise<Record<string, any>> {
    return this.get(
      `/admin/users`,
      z.object({
        users: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string().max(100),
            email: z.string(),
            username: z.string().max(100),
            role: z.enum(['admin', 'user', 'support']).optional(),
            banned: z.boolean(),
            banReason: z.string(),
            banExpires: z.string(),
            onboardingComplete: z.boolean(),
            createdAt: z.string(),
            updatedAt: z.string(),
            locale: z.string(),
          })
        ),
      })
    );
  }

  getAdminUsers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/users/${id}`,
      z.object({
        user: z.object({
          id: z.string().uuid(),
          name: z.string().max(100),
          email: z.string(),
          username: z.string().max(100),
          role: z.enum(['admin', 'user', 'support']).optional(),
          banned: z.boolean(),
          banReason: z.string(),
          banExpires: z.string(),
          onboardingComplete: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
          locale: z.string(),
        }),
      })
    );
  }

  patchAdminUsers(
    id: string | number,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/users/${id}`,
      z.object({
        user: z.object({
          id: z.string().uuid(),
          name: z.string().max(100),
          email: z.string(),
          username: z.string().max(100),
          role: z.enum(['admin', 'user', 'support']).optional(),
          banned: z.boolean(),
          banReason: z.string(),
          banExpires: z.string(),
          onboardingComplete: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
          locale: z.string(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().optional(),
          email: z.string().email().optional(),
          username: z.string().optional(),
          role: z.enum(['admin', 'user', 'support']).optional(),
          banned: z.boolean().optional(),
          banReason: z.string().optional(),
          banExpires: z.string().datetime().optional(),
          onboardingComplete: z.boolean().optional(),
          locale: z.string().optional(),
        }),
      }
    );
  }

  deleteAdminUsers(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/users/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }
}
