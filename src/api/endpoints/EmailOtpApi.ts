import { ApiClient } from '../ApiClient';
import { z } from 'zod';

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
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/email-otp/verify-email`,
      z.object({
        status: z.enum([true]).optional(),
        token: z.string().optional(),
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
        required: z.unknown().optional(),
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

  postAuthSigninEmailotp(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/sign-in/email-otp`,
      z.object({
        token: z.string(),
        user: z.object({
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
        }),
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
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/email-otp/reset-password`,
      z.object({
        success: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          email: z.string(),
          otp: z.string(),
          password: z.string(),
        }),
      }
    );
  }
}
