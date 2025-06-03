import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetUsersResponseDataItemType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'user';
  admin;
  isAnonymous?: boolean;
  banned?: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete?: boolean;
  paymentsCustomerId: string;
  locale?: string;
}

export const GetUsersResponseDataItemTypeSchema = z.object({
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
});

export interface GetUsersResponseMetaType {
  total: number;
  limit: number;
  offset: number;
}

export const GetUsersResponseMetaTypeSchema = z.object({
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
});

export interface GetUsersResponseUserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'user';
  admin;
  isAnonymous?: boolean;
  banned?: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete?: boolean;
  paymentsCustomerId: string;
  locale?: string;
}

export const GetUsersResponseUserTypeSchema = z.object({
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
});

export interface PutUsersRequestType {
  name?: string;
  username?: string;
  onboardingComplete?: boolean;
  locale?: string;
}

export const PutUsersRequestTypeSchema = z.object({
  name: z.string().max(100).optional(),
  username: z.string().max(100).optional(),
  onboardingComplete: z.boolean().optional(),
  locale: z.string().optional(),
});

export interface PutUsersResponseUserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role?: 'user';
  admin;
  isAnonymous?: boolean;
  banned?: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete?: boolean;
  paymentsCustomerId: string;
  locale?: string;
}

export const PutUsersResponseUserTypeSchema = z.object({
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
});

export interface PostUsersAvatarResponseType {
  uploadUrl: string;
  key: string;
  verifyEndpoint: string;
}

export const PostUsersAvatarResponseTypeSchema = z.object({
  uploadUrl: z.string(),
  key: z.string(),
  verifyEndpoint: z.string(),
});

export interface PostUsersAvatarVerifyResponseType {
  success: boolean;
  avatarUrl: string;
  key: string;
}

export const PostUsersAvatarVerifyResponseTypeSchema = z.object({
  success: z.boolean(),
  avatarUrl: z.string(),
  key: z.string(),
});

export interface GetAdminUsersResponseUsersItemType {
  id: string;
  name: string;
  email: string;
  username: string;
  role?: 'admin';
  user;
  support;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export const GetAdminUsersResponseUsersItemTypeSchema = z.object({
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
});

export interface GetAdminUsersResponseUserType {
  id: string;
  name: string;
  email: string;
  username: string;
  role?: 'admin';
  user;
  support;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export const GetAdminUsersResponseUserTypeSchema = z.object({
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
});

export interface PatchAdminUsersRequestType {
  name?: string;
  email?: string;
  username?: string;
  role?: 'admin';
  user;
  support;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  onboardingComplete?: boolean;
  locale?: string;
}

export const PatchAdminUsersRequestTypeSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
  role: z.enum(['admin', 'user', 'support']).optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.string().datetime().optional(),
  onboardingComplete: z.boolean().optional(),
  locale: z.string().optional(),
});

export interface PatchAdminUsersResponseUserType {
  id: string;
  name: string;
  email: string;
  username: string;
  role?: 'admin';
  user;
  support;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export const PatchAdminUsersResponseUserTypeSchema = z.object({
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
});

export class UsersApi extends ApiClient {
  getUsers(
    page?: string,
    limit?: string,
    q?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/users`,
      z.object({
        data: z.array(GetUsersResponseDataItemTypeSchema),
        meta: GetUsersResponseMetaTypeSchema,
      }),
      { queryParams: { page, limit, q } }
    );
  }

  getUsers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/users/${id}`,
      z.object({
        user: GetUsersResponseUserTypeSchema,
      })
    );
  }

  putUsers(
    id: string | number,
    data?: PutUsersRequestType
  ): Promise<Record<string, any>> {
    return this.put(
      `/users/${id}`,
      z.object({
        user: PutUsersResponseUserTypeSchema,
      }),
      { body: data, bodySchema: PutUsersRequestTypeSchema }
    );
  }

  postUsersAvatar(
    id: string | number,
    data?: Record<string, any>
  ): Promise<PostUsersAvatarResponseType> {
    return this.post(`/users/${id}/avatar`, PostUsersAvatarResponseTypeSchema, {
      body: data,
      bodySchema: z.object({
        contentType: z.string(),
      }),
    });
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
  ): Promise<PostUsersAvatarVerifyResponseType> {
    return this.post(
      `/users/${id}/avatar/verify`,
      PostUsersAvatarVerifyResponseTypeSchema,
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
        users: z.array(GetAdminUsersResponseUsersItemTypeSchema),
      })
    );
  }

  getAdminUsers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/users/${id}`,
      z.object({
        user: GetAdminUsersResponseUserTypeSchema,
      })
    );
  }

  patchAdminUsers(
    id: string | number,
    data: PatchAdminUsersRequestType
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/users/${id}`,
      z.object({
        user: PatchAdminUsersResponseUserTypeSchema,
      }),
      { body: data, bodySchema: PatchAdminUsersRequestTypeSchema }
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
