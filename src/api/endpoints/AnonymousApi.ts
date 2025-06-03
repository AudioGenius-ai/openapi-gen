import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface PostAuthSigninAnonymousResponseUserType {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  isAnonymous?: boolean;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  twoFactorEnabled?: boolean;
  onboardingComplete?: boolean;
}

export const PostAuthSigninAnonymousResponseUserTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isAnonymous: z.boolean().optional(),
  role: z.string().optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.string().optional(),
  twoFactorEnabled: z.boolean().optional(),
  onboardingComplete: z.boolean().optional(),
});

export interface PostAuthSigninAnonymousResponseSessionType {
  id?: string;
  expiresAt?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
  ipAddress?: string;
  userAgent?: string;
  userId?: string;
  activeOrganizationId?: string;
  impersonatedBy?: string;
}

export const PostAuthSigninAnonymousResponseSessionTypeSchema = z.object({
  id: z.string().optional(),
  expiresAt: z.string().optional(),
  token: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  userId: z.string().optional(),
  activeOrganizationId: z.string().optional(),
  impersonatedBy: z.string().optional(),
});

export class AnonymousApi extends ApiClient {
  postAuthSigninAnonymous(): Promise<Record<string, any>> {
    return this.post(
      `/auth/sign-in/anonymous`,
      z.object({
        user: PostAuthSigninAnonymousResponseUserTypeSchema.optional(),
        session: PostAuthSigninAnonymousResponseSessionTypeSchema.optional(),
      })
    );
  }
}
