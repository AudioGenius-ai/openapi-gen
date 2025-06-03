import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class AnonymousApi extends ApiClient {
  postAuthSigninAnonymous(): Promise<Record<string, any>> {
    return this.post(
      `/auth/sign-in/anonymous`,
      z.object({
        user: z
          .object({
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
          })
          .optional(),
        session: z
          .object({
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
          })
          .optional(),
      })
    );
  }
}
