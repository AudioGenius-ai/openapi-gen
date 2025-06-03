import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface PostAuthEmailotpVerifyemailResponseUserType {
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

export const PostAuthEmailotpVerifyemailResponseUserTypeSchema = z.object({
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

export interface PostAuthEmailotpVerifyemailResponseType {
  status?: true;
  token?: string;
  user?: PostAuthEmailotpVerifyemailResponseUserType;
  required?: unknown;
}

export const PostAuthEmailotpVerifyemailResponseTypeSchema = z.object({
  status: z.enum([true]).optional(),
  token: z.string().optional(),
  user: PostAuthEmailotpVerifyemailResponseUserTypeSchema.optional(),
  required: z.unknown().optional(),
});

export interface PostAuthSigninEmailotpResponseUserType {
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

export const PostAuthSigninEmailotpResponseUserTypeSchema = z.object({
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

export interface PostAuthEmailotpResetpasswordRequestType {
  email: string;
  otp: string;
  password: string;
}

export const PostAuthEmailotpResetpasswordRequestTypeSchema = z.object({
  email: z.string(),
  otp: z.string(),
  password: z.string(),
});

export class EmailOtpApi extends ApiClient {
  postAuthEmailotpSendverificationotp(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/email-otp/send-verification-otp`,
      z.object({
        success: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          email: z.string(),
          type: z.string(),
        }),
      }
    );
  }

  postAuthEmailotpVerifyemail(
    data: Record<string, any>
  ): Promise<PostAuthEmailotpVerifyemailResponseType> {
    return this.post(
      `/auth/email-otp/verify-email`,
      PostAuthEmailotpVerifyemailResponseTypeSchema,
      {
        body: data,
        bodySchema: z.object({
          email: z.string(),
          otp: z.string(),
        }),
      }
    );
  }

  postAuthSigninEmailotp(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/sign-in/email-otp`,
      z.object({
        token: z.string(),
        user: PostAuthSigninEmailotpResponseUserTypeSchema,
      }),
      {
        body: data,
        bodySchema: z.object({
          email: z.string(),
          otp: z.string(),
        }),
      }
    );
  }

  postAuthForgetpasswordEmailotp(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/forget-password/email-otp`,
      z.object({
        success: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          email: z.string(),
        }),
      }
    );
  }

  postAuthEmailotpResetpassword(
    data: PostAuthEmailotpResetpasswordRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/email-otp/reset-password`,
      z.object({
        success: z.boolean().optional(),
      }),
      { body: data, bodySchema: PostAuthEmailotpResetpasswordRequestTypeSchema }
    );
  }
}
